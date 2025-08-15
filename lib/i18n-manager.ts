import { Locale, translations } from './i18n'

/**
 * 翻译缓存管理器
 */
class TranslationCache {
  private cache = new Map<string, string>()
  private hitCount = 0
  private missCount = 0

  get(locale: Locale, key: string): string | undefined {
    const cacheKey = `${locale}:${key}`
    const cached = this.cache.get(cacheKey)

    if (cached) {
      this.hitCount++

      return cached
    }

    this.missCount++

    return undefined
  }

  set(locale: Locale, key: string, value: string): void {
    const cacheKey = `${locale}:${key}`

    this.cache.set(cacheKey, value)
  }

  clear(): void {
    this.cache.clear()
    this.hitCount = 0
    this.missCount = 0
  }

  getStats() {
    return {
      size: this.cache.size,
      hitCount: this.hitCount,
      missCount: this.missCount,
      hitRate: this.hitCount / (this.hitCount + this.missCount) || 0,
    }
  }
}

/**
 * 高性能翻译管理器
 */
class TranslationManager {
  private cache = new TranslationCache()
  private missingKeys = new Set<string>()

  translate(locale: Locale, key: string): string {
    // 尝试从缓存获取
    const cached = this.cache.get(locale, key)

    if (cached) {
      return cached
    }

    // 从翻译对象获取
    const translation = translations[key]

    if (translation && translation[locale]) {
      const result = translation[locale]

      this.cache.set(locale, key, result)

      return result
    }

    // 记录缺失的键
    this.missingKeys.add(key)

    // 开发环境警告
    if (process.env.NODE_ENV === 'development') {
      // Missing translation warning - could be logged to development tools
      // console.warn(`Missing translation for key: ${key} (${locale})`)
    }

    // 缓存回退值
    this.cache.set(locale, key, key)

    return key
  }

  getMissingKeys(): string[] {
    return Array.from(this.missingKeys)
  }

  clearMissingKeys(): void {
    this.missingKeys.clear()
  }

  getStats() {
    return {
      cache: this.cache.getStats(),
      missingKeys: this.missingKeys.size,
    }
  }

  clearCache(): void {
    this.cache.clear()
    this.missingKeys.clear()
  }
}

// 全局翻译管理器实例
const translationManager = new TranslationManager()

/**
 * 高性能翻译函数
 */
export function createOptimizedTranslationFunction(locale: Locale) {
  return function t(key: string): string {
    return translationManager.translate(locale, key)
  }
}

/**
 * 获取翻译统计信息
 */
export function getTranslationStats() {
  return translationManager.getStats()
}

/**
 * 清除翻译缓存
 */
export function clearTranslationCache() {
  translationManager.clearCache()
}

/**
 * 获取缺失的翻译键
 */
export function getMissingTranslationKeys(): string[] {
  return translationManager.getMissingKeys()
}
