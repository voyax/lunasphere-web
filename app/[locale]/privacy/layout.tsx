import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'page.privacy' })
  const tSite = await getTranslations({ locale, namespace: 'site' })

  return {
    title: t('title'),
    description: t('description'),
    keywords: [
      '隐私保护',
      '数据安全',
      '婴儿数据隐私',
      '本地处理',
      'privacy policy',
      'data security',
      'baby data privacy',
      'local processing',
      'GDPR compliance',
    ],
    openGraph: {
      title: `${t('title')} - ${tSite('title')}`,
      description: t('description'),
      url: `${locale === 'zh' ? '' : '/en'}/privacy`,
    },
  }
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children
}
