import { Card, CardBody } from '@heroui/card'
import { Button } from '@heroui/button'

import { getServerTranslation } from '@/lib/i18n-server'
import { SectionAnimations } from '@/components/animations/section-animations'

export async function SleepTipsSection() {
  const t = await getServerTranslation()

  const tips = [
    {
      key: 'tip1',
      color: 'from-rose-500 to-pink-500',
      bgColor:
        'from-rose-50 to-pink-50 dark:from-rose-950/20 dark:to-pink-950/20',
      icon: (
        <svg
          className='w-8 h-8'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
          />
        </svg>
      ),
    },
    {
      key: 'tip2',
      color: 'from-orange-500 to-amber-500',
      bgColor:
        'from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20',
      icon: (
        <svg
          className='w-8 h-8'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            d='M14.828 14.828a4 4 0 01-5.656 0M9 10h1.5a1.5 1.5 0 011.5 1.5V14a1.5 1.5 0 01-1.5 1.5H9m3.5-6V9a1.5 1.5 0 011.5-1.5h1.5a1.5 1.5 0 011.5 1.5v1.5M12 12.5V17m0 4.5c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
          />
        </svg>
      ),
    },
    {
      key: 'tip3',
      color: 'from-emerald-500 to-green-500',
      bgColor:
        'from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20',
      icon: (
        <svg
          className='w-8 h-8'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
          />
        </svg>
      ),
    },
    {
      key: 'tip4',
      color: 'from-blue-500 to-indigo-500',
      bgColor:
        'from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20',
      icon: (
        <svg
          className='w-8 h-8'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
          />
        </svg>
      ),
    },
  ]

  return (
    <section
      className='py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/10 dark:via-purple-950/10 dark:to-pink-950/10'
      id='sleep-tips'
    >
      <div className='container mx-auto px-4'>
        <SectionAnimations
          className='text-center mb-16'
          initial={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold mb-6'>
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600'>
              {t('sleep.title')}
            </span>
          </h2>
          <p className='text-lg md:text-xl text-default-600 max-w-3xl mx-auto'>
            {t('sleep.subtitle')}
          </p>
        </SectionAnimations>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16'>
          {tips.map((tip, index) => (
            <SectionAnimations
              key={tip.key}
              initial={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <Card
                className={`h-full bg-gradient-to-br ${tip.bgColor} shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              >
                <CardBody className='p-6'>
                  <div className='flex flex-col items-center text-center space-y-4'>
                    <div
                      className={`w-16 h-16 rounded-full bg-gradient-to-r ${tip.color} flex items-center justify-center text-white shadow-lg`}
                    >
                      {tip.icon}
                    </div>
                    <h3
                      className={`text-xl font-bold bg-gradient-to-r ${tip.color} bg-clip-text text-transparent`}
                    >
                      {t(`sleep.${tip.key}`)}
                    </h3>
                    <p className='text-sm md:text-base text-default-600 leading-relaxed'>
                      {t(`sleep.${tip.key}.desc`)}
                    </p>
                  </div>
                </CardBody>
              </Card>
            </SectionAnimations>
          ))}
        </div>

        {/* Practical tools area */}
        <SectionAnimations
          className='text-center'
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <Card className='bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-none shadow-lg max-w-4xl mx-auto'>
            <CardBody className='p-8'>
              <div className='space-y-6'>
                <div className='flex items-center justify-center space-x-3'>
                  <div className='w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center'>
                    <svg
                      className='w-6 h-6 text-white'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                      />
                    </svg>
                  </div>
                  <h3 className='text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600'>
                    实用资源
                  </h3>
                </div>

                <p className='text-base md:text-lg text-default-600 max-w-2xl mx-auto'>
                  除了正确的睡姿，定期的观察和记录也很重要。建议家长们建立头型观察日记，记录宝宝的睡眠习惯和头型变化。
                </p>

                <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                  <Button
                    className='bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-8 py-6'
                    radius='full'
                    size='lg'
                  >
                    {t('button.test-now')}
                  </Button>

                  <Button
                    className='border-2 border-purple-300 text-purple-600 dark:text-purple-400 px-8 py-6'
                    radius='full'
                    size='lg'
                    variant='bordered'
                  >
                    {t('button.contact')}
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </SectionAnimations>

        {/* Bottom important reminder */}
        <SectionAnimations
          className='mt-12 text-center'
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <Card className='bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-2 border-amber-200 dark:border-amber-800 shadow-lg max-w-3xl mx-auto'>
            <CardBody className='p-6'>
              <div className='flex items-center justify-center space-x-3'>
                <div className='w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center'>
                  <svg
                    className='w-4 h-4 text-white'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                    />
                  </svg>
                </div>
                <p className='text-sm md:text-base text-default-700 font-medium'>
                  <span className='font-bold'>安全提醒：</span>
                  请始终遵循&ldquo;仰卧睡眠&rdquo;的安全原则，趴卧练习仅在宝宝清醒且有成人监护的情况下进行。
                </p>
              </div>
            </CardBody>
          </Card>
        </SectionAnimations>
      </div>
    </section>
  )
}
