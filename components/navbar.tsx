import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from '@heroui/navbar'
import NextLink from 'next/link'

import { ThemeSwitch } from '@/components/theme-switch'
import { LanguageSwitcher } from '@/components/language-switcher'
import { getServerTranslation, getServerLocale } from '@/lib/i18n-server'
import { Logo } from '@/components/icons'

export async function Navbar() {
  const t = await getServerTranslation()
  const locale = await getServerLocale()

  return (
    <HeroUINavbar
      maxWidth='xl'
      position='sticky'
      className='bg-background/70 backdrop-blur-md'
    >
      <NavbarContent className='basis-1/5 sm:basis-full' justify='start'>
        <NavbarBrand as='li' className='gap-3 max-w-fit'>
          <NextLink className='flex justify-start items-center gap-2' href='/'>
            <Logo />
            <p className='font-bold text-inherit text-sm md:text-base'>
              {t('site.title')}
            </p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className='flex basis-1/5 sm:basis-full' justify='end'>
        <NavbarItem className='flex gap-2'>
          <LanguageSwitcher 
            currentLocale={locale}
            languageLabel={t('nav.language')}
          />
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>
    </HeroUINavbar>
  )
}
