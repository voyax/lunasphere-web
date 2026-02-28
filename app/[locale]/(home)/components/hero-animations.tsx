'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface HeroAnimationsProps {
  children: ReactNode
  delay?: number
}

export function HeroAnimations({ children, delay = 0 }: HeroAnimationsProps) {
  return (
    <motion.div
      animate={{ opacity: 1, x: 0 }}
      className={delay > 0 ? 'relative' : 'space-y-6'}
      initial={{ opacity: 0, x: delay > 0 ? 50 : -50 }}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.div>
  )
}
