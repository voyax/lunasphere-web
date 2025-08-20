'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

/**
 * Optimized hook to detect mobile devices
 * Uses matchMedia API and debouncing for better performance
 */
export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const mediaQueryRef = useRef<MediaQueryList | null>(null)

  // Debounced mobile detection function
  const debouncedCheckIsMobile = useCallback(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current)
    }

    debounceTimeoutRef.current = setTimeout(() => {
      const userAgent = navigator.userAgent
      const mobileRegex =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
      const isTouchDevice =
        'ontouchstart' in window || navigator.maxTouchPoints > 0

      // Use cached media query result
      const isSmallScreen =
        mediaQueryRef.current?.matches ?? window.innerWidth <= 768

      setIsMobile(
        mobileRegex.test(userAgent) || (isTouchDevice && isSmallScreen)
      )
    }, 150) // 150ms debounce delay
  }, [])

  useEffect(() => {
    // Initialize media query for screen size detection
    if (typeof window !== 'undefined') {
      mediaQueryRef.current = window.matchMedia('(max-width: 768px)')

      // Initial check
      debouncedCheckIsMobile()

      // Listen to media query changes (more efficient than resize)
      const handleMediaQueryChange = () => {
        debouncedCheckIsMobile()
      }

      // Add event listener for media query changes
      if (mediaQueryRef.current.addEventListener) {
        mediaQueryRef.current.addEventListener('change', handleMediaQueryChange)
      } else {
        // Fallback for older browsers
        mediaQueryRef.current.addListener(handleMediaQueryChange)
      }

      // Fallback resize listener for user agent changes (rare)
      window.addEventListener('resize', debouncedCheckIsMobile, {
        passive: true,
      })

      // Cleanup function
      return () => {
        if (debounceTimeoutRef.current) {
          clearTimeout(debounceTimeoutRef.current)
        }

        if (mediaQueryRef.current) {
          if (mediaQueryRef.current.removeEventListener) {
            mediaQueryRef.current.removeEventListener(
              'change',
              handleMediaQueryChange
            )
          } else {
            // Fallback for older browsers
            mediaQueryRef.current.removeListener(handleMediaQueryChange)
          }
        }

        window.removeEventListener('resize', debouncedCheckIsMobile)
      }
    }
  }, [debouncedCheckIsMobile])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current)
      }
    }
  }, [])

  return isMobile
}
