'use client'

import { useState, useEffect } from 'react'
import { Button } from '@heroui/button'
import { RotateCcw, RotateCw } from 'lucide-react'

// Interface for RotationControl component props
interface RotationControlProps {
  rotation: number
  onChange: (rotation: number) => void
  className?: string
}

/**
 * RotationControl Component
 *
 * A reusable component for controlling image rotation with multiple interaction methods:
 * - Click buttons for 15-degree increments
 * - Direct input for precise values
 * - Drag the circular control for smooth rotation
 * - Keyboard navigation with arrow keys
 *
 * @param rotation - Current rotation value in degrees (0-359)
 * @param onChange - Callback function when rotation changes
 * @param className - Additional CSS classes
 */
const RotationControl: React.FC<RotationControlProps> = ({
  rotation,
  onChange,
  className = '',
}) => {
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, rotation: 0 })

  // Handle mouse down event for drag interaction
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX, y: e.clientY, rotation })
  }

  // Handle mouse move during drag
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return

    const deltaX = e.clientX - dragStart.x
    const newRotation = (dragStart.rotation + deltaX) % 360

    onChange(newRotation < 0 ? newRotation + 360 : newRotation)
  }

  // Handle mouse up to end drag
  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Setup and cleanup mouse event listeners for drag functionality
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)

      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, dragStart])

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      onChange((rotation - 15) % 360)
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      onChange((rotation + 15) % 360)
    }
  }

  // Handle direct input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0
    const normalizedValue = Math.max(0, Math.min(359, value))

    onChange(normalizedValue)
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Rotate counter-clockwise button */}
      <Button
        isIconOnly
        aria-label='Rotate counter-clockwise 15 degrees'
        className='w-8 h-8 min-w-8'
        size='sm'
        variant='light'
        onClick={() => onChange((rotation - 15 + 360) % 360)}
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

      {/* Circular drag control */}
      <div
        aria-label='Rotation control'
        aria-valuemax={359}
        aria-valuemin={0}
        aria-valuenow={Math.round(rotation)}
        className='w-6 h-6 border-2 border-gray-300 dark:border-gray-600 rounded-full cursor-grab active:cursor-grabbing relative'
        role='slider'
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onMouseDown={handleMouseDown}
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
        onClick={() => onChange((rotation + 15) % 360)}
      >
        <RotateCw className='w-3 h-3' />
      </Button>
    </div>
  )
}

export default RotationControl
export type { RotationControlProps }
