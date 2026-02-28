'use client'

import React from 'react'
import { RotateCcw, RotateCw } from 'lucide-react'

import GradientSlider from './GradientSlider'

interface RotationControlProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  buttonStep?: number
  className?: string
  trackClassName?: string
  thumbClassName?: string
  leftButtonClassName?: string
  rightButtonClassName?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const RotationControl: React.FC<RotationControlProps> = ({
  value,
  onChange,
  min = -180,
  max = 180,
  step = 1,
  buttonStep = 90,
  className = '',
  leftButtonClassName,
  rightButtonClassName,
  leftIcon,
  rightIcon,
}) => {
  // Rotate left (decrease)
  const handleRotateLeft = () => {
    let newValue = value - buttonStep
    if (newValue < min) newValue = min
    onChange(newValue)
  }

  // Rotate right (increase)
  const handleRotateRight = () => {
    let newValue = value + buttonStep
    if (newValue > max) newValue = max
    onChange(newValue)
  }

  return (
    <div className={`flex items-start justify-between gap-3 ${className}`}>
      <button
        type="button"
        onClick={handleRotateLeft}
        className={
          leftButtonClassName ||
          'p-2 rounded-xl hover:bg-orange-50 dark:hover:bg-gray-700 text-gray-500 hover:text-orange-500 transition-colors flex-shrink-0 -mt-[3px]'
        }
        aria-label='Rotate Left'
      >
        {leftIcon || <RotateCcw className='w-5 h-5' />}
      </button>

      <div className='flex-1'>
        <GradientSlider
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          step={step}
          showLabels={true}
          leftLabel={`${min}°`}
          rightLabel={`${max}°`}
          centerLabel={`${value}°`}
        />
      </div>

      <button
        type="button"
        onClick={handleRotateRight}
        className={
          rightButtonClassName ||
          'p-2 rounded-xl hover:bg-orange-50 dark:hover:bg-gray-700 text-gray-500 hover:text-orange-500 transition-colors flex-shrink-0 -mt-[3px]'
        }
        aria-label='Rotate Right'
      >
        {rightIcon || <RotateCw className='w-5 h-5' />}
      </button>
    </div>
  )
}

export default RotationControl
