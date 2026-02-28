/**
 * i18n 配置
 * 定义支持的语言和默认语言
 */

// 支持的语言列表
export const locales = ['zh', 'en'] as const

// 语言类型
export type Locale = (typeof locales)[number]

// 默认语言
export const defaultLocale: Locale = 'zh'

// 语言名称映射（用于 UI 显示）
export const localeNames: Record<Locale, string> = {
  zh: '中文',
  en: 'English',
}

// 验证 locale 是否有效
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale)
}

