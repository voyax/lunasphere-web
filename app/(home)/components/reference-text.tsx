'use client'

import { useState, useRef, useEffect } from 'react'

import { type ReferenceData } from './reference-data'
import { useLocale } from '@/contexts/LocaleContext'
import { type Locale } from '@/lib/i18n'

interface ReferenceTextProps {
  children: React.ReactNode
  reference: ReferenceData | undefined
  className?: string
  locale?: Locale // Add locale prop
}

export function ReferenceText({
  children,
  reference,
  className = '',
  locale: propLocale,
}: ReferenceTextProps) {
  const [showTooltip, setShowTooltip] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout>()
  const { locale: contextLocale, t } = useLocale()

  // Use prop locale if provided, otherwise use context locale
  const currentLocale = propLocale || contextLocale

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  // If reference is undefined, just render the children without interactive functionality
  if (!reference) {
    return <span className={className}>{children}</span>
  }

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setShowTooltip(true)
  }

  const handleMouseLeave = () => {
    // Delay hiding to allow moving to tooltip
    timeoutRef.current = setTimeout(() => {
      setShowTooltip(false)
    }, 200)
  }

  const handleTooltipMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setShowTooltip(true)
  }

  const handleTooltipMouseLeave = () => {
    setShowTooltip(false)
  }

  return (
    <span
      className={`relative inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className='relative group cursor-help'>
        <span className='border-b border-dotted border-blue-500 hover:border-blue-700 transition-colors text-blue-700 dark:text-blue-300 hover:text-blue-900 dark:hover:text-blue-100'>
          {children}
        </span>
        <sup className='ml-0.5 text-xs text-blue-600 dark:text-blue-400 font-medium'>
          <svg
            className='w-3 h-3 inline'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
            />
          </svg>
        </sup>
      </span>

      {showTooltip && (
        <div
          className='absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 max-w-sm z-50 animate-in fade-in-0 zoom-in-95 duration-200'
          onMouseEnter={handleTooltipMouseEnter}
          onMouseLeave={handleTooltipMouseLeave}
        >
          <div className='bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4'>
            <div className='flex flex-col gap-3'>
              <div className='flex items-center gap-2'>
                <span className='text-sm font-semibold text-gray-900 dark:text-gray-100'>
                  {reference.source[currentLocale as Locale]}
                </span>
              </div>

              <div className='flex flex-col gap-1'>
                <span className='text-xs text-gray-500 dark:text-gray-400 font-medium'>
                  {t('reference.source-link')}
                </span>
                <a
                  className='text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors break-all leading-relaxed flex items-center gap-1 hover:underline p-1 -ml-1 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20'
                  href={reference.url}
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  {reference.url}
                  <svg
                    className='w-3 h-3 flex-shrink-0'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Tooltip arrow */}
            <div className='absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-white dark:border-t-gray-800' />
          </div>
        </div>
      )}
    </span>
  )
}
