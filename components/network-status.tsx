'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wifi, WifiOff, X } from 'lucide-react'

/**
 * Network status indicator with native-like toast notifications
 * Shows online/offline status changes with smooth animations
 */
export function NetworkStatus() {
  const [isOnline, setIsOnline] = useState(true)
  const [showToast, setShowToast] = useState(false)
  const [justCameOnline, setJustCameOnline] = useState(false)

  useEffect(() => {
    // Check initial state
    setIsOnline(navigator.onLine)

    const handleOnline = () => {
      setIsOnline(true)
      setJustCameOnline(true)
      setShowToast(true)
      // Auto-hide after 3 seconds
      setTimeout(() => setShowToast(false), 3000)
    }

    const handleOffline = () => {
      setIsOnline(false)
      setJustCameOnline(false)
      setShowToast(true)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const dismissToast = () => setShowToast(false)

  return (
    <AnimatePresence>
      {showToast && (
        <motion.div
          initial={{ opacity: 0, y: -100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ 
            type: 'spring', 
            stiffness: 400, 
            damping: 25 
          }}
          className={`
            fixed top-4 left-4 right-4 z-[9999]
            mx-auto max-w-sm
            flex items-center gap-3
            px-4 py-3
            rounded-2xl
            shadow-lg
            backdrop-blur-xl
            ${isOnline 
              ? 'bg-green-500/90 text-white' 
              : 'bg-gray-800/95 text-white'
            }
          `}
          style={{
            paddingTop: 'max(0.75rem, env(safe-area-inset-top))',
          }}
        >
          {/* Icon */}
          <div className={`
            flex items-center justify-center
            w-8 h-8 rounded-full
            ${isOnline ? 'bg-white/20' : 'bg-red-500/30'}
          `}>
            {isOnline ? (
              <Wifi className="w-4 h-4" />
            ) : (
              <WifiOff className="w-4 h-4" />
            )}
          </div>

          {/* Message */}
          <div className="flex-1">
            <p className="text-sm font-medium">
              {isOnline ? 'Back Online' : 'You\'re Offline'}
            </p>
            <p className="text-xs opacity-80">
              {isOnline 
                ? 'Connection restored' 
                : 'Some features may be limited'
              }
            </p>
          </div>

          {/* Dismiss button */}
          <button
            onClick={dismissToast}
            className="
              flex items-center justify-center
              w-8 h-8 rounded-full
              hover:bg-white/20
              transition-colors
              touch-manipulation
            "
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/**
 * Offline banner that persists until connection is restored
 * Shows at the bottom of the screen above bottom navigation
 */
export function OfflineBanner() {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    setIsOnline(navigator.onLine)

    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  if (isOnline) return null

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="
        fixed bottom-16 md:bottom-0 left-0 right-0
        bg-gray-800 text-white
        py-2 px-4
        text-center text-sm
        z-40
      "
      style={{
        paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))',
      }}
    >
      <div className="flex items-center justify-center gap-2">
        <WifiOff className="w-4 h-4" />
        <span>No internet connection</span>
      </div>
    </motion.div>
  )
}

export default NetworkStatus
