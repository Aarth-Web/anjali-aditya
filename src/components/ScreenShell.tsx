import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

type ScreenShellProps = {
  title?: string
  subtitle?: string
  children?: ReactNode
  actions?: ReactNode
}

export function ScreenShell({ title, subtitle, children, actions }: ScreenShellProps) {
  return (
    <motion.div
      className="screen"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {title && <h1 className="screen__title">{title}</h1>}
      {subtitle && <p className="screen__subtitle">{subtitle}</p>}
      {children && <motion.div className="screen__body">{children}</motion.div>}
      {actions && <div className="screen__actions">{actions}</div>}
    </motion.div>
  )
}
