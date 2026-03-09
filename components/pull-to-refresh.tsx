'use client'

import { useState, useRef, useCallback, ReactNode } from 'react'
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'
import { RefreshCw } from 'lucide-react'
import { triggerHaptic } from '@/hooks/useHapticFeedback'

interface PullToRefreshProps {
  children: ReactNode
  onRefresh: () => Promise<void>
  /** Minimum pull distance to trigger refresh (default: 80) */
  threshold?: number
  /** Maximum pull distance (default: 120) */
  maxPull?: number
  /** Enable/disable the feature */
  enabled?: boolean
}

/**
 * Pull-to-refresh component with native-like feel
 * 
 * @example
 * ```tsx
 * <PullToRefresh onRefresh={async () => await fetchData()}>
 *   <YourContent />
 * </PullToRefresh>
 * ```
 */
export function PullToRefresh({
  children,
  onRefresh,
  threshold = 80,
  maxPull = 120,
  enabled = true,
}: PullToRefreshProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isPulling, setIsPulling] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const startY = useRef(0)
  const currentY = useRef(0)
  const pullDistance = useMotionValue(0)
  
  // Transform pull distance to indicator rotation
  const rotation = useTransform(pullDistance, [0, threshold], [0, 360])
  const opacity = useTransform(pullDistance, [0, threshold * 0.5, threshold], [0, 0.5, 1])
  const scale = useTransform(pullDistance, [0, threshold], [0.5, 1])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!enabled || isRefreshing) return
    
    // Only start if at top of scroll
    const container = containerRef.current
    if (container && container.scrollTop > 0) return
    
    startY.current = e.touches[0].clientY
    setIsPulling(true)
  }, [enabled, isRefreshing])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isPulling || isRefreshing) return
    
    const container = containerRef.current
    if (container && container.scrollTop > 0) {
      setIsPulling(false)
      pullDistance.set(0)
      return
    }
    
    currentY.current = e.touches[0].clientY
    const diff = currentY.current - startY.current
    
    if (diff > 0) {
      // Apply resistance - pull gets harder as you go
      const resistance = 0.5
      const resistedPull = Math.min(diff * resistance, maxPull)
      pullDistance.set(resistedPull)
      
      // Haptic feedback when reaching threshold
      if (resistedPull >= threshold && (pullDistance.getPrevious() ?? 0) < threshold) {
        triggerHaptic('medium')
      }
    }
  }, [isPulling, isRefreshing, maxPull, threshold, pullDistance])

  const handleTouchEnd = useCallback(async () => {
    if (!isPulling) return
    setIsPulling(false)
    
    const currentPull = pullDistance.get()
    
    if (currentPull >= threshold && !isRefreshing) {
      setIsRefreshing(true)
      triggerHaptic('success')
      
      try {
        await onRefresh()
      } finally {
        setIsRefreshing(false)
        pullDistance.set(0)
      }
    } else {
      // Animate back to 0
      pullDistance.set(0)
    }
  }, [isPulling, threshold, isRefreshing, onRefresh, pullDistance])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-auto"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Pull indicator */}
      <AnimatePresence>
        {(isPulling || isRefreshing) && (
          <motion.div
            className="absolute top-0 left-0 right-0 flex justify-center items-center pointer-events-none z-50"
            style={{ 
              height: pullDistance,
              opacity,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-lg"
              style={{ scale }}
            >
              <motion.div
                style={{ rotate: isRefreshing ? undefined : rotation }}
                animate={isRefreshing ? { rotate: 360 } : undefined}
                transition={isRefreshing ? { 
                  duration: 1, 
                  repeat: Infinity, 
                  ease: 'linear' 
                } : undefined}
              >
                <RefreshCw 
                  className={`w-5 h-5 ${
                    isRefreshing 
                      ? 'text-orange-500' 
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content with pull offset */}
      <motion.div
        style={{ 
          y: isPulling || isRefreshing ? pullDistance : 0,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export default PullToRefresh
