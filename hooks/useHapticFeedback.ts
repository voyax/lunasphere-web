'use client'

import { useCallback } from 'react'

/**
 * Haptic feedback types matching native mobile patterns
 * - light: subtle tap feedback (button press)
 * - medium: standard interaction feedback (toggle, selection)
 * - heavy: significant action feedback (delete, submit)
 * - success: positive outcome (task complete)
 * - warning: cautionary feedback
 * - error: failure feedback
 */
export type HapticFeedbackType = 
  | 'light' 
  | 'medium' 
  | 'heavy' 
  | 'success' 
  | 'warning' 
  | 'error'

// Vibration patterns in milliseconds
const HAPTIC_PATTERNS: Record<HapticFeedbackType, number | number[]> = {
  light: 10,
  medium: 20,
  heavy: 30,
  success: [10, 50, 20], // short-pause-short
  warning: [20, 30, 20, 30, 20], // triple pulse
  error: [50, 50, 50], // long-pause-long
}

/**
 * Check if haptic feedback is supported
 */
export function isHapticSupported(): boolean {
  if (typeof window === 'undefined') return false
  return 'vibrate' in navigator
}

/**
 * Trigger haptic feedback
 * @param type - The type of haptic feedback
 * @returns boolean - Whether the feedback was triggered successfully
 */
export function triggerHaptic(type: HapticFeedbackType = 'light'): boolean {
  if (!isHapticSupported()) return false
  
  try {
    const pattern = HAPTIC_PATTERNS[type]
    return navigator.vibrate(pattern)
  } catch {
    return false
  }
}

/**
 * Hook for haptic feedback with memoized callbacks
 * 
 * @example
 * ```tsx
 * const { haptic, hapticLight, hapticSuccess } = useHapticFeedback()
 * 
 * <button onClick={() => { hapticLight(); doSomething(); }}>
 *   Click me
 * </button>
 * ```
 */
export function useHapticFeedback() {
  const haptic = useCallback((type: HapticFeedbackType = 'light') => {
    return triggerHaptic(type)
  }, [])

  const hapticLight = useCallback(() => triggerHaptic('light'), [])
  const hapticMedium = useCallback(() => triggerHaptic('medium'), [])
  const hapticHeavy = useCallback(() => triggerHaptic('heavy'), [])
  const hapticSuccess = useCallback(() => triggerHaptic('success'), [])
  const hapticWarning = useCallback(() => triggerHaptic('warning'), [])
  const hapticError = useCallback(() => triggerHaptic('error'), [])

  return {
    haptic,
    hapticLight,
    hapticMedium,
    hapticHeavy,
    hapticSuccess,
    hapticWarning,
    hapticError,
    isSupported: isHapticSupported(),
  }
}

/**
 * Higher-order function to wrap an event handler with haptic feedback
 * 
 * @example
 * ```tsx
 * <button onClick={withHaptic(() => doSomething(), 'light')}>
 *   Click me
 * </button>
 * ```
 */
export function withHaptic<T extends (...args: unknown[]) => unknown>(
  handler: T,
  type: HapticFeedbackType = 'light'
): T {
  return ((...args: Parameters<T>) => {
    triggerHaptic(type)
    return handler(...args)
  }) as T
}

export default useHapticFeedback
