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
    <header className='fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 md:px-6 py-2 sm:py-3'>
      <div className='max-w-6xl mx-auto'>
        <nav className='flex justify-between items-center bg-white/40 dark:bg-gray-900/40 backdrop-blur-md rounded-2xl sm:rounded-3xl px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 border border-white/60 dark:border-gray-700/50 shadow-sm transition-all duration-300 hover:shadow-md'>
          {/* Logo & Brand */}
          <Link
            className='flex items-center space-x-2 sm:space-x-3 group min-h-[44px]'
            href='/'
          >
            <div className='bg-orange-200 dark:bg-orange-900/50 p-1.5 sm:p-2 rounded-xl sm:rounded-2xl group-hover:scale-105 transition-transform'>
              <Baby className='w-4 h-4 sm:w-5 sm:h-5 text-orange-600 dark:text-orange-400' />
            </div>
            <div>
              <h1 className='text-base sm:text-lg font-bold text-gray-800 dark:text-gray-100 leading-tight group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors'>
                {tSite('title')}
              </h1>
              <p className='text-[9px] sm:text-[10px] text-orange-500 dark:text-orange-400 font-bold tracking-widest uppercase hidden sm:block'>
                LunaCare Studio
              </p>
            </div>
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
          <div className='flex items-center space-x-1 sm:space-x-2'>
            <LanguageSwitcher
              currentLocale={locale}
              languageLabel={t('language')}
            />
            <ThemeSwitch />

            {/* Mobile Menu Toggle - Hidden since we use bottom nav on mobile */}
          </div>
        </nav>

        {/* Mobile menu removed - using bottom navigation instead */}
      </div>
    </header>
  )
}
