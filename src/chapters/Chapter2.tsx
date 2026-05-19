import { PhotoCard } from '../components/PhotoCard'
import ch2_1 from '../assets/chapter2/ch2_1.jpg'
import ch2_2 from '../assets/chapter2/ch2_2.jpg'
import ch2_3 from '../assets/chapter2/ch2_3.jpg'
import ch2_4 from '../assets/chapter2/ch2_4.jpg'
import ch2_5 from '../assets/chapter2/ch2_5.jpg'
import ch2_6 from '../assets/chapter2/ch2_6.jpg'
import ch2_7 from '../assets/chapter2/ch2_7.jpg'
import ch2_8 from '../assets/chapter2/ch2_8.jpg'
import ch2_9 from '../assets/chapter2/ch2_9.jpg'
import ch2_10 from '../assets/chapter2/ch2_10.jpg'
import ch2_11 from '../assets/chapter2/ch2_11.jpg'
import ch2_12 from '../assets/chapter2/ch2_12.jpg'
import ch2_13 from '../assets/chapter2/ch2_13.jpg'
import ch2_14 from '../assets/chapter2/ch2_14.jpg'

type ChapterCard = {
  image: string
  text: string
}

const CARDS: ChapterCard[] = [
  {
    image: ch2_1,
    text: 'Inthezaar Ninnade',
  },
  {
    image: ch2_2,
    text: 'Bandu haaku Haajari',
  },
  {
    image: ch2_3,
    text: 'Ninnaya Notave ',
  },
  {
    image: ch2_4,
    text: ' Entane Acchari',
  },
  {
    image: ch2_5,
    text: 'Inthezaar Ninnade',
  },
  {
    image: ch2_6,
    text: 'Bandu haaku Haajari',
  },
  {
    image: ch2_7,
    text: 'Ninnaya NoOtave',
  },
  {
    image: ch2_8,
    text: 'Entane Acchari',
  },
  {
    image: ch2_9,
    text: 'A For Apple Anno',
  },
  {
    image: ch2_10,
    text: 'PaaTane Marethe hoytu',
  },
  {
    image: ch2_11,
    text: 'A For Angel Anta ',
  },
  {
    image: ch2_12,
    text: 'Helode Roodi yaytu',
  },
  {
    image: ch2_13,
    text: 'Anjali Anjali',
  },
  {
    image: ch2_14,
    text: 'Anjali Anjali',
  },
]

type Chapter2Props = {
  onComplete: () => void
}

export function Chapter2({ onComplete }: Chapter2Props) {
  return (
    <PhotoCard
      type="auto"
      cards={CARDS}
      interval={2500}
      onComplete={onComplete}
    />
  )
}
