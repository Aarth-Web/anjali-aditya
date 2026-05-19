import { useEffect, useState } from 'react'
import './CustomCursor.css'

const DESKTOP_MIN_WIDTH = 1024

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const syncEnabled = () => {
      const isDesktop = window.innerWidth >= DESKTOP_MIN_WIDTH
      setEnabled(isDesktop)
      document.body.classList.toggle('has-custom-cursor', isDesktop)
      if (!isDesktop) setVisible(false)
    }

    syncEnabled()
    window.addEventListener('resize', syncEnabled)

    return () => {
      window.removeEventListener('resize', syncEnabled)
      document.body.classList.remove('has-custom-cursor')
    }
  }, [])

  useEffect(() => {
    if (!enabled) return

    const onMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY })
      setVisible(true)
    }

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    window.addEventListener('mousemove', onMove)
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <span
      className={`custom-cursor${visible ? ' custom-cursor--visible' : ''}`}
      style={{ left: position.x, top: position.y }}
      aria-hidden
    >
      ❤️
    </span>
  )
}
