'use client'

import ProfileViewComparison from './components/ProfileViewComparison'

import { useLocale } from '@/contexts/LocaleContext'

export default function ProfileMatchPage() {
  const { t } = useLocale()

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/20'>
      {/* Background Pattern */}
      <div className='absolute inset-0'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05),transparent_50%)]' />
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.04),transparent_50%)]' />
        <div className='absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-200/50 to-transparent' />
      </div>

      <div className='relative z-10'>
        <div className='container mx-auto px-6 py-8'>
          {/* Page Header */}
          <div className='text-center mb-12'>
            <h1 className='text-4xl md:text-5xl font-light mb-6 tracking-tight leading-tight'>
              <span className='font-medium text-gray-900 dark:text-white'>
                {t('nav.profileMatch')}
              </span>
            </h1>
            <p className='text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed font-light'>
              {t('detection.profileView.pageDescription')}
            </p>
          </div>

          {/* Main Content */}
          <div className='w-full'>
            <ProfileViewComparison />
          </div>
        </div>
      </div>
    </div>
  )
}
