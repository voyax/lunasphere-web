'use client'

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from '@heroui/navbar'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { Baby, Sun } from 'lucide-react'

import { ThemeSwitch } from '@/components/theme-switch'
import { LanguageSwitcher } from '@/components/language-switcher'
import { Link, usePathname } from '@/i18n/routing'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const locale = useLocale()
  const t = useTranslations('nav')
  const tSite = useTranslations('site')

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

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

            {/* Mobile Menu Toggle - min 44px touch target */}
            <button
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              className='md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl hover:bg-white/50 dark:hover:bg-gray-800/50 active:bg-white/70 dark:active:bg-gray-800/70 transition-colors touch-manipulation'
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className={`w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : ''}`}
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                {isMenuOpen ? (
                  <path
                    d='M6 18L18 6M6 6l12 12'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                  />
                ) : (
                  <path
                    d='M4 6h16M4 12h16M4 18h16'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                  />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Menu with improved animation */}
        <div
          className={`md:hidden mt-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-2xl border border-white/60 dark:border-gray-700/50 shadow-lg overflow-hidden transition-all duration-300 ease-out ${isMenuOpen
              ? 'opacity-100 translate-y-0 max-h-[400px]'
              : 'opacity-0 -translate-y-2 max-h-0 pointer-events-none'
            }`}
        >
          <div className='py-2'>
            {menuItems.map((item, index) => (
              <Link
                key={`${item.href}-${index}`}
                className={`flex items-center px-5 py-4 text-base font-medium transition-colors touch-manipulation ${isActive(item.href)
                  ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 active:bg-gray-100 dark:active:bg-gray-700'
                  }`}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile menu backdrop */}
        {isMenuOpen && (
          <div
            className='md:hidden fixed inset-0 bg-black/20 -z-10 animate-fade-in'
            onClick={() => setIsMenuOpen(false)}
            aria-hidden='true'
          />
        )}
      </div>
    </header>
  )
}
