import { useEffect, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import chapter2Music from '../assets/sounds/chapter2.mp3'
import { playManagedSound, releaseSound } from '../utils/soundManager'
import './PhotoCard.css'

const NEXT_LABELS = [
  'Okay fine, next →',
  'Keep going... →',
  "She won't stop now →",
] as const

const LAST_LABEL = "That's all for now 💌"

const FADE_TRANSITION = { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }
const SLIDE_TRANSITION = { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const }

type CardData = {
  image: string
  text: string
}

type PhotoCardManualProps = {
  type?: 'manual'
  image: string
  text: string
  reverse?: boolean
  onNext: () => void
  isLast?: boolean
  cardIndex?: number
}

type PhotoCardAutoProps = {
  type: 'auto'
  cards: CardData[]
  interval?: number
  onComplete: () => void
}

export type PhotoCardProps = PhotoCardManualProps | PhotoCardAutoProps

type PhotoCardSlideProps = {
  image: string
  text: string
  reverse?: boolean
  variant: 'manual' | 'auto'
  animation: 'slide' | 'fade'
  footer?: ReactNode
}

function PhotoCardSlide({
  image,
  text,
  reverse = false,
  variant,
  animation,
  footer,
}: PhotoCardSlideProps) {
  const frameClass = reverse
    ? 'photo-card__frame photo-card__frame--tilt-right'
    : 'photo-card__frame photo-card__frame--tilt-left'

  const motionProps =
    animation === 'fade'
      ? {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: FADE_TRANSITION,
        }
      : {
          initial: { x: '18%', opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: '-14%', opacity: 0 },
          transition: SLIDE_TRANSITION,
        }

  return (
    <motion.article className={`photo-card photo-card--${variant}`} {...motionProps}>
      <div className={`photo-card__layout${reverse ? ' photo-card__layout--reverse' : ''}`}>
        <div className="photo-card__media">
          <motion.div
            className={frameClass}
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <img className="photo-card__image" src={image} alt="" loading="lazy" />
          </motion.div>
        </div>

        <div className="photo-card__text-panel">
          <p className="photo-card__text">
            <span className="photo-card__quote" aria-hidden>
              ❝
            </span>
            {text}
          </p>
        </div>
      </div>
      {footer}
    </motion.article>
  )
}

function PhotoCardManual({
  image,
  text,
  reverse = false,
  onNext,
  isLast = false,
  cardIndex = 0,
}: PhotoCardManualProps) {
  const buttonLabel = isLast
    ? LAST_LABEL
    : NEXT_LABELS[cardIndex % NEXT_LABELS.length]

  return (
    <PhotoCardSlide
      image={image}
      text={text}
      reverse={reverse}
      variant="manual"
      animation="slide"
      footer={
        <button type="button" className="photo-card__next" onClick={onNext}>
          {buttonLabel}
        </button>
      }
    />
  )
}

function PhotoCardAuto({ cards, interval = 3000, onComplete }: PhotoCardAutoProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const onCompleteRef = useRef(onComplete)

  onCompleteRef.current = onComplete

  const card = cards[currentIndex]
  const reverse = currentIndex % 2 === 1

  useEffect(() => {
    const music = playManagedSound({
      src: [chapter2Music],
      loop: true,
      volume: 0.6,
    })

    return () => {
      releaseSound(music)
    }
  }, [])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (currentIndex < cards.length - 1) {
        setCurrentIndex((index) => index + 1)
        return
      }
      onCompleteRef.current()
    }, interval)

    return () => window.clearTimeout(timer)
  }, [currentIndex, interval, cards.length])

  return (
    <div className="photo-card-auto">
      <AnimatePresence mode="wait">
        <PhotoCardSlide
          key={currentIndex}
          image={card.image}
          text={card.text}
          reverse={reverse}
          variant="auto"
          animation="fade"
        />
      </AnimatePresence>
    </div>
  )
}

export function PhotoCard(props: PhotoCardProps) {
  if (props.type === 'auto') {
    return <PhotoCardAuto {...props} />
  }

  return <PhotoCardManual {...props} />
}
