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
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Divider } from '@heroui/react'

import { ThemeSwitch } from '@/components/theme-switch'
import { LanguageSwitcher } from '@/components/language-switcher'
import { Logo } from '@/components/icons'
import { useLocale } from '@/contexts/LocaleContext'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { locale, t } = useLocale()

  const menuItems = [
    {
      label: t('nav.detection'),
      href: '/detection',
    },
    {
      label: t('nav.faq'),
      href: '/faq',
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
      maxWidth='xl'
      position='sticky'
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className='sm:hidden' justify='start'>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        />
      </NavbarContent>
      <NavbarContent justify='center'>
        <NavbarBrand>
          <NextLink className='flex justify-start items-center gap-2' href='/'>
            <Logo />
            <p className='font-bold text-inherit text-sm md:text-base'>
              {t('site.title')}
            </p>
          </NextLink>
        </NavbarBrand>

        <div className='h-full py-4'>
          <Divider orientation='vertical' />
        </div>
        {menuItems.map(item => (
          <NavbarItem key={item.href} isActive={isActive(item.href)}>
            <NextLink
              className={`transition-colors ${
                isActive(item.href)
                  ? 'text-primary font-medium'
                  : 'text-foreground hover:text-primary'
              }`}
              href={item.href}
            >
              {item.label}
            </NextLink>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify='end'>
        <NavbarItem className='flex gap-2'>
          <LanguageSwitcher
            currentLocale={locale}
            languageLabel={t('nav.language')}
          />
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.href}-${index}`}>
            <NextLink
              className={`w-full transition-colors ${
                isActive(item.href)
                  ? 'text-primary font-medium'
                  : 'text-foreground hover:text-primary'
              }`}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </NextLink>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </HeroUINavbar>
  )
}
