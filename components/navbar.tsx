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
import { useState } from 'react'
import { Divider } from '@heroui/react'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'

import { ThemeSwitch } from '@/components/theme-switch'
import { LanguageSwitcher } from '@/components/language-switcher'
import { Link, usePathname } from '@/i18n/routing'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
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
      label: t('detection'),
      href: '/detection' as const,
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
    <HeroUINavbar
      className='bg-background/70 backdrop-blur-md'
      isMenuOpen={isMenuOpen}
      maxWidth='xl'
      position='sticky'
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className='sm:hidden' justify='center'>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        />
      </NavbarContent>
      <NavbarContent justify='center'>
        <NavbarBrand>
          <Link className='flex justify-start items-center gap-2' href='/'>
            <Image
              alt='Logo'
              className='w-8 h-8'
              height={32}
              src='/logo_with_bg.png'
              width={32}
            />
            <p className='font-bold text-inherit text-sm md:text-base'>
              {tSite('title')}
            </p>
          </Link>
        </NavbarBrand>

        <div className='h-full py-4 hidden sm:block'>
          <Divider orientation='vertical' />
        </div>
        {menuItems.map(item => (
          <NavbarItem
            key={item.href}
            className='hidden sm:flex'
            isActive={isActive(item.href)}
          >
            <Link
              className={`transition-colors ${
                isActive(item.href)
                  ? 'text-primary font-medium'
                  : 'text-foreground hover:text-primary'
              }`}
              href={item.href}
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify='end'>
        <NavbarItem className='flex gap-2'>
          <LanguageSwitcher
            currentLocale={locale}
            languageLabel={t('language')}
          />
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu aria-label={t('mobileMenu')} role='menu'>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.href}-${index}`} role='menuitem'>
            <Link
              className={`w-full transition-colors ${
                isActive(item.href)
                  ? 'text-primary font-medium'
                  : 'text-foreground hover:text-primary'
              }`}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </HeroUINavbar>
  )
}
