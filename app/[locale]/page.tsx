import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { HeroSection } from '@/app/[locale]/(home)/components/hero-section'
import { DevelopmentSection } from '@/app/[locale]/(home)/components/development-section'
import { ClassificationSection } from '@/app/[locale]/(home)/components/classification-section'
import { HeadShapesSection } from '@/app/[locale]/(home)/components/head-shapes-section'
import { SleepTipsSection } from '@/app/[locale]/(home)/components/sleep-tips-section'
import { ScrollNavigation } from '@/components/scroll-navigation'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'page.home' })
  const tSite = await getTranslations({ locale, namespace: 'site' })

  return {
    title: `${t('title')} - ${tSite('title')}`,
    description: t('description'),
  }
}

export default async function Home({ params }: Props) {
  const { locale } = await params
  
  // 启用静态渲染
  setRequestLocale(locale)

  return (
    <main className='min-h-screen w-full max-w-full overflow-x-hidden'>
      <HeroSection />
      <DevelopmentSection />
      <ClassificationSection />
      <HeadShapesSection />
      <SleepTipsSection />
      <ScrollNavigation />
    </main>
  )
}


