import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { StorySlide, type StorySlideContent } from '../components/StorySlide'
import ch3_1 from '../assets/chapter3/ch3_1.jpg'

const SLIDES: StorySlideContent[] = [
  {
    type: 'text',
    value: `Before we ever became 'us', you were already becoming my safest place.

You entered my life so softly that I didn't even realize when my heart started making space for you beyond friendship. At first, it was just comfort — the kind that feels rare in this noisy world. Your calmness, your kindness, the way you listened without judging, the way you cared without making it loud… slowly made me emotionally attached to you.

And honestly, I respected you long before I loved you.

Somewhere between our endless talks, random outings, shared tea breaks, and your soft little reactions to my nonsense, I started seeing you differently. Not suddenly. Not dramatically. Just naturally.

Loving you became the easiest thing my heart has ever done. ❤️`,
  },
  {
    type: 'text',
    value: `Sometimes I still look at you and genuinely wonder how I got this lucky.

You are my best friend, my comfort person, my travel buddy, my peace, and somehow… also the most beautiful woman I have ever known. You lead this relationship with so much maturity and care, and I secretly love that about you. The way you push me towards success before anything else makes me respect you even more every single day.

Being loved by you feels like life personally apologizing to me for all the hard days.

You are gorgeous beyond explanation — above my league in every universe possible. As perfect as Rohit Sharma's pull shot, as graceful as Kohli's cover drive, as mesmerizing as Shah Rukh Khan's arms-open moment, as loud as Dhurandhar, and as heartwarming as Hridayam.

And still… somehow, you chose me. ❤️`,
  },
  {
    type: 'text',
    value: `One day, after marriage, I know I'll frame that photo and keep it beside our bed forever.

Because the way you held my shoulder in that moment felt so intimate to me — like your heart was proudly saying, 'He is mine.' The love, the right, the comfort in your touch… I cannot explain what it does to me.

And your eyes that day? God… they were glowing in a way no artist could ever sketch perfectly. I genuinely feel heaven inside them. Sometimes I think when my final moment comes in this life, I would want to look into your eyes one last time before leaving this world.

That's intimacy for me.

The way you look at me makes me fall deeper every day. So deep that now even the thought of you not being mine for a second feels unbearable to my heart. ❤️`,
  },
  { type: 'image', value: ch3_1 },
]

type Chapter3Props = {
  onComplete: () => void
}

export function Chapter3({ onComplete }: Chapter3Props) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const slide = SLIDES[currentIndex]
  const isLast = currentIndex === SLIDES.length - 1

  const handleNext = () => {
    if (isLast) {
      onComplete()
      return
    }
    setCurrentIndex((index) => index + 1)
  }

  return (
    <AnimatePresence mode="wait">
      <StorySlide
        key={currentIndex}
        content={slide}
        isLast={isLast}
        onNext={handleNext}
      />
    </AnimatePresence>
  )
}
