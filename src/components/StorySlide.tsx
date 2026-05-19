import { motion } from 'framer-motion'
import './StorySlide.css'

export type StorySlideContent = {
  type: 'text' | 'image'
  value: string
}

type StorySlideProps = {
  content: StorySlideContent
  onNext: () => void
  isLast?: boolean
}

const crossfade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
}

const textContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.2 },
  },
}

const wordVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
}

function StoryText({ value }: { value: string }) {
  const words = value.split(/\s+/).filter(Boolean)

  return (
    <motion.p
      className="story-slide__text"
      variants={textContainer}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span key={`${word}-${index}`} className="story-slide__word" variants={wordVariant}>
          {word}
        </motion.span>
      ))}
    </motion.p>
  )
}

function StoryImage({ src }: { src: string }) {
  return (
    <motion.div
      className="story-slide__frame"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
    >
      <img className="story-slide__image" src={src} alt="" loading="lazy" />
    </motion.div>
  )
}

export function StorySlide({ content, onNext, isLast = false }: StorySlideProps) {
  return (
    <motion.section className="story-slide" {...crossfade}>
      <div className="story-slide__body">
        {content.type === 'text' ? (
          <StoryText value={content.value} />
        ) : (
          <StoryImage src={content.value} />
        )}
      </div>

      <motion.button
        type="button"
        className="story-slide__cta"
        onClick={onNext}
        aria-label={isLast ? 'Finish chapter' : 'Next slide'}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.35, duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
      >
        →
      </motion.button>
    </motion.section>
  )
}
