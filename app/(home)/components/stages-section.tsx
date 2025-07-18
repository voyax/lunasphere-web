import { Card, CardBody } from '@heroui/card'

import { getServerTranslation } from '@/lib/i18n-server'
import { SectionAnimations } from '@/components/animations/section-animations'

export async function StagesSection() {
  const t = await getServerTranslation()

  const stages = [
    {
      month: '1month',
      age: '1',
      color: 'from-pink-500 to-rose-500',
      bgColor:
        'from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20',
      icon: (
        <svg
          className='w-8 h-8'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
          />
        </svg>
      ),
    },
    {
      month: '3months',
      age: '3',
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
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1'
          />
        </svg>
      ),
    },
    {
      month: '6months',
      age: '6',
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
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
          />
        </svg>
      ),
    },
    {
      month: '12months',
      age: '12',
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
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z'
          />
        </svg>
      ),
    },
  ]

  return (
    <section
      id='stages'
      className='py-20 bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50 dark:from-green-950/10 dark:via-blue-950/10 dark:to-indigo-950/10'
    >
      <div className='container mx-auto px-4'>
        <SectionAnimations className='text-center mb-16'>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold mb-6'>
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600'>
              {t('stages.title')}
            </span>
          </h2>
          <p className='text-lg md:text-xl text-default-600 max-w-3xl mx-auto'>
            {t('stages.subtitle')}
          </p>
        </SectionAnimations>

        <div className='relative'>
          {/* Timeline line */}
          <div className='absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-pink-400 via-orange-400 via-green-400 to-blue-400 hidden lg:block'></div>
          
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8'>
            {stages.map((stage, index) => (
              <SectionAnimations
                key={stage.month}
                delay={index * 0.2}
                direction={index % 2 === 0 ? 'left' : 'right'}
                className={`lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center ${
                  index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8 lg:text-right'
                }`}
              >
                {/* Timeline node */}
                <div className='hidden lg:block absolute left-1/2 transform -translate-x-1/2'>
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-r ${stage.color} shadow-lg flex items-center justify-center text-white font-bold text-lg`}
                  >
                    {stage.age}
                  </div>
                </div>

                {/* Content card */}
                <div
                  className={`${
                    index % 2 === 0 ? 'lg:col-start-1' : 'lg:col-start-2'
                  }`}
                >
                  <Card
                    className={`bg-gradient-to-br ${stage.bgColor} shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
                  >
                    <CardBody className='p-6'>
                      <div
                        className={`flex items-center ${
                          index % 2 === 0 ? 'lg:justify-start' : 'lg:justify-end'
                        } justify-center mb-4`}
                      >
                        <div
                          className={`w-16 h-16 rounded-full bg-gradient-to-r ${stage.color} flex items-center justify-center text-white shadow-lg lg:hidden`}
                        >
                          {stage.icon}
                        </div>
                        <div className='hidden lg:flex items-center space-x-3'>
                          <div
                            className={`w-12 h-12 rounded-full bg-gradient-to-r ${stage.color} flex items-center justify-center text-white shadow-lg`}
                          >
                            {stage.icon}
                          </div>
                          <div>
                            <h3
                              className={`text-2xl font-bold bg-gradient-to-r ${stage.color} bg-clip-text text-transparent`}
                            >
                              {t(`stages.${stage.month}`)}
                            </h3>
                          </div>
                        </div>
                      </div>
                      
                      <div className='lg:hidden text-center mb-4'>
                        <h3
                          className={`text-2xl font-bold bg-gradient-to-r ${stage.color} bg-clip-text text-transparent`}
                        >
                          {t(`stages.${stage.month}`)}
                        </h3>
                      </div>
                      
                      <p
                        className={`text-base md:text-lg text-default-600 leading-relaxed ${
                        index % 2 === 0 ? 'lg:text-left' : 'lg:text-right'
                        } text-center lg:text-left`}
                      >
                        {t(`stages.${stage.month}.desc`)}
                      </p>
                    </CardBody>
                  </Card>
                </div>
              </SectionAnimations>
            ))}
          </div>
        </div>

        {/* Bottom summary */}
        <SectionAnimations delay={0.8} className='mt-16 text-center'>
          <Card className='bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20 border-none shadow-lg max-w-3xl mx-auto'>
            <CardBody className='p-6'>
              <div className='flex flex-col items-center space-y-4'>
                <div className='w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center'>
                  <svg
                    className='w-6 h-6 text-white'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
                    />
                  </svg>
                </div>
                <p className='text-sm md:text-base text-default-600 max-w-2xl'>
                  <span className='font-semibold'>关键提醒：</span>
                  每个宝宝的发育节奏都不同，这些阶段仅供参考。如果您对宝宝的头型发育有任何担忧，建议及时咨询专业的儿科医生。
                </p>
              </div>
            </CardBody>
          </Card>
        </SectionAnimations>
      </div>
    </section>
  )
} 
