'use client'

import { useState, useEffect } from 'react'
import { Button } from '@heroui/button'
import { Slider } from '@heroui/slider'
import { Input } from '@heroui/input'
import { RotateCcw, RotateCw, RotateCw as RotateIcon } from 'lucide-react'

// Interface for RotationControl component props
interface RotationControlProps {
  rotation: number
  onChange: (rotation: number) => void
  className?: string
  showSlider?: boolean // New prop to control slider visibility
  isMobile?: boolean // New prop for mobile-specific styling
  t?: (key: string) => string // Translation function
}

/**
 * RotationControl Component
 *
 * A reusable component for controlling image rotation with multiple interaction methods:
 * - Click buttons for 15-degree increments
 * - Direct input for precise values
 * - Slider for smooth rotation (mobile-friendly)
 * - Drag the circular control for smooth rotation (desktop)
 * - Keyboard navigation with arrow keys
 *
 * @param rotation - Current rotation value in degrees (0-359)
 * @param onChange - Callback function when rotation changes
 * @param className - Additional CSS classes
 * @param showSlider - Whether to show slider control (default: false)
 * @param isMobile - Whether to use mobile-optimized styling
 */
const RotationControl: React.FC<RotationControlProps> = ({
  rotation,
  onChange,
  className = '',
  showSlider = false,
  isMobile = false,
  t = (key: string) => key, // Default fallback function
}) => {
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, rotation: 0 })

  // Normalize rotation to 0-359 range
  const normalizeRotation = (value: number): number => {
    const normalized = value % 360

    return normalized < 0 ? normalized + 360 : normalized
  }

  // Handle mouse down event for drag interaction
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX, y: e.clientY, rotation })
  }

  // Handle touch start event for drag interaction
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true)
      const touch = e.touches[0]
      setDragStart({ x: touch.clientX, y: touch.clientY, rotation })
    }
  }

  // Handle mouse move during drag
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return

    const deltaX = e.clientX - dragStart.x
    const newRotation = normalizeRotation(dragStart.rotation + deltaX)
    onChange(newRotation)
  }

  // Handle touch move during drag
  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return

    e.preventDefault()
    const touch = e.touches[0]
    const deltaX = touch.clientX - dragStart.x
    const newRotation = normalizeRotation(dragStart.rotation + deltaX)
    onChange(newRotation)
  }

  // Handle mouse up to end drag
  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Handle touch end to end drag
  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  // Setup and cleanup mouse and touch event listeners for drag functionality
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.addEventListener('touchmove', handleTouchMove, {
        passive: false,
      })
      document.addEventListener('touchend', handleTouchEnd)

      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
        document.removeEventListener('touchmove', handleTouchMove)
        document.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [isDragging, dragStart])

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      onChange(normalizeRotation(rotation - 15))
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      onChange(normalizeRotation(rotation + 15))
    }
  }

  // Handle direct input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0
    const normalizedValue = Math.max(0, Math.min(359, Math.abs(value)))
    onChange(normalizedValue)
  }

  // Handle slider change
  const handleSliderChange = (value: number | number[]) => {
    const rotationValue = Array.isArray(value) ? value[0] : value
    onChange(normalizeRotation(rotationValue))
  }

  // Render slider-based control for mobile-friendly interaction
  if (showSlider) {
    return (
      <div className={`space-y-3 ${className}`}>
        {/* Rotation label with icon */}
        <div className='flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300'>
          <RotateIcon className='w-4 h-4' />
          <span>{t('detection.profileView.rotation')}</span>
        </div>

        {/* Slider and input controls */}
        <div className='flex items-center gap-2 sm:gap-3'>
          <Slider
            aria-label={t('detection.profileView.rotation')}
            className='flex-1'
            color='primary'
            maxValue={359}
            minValue={0}
            size={isMobile ? 'md' : 'sm'}
            step={1}
            value={Math.round(rotation)}
            onChange={handleSliderChange}
          />
          <Input
            className={isMobile ? 'w-16' : 'w-20'}
            endContent={<span className='text-xs text-gray-500'>°</span>}
            max={359}
            min={0}
            size='sm'
            step={1}
            type='number'
            value={Math.round(rotation).toString()}
            onChange={handleInputChange}
          />
        </div>
      </div>
    )
  }

  // Render compact control for desktop
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Rotate counter-clockwise button */}
      <Button
        isIconOnly
        aria-label='Rotate counter-clockwise 15 degrees'
        className='w-8 h-8 min-w-8'
        size='sm'
        variant='light'
        onClick={() => onChange(normalizeRotation(rotation - 15))}
      >
        <RotateCcw className='w-3 h-3' />
      </Button>

      {/* Direct input control */}
      <div className='flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-1'>
        <input
          aria-label='Rotation angle in degrees'
          className='w-12 text-xs text-center bg-transparent border-none outline-none'
          max='359'
          min='0'
          type='number'
          value={Math.round(rotation)}
          onChange={handleInputChange}
        />
        <span className='text-xs text-gray-500'>°</span>
      </div>

      {/* Circular drag control with touch support */}
      <div
        aria-label='Rotation control'
        aria-valuemax={359}
        aria-valuemin={0}
        aria-valuenow={Math.round(rotation)}
        className='w-6 h-6 border-2 border-gray-300 dark:border-gray-600 rounded-full cursor-grab active:cursor-grabbing relative touch-none'
        role='slider'
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Rotation indicator */}
        <div
          className='absolute w-1 h-3 bg-primary rounded-full'
          style={{
            top: '1px',
            left: '50%',
            transform: `translateX(-50%) rotate(${rotation}deg)`,
            transformOrigin: '50% 10px',
          }}
        />
      </div>

      {/* Rotate clockwise button */}
      <Button
        isIconOnly
        aria-label='Rotate clockwise 15 degrees'
        className='w-8 h-8 min-w-8'
        size='sm'
        variant='light'
        onClick={() => onChange(normalizeRotation(rotation + 15))}
      >
        <RotateCw className='w-3 h-3' />
      </Button>
    </div>
  )
}

export default RotationControl
export type { RotationControlProps }
