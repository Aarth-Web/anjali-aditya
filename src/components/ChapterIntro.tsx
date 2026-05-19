import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import typingSound from '../assets/sounds/typing.mp3'
import {
  playManagedSound,
  releaseSound,
  setSoundRate,
} from '../utils/soundManager'
import './ChapterIntro.css'

const FADE_OUT_MS = 700
const MIN_CHAR_DELAY_MS = 40
const MAX_CHAR_DELAY_MS = 90
/** Reference typing speed — playback rate scales so audio matches `charDelay`. */
const TYPING_REFERENCE_CHAR_DELAY_MS = 65

type ChapterIntroProps = {
  title: string
  duration?: number
  onComplete: () => void
}

export function ChapterIntro({ title, duration = 3500, onComplete }: ChapterIntroProps) {
  const [visibleCount, setVisibleCount] = useState(0)
  const [typingDone, setTypingDone] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const soundRef = useRef<ReturnType<typeof playManagedSound> | null>(null)
  const onCompleteRef = useRef(onComplete)

  onCompleteRef.current = onComplete

  const charDelay = Math.min(
    MAX_CHAR_DELAY_MS,
    Math.max(MIN_CHAR_DELAY_MS, Math.floor((duration * 0.65) / Math.max(title.length, 1))),
  )

  const visibleText = title.slice(0, visibleCount)
  const showCursor = !typingDone && !isExiting

  useEffect(() => {
    const sound = playManagedSound({
      src: [typingSound],
      loop: true,
      volume: 0.55,
    })
    soundRef.current = sound
    setSoundRate(sound, TYPING_REFERENCE_CHAR_DELAY_MS / charDelay)

    return () => {
      releaseSound(sound)
      if (soundRef.current === sound) {
        soundRef.current = null
      }
    }
  }, [title, charDelay])

  useEffect(() => {
    setVisibleCount(0)
    setTypingDone(false)
    setIsExiting(false)
  }, [title])

  useEffect(() => {
    if (visibleCount >= title.length) {
      setTypingDone(true)
      if (soundRef.current) {
        releaseSound(soundRef.current)
        soundRef.current = null
      }
      return
    }

    const timer = window.setTimeout(() => {
      setVisibleCount((count) => count + 1)
    }, charDelay)

    return () => window.clearTimeout(timer)
  }, [visibleCount, title.length, charDelay])

  useEffect(() => {
    const exitTimer = window.setTimeout(() => {
      setIsExiting(true)
    }, duration)

    return () => window.clearTimeout(exitTimer)
  }, [duration, title])

  const handleFadeComplete = () => {
    if (isExiting) {
      if (soundRef.current) {
        releaseSound(soundRef.current)
        soundRef.current = null
      }
      onCompleteRef.current()
    }
  }

  return (
    <motion.div
      className="chapter-intro"
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: FADE_OUT_MS / 1000, ease: [0.22, 1, 0.36, 1] as const }}
      onAnimationComplete={handleFadeComplete}
    >
      <motion.div
        className="chapter-intro__inner"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: isExiting ? 0 : 1, y: isExiting ? -10 : 0 }}
        transition={{ duration: FADE_OUT_MS / 1000, ease: [0.22, 1, 0.36, 1] as const }}
      >
        <h1 className="chapter-intro__title">
          {visibleText}
          {showCursor && <span className="chapter-intro__cursor">|</span>}
        </h1>

        <motion.div
          className="chapter-intro__rule"
          initial={{ width: 0, opacity: 0 }}
          animate={{
            width: typingDone ? '5.5rem' : 0,
            opacity: typingDone ? 1 : 0,
          }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] as const }}
          aria-hidden
        />
      </motion.div>
    </motion.div>
  )
}
