import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

// 预加载消息文件以避免动态导入问题
const messagesMap = {
  zh: () => import('../messages/zh.json'),
  en: () => import('../messages/en.json'),
} as const

/**
 * next-intl 服务端请求配置
 * 根据请求的 locale 加载对应的翻译文件
 */
export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as typeof routing.locales[number])) {
    locale = routing.defaultLocale
  }

  const messages = (await messagesMap[locale as keyof typeof messagesMap]()).default

  return {
    locale,
    messages,
  }
})

