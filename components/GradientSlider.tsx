'use client'

import React from 'react'

interface GradientSliderProps {
    value: number
    onChange: (value: number) => void
    min: number
    max: number
    step?: number
    className?: string
    trackGradient?: string
    thumbColorFrom?: string
    thumbColorTo?: string
    showLabels?: boolean
    leftLabel?: string
    rightLabel?: string
    centerLabel?: string
}

const GradientSlider: React.FC<GradientSliderProps> = ({
    value,
    onChange,
    min,
    max,
    step = 1,
    className = '',
    // Default warmth/orange gradient matching the rotation control
    trackGradient = 'from-orange-100 via-orange-200 to-orange-100 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700',
    showLabels = false,
    leftLabel,
    rightLabel,
    centerLabel,
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(parseInt(e.target.value))
    }

    return (
        <div className={`relative ${className}`}>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={handleChange}
                className={`
          w-full h-2 rounded-full appearance-none cursor-pointer outline-none
          bg-gradient-to-r ${trackGradient}
          [&::-webkit-slider-thumb]:appearance-none 
          [&::-webkit-slider-thumb]:w-5 
          [&::-webkit-slider-thumb]:h-5 
          [&::-webkit-slider-thumb]:rounded-full 
          [&::-webkit-slider-thumb]:bg-gradient-to-br 
          [&::-webkit-slider-thumb]:from-orange-400 
          [&::-webkit-slider-thumb]:to-rose-400 
          [&::-webkit-slider-thumb]:shadow-lg 
          [&::-webkit-slider-thumb]:cursor-grab 
          [&::-webkit-slider-thumb]:active:cursor-grabbing 
          [&::-webkit-slider-thumb]:transition-transform 
          [&::-webkit-slider-thumb]:hover:scale-110
          dark:[&::-webkit-slider-thumb]:from-orange-500 
          dark:[&::-webkit-slider-thumb]:to-rose-500
        `}
            />
            {showLabels && (
                <div className='flex justify-between items-center mt-2 px-1'>
                    <span className='text-[9px] text-gray-300 dark:text-gray-600'>{leftLabel ?? min}</span>
                    {centerLabel && (
                        <span className='text-xs text-orange-500 font-bold font-mono'>{centerLabel}</span>
                    )}
                    <span className='text-[9px] text-gray-300 dark:text-gray-600'>{rightLabel ?? max}</span>
                </div>
            )}
        </div>
    )
}

export default GradientSlider
