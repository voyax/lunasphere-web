import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import LearnPageClient from './LearnPageClient'

type Props = {
    params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: 'page.learn' })
    const tSite = await getTranslations({ locale, namespace: 'site' })

    return {
        title: t('title'),
        description: t('description'),
        keywords: [
            '婴儿头型知识',
            '头型发育',
            '护理指南',
            '俯趴时间',
            '睡姿调整',
            'infant head shape guide',
            'baby head development',
            'tummy time',
            'sleep positioning',
            'plagiocephaly care',
        ],
        openGraph: {
            title: `${t('title')} - ${tSite('title')}`,
            description: t('description'),
            url: `${locale === 'zh' ? '' : '/en'}/learn`,
        },
    }
}

export default async function LearnPage({ params }: Props) {
    const { locale } = await params

    // 启用静态渲染
    setRequestLocale(locale)

    return <LearnPageClient />
}
