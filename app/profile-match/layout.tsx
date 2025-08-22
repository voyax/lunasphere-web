import { Metadata } from 'next'

import { getServerTranslation, getServerLocale } from '@/lib/i18n-server'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale()
  const t = await getServerTranslation(locale)

  return {
    title: t('page.profileMatch.title'),
    description: t('page.profileMatch.description'),
    keywords: [
      '轮廓匹配',
      '侧面轮廓对比',
      '头型轮廓分析',
      '婴儿侧面照',
      '头型对比',
      'profile matching',
      'head shape profile',
      'contour comparison',
      'side view analysis',
    ],
    openGraph: {
      title: `${t('page.profileMatch.title')} - ${t('site.title')}`,
      description: t('page.profileMatch.description'),
      url: '/profile-match',
    },
  }
}

export default function ProfileMatchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
