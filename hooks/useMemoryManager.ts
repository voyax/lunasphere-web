'use client'

import { useRef, useCallback, useEffect } from 'react'

/**
 * Hook for unified memory management
 * Manages requestAnimationFrame and timeout cleanup
 */
export const useMemoryManager = () => {
  const timeoutsRef = useRef<Set<NodeJS.Timeout>>(new Set())
  const animationFramesRef = useRef<Set<number>>(new Set())
  const intervalsRef = useRef<Set<NodeJS.Timeout>>(new Set())

  // Timeout management
  const createTimeout = useCallback(
    (callback: () => void, delay: number): NodeJS.Timeout => {
      const timeoutId = setTimeout(() => {
        callback()
        timeoutsRef.current.delete(timeoutId)
      }, delay)

      timeoutsRef.current.add(timeoutId)

      return timeoutId
    },
    []
  )

  const clearManagedTimeout = useCallback((timeoutId: NodeJS.Timeout) => {
    clearTimeout(timeoutId)
    timeoutsRef.current.delete(timeoutId)
  }, [])

  // Animation frame management
  const createAnimationFrame = useCallback((callback: () => void): number => {
    const frameId = requestAnimationFrame(() => {
      callback()
      animationFramesRef.current.delete(frameId)
    })

    animationFramesRef.current.add(frameId)

    return frameId
  }, [])

  const clearManagedAnimationFrame = useCallback((frameId: number) => {
    cancelAnimationFrame(frameId)
    animationFramesRef.current.delete(frameId)
  }, [])

  // Interval management
  const createInterval = useCallback(
    (callback: () => void, delay: number): NodeJS.Timeout => {
      const intervalId = setInterval(callback, delay)

      intervalsRef.current.add(intervalId)

      return intervalId
    },
    []
  )

  const clearManagedInterval = useCallback((intervalId: NodeJS.Timeout) => {
    clearInterval(intervalId)
    intervalsRef.current.delete(intervalId)
  }, [])

  // Cleanup all managed resources
  const cleanupAll = useCallback(() => {
    // Clear all timeouts
    timeoutsRef.current.forEach(timeoutId => {
      clearTimeout(timeoutId)
    })
    timeoutsRef.current.clear()

    // Clear all animation frames
    animationFramesRef.current.forEach(frameId => {
      cancelAnimationFrame(frameId)
    })
    animationFramesRef.current.clear()

    // Clear all intervals
    intervalsRef.current.forEach(intervalId => {
      clearInterval(intervalId)
    })
    intervalsRef.current.clear()
  }, [])

  // Auto cleanup on unmount
  useEffect(() => {
    return cleanupAll
  }, [cleanupAll])

  return {
    createTimeout,
    clearManagedTimeout,
    createAnimationFrame,
    clearManagedAnimationFrame,
    createInterval,
    clearManagedInterval,
    cleanupAll,
    // Getters for debugging
    get activeTimeouts() {
      return timeoutsRef.current.size
    },
    get activeAnimationFrames() {
      return animationFramesRef.current.size
    },
    get activeIntervals() {
      return intervalsRef.current.size
    },
  }
}
