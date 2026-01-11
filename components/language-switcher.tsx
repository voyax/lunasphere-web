'use client'

import { Button } from '@heroui/button'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@heroui/dropdown'
import { useTransition } from 'react'
import { useParams } from 'next/navigation'

import { useRouter, usePathname } from '@/i18n/routing'
import { locales, localeNames, type Locale } from '@/i18n/config'

interface LanguageSwitcherProps {
  currentLocale: string
  languageLabel: string
}

export function LanguageSwitcher({
  currentLocale,
  languageLabel,
}: LanguageSwitcherProps) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()

  const handleLanguageChange = (key: string) => {
    const newLocale = key as Locale

    startTransition(() => {
      router.replace(
        // @ts-expect-error - pathname is typed correctly by next-intl
        { pathname, params },
        { locale: newLocale }
      )
    })
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          className='text-xs sm:text-sm font-medium min-w-[40px] h-9 sm:h-10 px-2.5 sm:px-3 touch-manipulation'
          isLoading={isPending}
          size='sm'
          variant='ghost'
        >
          {localeNames[currentLocale as Locale]}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label={languageLabel}
        className='min-w-[100px]'
        onAction={key => handleLanguageChange(key as string)}
      >
        {locales.map(lang => (
          <DropdownItem
            key={lang}
            className={`min-h-[44px] text-sm ${currentLocale === lang ? 'bg-primary/10' : ''}`}
          >
            {localeNames[lang]}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}
