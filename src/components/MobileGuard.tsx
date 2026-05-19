import { useEffect, useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'

const BREAKPOINT = 1024

function isNarrowViewport() {
  return window.innerWidth < BREAKPOINT
}

type MobileGuardProps = {
  children: ReactNode
}

export function MobileGuard({ children }: MobileGuardProps) {
  const [isMobile, setIsMobile] = useState(isNarrowViewport)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(isNarrowViewport())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (isMobile) {
    return (
      <motion.div
        className="mobile-guard"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="mobile-guard__emoji" aria-hidden>
          💻
        </span>
        <h1 className="mobile-guard__heading">Hey you.</h1>
        <p className="mobile-guard__subtext">
          This is NOT meant for your tiny screen. Open this on a laptop. Trust me. Do it. NOW.
        </p>
        <p className="mobile-guard__note">
          If you&apos;re already on a laptop... your laptop is embarrassing 😐
        </p>
      </motion.div>
    )
  }

  return children
}
