'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface SectionAnimationsProps {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  className?: string
}

export function SectionAnimations({
  children,
  delay = 0,
  direction = 'up',
  className = '',
}: SectionAnimationsProps) {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: 50 }
      case 'down':
        return { opacity: 0, y: -50 }
      case 'left':
        return { opacity: 0, x: -50 }
      case 'right':
        return { opacity: 0, x: 50 }
      default:
        return { opacity: 0, y: 50 }
    }
  }

  const getFinalPosition = () => {
    switch (direction) {
      case 'up':
      case 'down':
        return { opacity: 1, y: 0 }
      case 'left':
      case 'right':
        return { opacity: 1, x: 0 }
      default:
        return { opacity: 1, y: 0 }
    }
  }

  return (
    <motion.div
      className={className}
      initial={getInitialPosition()}
      transition={{ duration: 0.8, delay }}
      whileInView={getFinalPosition()}
    >
      {children}
    </motion.div>
  )
}

interface TimelineAnimationsProps {
  children: ReactNode
  delay?: number
}

export function TimelineAnimations({
  children,
  delay = 0,
}: TimelineAnimationsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      transition={{ duration: 1.2, delay }}
      whileInView={{ opacity: 1, scaleX: 1 }}
    >
      {children}
    </motion.div>
  )
}
