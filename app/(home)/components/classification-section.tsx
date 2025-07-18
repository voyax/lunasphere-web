import { Card, CardBody, CardHeader } from '@heroui/card'

import { getServerTranslation } from '@/lib/i18n-server'
import { SectionAnimations } from '@/components/animations/section-animations'

export async function ClassificationSection() {
  const t = await getServerTranslation()

  const headShapeTypes = [
    {
      type: 'normal',
      color: 'from-green-500 to-emerald-500',
      bgColor:
        'from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20',
      visual: (
        <div className='w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-400 mx-auto shadow-lg'>
          <div className='w-full h-full rounded-full border-4 border-white/30 flex items-center justify-center'>
            <div className='w-4 h-4 bg-white rounded-full opacity-80'></div>
          </div>
        </div>
      ),
    },
    {
      type: 'flat',
      color: 'from-orange-500 to-red-500',
      bgColor:
        'from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20',
      visual: (
        <div className='w-24 h-16 rounded-t-full bg-gradient-to-br from-orange-400 to-red-400 mx-auto shadow-lg'>
          <div className='w-full h-full rounded-t-full border-4 border-white/30 flex items-center justify-center'>
            <div className='w-4 h-4 bg-white rounded-full opacity-80'></div>
          </div>
        </div>
      ),
    },
    {
      type: 'oblique',
      color: 'from-blue-500 to-purple-500',
      bgColor:
        'from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20',
      visual: (
        <div
          className='w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-400 mx-auto shadow-lg'
          style={{ borderRadius: '50% 50% 50% 20%' }}
        >
          <div
            className='w-full h-full border-4 border-white/30 flex items-center justify-center'
            style={{ borderRadius: '50% 50% 50% 20%' }}
          >
            <div className='w-4 h-4 bg-white rounded-full opacity-80'></div>
          </div>
        </div>
      ),
    },
    {
      type: 'boat',
      color: 'from-purple-500 to-pink-500',
      bgColor:
        'from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20',
      visual: (
        <div className='w-32 h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 mx-auto shadow-lg'>
          <div className='w-full h-full rounded-full border-4 border-white/30 flex items-center justify-center'>
            <div className='w-4 h-4 bg-white rounded-full opacity-80'></div>
          </div>
        </div>
      ),
    },
  ]

  return (
    <section
      id='classification'
      className='py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-purple-950/10 dark:via-pink-950/10 dark:to-orange-950/10'
    >
      <div className='container mx-auto px-4'>
        <SectionAnimations className='text-center mb-16'>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold mb-6'>
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600'>
              {t('classification.title')}
            </span>
          </h2>
          <p className='text-lg md:text-xl text-default-600 max-w-3xl mx-auto'>
            {t('classification.subtitle')}
          </p>
        </SectionAnimations>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {headShapeTypes.map((shape, index) => (
            <SectionAnimations key={shape.type} delay={index * 0.1}>
              <Card
                className={`h-full bg-gradient-to-br ${shape.bgColor} shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              >
                <CardHeader className='pb-2'>
                  <div className='w-full text-center'>{shape.visual}</div>
                </CardHeader>
                <CardBody className='px-6 pb-6'>
                  <div className='text-center space-y-3'>
                    <h3
                      className={`text-xl font-bold bg-gradient-to-r ${shape.color} bg-clip-text text-transparent`}
                    >
                      {t(`classification.${shape.type}`)}
                    </h3>
                    <p className='text-sm md:text-base text-default-600 leading-relaxed'>
                      {t(`classification.${shape.type}.desc`)}
                    </p>
                  </div>
                </CardBody>
              </Card>
            </SectionAnimations>
          ))}
        </div>

        {/* Bottom reminder */}
        <SectionAnimations delay={0.6} className='mt-16 text-center'>
          <Card className='bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-none shadow-lg max-w-2xl mx-auto'>
            <CardBody className='p-6'>
              <div className='flex items-center justify-center space-x-3'>
                <div className='w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center'>
                  <svg
                    className='w-4 h-4 text-white'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                </div>
                <p className='text-sm md:text-base text-default-600'>
                  <span className='font-semibold'>重要提示：</span>
                  大多数头型变化都是正常的发育过程，如有疑虑请咨询专业儿科医生。
                </p>
              </div>
            </CardBody>
          </Card>
        </SectionAnimations>
      </div>
    </section>
  )
} 
