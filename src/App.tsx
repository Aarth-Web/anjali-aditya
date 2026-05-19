import { useCallback, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { Chapter1 } from './chapters/Chapter1'
import { Chapter2 } from './chapters/Chapter2'
import { Chapter3 } from './chapters/Chapter3'
import { ChapterErrorBoundary } from './components/ChapterErrorBoundary'
import { ChapterIntro } from './components/ChapterIntro'
import { CustomCursor } from './components/CustomCursor'
import { EndingScreen } from './components/EndingScreen'
import { MadeWithLove } from './components/MadeWithLove'
import { MobileGuard } from './components/MobileGuard'
import { QuestionCard } from './components/QuestionCard'
import { WarningScreen } from './components/WarningScreen'
import { stopAllSounds } from './utils/soundManager'
import type { Screen } from './types/screen'

const screenTransition = {
  duration: 0.5,
  ease: [0.22, 1, 0.36, 1] as const,
}

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('warning')

  const goToScreen = useCallback((name: Screen) => {
    stopAllSounds()
    setCurrentScreen(name)
  }, [])

  const renderScreen = () => {
    switch (currentScreen) {
      case 'warning':
        return <WarningScreen onProceed={() => goToScreen('chapter1-intro')} />

      case 'chapter1-intro':
        return (
          <ChapterIntro
            title="CHAPTER 1: Fool with the फुल 🌷"
            onComplete={() => goToScreen('chapter1')}
          />
        )

      case 'chapter1':
        return (
          <ChapterErrorBoundary
            chapterName="Chapter 1"
            onContinue={() => goToScreen('question1')}
          >
            <Chapter1 onComplete={() => goToScreen('question1')} />
          </ChapterErrorBoundary>
        )

      case 'question1':
        return (
          <QuestionCard
            question="Did Chapter 1 make you smile even a little, My Nakte? 🤏"
            yesLabel="Ho re Michkya... 😘"
            noLabel="Kyki 😏"
            onYes={() => goToScreen('chapter2-intro')}
          />
        )

      case 'chapter2-intro':
        return (
          <ChapterIntro
            title="CHAPTER 2: Anjali, Anjali, Anjali-Anjali 🎶"
            onComplete={() => goToScreen('chapter2')}
          />
        )

      case 'chapter2':
        return (
          <ChapterErrorBoundary
            chapterName="Chapter 2"
            onContinue={() => goToScreen('question2')}
          >
            <Chapter2 onComplete={() => goToScreen('question2')} />
          </ChapterErrorBoundary>
        )

      case 'question2':
        return (
          <QuestionCard
            question="Still mad at me? 👀"
            yesLabel="Nahi g may 🥰🥰"
            noLabel="Hn 👍"
            onYes={() => goToScreen('chapter3-intro')}
          />
        )

      case 'chapter3-intro':
        return (
          <ChapterIntro
            title="CHAPTER 3: Thanks for being there, Pilli 🐱"
            onComplete={() => goToScreen('chapter3')}
          />
        )

      case 'chapter3':
        return (
          <ChapterErrorBoundary
            chapterName="Chapter 3"
            onContinue={() => goToScreen('question3')}
          >
            <Chapter3 onComplete={() => goToScreen('question3')} />
          </ChapterErrorBoundary>
        )

      case 'question3':
        return (
          <QuestionCard
            question="Forgive me? 🥺"
            yesLabel="Love You Adi ❤️"
            noLabel="Gpp Tu."
            onYes={() => goToScreen('ending')}
          />
        )

      case 'ending':
        return <EndingScreen />

      default:
        return null
    }
  }

  return (
    <MobileGuard>
      <CustomCursor />
      <MadeWithLove />
      <LayoutGroup>
        <motion.div className="app" layout>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScreen}
              className="app__viewport"
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={screenTransition}
            >
              {renderScreen()}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>
    </MobileGuard>
  )
}

export default App
