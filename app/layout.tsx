/**
 * 根布局
 * 
 * 注意：这是一个最小化的根布局。
 * 实际的页面布局在 app/[locale]/layout.tsx 中定义。
 * 
 * next-intl 的 middleware 会自动处理语言检测和重定向：
 * - 访问 / 会根据用户偏好重定向到 /zh 或 /en
 * - 直接访问 /zh 或 /en 则正常加载对应语言页面
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
