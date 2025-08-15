import { Card, CardBody } from '@heroui/card'
import { Button } from '@heroui/button'

import { getServerTranslation } from '@/lib/i18n-server'
import { SectionAnimations } from '@/components/animations/section-animations'

export async function SleepTipsSection() {
  const t = await getServerTranslation()

  // Core principles - main content
  const principles = [
    {
      key: 'principle1',
      icon: '🛡️',
      color: 'text-red-600',
      bgColor: 'bg-red-50 dark:bg-red-950/20',
      borderColor: 'border-red-200 dark:border-red-800',
    },
    {
      key: 'principle2',
      icon: '🔄',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
    },
    {
      key: 'principle3',
      icon: '🛏️',
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-950/20',
      borderColor: 'border-green-200 dark:border-green-800',
    },
    {
      key: 'principle4',
      icon: '👁️',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-950/20',
      borderColor: 'border-purple-200 dark:border-purple-800',
    },
  ]

  // Practical techniques
  const techniques = [
    {
      key: 'technique1',
      icon: '🤸',
      color: 'text-violet-600',
      bgColor: 'bg-violet-50 dark:bg-violet-950/20',
    },
    {
      key: 'technique2',
      icon: '🤱',
      color: 'text-sky-600',
      bgColor: 'bg-sky-50 dark:bg-sky-950/20',
    },
    {
      key: 'technique3',
      icon: '🏠',
      color: 'text-teal-600',
      bgColor: 'bg-teal-50 dark:bg-teal-950/20',
    },
    {
      key: 'technique4',
      icon: '✋',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50 dark:bg-amber-950/20',
    },
  ]

  return (
    <section
      className='py-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-950/20'
      id='sleep-tips'
    >
      <div className='container mx-auto px-4 max-w-7xl'>
        {/* Header */}
        <SectionAnimations
          className='text-center mb-16'
          delay={0}
          direction='up'
        >
          <h2 className='text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white'>
            {t('sleep.title')}
          </h2>
          <p className='text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed'>
            {t('sleep.subtitle')}
          </p>
        </SectionAnimations>

        {/* Core Principles Section */}
        <SectionAnimations className='mb-20' delay={0.1} direction='up'>
          <div className='text-center mb-12'>
            <h3 className='text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white'>
              {t('sleep.principles_title')}
            </h3>
            <p className='text-gray-600 dark:text-gray-300 max-w-2xl mx-auto'>
              {t('sleep.principles_subtitle')}
            </p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {principles.map((principle, index) => (
              <SectionAnimations
                key={principle.key}
                delay={index * 0.1}
                direction='up'
              >
                <Card
                  className={`h-full hover:shadow-lg transition-all duration-300 border ${principle.borderColor} ${principle.bgColor}`}
                >
                  <CardBody className='p-6'>
                    <div className='flex items-start space-x-4'>
                      <div className='w-14 h-14 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center flex-shrink-0 shadow-sm'>
                        <span className='text-2xl'>{principle.icon}</span>
                      </div>
                      <div className='flex-1'>
                        <h4
                          className={`text-lg font-semibold mb-3 ${principle.color}`}
                        >
                          {t(`sleep.${principle.key}`)}
                        </h4>
                        <p className='text-gray-600 dark:text-gray-300 leading-relaxed text-sm'>
                          {t(`sleep.${principle.key}.desc`)}
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </SectionAnimations>
            ))}
          </div>
        </SectionAnimations>

        {/* Practical Techniques Section */}
        <SectionAnimations className='mb-16' delay={0.3} direction='up'>
          <div className='text-center mb-12'>
            <h3 className='text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white'>
              {t('sleep.techniques_title')}
            </h3>
            <p className='text-gray-600 dark:text-gray-300 max-w-2xl mx-auto'>
              {t('sleep.techniques_subtitle')}
            </p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {techniques.map((technique, index) => (
              <SectionAnimations
                key={technique.key}
                delay={index * 0.1}
                direction='up'
              >
                <Card
                  className={`hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-700 ${technique.bgColor}`}
                >
                  <CardBody className='p-5'>
                    <div className='flex items-start space-x-3'>
                      <div className='w-12 h-12 rounded-lg bg-white dark:bg-gray-800 flex items-center justify-center flex-shrink-0 shadow-sm'>
                        <span className='text-xl'>{technique.icon}</span>
                      </div>
                      <div className='flex-1'>
                        <h4
                          className={`text-base font-semibold mb-2 ${technique.color}`}
                        >
                          {t(`sleep.${technique.key}`)}
                        </h4>
                        <p className='text-gray-600 dark:text-gray-300 leading-relaxed text-sm'>
                          {t(`sleep.${technique.key}.desc`)}
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </SectionAnimations>
            ))}
          </div>
        </SectionAnimations>

        {/* Call to Action */}
        <SectionAnimations className='text-center' delay={0.5} direction='up'>
          <div className='bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800'>
            <h3 className='text-2xl font-semibold mb-4 text-gray-900 dark:text-white'>
              {t('sleep.cta_title')}
            </h3>
            <p className='text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed'>
              {t('sleep.cta_description')}
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Button
                as='a'
                className='font-medium'
                color='primary'
                href='/detection'
                size='lg'
              >
                {t('button.test-now')}
              </Button>
              <Button className='font-medium' size='lg' variant='bordered'>
                {t('button.contact')}
              </Button>
            </div>
          </div>
        </SectionAnimations>
      </div>
    </section>
  )
}
