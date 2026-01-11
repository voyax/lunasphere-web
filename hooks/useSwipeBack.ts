'use client'

import { useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { triggerHaptic } from './useHapticFeedback'

interface SwipeBackOptions {
  /** Minimum distance to trigger back navigation (in pixels) */
  threshold?: number
  /** Maximum distance from left edge to start swipe (in pixels) */
  edgeWidth?: number
  /** Enable/disable the gesture */
  enabled?: boolean
  /** Callback when back navigation is triggered */
  onBack?: () => void
}

/**
 * Hook to enable iOS-like swipe-from-edge-to-go-back gesture
 * 
 * @example
 * ```tsx
 * function MyPage() {
 *   useSwipeBack({ enabled: true })
 *   return <div>Page content</div>
 * }
 * ```
 */
export function useSwipeBack(options: SwipeBackOptions = {}) {
  const {
    threshold = 100,
    edgeWidth = 30,
    enabled = true,
    onBack,
  } = options

  const router = useRouter()
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)
  const isSwipeFromEdge = useRef(false)
  const indicatorRef = useRef<HTMLDivElement | null>(null)

  // Create visual indicator element
  const createIndicator = useCallback(() => {
    if (typeof document === 'undefined') return null
    
    const indicator = document.createElement('div')
    indicator.id = 'swipe-back-indicator'
    indicator.style.cssText = `
      position: fixed;
      left: 0;
      top: 50%;
      transform: translateY(-50%) translateX(-100%);
      width: 24px;
      height: 60px;
      background: linear-gradient(90deg, rgba(251, 146, 60, 0.3), transparent);
      border-radius: 0 30px 30px 0;
      pointer-events: none;
      z-index: 9999;
      transition: transform 0.1s ease-out, opacity 0.1s ease-out;
      opacity: 0;
    `
    document.body.appendChild(indicator)
    return indicator
  }, [])

  // Update indicator position
  const updateIndicator = useCallback((progress: number) => {
    if (!indicatorRef.current) return
    
    const translateX = Math.min(progress * 1.5, 100) - 100
    indicatorRef.current.style.transform = `translateY(-50%) translateX(${translateX}%)`
    indicatorRef.current.style.opacity = String(Math.min(progress / 50, 1))
  }, [])

  // Reset indicator
  const resetIndicator = useCallback(() => {
    if (!indicatorRef.current) return
    indicatorRef.current.style.transform = 'translateY(-50%) translateX(-100%)'
    indicatorRef.current.style.opacity = '0'
  }, [])

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return

    // Create indicator on mount
    indicatorRef.current = createIndicator()

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0]
      touchStartX.current = touch.clientX
      touchStartY.current = touch.clientY
      
      // Check if touch started from left edge
      isSwipeFromEdge.current = touch.clientX <= edgeWidth
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isSwipeFromEdge.current || touchStartX.current === null || touchStartY.current === null) {
        return
      }

      const touch = e.touches[0]
      const deltaX = touch.clientX - touchStartX.current
      const deltaY = Math.abs(touch.clientY - touchStartY.current)

      // Only continue if horizontal swipe (not scrolling vertically)
      if (deltaY > Math.abs(deltaX) * 0.5) {
        isSwipeFromEdge.current = false
        resetIndicator()
        return
      }

      // Only track right swipes
      if (deltaX > 0) {
        updateIndicator(deltaX)
        
        // Add haptic feedback at threshold
        if (deltaX >= threshold && deltaX < threshold + 10) {
          triggerHaptic('medium')
        }
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (!isSwipeFromEdge.current || touchStartX.current === null) {
        resetIndicator()
        return
      }

      const touch = e.changedTouches[0]
      const deltaX = touch.clientX - touchStartX.current

      if (deltaX >= threshold) {
        // Trigger back navigation
        triggerHaptic('success')
        
        if (onBack) {
          onBack()
        } else {
          router.back()
        }
      }

      // Reset state
      touchStartX.current = null
      touchStartY.current = null
      isSwipeFromEdge.current = false
      resetIndicator()
    }

    // Add event listeners with passive option for better scroll performance
    document.addEventListener('touchstart', handleTouchStart, { passive: true })
    document.addEventListener('touchmove', handleTouchMove, { passive: true })
    document.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
      
      // Remove indicator on unmount
      if (indicatorRef.current) {
        indicatorRef.current.remove()
      }
    }
  }, [enabled, threshold, edgeWidth, onBack, router, createIndicator, updateIndicator, resetIndicator])
}
