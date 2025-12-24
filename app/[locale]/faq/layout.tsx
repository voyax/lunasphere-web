import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

type Props = {
  params: Promise<{ locale: string }>
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
      url: '/faq',
    },
  }
}

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return children
}
