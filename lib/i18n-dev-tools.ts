import { Locale, translations } from './i18n'
import {
  getAllTranslationKeys,
  getTranslationKeysByNamespace,
} from './i18n-types'
import { getTranslationStats, getMissingTranslationKeys } from './i18n-manager'

/**
 * 开发环境下的翻译调试工具
 */
export class I18nDevTools {
  private static instance: I18nDevTools | null = null

  static getInstance(): I18nDevTools {
    if (!I18nDevTools.instance) {
      I18nDevTools.instance = new I18nDevTools()
    }

    return I18nDevTools.instance
  }

  /**
   * 检查翻译完整性
   */
  checkTranslationIntegrity(): {
    incompleteKeys: string[]
    emptyTranslations: { key: string; locale: Locale }[]
    duplicateValues: { key: string; locale: Locale; value: string }[]
  } {
    const incompleteKeys: string[] = []
    const emptyTranslations: { key: string; locale: Locale }[] = []
    const duplicateValues: { key: string; locale: Locale; value: string }[] = []
    const valueMap = new Map<string, { key: string; locale: Locale }>()

    Object.keys(translations).forEach(key => {
      const translation = translations[key]
      const hasZh = translation.zh && translation.zh.trim() !== ''
      const hasEn = translation.en && translation.en.trim() !== ''

      // 检查不完整的翻译
      if (!hasZh || !hasEn) {
        incompleteKeys.push(key)
      }

      // 检查空翻译
      if (!hasZh) {
        emptyTranslations.push({ key, locale: 'zh' })
      }
      if (!hasEn) {
        emptyTranslations.push({ key, locale: 'en' })
      }

      // 检查重复值
      ;(['zh', 'en'] as Locale[]).forEach(locale => {
        const value = translation[locale]

        if (value && value.trim() !== '') {
          const mapKey = `${locale}:${value}`

          if (valueMap.has(mapKey)) {
            const original = valueMap.get(mapKey)!

            duplicateValues.push({ key, locale, value })
          } else {
            valueMap.set(mapKey, { key, locale })
          }
        }
      })
    })

    return {
      incompleteKeys,
      emptyTranslations,
      duplicateValues,
    }
  }

  /**
   * 生成翻译报告
   */
  generateReport(): {
    totalKeys: number
    coverage: Record<Locale, number>
    namespaces: Record<string, number>
    integrity: ReturnType<I18nDevTools['checkTranslationIntegrity']>
    performance: ReturnType<typeof getTranslationStats>
    missingKeys: string[]
  } {
    const keys = getAllTranslationKeys()
    const namespaces = getTranslationKeysByNamespace()
    const namespaceCounts = Object.keys(namespaces).reduce(
      (acc, ns) => {
        acc[ns] = namespaces[ns].length

        return acc
      },
      {} as Record<string, number>
    )

    const coverage = {
      zh: 0,
      en: 0,
    }

    keys.forEach(key => {
      const keyStr = String(key)
      const translation = translations[keyStr]

      if (translation.zh && translation.zh.trim() !== '') coverage.zh++
      if (translation.en && translation.en.trim() !== '') coverage.en++
    })

    return {
      totalKeys: keys.length,
      coverage: {
        zh: coverage.zh / keys.length,
        en: coverage.en / keys.length,
      },
      namespaces: namespaceCounts,
      integrity: this.checkTranslationIntegrity(),
      performance: getTranslationStats(),
      missingKeys: getMissingTranslationKeys(),
    }
  }

  /**
   * 打印翻译报告到控制台
   */
  printReport(): void {
    if (process.env.NODE_ENV !== 'development') {
      return
    }

    // Report generation available but console output removed for production readiness
    // Use generateReport() method to get translation statistics programmatically
  }
}

/**
 * 开发环境下自动检查翻译
 */
if (process.env.NODE_ENV === 'development') {
  const devTools = I18nDevTools.getInstance()

  // 延迟执行以避免阻塞初始化
  setTimeout(() => {
    devTools.printReport()
  }, 1000)
}

/**
 * 导出全局开发工具实例
 */
export const i18nDevTools = I18nDevTools.getInstance()
