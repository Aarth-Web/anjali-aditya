import { useCallback, useMemo, useRef, useState, type CSSProperties } from 'react'
import { motion } from 'framer-motion'
import './QuestionCard.css'

const HEART_CHARS = ['❤️', '🩷', '💕'] as const
const HEART_COUNT = 18

const DODGE_MESSAGES = ['Nope.', 'Nice try.', 'LOL.', 'Keep trying 😂', 'Not today.'] as const

type QuestionCardProps = {
  question: string
  yesLabel: string
  noLabel: string
  onYes: () => void
}

function seededRandom(seed: number) {
  const x = Math.sin(seed * 7777) * 10000
  return x - Math.floor(x)
}

export function QuestionCard({ question, yesLabel, noLabel, onYes }: QuestionCardProps) {
  const noButtonRef = useRef<HTMLButtonElement>(null)
  const [isDodging, setIsDodging] = useState(false)
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 })
  const dodgeIndexRef = useRef(0)
  const [dodgeHint, setDodgeHint] = useState('')

  const hearts = useMemo(
    () =>
      Array.from({ length: HEART_COUNT }, (_, i) => ({
        id: i,
        char: HEART_CHARS[i % HEART_CHARS.length],
        left: `${seededRandom(i + 1) * 100}%`,
        size: `${1.1 + seededRandom(i + 9) * 1.4}rem`,
        duration: `${12 + seededRandom(i + 17) * 10}s`,
        delay: `${seededRandom(i + 25) * -18}s`,
        drift: `${-40 + seededRandom(i + 33) * 80}px`,
      })),
    [],
  )

  const dodge = useCallback(() => {
    const button = noButtonRef.current
    const padding = 12
    const width = button?.offsetWidth ?? 100
    const height = button?.offsetHeight ?? 44
    const maxX = Math.max(padding, window.innerWidth - width - padding)
    const maxY = Math.max(padding, window.innerHeight - height - padding)

    setNoPosition({
      x: padding + Math.random() * (maxX - padding),
      y: padding + Math.random() * (maxY - padding),
    })
    setIsDodging(true)
    setDodgeHint(DODGE_MESSAGES[dodgeIndexRef.current % DODGE_MESSAGES.length])
    dodgeIndexRef.current = (dodgeIndexRef.current + 1) % DODGE_MESSAGES.length
  }, [])

  return (
    <section className="question-card">
      <motion.div
        className="question-card__hearts"
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {hearts.map((heart) => (
          <span
            key={heart.id}
            className="question-card__heart"
            style={
              {
                left: heart.left,
                fontSize: heart.size,
                '--heart-duration': heart.duration,
                '--heart-delay': heart.delay,
                '--heart-drift': heart.drift,
              } as CSSProperties
            }
          >
            {heart.char}
          </span>
        ))}
      </motion.div>

      <motion.div
        className="question-card__content"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
      >
        <h1 className="question-card__question">{question}</h1>

        <div className="question-card__actions">
          <div className="question-card__no-wrap">
            <button
              ref={noButtonRef}
              type="button"
              className={`question-card__no${isDodging ? ' question-card__no--dodging' : ''}`}
              style={
                isDodging
                  ? { left: noPosition.x, top: noPosition.y }
                  : undefined
              }
              onMouseEnter={dodge}
              onMouseMove={dodge}
              onFocus={dodge}
              tabIndex={0}
            >
              {noLabel}
            </button>
            <p className="question-card__no-hint" aria-live="polite">
              {dodgeHint}
            </p>
          </div>

          <motion.button
            type="button"
            className="question-card__yes"
            onClick={onYes}
            animate={{
              scale: [1, 1.06, 1],
              boxShadow: [
                '0 0 24px rgba(224, 83, 106, 0.55), 0 8px 24px rgba(107, 26, 50, 0.25)',
                '0 0 36px rgba(224, 83, 106, 0.75), 0 10px 28px rgba(107, 26, 50, 0.3)',
                '0 0 24px rgba(224, 83, 106, 0.55), 0 8px 24px rgba(107, 26, 50, 0.25)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
          >
            {yesLabel}
          </motion.button>
        </div>
      </motion.div>
    </section>
  )
}
