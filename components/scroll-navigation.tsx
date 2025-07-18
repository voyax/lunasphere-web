'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import { useLocale } from '@/contexts/LocaleContext'

interface NavSection {
  id: string
  labelKey: string
  icon: React.ReactNode
}

export function ScrollNavigation() {
  const { t } = useLocale()
  const [activeSection, setActiveSection] = useState('hero')
  const [isVisible, setIsVisible] = useState(false)

  const sections: NavSection[] = [
    {
      id: 'hero',
      labelKey: 'nav.home',
      icon: (
        <svg
          className='w-5 h-5'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m0 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10M9 21h6'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
          />
        </svg>
      ),
    },
    {
      id: 'development',
      labelKey: 'development.title',
      icon: (
        <svg
          className='w-5 h-5'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            d='M13 10V3L4 14h7v7l9-11h-7z'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
          />
        </svg>
      ),
    },
    {
      id: 'classification',
      labelKey: 'classification.title',
      icon: (
        <svg
          className='w-5 h-5'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
          />
        </svg>
      ),
    },
    {
      id: 'stages',
      labelKey: 'stages.title',
      icon: (
        <svg
          className='w-5 h-5'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
          />
        </svg>
      ),
    },
    {
      id: 'sleep-tips',
      labelKey: 'sleep.title',
      icon: (
        <svg
          className='w-5 h-5'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
          />
        </svg>
      ),
    },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight

      // Show navigation when scrolled more than 50% of first screen
      setIsVisible(scrollY > windowHeight * 0.5)

      // Detect current active section
      const currentSection = sections.find(section => {
        const element = document.getElementById(section.id)

        if (element) {
          const rect = element.getBoundingClientRect()

          return (
            rect.top <= windowHeight * 0.5 && rect.bottom >= windowHeight * 0.5
          )
        }

        return false
      })

      if (currentSection) {
        setActiveSection(currentSection.id)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          animate={{ opacity: 1, x: 0 }}
          className='fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block'
          exit={{ opacity: 0, x: 50 }}
          initial={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.3 }}
        >
          <div className='bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-full p-4 shadow-lg border border-gray-200 dark:border-gray-700'>
            <nav className='flex flex-col space-y-3'>
              {sections.map(section => (
                <motion.button
                  key={section.id}
                  className={`group relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                    activeSection === section.id
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                      : 'text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection(section.id)}
                >
                  {section.icon}

                  {/* Label tooltip */}
                  <div className='absolute right-full mr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'>
                    <div className='bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap'>
                      {t(section.labelKey)}
                      <div className='absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-r-0 border-t-4 border-b-4 border-l-gray-900 dark:border-l-gray-100 border-t-transparent border-b-transparent' />
                    </div>
                  </div>
                </motion.button>
              ))}
            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
