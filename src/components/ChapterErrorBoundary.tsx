import { Component, type ErrorInfo, type ReactNode } from 'react'
import './ChapterErrorBoundary.css'

type ChapterErrorBoundaryProps = {
  chapterName: string
  children: ReactNode
  onContinue?: () => void
}

type ChapterErrorBoundaryState = {
  hasError: boolean
}

export class ChapterErrorBoundary extends Component<
  ChapterErrorBoundaryProps,
  ChapterErrorBoundaryState
> {
  state: ChapterErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ChapterErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(`[${this.props.chapterName}]`, error, info.componentStack)
  }

  componentDidUpdate(prevProps: ChapterErrorBoundaryProps) {
    if (prevProps.children !== this.props.children) {
      this.setState({ hasError: false })
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="chapter-error">
          <h1 className="chapter-error__title">This chapter hit a snag</h1>
          <p className="chapter-error__text">
            Something went wrong loading {this.props.chapterName}. A photo might be missing or
            corrupted — double-check your image files.
          </p>
          {this.props.onContinue && (
            <button
              type="button"
              className="chapter-error__button"
              onClick={this.props.onContinue}
            >
              Skip ahead →
            </button>
          )}
        </section>
      )
    }

    return this.props.children
  }
}
