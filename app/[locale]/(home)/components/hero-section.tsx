import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { Heart, Sparkles } from 'lucide-react'

import { HeroAnimations } from './hero-animations'

import { Link } from '@/i18n/routing'

export async function HeroSection() {
  const t = await getTranslations('hero')
  const tButton = await getTranslations('button')

  return (
    <section
      className='min-h-screen flex items-center justify-center pb-24 pt-32 selection:bg-orange-100 dark:selection:bg-orange-900/30 relative overflow-hidden'
      id='hero'
    >
      {/* Warm gradient background */}
      <div className='absolute inset-0 bg-gradient-to-br from-orange-50/50 via-white to-rose-50/50 dark:from-gray-900 dark:via-gray-950 dark:to-rose-950/20' />

      {/* Decorative floating elements */}
      <div className='absolute top-1/4 left-1/4 opacity-10 dark:opacity-5 animate-float-soft pointer-events-none'>
        <Heart className='w-12 h-12 text-orange-400' />
      </div>
      <div className='absolute bottom-1/3 right-1/4 opacity-10 dark:opacity-5 animate-float-soft pointer-events-none' style={{ animationDelay: '4s' }}>
        <Sparkles className='w-10 h-10 text-rose-400' />
      </div>

      <div className='relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          {/* Left content */}
          <HeroAnimations>
            <div className='space-y-10 text-center lg:text-left'>
              {/* Badge */}
              <div className='inline-flex items-center space-x-2 px-5 py-2 rounded-full bg-white/60 dark:bg-gray-800/60 border border-orange-100 dark:border-orange-900/30 shadow-sm transform -rotate-1 hover:rotate-0 transition-transform cursor-default'>
                <div className='w-2 h-2 rounded-full bg-orange-400 animate-pulse' />
                <span className='text-[11px] font-bold tracking-[0.2em] text-orange-500 dark:text-orange-400 uppercase'>
                  让科技拥抱新生命
                </span>
              </div>

              {/* Main heading */}
              <div className='space-y-4'>
                <h1 className='text-5xl md:text-7xl font-bold text-gray-800 dark:text-gray-100 tracking-tighter leading-[0.9]'>
                  {t('title').split('·')[0]}
                  <br />
                  <span className='text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-400'>
                    {t('subtitle').replace('·', '').trim()}
                  </span>
                </h1>
              </div>

              {/* Description */}
              <p className='max-w-md mx-auto lg:mx-0 text-gray-400 dark:text-gray-500 text-sm md:text-base leading-relaxed font-medium'>
                {t('description')}
              </p>

              {/* Action buttons */}
              <div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2'>
                <Link
                  className='inline-flex items-center justify-center bg-gradient-to-r from-orange-400 to-rose-400 hover:from-orange-500 hover:to-rose-500 text-white font-bold px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 rounded-full transform hover:scale-105'
                  href='/detection'
                >
                  {t('cta')}
                </Link>

                <Link
                  className='inline-flex items-center justify-center border-2 border-orange-200 dark:border-orange-800 text-orange-500 dark:text-orange-400 font-medium px-8 py-4 text-lg hover:bg-orange-50 dark:hover:bg-orange-950/20 transition-all duration-300 rounded-full'
                  href='/faq'
                >
                  {tButton('learn-more')}
                </Link>
              </div>

              {/* Consultation card */}
              <div className='p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-[2rem] border border-orange-100/30 dark:border-orange-900/30 shadow-sm'>
                <p className='text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium'>
                  {t('consultation')}
                </p>
              </div>
            </div>
          </HeroAnimations>

          {/* Right image area */}
          <HeroAnimations delay={0.2}>
            <div className='relative aspect-square max-w-lg mx-auto'>
              {/* Soft glowing background */}
              <div className='absolute -inset-4 bg-gradient-to-br from-orange-200/30 to-rose-200/30 dark:from-orange-900/20 dark:to-rose-900/20 blur-3xl rounded-full' />

              {/* Main image container */}
              <div className='relative bg-white dark:bg-gray-800 p-4 rounded-[3rem] shadow-xl border border-white dark:border-gray-700'>
                <div className='relative aspect-square rounded-[2.5rem] overflow-hidden'>
                  <Image
                    fill
                    priority
                    alt={t('title')}
                    className='object-cover'
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    src='/images/hero-image.png'
                  />
                </div>
              </div>

              {/* Decorative floating dots */}
              <div className='absolute -top-2 -right-2 w-6 h-6 bg-orange-300 dark:bg-orange-600 rounded-full opacity-70 animate-bounce-soft' />
              <div className='absolute -bottom-2 -left-2 w-4 h-4 bg-rose-300 dark:bg-rose-600 rounded-full opacity-70 animate-bounce-soft' style={{ animationDelay: '0.5s' }} />
              <div className='absolute top-1/4 -left-4 w-3 h-3 bg-orange-200 dark:bg-orange-700 rounded-full opacity-50' />
              <div className='absolute bottom-1/4 -right-4 w-5 h-5 bg-rose-200 dark:bg-rose-700 rounded-full opacity-50' />
            </div>
          </HeroAnimations>
        </div>
      </div>
    </section>
  )
}
