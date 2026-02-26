import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { JsonLd } from '@/components/json-ld'

type Props = {
  params: Promise<{ locale: string }>
  children: React.ReactNode
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'page.faq' })
  const tSite = await getTranslations({ locale, namespace: 'site' })

  return {
    title: t('title'),
    description: t('description'),
    keywords: [
      '婴儿头型常见问题',
      '头型发育FAQ',
      '扁头综合征',
      '斜头畸形',
      '婴儿护理问题',
      '新生儿头型',
      'infant head shape FAQ',
      'plagiocephaly questions',
      'brachycephaly FAQ',
      'baby care questions',
    ],
    openGraph: {
      title: `${t('title')} - ${tSite('title')}`,
      description: t('description'),
      url: `${locale === 'zh' ? '' : '/en'}/faq`,
    },
  }
}

export default async function FAQLayout({ children, params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'faq' })

  const faqItems = [
    { q: t('about.question'), a: t('about.answer') },
    { q: t('photoTips.question'), a: t('photoTips.answer') },
    { q: t('detectionFailed.question'), a: t('detectionFailed.answer') },
    { q: t('whatIsCICVAI.question'), a: t('whatIsCICVAI.answer') },
    { q: t('abnormalResult.question'), a: t('abnormalResult.answer') },
    { q: t('howOften.question'), a: t('howOften.answer') },
    { q: t('deviceSupport.question'), a: t('deviceSupport.answer') },
    { q: t('privacy.question'), a: t('privacy.answer') },
  ]

  // Strip markdown from answers for JSON-LD
  const stripMarkdown = (text: string) =>
    text.replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqItems.map(({ q, a }) => ({
            '@type': 'Question' as const,
            name: q,
            acceptedAnswer: {
              '@type': 'Answer' as const,
              text: stripMarkdown(a),
            },
          })),
        }}
      />
      {children}
    </>
  )
}
