import type { Screen } from '../types/screen'

export const SCREEN_FLOW: Screen[] = [
  'warning',
  'chapter1-intro',
  'chapter1',
  'question1',
  'chapter2-intro',
  'chapter2',
  'question2',
  'chapter3-intro',
  'chapter3',
  'question3',
  'question4',
  'ending',
]

export function getNextScreen(current: Screen): Screen | null {
  const index = SCREEN_FLOW.indexOf(current)
  if (index === -1 || index >= SCREEN_FLOW.length - 1) return null
  return SCREEN_FLOW[index + 1]
}
