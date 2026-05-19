import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { PhotoCard } from '../components/PhotoCard'
import ch1_1 from '../assets/chapter1/ch1_1.jpg'
import ch1_2 from '../assets/chapter1/ch1_2.jpg'
import ch1_3 from '../assets/chapter1/ch1_3.jpeg'

type ChapterCard = {
  image: string
  text: string
}

const CARDS: ChapterCard[] = [
  {
    image: ch1_1,
    text: `This was supposed to be just two friends hanging out. Very normal. Very casual. Very 'bro-coded'. And then you showed up like this. Soft smile, calm chaos-free energy, that denim-jacket-with-main-character-behaviour combo... and suddenly my brain was like: 'Wait. Since when is Anjali like this… ?' That day felt weirdly peaceful. Like I met a version of you I hadn't noticed before — softer, warmer, effortless. Somewhere between this mirror selfie and that stupid happy feeling I carried home…`,
  },
  {
    image: ch1_2,
    text: `This trip was marketed as 'two friends going to Mysore.' But for me? It accidentally became a full character-development arc. First trip with a girl. First time realizing how peaceful comfort can feel. First time feeling trusted like that. Every road felt lighter because you were walking beside me. Every tea somehow tasted better. Even standing in food lines — which I normally treat like a personal attack — became fun because you were there forcing me to behave like that. You laughed at my painfully average jokes like they deserved a Netflix special. You listened to my random thoughts like they actually mattered. And somewhere between all those conversations, crowded streets, and tiny moments… my respect for you quietly became something much deeper. That day one thing got permanently fixed in my brain: For every future trip… she's the first person I want beside me. And that Mysore-to-Bangalore bus ride? Yeah… 2.5 hours felt criminally short. Because for the first time ever, I wasn't waiting to reach home. I just wanted the journey with you to continue a little longer. ❤️`,
  },
  {
    image: ch1_3,
    text: `This was supposed to be just a Valentine's post. Cute photo. Friendly vibes. Normal people behaviour. But looking back now… it honestly feels like destiny leaked spoilers too early and we were both too confused to understand them. Because this was the day something quietly changed. For the first time ever, you felt that tiny bit of jealousy. And for the first time ever, my heart started looking at you differently. And honestly… special thanks to Tekale. Unintentional wingman of the year. I still remember how I spent FOUR HOURS asking you the same question again and again: 'But why are you feeling like this?' Not because I wanted a confession. Not because I was expecting love. But because for the first time in my life… someone's emotions towards me were making me feel special in a way I couldn't explain.

And secretly?
I was loving your jealousy a little too much.

Even then, my brain kept saying:
'No no no, this can't be romantic.'

But respect had already turned into attraction.
Attraction had already started turning into attachment.
And somewhere in between all those conversations… we unknowingly started falling for each other.

That day changed my life in the softest and most beautiful way possible.

And honestly?

I'm really grateful it happened exactly the way it did.

Because somewhere around this moment…
we didn't just stay best friends anymore.

We started becoming us. ❤️`,
  },
]

type Chapter1Props = {
  onComplete: () => void
}

export function Chapter1({ onComplete }: Chapter1Props) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const card = CARDS[currentIndex]
  const isLast = currentIndex === CARDS.length - 1

  const handleNext = () => {
    if (isLast) {
      onComplete()
      return
    }
    setCurrentIndex((index) => index + 1)
  }

  return (
    <AnimatePresence mode="wait">
      <PhotoCard
        key={currentIndex}
        type="manual"
        image={card.image}
        text={card.text}
        reverse={currentIndex % 2 === 1}
        cardIndex={currentIndex}
        isLast={isLast}
        onNext={handleNext}
      />
    </AnimatePresence>
  )
}
