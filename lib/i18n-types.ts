import { translations } from './i18n'

/**
 * 从翻译对象自动生成类型安全的翻译键
 */
export type TranslationKey = keyof typeof translations

/**
 * 类型安全的翻译函数
 */
export interface TypeSafeTranslationFunction {
  (key: TranslationKey): string
}

/**
 * 翻译键验证函数
 */
export function isValidTranslationKey(key: string): key is string & TranslationKey {
  return key in translations
}

/**
 * 获取所有翻译键
 */
export function getAllTranslationKeys(): TranslationKey[] {
  return Object.keys(translations) as TranslationKey[]
}

/**
 * 按命名空间分组翻译键
 */
export function getTranslationKeysByNamespace(): Record<string, TranslationKey[]> {
  const keys = getAllTranslationKeys()
  const namespaces: Record<string, TranslationKey[]> = {}

  keys.forEach(key => {
    const keyStr = String(key)
    const namespace = keyStr.split('.')[0]
    if (!namespaces[namespace]) {
      namespaces[namespace] = []
    }
    namespaces[namespace].push(key)
  })

  return namespaces
} 