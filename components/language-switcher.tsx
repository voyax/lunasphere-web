'use client'

import { Button } from '@heroui/button'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@heroui/dropdown'
import { useTransition } from 'react'

import { useLocale } from '@/contexts/LocaleContext'
import { locales, localeNames, type Locale } from '@/lib/i18n'

interface LanguageSwitcherProps {
  currentLocale: Locale
  languageLabel: string
}

export function LanguageSwitcher({ currentLocale, languageLabel }: LanguageSwitcherProps) {
  const [isPending, startTransition] = useTransition()
  const { setLocale } = useLocale()

  const handleLanguageChange = (key: string) => {
    const newLocale = key as Locale
    
    startTransition(async () => {
      // Update client-side state immediately and sync with server
      await setLocale(newLocale)
    })
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button 
          variant='ghost' 
          size='sm' 
          className='text-sm font-medium'
          isLoading={isPending}
        >
          {localeNames[currentLocale]}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label={languageLabel}
        onAction={(key) => handleLanguageChange(key as string)}
      >
        {locales.map((lang) => (
          <DropdownItem
            key={lang}
            className={currentLocale === lang ? 'bg-primary/10' : ''}
          >
            {localeNames[lang]}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}
