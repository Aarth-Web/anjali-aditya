import { Howl, type HowlOptions } from 'howler'

const activeSounds = new Set<Howl>()
/** Sounds waiting for the first user gesture (browsers block autoplay otherwise). */
const pendingPlayback = new Set<Howl>()
let unlockListenersAttached = false

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

function flushPending() {
  pendingPlayback.forEach((sound) => {
    sound.play()
  })
  pendingPlayback.clear()
}

function attachUnlockListeners() {
  if (unlockListenersAttached || typeof window === 'undefined') return
  unlockListenersAttached = true

  const handler = () => {
    flushPending()
  }

  const opts = { once: false, passive: true } as AddEventListenerOptions
  window.addEventListener('pointerdown', handler, opts)
  window.addEventListener('keydown', handler, opts)
  window.addEventListener('touchstart', handler, opts)
}

function safePlay(sound: Howl) {
  attachUnlockListeners()

  sound.once('playerror', () => {
    pendingPlayback.add(sound)
    sound.once('unlock', () => {
      sound.play()
      pendingPlayback.delete(sound)
    })
  })

  try {
    sound.play()
  } catch (error) {
    console.warn('[soundManager] play() threw, queued for next gesture', error)
    pendingPlayback.add(sound)
  }
}

export function stopAllSounds() {
  activeSounds.forEach((sound) => {
    sound.stop()
    sound.unload()
  })
  activeSounds.clear()
  pendingPlayback.clear()
}

/** Stops every active sound, then starts a new managed instance. */
export function playManagedSound(options: HowlOptions): Howl {
  stopAllSounds()
  const sound = new Howl({
    ...options,
    onloaderror: (id, err) => {
      console.warn('[soundManager] load error', err, options.src)
      options.onloaderror?.(id, err)
    },
    onplayerror: (id, err) => {
      console.warn('[soundManager] play error', err, options.src)
      options.onplayerror?.(id, err)
    },
  })
  track(sound, Boolean(options.loop))
  safePlay(sound)
  return sound
}

/** Stops other sounds, registers this one (call `.play()` yourself if needed). */
export function registerManagedSound(options: HowlOptions): Howl {
  stopAllSounds()
  const sound = new Howl(options)
  track(sound, Boolean(options.loop))
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
