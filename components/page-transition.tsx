'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

interface PageTransitionProps {
  children: ReactNode
}

/**
 * Page transition variants for native-like feel
 * - Fade with subtle slide for smooth navigation
 * - Optimized for mobile performance
 */
const pageVariants = {
  initial: {
    opacity: 0,
    y: 8,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1], // iOS-like easing
      when: 'beforeChildren',
    },
  },
  exit: {
    opacity: 0,
    y: -4,
    transition: {
      duration: 0.2,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

/**
 * Slide transition for more dramatic page changes
 */
const slideVariants = {
  initial: {
    opacity: 0,
    x: 20,
  },
  enter: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.35,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: {
      duration: 0.25,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

/**
 * PageTransition component wraps page content with smooth animations
 * Uses Framer Motion for GPU-accelerated transitions
 */
export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial="initial"
        animate="enter"
        exit="exit"
        variants={pageVariants}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

/**
 * SlideTransition for horizontal page transitions (like native navigation)
 */
export function SlideTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial="initial"
        animate="enter"
        exit="exit"
        variants={slideVariants}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

/**
 * FadeTransition for subtle page changes
 */
export function FadeTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          transition: { duration: 0.3, ease: 'easeOut' }
        }}
        exit={{ 
          opacity: 0,
          transition: { duration: 0.2, ease: 'easeIn' }
        }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

/**
 * Staggered children animation for lists and grids
 */
export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
}

export const staggerItem = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

export default PageTransition
