import { Howl, Howler, type HowlOptions } from 'howler'

const activeSounds = new Set<Howl>()
const pendingPlayback = new Set<Howl>()
let unlockListenersAttached = false
let audioUnlocked = false

function track(sound: Howl, loop = false) {
  activeSounds.add(sound)

  const untrack = () => {
    activeSounds.delete(sound)
    pendingPlayback.delete(sound)
  }

  if (!loop) {
    sound.once('end', untrack)
  }
  sound.once('stop', untrack)
}

/** Resume Web Audio and flush sounds queued by autoplay policy. Call on user gesture. */
export function unlockAudio() {
  audioUnlocked = true

  if (Howler.ctx && Howler.ctx.state === 'suspended') {
    void Howler.ctx.resume()
  }

  flushPending()
}

function flushPending() {
  pendingPlayback.forEach((sound) => {
    if (sound.state() === 'loaded') {
      sound.play()
    }
  })
  pendingPlayback.clear()
}

function attachUnlockListeners() {
  if (unlockListenersAttached || typeof window === 'undefined') return
  unlockListenersAttached = true

  const handler = () => unlockAudio()

  window.addEventListener('pointerdown', handler, { passive: true })
  window.addEventListener('keydown', handler, { passive: true })
  window.addEventListener('touchstart', handler, { passive: true })
}

function tryPlay(sound: Howl): boolean {
  attachUnlockListeners()

  const playId = sound.play()
  if (playId !== undefined) {
    pendingPlayback.delete(sound)
    return true
  }

  pendingPlayback.add(sound)
  return false
}

function playWhenReady(sound: Howl) {
  const attempt = () => tryPlay(sound)

  if (sound.state() === 'loaded') {
    attempt()
    return
  }

  sound.once('load', attempt)
  sound.once('loaderror', (_id, err) => {
    console.warn('[soundManager] load error', err, sound)
    pendingPlayback.delete(sound)
  })
}

function createSound(options: HowlOptions): Howl {
  const sound = new Howl({
    html5: true,
    preload: true,
    ...options,
  })

  sound.on('playerror', () => {
    pendingPlayback.add(sound)
    if (audioUnlocked) {
      void Howler.ctx?.resume().then(() => sound.play())
    }
  })

  return sound
}

export function stopAllSounds() {
  activeSounds.forEach((sound) => {
    sound.stop()
    sound.unload()
  })
  activeSounds.clear()
  pendingPlayback.clear()
}

/** Stops every active sound, then starts a new one (SFX / typing / warning). */
export function playManagedSound(options: HowlOptions): Howl {
  stopAllSounds()

  const sound = createSound({
    onloaderror: (_id, err) => {
      console.warn('[soundManager] load error', err, options.src)
      options.onloaderror?.(_id, err)
    },
    ...options,
  })

  track(sound, Boolean(options.loop))
  playWhenReady(sound)
  return sound
}

export function releaseSound(sound: Howl) {
  sound.stop()
  sound.unload()
  activeSounds.delete(sound)
  pendingPlayback.delete(sound)
}

export function setSoundRate(sound: Howl, rate: number) {
  sound.rate(Math.min(4, Math.max(0.25, rate)))
}
