import { useMemo, type CSSProperties } from 'react'
import { motion } from 'framer-motion'
import './EndingScreen.css'

const MESSAGE = "I love you. That's it. That's the whole app. 💌"
const PETAL_CHARS = ['✿', '❀', '✿'] as const
const PETAL_COUNT = 16

function seededRandom(seed: number) {
  const x = Math.sin(seed * 4242) * 10000
  return x - Math.floor(x)
}

const textContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.4 },
  },
}

const wordVariant = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export function EndingScreen() {
  const words = MESSAGE.split(/\s+/).filter(Boolean)

  const petals = useMemo(
    () =>
      Array.from({ length: PETAL_COUNT }, (_, i) => ({
        id: i,
        char: PETAL_CHARS[i % PETAL_CHARS.length],
        left: `${seededRandom(i + 1) * 100}%`,
        size: `${0.9 + seededRandom(i + 7) * 1.1}rem`,
        duration: `${14 + seededRandom(i + 13) * 12}s`,
        delay: `${seededRandom(i + 19) * -18}s`,
        drift: `${-35 + seededRandom(i + 23) * 70}px`,
      })),
    [],
  )

  return (
    <motion.section
      className="ending-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
    >
      <div className="ending-screen__petals" aria-hidden>
        {petals.map((petal) => (
          <span
            key={petal.id}
            className="ending-screen__petal"
            style={
              {
                left: petal.left,
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
      </div>

      <motion.h1
        className="ending-screen__message"
        variants={textContainer}
        initial="hidden"
        animate="visible"
      >
        {words.map((word, index) => (
          <motion.span key={`${word}-${index}`} className="ending-screen__word" variants={wordVariant}>
            {word}
          </motion.span>
        ))}
      </motion.h1>
    </motion.section>
  )
}
