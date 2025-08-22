import { Metadata } from 'next'

import { getServerTranslation, getServerLocale } from '@/lib/i18n-server'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale()
  const t = await getServerTranslation(locale)

  return {
    title: t('page.faq.title'),
    description: t('page.faq.description'),
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
      title: `${t('page.faq.title')} - ${t('site.title')}`,
      description: t('page.faq.description'),
      url: '/faq',
    },
  }
}

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return children
}
