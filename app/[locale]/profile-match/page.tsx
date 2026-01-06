'use client'

import ProfileViewComparison from './components/ProfileViewComparison'

import { useTranslations } from 'next-intl'
import { Heart } from 'lucide-react'

export default function ProfileMatchPage() {
  const t = useTranslations()

  return (
    <div className='min-h-screen pb-24 selection:bg-orange-100 dark:selection:bg-orange-900/30 relative bg-[#fffaf5] dark:bg-gray-950'>
      {/* Noise texture overlay */}
      <div className='noise-overlay' />

      {/* Decorative floating elements */}
      <div className='absolute top-1/4 right-1/4 opacity-10 dark:opacity-5 animate-float-soft pointer-events-none'>
        <Heart className='w-12 h-12 text-orange-400' />
      </div>

      <div className='relative z-10'>
        {/* Hero Section */}
        <section className='text-center px-6 pt-32 mb-12 relative animate-fade-in'>
          {/* Title */}
          <h1 className='text-4xl md:text-6xl font-bold text-gray-800 dark:text-gray-100 tracking-tighter leading-[0.9] mb-6'>
            {t('nav.profileMatch')}
          </h1>

          {/* Subtitle */}
          <p className='max-w-lg mx-auto text-gray-400 dark:text-gray-500 text-sm md:text-base leading-relaxed font-medium mb-6'>
            {t('detection.profileView.pageDescription')}
          </p>

          {/* Decorative line */}
          <div className='w-12 h-1.5 bg-orange-200 dark:bg-orange-700 mx-auto rounded-full' />
        </section>

        {/* Main Content */}
        <div className='max-w-6xl mx-auto px-4 sm:px-6'>
          <ProfileViewComparison />
        </div>
      </div>
    </div>
  )
}
