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
        title: `${t('title')} - ${tSite('title')}`,
        description: t('description'),
    }
}

export default async function LearnPage({ params }: Props) {
    const { locale } = await params

    // 启用静态渲染
    setRequestLocale(locale)

    return <LearnPageClient />
}
