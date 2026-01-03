'use client'

import { useTranslations } from 'next-intl'

export const Footer = () => {
  const currentYear = new Date().getFullYear()
  const tSite = useTranslations('site')
  const tFooter = useTranslations('footer')

  return (
    <footer className='border-t border-orange-100/50 dark:border-gray-800/50 pt-20 pb-12'>
      <div className='max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center'>
        {/* Brand */}
        <div className='mb-8 md:mb-0 text-center md:text-left'>
          <h2 className='text-xl font-bold text-gray-800 dark:text-gray-100'>
            {tSite('title')}
          </h2>
          <p className='text-xs text-gray-400 dark:text-gray-500 mt-2'>
            {tFooter('slogan')}
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
              {tFooter('privacy')}
            </a>
            <a
              className='text-gray-400 dark:text-gray-500 hover:text-orange-400 dark:hover:text-orange-400 transition-colors cursor-pointer'
              href='https://github.com/voyax/baby-head-web'
              rel='noopener noreferrer'
              target='_blank'
            >
              {tFooter('research')}
            </a>
            <a
              className='text-gray-400 dark:text-gray-500 hover:text-orange-400 dark:hover:text-orange-400 transition-colors cursor-pointer'
              href='mailto:hi@melolib.com'
            >
              {tFooter('contact')}
            </a>
          </div>

          {/* Copyright */}
          <p className='text-[9px] text-gray-300 dark:text-gray-600 font-medium'>
            © {currentYear} LUNASPHERE STUDIO • {tFooter('copyright')}
          </p>
        </div>
      </div>
    </footer>
  )
}
