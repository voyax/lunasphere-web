import Image from 'next/image'

import { ReferenceText } from './reference-text'
import { references } from './reference-data'

import { getServerTranslation, getServerLocale } from '@/lib/i18n-server'
import { SectionAnimations } from '@/components/animations/section-animations'

export async function DevelopmentSection() {
  const t = await getServerTranslation()
  const currentLocale = await getServerLocale()

  const developmentPoints: Array<{
    title: string
    description: string | React.ReactNode
    icon: React.ReactNode
    color: string
  }> = [
    {
      title: t('development.structure'),
      description: t('development.structure.desc'),
      icon: (
        <svg
          className='w-6 h-6'
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
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: t('development.fontanelles'),
      description: (
        <>
          {t('development.fontanelles.posterior')}
          <ReferenceText
            locale={currentLocale}
            reference={references['aap-fontanelles']}
          >
            {t('development.fontanelles.around')}
          </ReferenceText>
          {t('development.fontanelles.anterior')}
          <ReferenceText
            locale={currentLocale}
            reference={references['who-fontanelles']}
          >
            {t('development.fontanelles.period')}
          </ReferenceText>
          {t('punctuation.period')}
        </>
      ),
      icon: (
        <svg
          className='w-6 h-6'
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
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: t('development.growth'),
      description: (
        <>
          <ReferenceText
            locale={currentLocale}
            reference={references['pediatrics-growth']}
          >
            {t('development.growth.period')}
          </ReferenceText>
          {t('development.growth.result')}
        </>
      ),
      icon: (
        <svg
          className='w-6 h-6'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
          />
        </svg>
      ),
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: t('development.plasticity'),
      description: (
        <>
          <ReferenceText
            locale={currentLocale}
            reference={references['medical-plasticity']}
          >
            {t('development.plasticity.reason')}
          </ReferenceText>
          {t('punctuation.period')}
        </>
      ),
      icon: (
        <svg
          className='w-6 h-6'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
          />
        </svg>
      ),
      color: 'from-orange-500 to-red-500',
    },
    {
      title: t('development.birth'),
      description: (
        <>
          <ReferenceText
            locale={currentLocale}
            reference={references['birth-recovery']}
          >
            {t('development.birth.condition')}
          </ReferenceText>
          {t('development.birth.recovery')}
          {t('punctuation.period')}
        </>
      ),
      icon: (
        <svg
          className='w-6 h-6'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
          />
        </svg>
      ),
      color: 'from-teal-500 to-blue-500',
    },
  ]

  return (
    <section
      className='min-h-screen flex items-center py-12 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-950/10 dark:via-gray-900 dark:to-purple-950/10 relative overflow-hidden'
      id='development'
    >
      {/* Background decorative elements */}
      <div className='absolute top-20 left-4 w-32 h-32 bg-blue-200/20 rounded-full blur-2xl animate-pulse' />
      <div
        className='absolute bottom-20 right-4 w-40 h-40 bg-purple-200/20 rounded-full blur-2xl animate-pulse'
        style={{ animationDelay: '1s' }}
      />
      <div
        className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-pink-200/20 rounded-full blur-xl animate-pulse'
        style={{ animationDelay: '0.5s' }}
      />

      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10'>
        {/* Header */}
        <SectionAnimations className='text-center mb-8'>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600'>
              {t('development.title')}
            </span>
          </h2>
          <p className='text-lg text-default-600 max-w-2xl mx-auto'>
            {t('development.subtitle')}
          </p>
        </SectionAnimations>

        {/* Main Content */}
        <div className='grid grid-cols-1 lg:grid-cols-5 gap-8 items-center'>
          {/* Left side - Enhanced Image */}
          <SectionAnimations className='lg:col-span-2' delay={0.2}>
            <div className='relative max-w-md mx-auto'>
              <div className='aspect-square bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-4 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105'>
                <div className='relative w-full h-full rounded-xl overflow-hidden bg-white/90 dark:bg-gray-800/90'>
                  <Image
                    fill
                    alt={t('development.title')}
                    className='object-contain p-2'
                    sizes='(max-width: 768px) 100vw, 40vw'
                    src='/images/head-development.gif'
                  />

                  {/* Interactive dots */}
                  <div className='absolute top-6 right-6 w-2 h-2 bg-blue-500 rounded-full animate-ping' />
                  <div
                    className='absolute bottom-6 left-6 w-2 h-2 bg-purple-500 rounded-full animate-ping'
                    style={{ animationDelay: '0.5s' }}
                  />
                </div>
              </div>

              {/* Floating badges */}
              <div className='absolute top-2 right-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs px-2 py-1 rounded-full shadow-lg animate-bounce'>
                {t('development.badge.scientific')}
              </div>
              <div
                className='absolute bottom-2 left-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full shadow-lg animate-bounce'
                style={{ animationDelay: '0.3s' }}
              >
                {t('development.badge.authoritative')}
              </div>
            </div>
          </SectionAnimations>

          {/* Right side - Enhanced Development Points */}
          <SectionAnimations className='lg:col-span-3' delay={0.4}>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4'>
              {developmentPoints.map((point, index) => (
                <div
                  key={index}
                  className='group flex items-start gap-3 p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl backdrop-blur-sm border border-default-200/50 dark:border-default-700/50 hover:bg-white/80 dark:hover:bg-gray-800/80 hover:border-blue-300/50 dark:hover:border-blue-600/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1'
                >
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-r ${point.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300`}
                  >
                    {point.icon}
                  </div>
                  <div className='flex-1 min-w-0'>
                    <h3 className='text-base font-semibold text-default-800 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'>
                      {point.title}
                    </h3>
                    <div className='text-sm text-default-600 leading-relaxed group-hover:text-default-700 dark:group-hover:text-default-300 transition-colors'>
                      {point.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SectionAnimations>
        </div>
      </div>
    </section>
  )
}
