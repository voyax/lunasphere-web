'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'

import { Locale, defaultLocale, LocaleContextType } from '@/lib/i18n'
import { createOptimizedTranslationFunction } from '@/lib/i18n-manager'
import { LOCALE_COOKIE_CONFIG, isValidLocale } from '@/lib/i18n-core'
import { updateLocalecookie } from '@/lib/actions'

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(defaultLocale)

  useEffect(() => {
    // Read user's language preference from localStorage first
    const savedLocale = localStorage.getItem(LOCALE_COOKIE_CONFIG.name)

    if (savedLocale && isValidLocale(savedLocale)) {
      setLocale(savedLocale)
    } else {
      // If no localStorage, check if there's a cookie
      const cookieLocale = document.cookie
        .split('; ')
        .find(row => row.startsWith(`${LOCALE_COOKIE_CONFIG.name}=`))
        ?.split('=')[1]

      if (cookieLocale && isValidLocale(cookieLocale)) {
        setLocale(cookieLocale)
        localStorage.setItem(LOCALE_COOKIE_CONFIG.name, cookieLocale)
      }
    }
  }, [])

  const handleSetLocale = async (newLocale: Locale) => {
    setLocale(newLocale)
    localStorage.setItem(LOCALE_COOKIE_CONFIG.name, newLocale)

    // Update server-side cookie using server action
    try {
      await updateLocalecookie(newLocale)
    } catch (error) {
      console.error('Failed to update server locale:', error)
      // Revert client state if server update fails
      setLocale(locale)
      localStorage.setItem(LOCALE_COOKIE_CONFIG.name, locale)
    }
  }

  // Use optimized translation function with caching
  const t = createOptimizedTranslationFunction(locale)

  return (
    <LocaleContext.Provider value={{ locale, setLocale: handleSetLocale, t }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const context = useContext(LocaleContext)

  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider')
  }

  return context
}
