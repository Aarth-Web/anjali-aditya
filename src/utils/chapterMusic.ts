import type { Screen } from '../types/screen'
import chapter1Music from '../assets/sounds/chapter1.mp3'
import chapter3Music from '../assets/sounds/chapter3.mp3'

/** Background music that spans multiple screens (managed in App). */
export function getPersistedChapterMusic(screen: Screen): string | null {
  if (screen === 'chapter1' || screen === 'question1') {
    return chapter1Music
  }
  if (screen === 'chapter3' || screen === 'question3' || screen === 'question4' || screen === 'ending') {
    return chapter3Music
  }
  return null
}
