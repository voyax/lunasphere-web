# 语言自动检测机制

## 概述

本项目使用 `next-intl` 实现国际化，支持基于 `Accept-Language` 请求头的自动语言检测。

## 工作原理

### 1. Accept-Language 自动检测

当用户首次访问网站时，`next-intl` 的 middleware 会：

1. **读取浏览器的 `Accept-Language` 请求头**
   - 例如：`Accept-Language: en-US,en;q=0.9,zh-CN;q=0.8`
   
2. **匹配支持的语言**
   - 支持的语言：`zh` (中文), `en` (英文)
   - 默认语言：`zh` (中文)

3. **自动重定向到匹配的语言版本**
   - 英文浏览器 → 重定向到 `/en`
   - 中文浏览器 → 显示 `/` (因为中文是默认语言，使用 `localePrefix: 'as-needed'`)

### 2. Cookie 持久化（自动处理）

`next-intl` 会自动管理 `NEXT_LOCALE` Cookie：

- **用户手动切换语言时**：Cookie 会被更新
- **下次访问时**：优先使用 Cookie 中的语言偏好
- **优先级**：`Cookie > Accept-Language > defaultLocale`

## 配置

### i18n/routing.ts

```typescript
export const routing = defineRouting({
  locales: ['zh', 'en'],
  defaultLocale: 'zh',
  localePrefix: 'as-needed',
  
  // 启用基于 Accept-Language 的自动检测
  localeDetection: true,
})
```

### middleware.ts

```typescript
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

// middleware 会自动处理语言检测和 Cookie 管理
export default createMiddleware(routing)
```

## 测试

### 使用 curl 测试

```bash
# 测试英文浏览器
curl -I -H "Accept-Language: en-US,en;q=0.9" http://localhost:3000/
# 预期：重定向到 /en

# 测试中文浏览器
curl -I -H "Accept-Language: zh-CN,zh;q=0.9" http://localhost:3000/
# 预期：显示默认页面（中文）

# 无 Accept-Language 头
curl -I http://localhost:3000/
# 预期：显示默认语言（中文）
```

### 使用浏览器测试

1. **Chrome/Edge**: 
   - 设置 → 语言 → 添加语言并调整顺序
   - 清除浏览器 Cookie
   - 访问网站首页

2. **Firefox**:
   - 设置 → 常规 → 语言
   - 清除 Cookie
   - 访问网站首页

## 用户流程示例

### 场景 1：首次访问
1. 用户（英文浏览器）访问 `https://head.melolib.com/`
2. Middleware 读取 `Accept-Language: en-US`
3. 自动重定向到 `https://head.melolib.com/en`
4. 设置 Cookie：`NEXT_LOCALE=en`

### 场景 2：手动切换语言
1. 用户点击语言切换器，从英文切换到中文
2. 导航到 `/` (中文首页)
3. Cookie 自动更新：`NEXT_LOCALE=zh`
4. 下次访问时，即使浏览器是英文，也会显示中文版本

### 场景 3：直接访问特定语言页面
1. 用户直接访问 `https://head.melolib.com/en/detection`
2. 显示英文版检测页面
3. Cookie 设置为 `NEXT_LOCALE=en`
4. 后续导航保持英文版本

## 注意事项

1. **默认语言 URL 不显示前缀**
   - 中文（默认）：`/`, `/detection`, `/faq`
   - 英文：`/en`, `/en/detection`, `/en/faq`

2. **SEO 友好**
   - 自动生成 `hreflang` 标签
   - 提供 canonical URL
   - 搜索引擎可以正确索引不同语言版本

3. **Cookie 设置**
   - 名称：`NEXT_LOCALE`
   - 有效期：Session（关闭浏览器后失效）
   - 路径：`/`
   - SameSite：`lax`

## 相关文件

- `i18n/config.ts` - 语言配置
- `i18n/routing.ts` - 路由和检测配置
- `middleware.ts` - 语言检测中间件
- `messages/zh.json` - 中文翻译
- `messages/en.json` - 英文翻译

