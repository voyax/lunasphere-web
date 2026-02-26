import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { JsonLd } from '@/components/json-ld'

type Props = {
  params: Promise<{ locale: string }>
  children: React.ReactNode
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
      url: `${locale === 'zh' ? '' : '/en'}/detection`,
    },
  }
}

export default async function DetectionLayout({ children, params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'page.detection' })
  const tSite = await getTranslations({ locale, namespace: 'site' })

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: t('title'),
          description: t('description'),
          url: `https://head.melolib.com${locale === 'zh' ? '' : '/en'}/detection`,
          inLanguage: locale === 'zh' ? 'zh-CN' : 'en-US',
          applicationCategory: 'HealthApplication',
          operatingSystem: 'Any',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
          publisher: {
            '@type': 'Organization',
            name: tSite('title'),
            url: 'https://head.melolib.com',
          },
        }}
      />
      {children}
    </>
  )
}
