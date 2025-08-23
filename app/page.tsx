import { Metadata } from 'next'

import { HeroSection } from '@/app/(home)/components/hero-section'
import { DevelopmentSection } from '@/app/(home)/components/development-section'
import { ClassificationSection } from '@/app/(home)/components/classification-section'
import { HeadShapesSection } from '@/app/(home)/components/head-shapes-section'
import { SleepTipsSection } from '@/app/(home)/components/sleep-tips-section'
import { ScrollNavigation } from '@/components/scroll-navigation'
import { getServerTranslation, getServerLocale } from '@/lib/i18n-server'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale()
  const t = await getServerTranslation(locale)

  return {
    title: `${t('page.home.title')} - ${t('site.title')}`,
    description: t('page.home.description'),
  }
}

export default async function Home() {
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
