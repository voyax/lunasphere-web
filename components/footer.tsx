'use client'

import { useTranslations } from 'next-intl'

export const Footer = () => {
  const currentYear = new Date().getFullYear()
  const tSite = useTranslations('site')
  const tFooter = useTranslations('footer')

  return (
    <footer className='hidden md:block border-t border-orange-100/50 dark:border-gray-800/50 pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-10 md:pb-12'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0'>
        {/* Brand */}
        <div className='text-center md:text-left'>
          <h2 className='text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100'>
            {tSite('title')}
          </h2>
          <p className='text-[11px] sm:text-xs text-gray-400 dark:text-gray-500 mt-1.5 sm:mt-2 max-w-[280px] mx-auto md:mx-0'>
            {tFooter('slogan')}
          </p>
        </div>

        {/* Links & Copyright */}
        <div className='flex flex-col items-center md:items-end space-y-3 sm:space-y-4'>
          {/* Navigation Links */}
          <nav className='flex flex-wrap justify-center gap-x-8 gap-y-2 text-[11px] font-bold'>
            <a
              className='text-gray-400 dark:text-gray-500 hover:text-orange-400 dark:hover:text-orange-400 transition-colors cursor-pointer'
              href='/privacy'
            >
              {tFooter('privacy')}
            </a>
            <a
              className='text-gray-400 dark:text-gray-500 hover:text-orange-400 dark:hover:text-orange-400 transition-colors cursor-pointer'
              href='/research'
            >
              {tFooter('research')}
            </a>
            <a
              className='text-gray-400 dark:text-gray-500 hover:text-orange-400 dark:hover:text-orange-400 transition-colors cursor-pointer'
              href='mailto:hi@melolib.com'
            >
              {tFooter('contact')}
            </a>
          </nav>

          {/* Copyright */}
          <p className='text-[10px] text-gray-300 dark:text-gray-600 font-medium text-center'>
            © {currentYear} LUNASPHERE STUDIO • {tFooter('copyright')}
          </p>
        </div>
      </div>
    </footer>
  )
}
