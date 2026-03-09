'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useSwipeBack } from '@/hooks/useSwipeBack'
import { useIsMobile } from '@/hooks/useIsMobile'

interface LayoutWrapperProps {
  children: ReactNode
}

/**
 * Simple fade-in animation for page content
 * Removed AnimatePresence to prevent flickering during navigation
 */
const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: 'easeOut' as const,
    },
  },
}

/**
 * LayoutWrapper provides mobile gestures and subtle entrance animation
 * - Simple fade-in on initial mount (no exit animation to prevent flicker)
 * - Enables swipe-from-edge-to-go-back gesture on mobile
 */
export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const isMobile = useIsMobile()

  // Enable swipe back gesture on mobile devices
  useSwipeBack({ enabled: isMobile })

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInVariants}
      className="flex-grow w-full max-w-full"
    >
      {children}
    </motion.div>
  )
}

export default LayoutWrapper
