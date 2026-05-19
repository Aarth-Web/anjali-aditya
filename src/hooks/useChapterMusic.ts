import { useEffect } from 'react'
import { playManagedSound, releaseSound } from '../utils/soundManager'

/**
 * Looped chapter background music for App-level persistence across screens.
 * Pass `null` to stop. Same `src` across re-renders does not restart playback.
 */
export function useChapterMusic(src: string | null, volume = 0.6) {
  useEffect(() => {
    if (!src) return

    const music = playManagedSound({
      src: [src],
      loop: true,
      volume,
    })

    return () => {
      releaseSound(music)
    }
  }, [src, volume])
}
