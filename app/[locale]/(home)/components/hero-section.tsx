import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

import { HeroAnimations } from './hero-animations'

import { Link } from '@/i18n/routing'

export async function HeroSection() {
  const t = await getTranslations('hero')
  const tButton = await getTranslations('button')

  return (
    <section
      className='min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-blue-50 to-purple-50 dark:from-pink-950/20 dark:via-blue-950/20 dark:to-purple-950/20'
      id='hero'
    >
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          {/* Left content */}
          <HeroAnimations>
            <div className='space-y-10'>
              {/* Main heading section */}
              <div className='space-y-6'>
                <div className='space-y-3'>
                  <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold leading-tight'>
                    <span className='text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600'>
                      {t('title')}
                    </span>
                  </h1>

                  <div className='flex items-center gap-3 mt-4'>
                    <div className='w-12 h-0.5 bg-gradient-to-r from-pink-500 to-purple-600' />
                    <p className='text-lg md:text-xl text-default-600 font-medium tracking-wide'>
                      {t('subtitle')}
                    </p>
                  </div>
                </div>

                <div className='max-w-2xl'>
                  <p className='text-base md:text-lg text-default-500 leading-relaxed'>
                    {t('description')}
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className='flex flex-col sm:flex-row gap-4 pt-2'>
                <Link
                  className='inline-flex items-center justify-center bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 rounded-full'
                  href='/detection'
                >
                  {t('cta')}
                </Link>

                <Link
                  className='inline-flex items-center justify-center border-2 border-pink-300 text-pink-600 dark:text-pink-400 px-8 py-4 text-lg hover:bg-pink-50 dark:hover:bg-pink-950/20 transition-all duration-300 rounded-full'
                  href='/faq'
                >
                  {tButton('learn-more')}
                </Link>
              </div>

              {/* Consultation card */}
              <div className='mt-8 p-4 bg-default-50/50 dark:bg-default-100/5 rounded-lg border border-default-200/50 dark:border-default-700/30'>
                <p className='text-sm md:text-base text-default-500 leading-relaxed'>
                  {t('consultation')}
                </p>
              </div>
            </div>
          </HeroAnimations>

          {/* Right image area */}
          <HeroAnimations delay={0.2}>
            <div className='relative aspect-square max-w-lg mx-auto'>
              {/* Main image with gradient border */}
              <Image
                fill
                priority
                alt={t('title')}
                className='object-cover'
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                src='/images/hero-image.png'
              />

              {/* Decorative elements */}
              <div className='absolute top-2 right-2 w-8 h-8 bg-pink-400 rounded-full opacity-70' />
              <div className='absolute bottom-2 left-2 w-6 h-6 bg-purple-400 rounded-full opacity-70' />
              <div className='absolute top-1/4 left-2 w-4 h-4 bg-blue-400 rounded-full opacity-50' />
              <div className='absolute bottom-1/4 right-2 w-5 h-5 bg-pink-300 rounded-full opacity-50' />
            </div>
          </HeroAnimations>
        </div>
      </div>
    </section>
  )
}
