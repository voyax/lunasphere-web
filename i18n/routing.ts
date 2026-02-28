import { defineRouting } from 'next-intl/routing'
import { createNavigation } from 'next-intl/navigation'

import { locales, defaultLocale } from './config'

/**
 * 路由配置
 * 定义 next-intl 的路由行为
 */
export const routing = defineRouting({
  // 支持的所有语言
  locales,

  // 默认语言
  defaultLocale,

  // 默认语言的 URL 前缀策略
  // 'as-needed': 默认语言不显示前缀 (/ 而不是 /zh/)
  // 'always': 所有语言都显示前缀 (/zh/, /en/)
  localePrefix: 'as-needed',

  // 启用基于 Accept-Language 请求头的语言检测
  // 当用户首次访问时，会根据浏览器语言自动跳转到对应语言版本
  localeDetection: true,
})

/**
 * 导出导航组件和函数
 * 这些会自动处理语言前缀
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing)


