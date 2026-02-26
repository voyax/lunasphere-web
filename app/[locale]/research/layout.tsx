import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'page.research' })
  const tSite = await getTranslations({ locale, namespace: 'site' })

  return {
    title: t('title'),
    description: t('description'),
    keywords: [
      '婴儿头型研究',
      '科研合作',
      '头型评估算法',
      '医学验证',
      'infant head shape research',
      'research collaboration',
      'head shape assessment algorithm',
      'clinical validation',
      'open source medical AI',
    ],
    openGraph: {
      title: `${t('title')} - ${tSite('title')}`,
      description: t('description'),
      url: `${locale === 'zh' ? '' : '/en'}/research`,
    },
  }
}

export default function ResearchLayout({ children }: { children: React.ReactNode }) {
  return children
}
