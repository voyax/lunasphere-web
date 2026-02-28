import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

/**
 * next-intl 中间件
 * 处理语言检测和路由重定向
 */
export default createMiddleware(routing)

export const config = {
  // 匹配所有路径，但排除以下内容：
  // - API 路由
  // - 静态文件
  // - 特殊文件（favicon、robots 等）
  matcher: [
    // 匹配所有路径
    '/((?!api|_next|_vercel|.*\\..*).*)',
    // 也匹配根路径
    '/',
  ],
}


