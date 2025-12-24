import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'page.profileMatch' })
  const tSite = await getTranslations({ locale, namespace: 'site' })

  return {
    title: t('title'),
    description: t('description'),
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
      title: `${t('title')} - ${tSite('title')}`,
      description: t('description'),
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
