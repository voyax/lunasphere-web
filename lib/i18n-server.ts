import { cookies } from 'next/headers'

import { Locale, defaultLocale } from './i18n'
import { createOptimizedTranslationFunction } from './i18n-manager'
import { LOCALE_COOKIE_CONFIG, isValidLocale } from './i18n-core'

// Server-side translation function (optimized)
export async function getServerTranslation(locale?: Locale) {
  const currentLocale = locale || (await getServerLocale())

  // Use optimized translation function with caching
  return createOptimizedTranslationFunction(currentLocale)
}

// Get locale from server-side (cookies, headers, etc.)
export async function getServerLocale(): Promise<Locale> {
  const cookieStore = await cookies()
  const localeCookie = cookieStore.get(LOCALE_COOKIE_CONFIG.name)

  if (localeCookie && isValidLocale(localeCookie.value)) {
    return localeCookie.value as Locale
  }

  return defaultLocale
}

// Set locale cookie (for server actions)
export async function setServerLocale(locale: Locale) {
  const cookieStore = await cookies()

  cookieStore.set(LOCALE_COOKIE_CONFIG.name, locale, {
    path: LOCALE_COOKIE_CONFIG.path,
    maxAge: LOCALE_COOKIE_CONFIG.maxAge,
    httpOnly: LOCALE_COOKIE_CONFIG.httpOnly,
    secure: LOCALE_COOKIE_CONFIG.secure,
    sameSite: LOCALE_COOKIE_CONFIG.sameSite,
  })
}
