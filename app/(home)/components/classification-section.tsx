import { Card, CardBody, CardHeader } from '@heroui/card'
import Image from 'next/image'

import { getServerTranslation } from '@/lib/i18n-server'
import { SectionAnimations } from '@/components/animations/section-animations'

const getHeadShapeImages = (type: string) => {
  return {
    flat: '/images/head-shape-flat.svg',
    oblique: '/images/head-shape-oblique.svg',
    boat: '/images/head-shape-boat.svg',
  }[type]
}

export async function ClassificationSection() {
  const t = await getServerTranslation()

  const headShapeVariations = [
    {
      type: 'brachycephaly',
      color: 'from-orange-500 to-red-500',
      bgColor:
        'from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20',
      severity: 'common',
      category: 'positional',
    },
    {
      type: 'plagiocephaly',
      color: 'from-blue-500 to-purple-500',
      bgColor:
        'from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20',
      severity: 'common',
      category: 'positional',
    },
    {
      type: 'dolichocephaly',
      color: 'from-green-500 to-teal-500',
      bgColor:
        'from-green-50 to-teal-50 dark:from-green-950/20 dark:to-teal-950/20',
      severity: 'moderate',
      category: 'positional',
    },
    {
      type: 'scaphocephaly',
      color: 'from-purple-500 to-pink-500',
      bgColor:
        'from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20',
      severity: 'rare',
      category: 'pathological',
    },
  ]

  return (
    <section
      className='py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-purple-950/10 dark:via-pink-950/10 dark:to-orange-950/10'
      id='classification'
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

        <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8'>
          {headShapeVariations.map((shape, index) => (
            <SectionAnimations key={shape.type} delay={index * 0.1}>
              <Card
                className={`h-full bg-gradient-to-br ${shape.bgColor} shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              >
                <CardHeader className='pb-4'>
                  <div className='w-full space-y-4'>
                    {/* Image placeholder */}
                    <div className='relative w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-lg overflow-hidden'>
                      <div className='absolute inset-0 flex items-center justify-center'>
                        <div className='text-center space-y-2'>
                          <div className='w-16 h-16 mx-auto bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center'>
                            <svg className='w-8 h-8 text-gray-500 dark:text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' />
                            </svg>
                          </div>
                          <p className='text-xs text-gray-500 dark:text-gray-400'>
                            {t(`classification.${shape.type}.image_placeholder`)}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Severity and category labels */}
                    <div className='flex justify-center gap-2'>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        shape.severity === 'common' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' :
                        shape.severity === 'moderate' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                        'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                      }`}>
                        {t(`classification.severity.${shape.severity}`)}
                      </span>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded ${
                          shape.category === 'positional'
                            ? 'bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-300'
                            : 'bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-300'
                        }`}
                      >
                        {t(`classification.category.${shape.category}`)}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardBody className='px-6 pb-6'>
                  <div className='space-y-4'>
                    <div className='space-y-3'>
                      <h3
                        className={`text-xl font-bold bg-gradient-to-r ${shape.color} bg-clip-text text-transparent text-center`}
                      >
                        {t(`classification.${shape.type}`)}
                      </h3>
                      

                    </div>
                    
                    {/* Description */}
                    <div className='space-y-2'>
                      <h4 className='text-sm font-semibold text-default-700 flex items-center gap-2'>
                        <span className='w-2 h-2 bg-blue-500 rounded-full'></span>
                        {t('classification.description_label')}
                      </h4>
                      <div className='bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400 dark:bg-blue-950/20 dark:border-blue-500'>
                        <p className='text-sm text-default-600 leading-relaxed'>
                          <span className='font-semibold text-blue-800 dark:text-blue-300'>
                            {t(`classification.${shape.type}.description`).split('，')[0]}，
                          </span>
                          {t(`classification.${shape.type}.description`).split('，').slice(1).join('，')}
                        </p>
                      </div>
                    </div>
                    
                    {/* Causes */}
                    <div className='space-y-2'>
                      <h4 className='text-sm font-semibold text-default-700 flex items-center gap-2'>
                        <span className='w-2 h-2 bg-orange-500 rounded-full'></span>
                        {t('classification.causes_label')}
                      </h4>
                      <div className='bg-orange-50 p-3 rounded-lg border-l-4 border-orange-400 dark:bg-orange-950/20 dark:border-orange-500'>
                        <p className='text-sm text-default-600 leading-relaxed'>
                          {t(`classification.${shape.type}.causes`)}
                        </p>
                      </div>
                    </div>
                    
                    {/* Correction methods */}
                    <div className='space-y-2'>
                      <h4 className='text-sm font-semibold text-default-700 flex items-center gap-2'>
                        <span className='w-2 h-2 bg-green-500 rounded-full'></span>
                        {t('classification.correction_label')}
                      </h4>
                      <div className='bg-green-50 p-3 rounded-lg border-l-4 border-green-400 dark:bg-green-950/20 dark:border-green-500'>
                        <p className='text-sm text-default-600 leading-relaxed'>
                          <span className='font-semibold text-green-800 dark:text-green-300'>
                            {t(`classification.${shape.type}.correction`).split('。')[0]}。
                          </span>
                          {t(`classification.${shape.type}.correction`).split('。').slice(1).join('。')}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </SectionAnimations>
          ))}
        </div>

        {/* Bottom reminders */}
        <SectionAnimations delay={0.6} className='mt-16 space-y-6'>
          {/* Positional head shape reminder */}
          <Card className='bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 border border-green-200 dark:border-green-800 shadow-lg max-w-3xl mx-auto'>
            <CardBody className='p-6'>
              <div className='flex items-start space-x-3'>
                <div className='w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1 dark:bg-green-900/30'>
                  <svg className='w-5 h-5 text-green-600 dark:text-green-400' fill='currentColor' viewBox='0 0 20 20'>
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
                <div className='text-left space-y-2'>
                  <h3 className='text-lg font-semibold text-green-800 dark:text-green-300'>
                    {t('classification.reminder_title')}
                  </h3>
                  <p className='text-sm md:text-base text-green-700 dark:text-green-400'>
                    <span className='font-semibold bg-green-100 px-2 py-1 rounded dark:bg-green-900/30'>
                      {t('classification.reminder_content').split('，')[0]}，
                    </span>
                    {t('classification.reminder_content').split('，').slice(1).join('，')}
                  </p>
                  <p className='text-xs md:text-sm text-green-600 dark:text-green-500'>
                    {t('classification.reminder_note')}
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
          
          {/* Pathological head shape warning */}
          <Card className='bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-200 dark:border-amber-800 shadow-lg max-w-3xl mx-auto'>
            <CardBody className='p-6'>
              <div className='flex items-start space-x-3'>
                <div className='w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1 dark:bg-amber-900/30'>
                  <svg className='w-5 h-5 text-amber-600 dark:text-amber-400' fill='currentColor' viewBox='0 0 20 20'>
                    <path fillRule='evenodd' d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z' clipRule='evenodd' />
                  </svg>
                </div>
                <div className='text-left space-y-2'>
                  <h3 className='text-lg font-semibold text-amber-800 dark:text-amber-300'>
                    {t('classification.medical_warning_title')}
                  </h3>
                  <p className='text-sm md:text-base text-amber-700 dark:text-amber-400'>
                    {t('classification.medical_warning_content')}
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </SectionAnimations>
      </div>
    </section>
  )
}
