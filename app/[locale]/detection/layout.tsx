import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'page.detection' })
  const tSite = await getTranslations({ locale, namespace: 'site' })

  return {
    title: t('title'),
    description: t('description'),
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
      title: `${t('title')} - ${tSite('title')}`,
      description: t('description'),
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
