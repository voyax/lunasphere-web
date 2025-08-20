'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RotateCw, ZoomIn, Move } from 'lucide-react'

interface GestureVisualFeedbackProps {
  isVisible: boolean
  gestureType: 'scale' | 'rotate' | 'move' | null
  centerPoint?: { x: number; y: number }
  scaleValue?: number
  rotationValue?: number
  stageSize: { width: number; height: number }
}

/**
 * Visual feedback component for gesture interactions
 * Shows animated indicators for scale, rotation, and movement gestures
 */
export const GestureVisualFeedback: React.FC<GestureVisualFeedbackProps> = ({
  isVisible,
  gestureType,
  centerPoint,
  scaleValue = 1,
  rotationValue = 0,
  stageSize,
}) => {
  if (!isVisible || !gestureType || !centerPoint) {
    return null
  }

  // Calculate position relative to stage
  const x = Math.max(50, Math.min(stageSize.width - 50, centerPoint.x))
  const y = Math.max(50, Math.min(stageSize.height - 50, centerPoint.y))

  return (
    <div className='absolute inset-0 pointer-events-none z-20'>
      <AnimatePresence>
        {gestureType === 'scale' && (
          <motion.div
            key='scale-indicator'
            animate={{ opacity: 1, scale: 1 }}
            className='absolute'
            exit={{ opacity: 0, scale: 0.5 }}
            initial={{ opacity: 0, scale: 0.5 }}
            style={{
              left: x - 30,
              top: y - 30,
            }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {/* Scale circle indicator */}
            <div className='relative w-16 h-16'>
              {/* Outer ring */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.8, 0.4, 0.8],
                }}
                className='absolute inset-0 border-2 border-blue-500 rounded-full bg-blue-500/10 backdrop-blur-sm'
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Inner circle with scale value */}
              <div className='absolute inset-2 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center shadow-lg border border-blue-200 dark:border-blue-700'>
                <ZoomIn className='w-4 h-4 text-blue-600 dark:text-blue-400' />
              </div>

              {/* Scale percentage display */}
              <div className='absolute -bottom-8 left-1/2 transform -translate-x-1/2'>
                <div className='bg-black/80 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap'>
                  {Math.round(scaleValue * 100)}%
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {gestureType === 'rotate' && (
          <motion.div
            key='rotate-indicator'
            animate={{ opacity: 1, scale: 1 }}
            className='absolute'
            exit={{ opacity: 0, scale: 0.5 }}
            initial={{ opacity: 0, scale: 0.5 }}
            style={{
              left: x - 30,
              top: y - 30,
            }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {/* Rotation indicator */}
            <div className='relative w-16 h-16'>
              {/* Rotation arc */}
              <motion.div
                animate={{ rotate: rotationValue }}
                className='absolute inset-0'
                transition={{ duration: 0.1, ease: 'linear' }}
              >
                <svg className='w-full h-full' viewBox='0 0 64 64'>
                  <circle
                    className='opacity-60'
                    cx='32'
                    cy='32'
                    fill='none'
                    r='28'
                    stroke='rgb(34, 197, 94)'
                    strokeDasharray='20 10'
                    strokeWidth='2'
                  />
                  {/* Rotation direction indicator */}
                  <path
                    className='opacity-80'
                    d='M 32 4 L 28 12 L 36 12 Z'
                    fill='rgb(34, 197, 94)'
                  />
                </svg>
              </motion.div>

              {/* Center icon */}
              <div className='absolute inset-2 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center shadow-lg border border-green-200 dark:border-green-700'>
                <RotateCw className='w-4 h-4 text-green-600 dark:text-green-400' />
              </div>

              {/* Rotation degree display */}
              <div className='absolute -bottom-8 left-1/2 transform -translate-x-1/2'>
                <div className='bg-black/80 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap'>
                  {Math.round(rotationValue)}°
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {gestureType === 'move' && (
          <motion.div
            key='move-indicator'
            animate={{ opacity: 1, scale: 1 }}
            className='absolute'
            exit={{ opacity: 0, scale: 0.5 }}
            initial={{ opacity: 0, scale: 0.5 }}
            style={{
              left: x - 20,
              top: y - 20,
            }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {/* Move indicator */}
            <div className='relative w-10 h-10'>
              {/* Pulsing background */}
              <motion.div
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.6, 0.2, 0.6],
                }}
                className='absolute inset-0 bg-purple-500/20 rounded-full'
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Center icon */}
              <div className='absolute inset-1 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center shadow-lg border border-purple-200 dark:border-purple-700'>
                <Move className='w-3 h-3 text-purple-600 dark:text-purple-400' />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

GestureVisualFeedback.displayName = 'GestureVisualFeedback'
