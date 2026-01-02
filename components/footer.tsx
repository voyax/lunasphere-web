'use client'

import { useTranslations } from 'next-intl'

export const Footer = () => {
  const currentYear = new Date().getFullYear()
  const tSite = useTranslations('site')

  return (
    <footer className='border-t border-orange-100/50 dark:border-gray-800/50 pt-20 pb-12'>
      <div className='max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center'>
        {/* Brand */}
        <div className='mb-8 md:mb-0 text-center md:text-left'>
          <h2 className='text-xl font-bold text-gray-800 dark:text-gray-100'>
            {tSite('title')}
          </h2>
          <p className='text-[10px] text-gray-300 dark:text-gray-600 font-bold tracking-[0.3em] uppercase mt-2'>
            Love & Tech For Infants
          </p>
        </div>

        {/* Links & Copyright */}
        <div className='flex flex-col items-center md:items-end space-y-4'>
          {/* Navigation Links */}
          <div className='flex space-x-8 text-[11px] font-bold'>
            <a
              className='text-gray-400 dark:text-gray-500 hover:text-orange-400 dark:hover:text-orange-400 transition-colors cursor-pointer'
              href='/faq'
            >
              隐私安全
            </a>
            <a
              className='text-gray-400 dark:text-gray-500 hover:text-orange-400 dark:hover:text-orange-400 transition-colors cursor-pointer'
              href='https://github.com/voyax/baby-head-web'
              rel='noopener noreferrer'
              target='_blank'
            >
              科研合作
            </a>
            <a
              className='text-gray-400 dark:text-gray-500 hover:text-orange-400 dark:hover:text-orange-400 transition-colors cursor-pointer'
              href='mailto:hi@melolib.com'
            >
              联系我们
            </a>
          </div>

          {/* Copyright */}
          <p className='text-[9px] text-gray-300 dark:text-gray-600 font-medium'>
            © {currentYear} LUNASPHERE STUDIO • 守护每一份纯净笑容
          </p>
        </div>
      </div>
    </footer>
  )
}
