'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { Locale } from './i18n'
import { LOCALE_COOKIE_CONFIG, isValidLocale } from './i18n-core'

export async function changeLocale(locale: Locale) {
  if (!isValidLocale(locale)) {
    throw new Error(`Invalid locale: ${locale}`)
  }

  const cookieStore = await cookies()

  cookieStore.set(LOCALE_COOKIE_CONFIG.name, locale, {
    path: LOCALE_COOKIE_CONFIG.path,
    maxAge: LOCALE_COOKIE_CONFIG.maxAge,
    httpOnly: LOCALE_COOKIE_CONFIG.httpOnly,
    secure: LOCALE_COOKIE_CONFIG.secure,
    sameSite: LOCALE_COOKIE_CONFIG.sameSite,
  })

  // Redirect to refresh the page with new locale
  redirect('/')
}

export async function updateLocalecookie(locale: Locale) {
  if (!isValidLocale(locale)) {
    throw new Error(`Invalid locale: ${locale}`)
  }

  const cookieStore = await cookies()

  cookieStore.set(LOCALE_COOKIE_CONFIG.name, locale, {
    path: LOCALE_COOKIE_CONFIG.path,
    maxAge: LOCALE_COOKIE_CONFIG.maxAge,
    httpOnly: LOCALE_COOKIE_CONFIG.httpOnly,
    secure: LOCALE_COOKIE_CONFIG.secure,
    sameSite: LOCALE_COOKIE_CONFIG.sameSite,
  })

  // No redirect - just update cookie
}
