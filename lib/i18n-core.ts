import { Locale, translations } from './i18n'

/**
 * 核心翻译函数 - 服务器端和客户端通用
 */
export function createTranslationFunction(locale: Locale) {
  return function t(key: string): string {
    const translation = translations[key]

    if (translation && translation[locale]) {
      return translation[locale]
    }

    // 开发环境下警告缺失翻译
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Missing translation for key: ${key}`)
    }

    // 回退到 key
    return key
  }
}

/**
 * 验证语言代码
 */
export function isValidLocale(locale: string): locale is Locale {
  return locale === 'zh' || locale === 'en'
}

/**
 * 获取翻译覆盖率
 */
export function getTranslationCoverage(): Record<Locale, number> {
  const keys = Object.keys(translations)
  const coverage: Record<Locale, number> = { zh: 0, en: 0 }

  keys.forEach(key => {
    const translation = translations[key]

    if (translation.zh) coverage.zh++
    if (translation.en) coverage.en++
  })

  return {
    zh: coverage.zh / keys.length,
    en: coverage.en / keys.length,
  }
}

/**
 * Cookie 配置统一管理
 */
export const LOCALE_COOKIE_CONFIG = {
  name: 'locale',
  path: '/',
  maxAge: 60 * 60 * 24 * 365, // 1 year
  httpOnly: false,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
}
