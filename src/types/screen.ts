export type Screen =
  | 'warning'
  | 'chapter1-intro'
  | 'chapter1'
  | 'question1'
  | 'chapter2-intro'
  | 'chapter2'
  | 'question2'
  | 'chapter3-intro'
  | 'chapter3'
  | 'question3'
  | 'question4'
  | 'ending'

export type NavigationProps = {
  goToScreen: (name: Screen) => void
}
