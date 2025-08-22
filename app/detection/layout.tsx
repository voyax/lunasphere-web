import { Metadata } from 'next'

import { getServerTranslation, getServerLocale } from '@/lib/i18n-server'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale()
  const t = await getServerTranslation(locale)

  return {
    title: t('page.detection.title'),
    description: t('page.detection.description'),
    keywords: [
      '头型检测',
      'AI头型分析',
      '头颅指数',
      '不对称指数',
      '婴儿头型测量',
      'CI指数',
      'CVAI指数',
      'head shape detection',
      'AI analysis',
      'cephalic index',
      'cranial vault asymmetry index',
    ],
    openGraph: {
      title: `${t('page.detection.title')} - ${t('site.title')}`,
      description: t('page.detection.description'),
      url: '/detection',
    },
  }
}

export default function DetectionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
