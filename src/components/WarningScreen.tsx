import { useEffect, useMemo, useRef, type CSSProperties } from 'react'
import { motion } from 'framer-motion'
import warningSound from '../assets/sounds/warning.mp3'
import { playManagedSound, releaseSound } from '../utils/soundManager'
import './WarningScreen.css'

type WarningScreenProps = {
  onProceed: () => void
}

const WARNINGS = [
  {
    icon: '🎧',
    text: "Put your earphones in. RIGHT NOW. Don't you dare skip this.",
  },
  {
    icon: '🚪',
    text: "Make sure you're alone. This is between you and me.",
  },
  {
    icon: '🙅',
    text: 'No peeking at your phone mid-way. Full screen. Full attention.',
  },
] as const

const PETAL_CHARS = ['✿', '❀', '✿', '❀', '✿'] as const
const PETAL_COUNT = 20

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

const listContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.18, delayChildren: 0.55 },
  },
}

const listItem = {
  hidden: { opacity: 0, x: -16 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
}

function seededRandom(seed: number) {
  const x = Math.sin(seed * 9999) * 10000
  return x - Math.floor(x)
}

export function WarningScreen({ onProceed }: WarningScreenProps) {
  const soundPlayed = useRef(false)

  const petals = useMemo(
    () =>
      Array.from({ length: PETAL_COUNT }, (_, i) => ({
        id: i,
        char: PETAL_CHARS[i % PETAL_CHARS.length],
        left: `${seededRandom(i + 1) * 100}%`,
        top: `${seededRandom(i + 11) * 100}%`,
        size: `${0.85 + seededRandom(i + 21) * 1.1}rem`,
        duration: `${14 + seededRandom(i + 31) * 12}s`,
        delay: `${seededRandom(i + 41) * -20}s`,
        drift: `${-30 + seededRandom(i + 51) * 60}px`,
      })),
    [],
  )

  useEffect(() => {
    if (soundPlayed.current) return
    soundPlayed.current = true

    const sound = playManagedSound({
      src: [warningSound],
      volume: 0.85,
    })

    return () => {
      releaseSound(sound)
    }
  }, [])

  return (
    <div className="warning-screen">
      <motion.div
        className="warning-screen__petals"
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        {petals.map((petal) => (
          <span
            key={petal.id}
            className="warning-screen__petal"
            style={
              {
                left: petal.left,
                top: petal.top,
                fontSize: petal.size,
                '--petal-duration': petal.duration,
                '--petal-delay': petal.delay,
                '--petal-drift': petal.drift,
              } as CSSProperties
            }
          >
            {petal.char}
          </span>
        ))}
      </motion.div>

      <div className="warning-screen__content">
        <motion.h1
          className="warning-screen__title"
          initial="hidden"
          animate="show"
          custom={0.1}
          variants={fadeUp}
        >
          ⚠️ BEFORE YOU PROCEED ⚠️
        </motion.h1>

        <motion.ul
          className="warning-screen__list"
          initial="hidden"
          animate="show"
          variants={listContainer}
        >
          {WARNINGS.map((item) => (
            <motion.li key={item.icon} className="warning-screen__item" variants={listItem}>
              <span className="warning-screen__icon" aria-hidden>
                {item.icon}
              </span>
              <p className="warning-screen__text">{item.text}</p>
            </motion.li>
          ))}
        </motion.ul>

        <motion.button
          type="button"
          className="warning-screen__cta"
          onClick={onProceed}
          initial="hidden"
          animate="show"
          custom={1.15}
          variants={fadeUp}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          Everything is perfect, less goooo 🚀
        </motion.button>
      </div>
    </div>
  )
}
