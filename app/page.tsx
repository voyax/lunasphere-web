import { HeroSection } from '@/app/(home)/components/hero-section'
import { DevelopmentSection } from '@/app/(home)/components/development-section'
import { ClassificationSection } from '@/app/(home)/components/classification-section'
import { StagesSection } from '@/app/(home)/components/stages-section'
import { SleepTipsSection } from '@/app/(home)/components/sleep-tips-section'
import { ScrollNavigation } from '@/components/scroll-navigation'

export default async function Home() {
  return (
    <main className='min-h-screen'>
      <HeroSection />
      <DevelopmentSection />
      <ClassificationSection />
      <StagesSection />
      <SleepTipsSection />
      <ScrollNavigation />
    </main>
  )
}
