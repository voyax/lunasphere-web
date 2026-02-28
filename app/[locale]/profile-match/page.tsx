'use client'

import ProfileViewComparison from './components/ProfileViewComparison'

import { useTranslations } from 'next-intl'

export default function ProfileMatchPage() {
  const t = useTranslations()

  return (
    <div className='min-h-screen pb-24 selection:bg-orange-100 dark:selection:bg-orange-900/30 relative bg-[#fffaf5] dark:bg-gray-950'>
      {/* Noise texture overlay */}
      <div className='noise-overlay' />


      <div className='relative z-10'>
        {/* Hero Section */}
        <section className='text-center px-6 pt-32 mb-10 relative animate-fade-in'>
          {/* Title */}
          <h1 className='text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 tracking-tight mb-6'>
            {t('nav.profileMatch')}
          </h1>

          {/* Subtitle */}
          <p className='max-w-2xl mx-auto text-gray-500 dark:text-gray-400 text-base md:text-lg leading-relaxed'>
            {t('detection.profileView.pageDescription')}
          </p>

        </section>

        {/* Main Content */}
        <div className='max-w-6xl mx-auto px-4 sm:px-6'>
          <ProfileViewComparison />
        </div>
      </div>
    </div>
  )
}
