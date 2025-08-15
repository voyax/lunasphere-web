import Image from 'next/image'

import { getServerTranslation } from '@/lib/i18n-server'
import { SectionAnimations } from '@/components/animations/section-animations'

export async function HeadShapesSection() {
  const t = await getServerTranslation()

  // Head shape types with their example images
  const headShapeTypes = [
    {
      id: 'normal',
      title: t('classification.normal'),
      color: 'from-green-500 to-emerald-500',
      bgColor:
        'from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20',
      category: 'normal',
      images: [
        {
          src: '/images/head-examples/normal_head_shape_0-3months.webp',
          alt: t('classification.normal.image_placeholder'),
          captionKey: 'examples.normal.3month',
        },
        {
          src: '/images/head-examples/normal_head_shape_6months.webp',
          alt: t('classification.normal.image_placeholder'),
          captionKey: 'examples.normal.6month',
        },
        {
          src: '/images/head-examples/normal_head_shape_9months.webp',
          alt: t('classification.normal.image_placeholder'),
          captionKey: 'examples.normal.9month',
        },
      ],
    },
    {
      id: 'brachycephaly',
      title: t('classification.brachycephaly'),
      color: 'from-orange-500 to-red-500',
      bgColor:
        'from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20',
      category: 'positional',
      images: [
        {
          src: '/images/head-examples/brachycephaly_front_view.png',
          alt: t('classification.brachycephaly.image_placeholder'),
          captionKey: 'examples.brachycephaly.front_view',
        },
        {
          src: '/images/head-examples/brachycephaly_profile_view.png',
          alt: t('classification.brachycephaly.image_placeholder'),
          captionKey: 'examples.brachycephaly.profile_view',
        },
        {
          src: '/images/head-examples/brachycephaly_top_view.png',
          alt: t('classification.brachycephaly.image_placeholder'),
          captionKey: 'examples.brachycephaly.top_view',
        },
      ],
    },
    {
      id: 'plagiocephaly',
      title: t('classification.plagiocephaly'),
      color: 'from-blue-500 to-indigo-500',
      bgColor:
        'from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20',
      category: 'positional',
      images: [
        {
          src: '/images/head-examples/plagiocephaly_front_view.png',
          alt: t('classification.plagiocephaly.image_placeholder'),
          captionKey: 'examples.plagiocephaly.front_view',
        },
        {
          src: '/images/head-examples/plagiocephaly_profile_view.png',
          alt: t('classification.plagiocephaly.image_placeholder'),
          captionKey: 'examples.plagiocephaly.profile_view',
        },
        {
          src: '/images/head-examples/plagiocephaly_top_view.png',
          alt: t('classification.plagiocephaly.image_placeholder'),
          captionKey: 'examples.plagiocephaly.top_view',
        },
      ],
    },
    {
      id: 'dolichocephaly',
      title: t('classification.dolichocephaly'),
      color: 'from-emerald-500 to-green-500',
      bgColor:
        'from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20',
      category: 'positional',
      images: [
        {
          src: '/images/head-examples/dolichocephaly_front_view.png',
          alt: t('classification.dolichocephaly.image_placeholder'),
          captionKey: 'examples.dolichocephaly.front_view',
        },
        {
          src: '/images/head-examples/dolichocephaly_profile_view.png',
          alt: t('classification.dolichocephaly.image_placeholder'),
          captionKey: 'examples.dolichocephaly.profile_view',
        },
        {
          src: '/images/head-examples/dolichocephaly_top_view.png',
          alt: t('classification.dolichocephaly.image_placeholder'),
          captionKey: 'examples.dolichocephaly.top_view',
        },
      ],
    },
    {
      id: 'scaphocephaly',
      title: t('classification.scaphocephaly'),
      color: 'from-red-500 to-pink-500',
      bgColor:
        'from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20',
      category: 'pathological',
      images: [
        {
          src: '/images/head-examples/scaphocephaly_3D_1.png',
          alt: t('classification.scaphocephaly.image_placeholder'),
          captionKey: 'examples.scaphocephaly.3D_1',
        },
        {
          src: '/images/head-examples/scaphocephaly_3D_2.png',
          alt: t('classification.scaphocephaly.image_placeholder'),
          captionKey: 'examples.scaphocephaly.3D_2',
        },
        {
          src: '/images/head-examples/scaphocephaly_3D_3.png',
          alt: t('classification.scaphocephaly.image_placeholder'),
          captionKey: 'examples.scaphocephaly.3D_3',
        },
      ],
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
              {t('examples.title')}
            </span>
          </h2>
          <p className='text-lg md:text-xl text-default-600 max-w-3xl mx-auto'>
            {t('examples.subtitle')}
          </p>
        </SectionAnimations>

        <div className='space-y-16'>
          {headShapeTypes.map((headShape, index) => (
            <SectionAnimations
              key={headShape.id}
              delay={index * 0.2}
              className='w-full'
            >
              <div className='relative'>
                {/* Background decoration - Minimal dots pattern */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${headShape.bgColor} rounded-3xl opacity-10`}
                />
                {/* Balanced decorative dots */}
                <div
                  className={`absolute top-8 right-12 w-3 h-3 bg-gradient-to-br ${headShape.color} opacity-25 rounded-full`}
                />
                <div
                  className={`absolute bottom-12 left-16 w-4 h-4 bg-gradient-to-br ${headShape.color} opacity-20 rounded-full`}
                />
                <div
                  className={`absolute top-1/3 right-1/4 w-2 h-2 bg-gradient-to-br ${headShape.color} opacity-30 rounded-full`}
                />
                <div
                  className={`absolute bottom-1/4 right-1/3 w-1.5 h-1.5 bg-gradient-to-br ${headShape.color} opacity-15 rounded-full`}
                />

                {/* Content container */}
                <div className='relative z-10 p-6 lg:p-8'>
                  {/* Content */}
                  <div className='relative z-10'>
                    {/* Header section */}
                    <div className='mb-8'>
                      <div className='text-center'>
                        <div className='flex items-center justify-center gap-3 flex-wrap'>
                          <h3
                            className={`text-2xl lg:text-3xl font-bold bg-gradient-to-r ${headShape.color} bg-clip-text text-transparent`}
                          >
                            {headShape.title}
                          </h3>
                          <span
                            className={`text-xs px-2 py-1 rounded-md font-medium ${
                              headShape.category === 'normal'
                                ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/20 dark:text-blue-400'
                                : headShape.category === 'positional'
                                  ? 'bg-green-50 text-green-600 dark:bg-green-950/20 dark:text-green-400'
                                  : 'bg-red-50 text-red-600 dark:bg-red-950/20 dark:text-red-400'
                            }`}
                          >
                            {t(`classification.category.${headShape.category}`)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Images gallery */}
                    <div
                      className={`grid gap-8 ${
                        headShape.images.length === 1
                          ? 'grid-cols-1 max-w-lg mx-auto'
                          : headShape.images.length === 2
                            ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto'
                            : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
                      }`}
                    >
                      {headShape.images.map((image, imageIndex) => (
                        <div key={imageIndex} className='group'>
                          {/* Image container */}
                          <div className='relative w-full aspect-[4/3] bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 border border-white/10'>
                            <div className='absolute inset-0 flex items-center justify-center'>
                              <div className='text-center text-gray-400 dark:text-gray-500'>
                                <svg
                                  className='w-20 h-20 mx-auto mb-4 opacity-50'
                                  fill='none'
                                  stroke='currentColor'
                                  viewBox='0 0 24 24'
                                >
                                  <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={1.5}
                                    d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                                  />
                                </svg>
                                <p className='text-sm font-medium opacity-70'>
                                  {t('examples.image_placeholder')}
                                </p>
                              </div>
                            </div>
                            {/* Uncomment when actual images are available */}
                            <Image
                              fill
                              alt={image.alt}
                              className='object-contain group-hover:scale-105 transition-transform duration-300'
                              sizes='(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw'
                              src={image.src}
                            />
                          </div>

                          {/* Image caption */}
                          <div className='mt-3 text-center'>
                            <h4 className='text-xs text-gray-500 dark:text-gray-400'>
                              {t(image.captionKey)}
                            </h4>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Medical note for scaphocephaly */}
                    {headShape.id === 'scaphocephaly' && (
                      <div className='mt-6 p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg'>
                        <div className='flex items-start justify-center gap-3'>
                          <div className='w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                            <span className='text-white text-xs font-bold'>!</span>
                          </div>
                          <p className='text-sm font-medium text-amber-800 dark:text-amber-200'>
                            {t('examples.scaphocephaly.medical_note')}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </SectionAnimations>
          ))}
        </div>
      </div>
    </section>
  )
}
