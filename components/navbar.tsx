'use client'

import { useTranslations, useLocale } from 'next-intl'
import { Baby } from 'lucide-react'

import { ThemeSwitch } from '@/components/theme-switch'
import { LanguageSwitcher } from '@/components/language-switcher'
import { Link, usePathname } from '@/i18n/routing'

export function Navbar() {
  const pathname = usePathname()
  const locale = useLocale()
  const t = useTranslations('nav')
  const tSite = useTranslations('site')

  const menuItems = [
    {
      label: t('home'),
      href: '/' as const,
    },
    {
      label: t('learn'),
      href: '/learn' as const,
    },
    {
      label: t('profileMatch'),
      href: '/profile-match' as const,
    },
    {
      label: t('faq'),
      href: '/faq' as const,
    },
  ]

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }

    return pathname.startsWith(href)
  }

  return (
    <header className='fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 md:px-6 pt-2 sm:pt-3'>
      <div className='max-w-6xl mx-auto'>
        <nav className='flex justify-between items-center bg-white/60 dark:bg-gray-900/60 backdrop-blur-md rounded-2xl sm:rounded-2xl px-3 sm:px-5 md:px-6 h-12 sm:h-14 border border-white/60 dark:border-gray-700/50 shadow-sm'>
          {/* Logo & Brand */}
          <Link
            className='flex items-center space-x-2 sm:space-x-2.5 group'
            href='/'
          >
            <div className='bg-orange-100 dark:bg-orange-900/50 p-1.5 sm:p-2 rounded-xl group-hover:scale-105 transition-transform'>
              <Baby className='w-4 h-4 sm:w-5 sm:h-5 text-orange-500 dark:text-orange-400' />
            </div>
            <h1 className='text-sm sm:text-base font-bold text-gray-800 dark:text-gray-100 group-hover:text-orange-500 transition-colors'>
              {tSite('title')}
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden md:flex space-x-1'>
            {menuItems.map(item => (
              <Link
                key={item.href}
                className={`px-4 py-2 rounded-2xl text-sm font-bold transition-all duration-300 ${isActive(item.href)
                  ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 shadow-inner'
                  : 'text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 hover:bg-white/50 dark:hover:bg-gray-800/50'
                  }`}
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className='flex items-center space-x-0.5 sm:space-x-2'>
            <LanguageSwitcher
              currentLocale={locale}
              languageLabel={t('language')}
            />
            <ThemeSwitch />
          </div>
        </nav>

        {/* Mobile menu removed - using bottom navigation instead */}
      </div>
    </header>
  )
}
