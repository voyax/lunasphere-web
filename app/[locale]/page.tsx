'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Heart, BarChart3, Shield, BookOpen } from 'lucide-react'

import { ModelState } from './detection/types'
import ModelManager from './detection/components/ModelManager'
import TopViewAnalysis from './detection/components/TopViewAnalysis'

import { disposeModelInstance } from '@/lib/model-inference'

export default function HomePage() {
  const t = useTranslations('detection')

  const [modelPath, setModelPath] = useState('/models/model_weights_best.onnx')
  const [modelState, setModelState] = useState(ModelState.NOT_LOADED)
  const [confidenceThreshold, setConfidenceThreshold] = useState(0.7)
  const [showModelReadyBanner, setShowModelReadyBanner] = useState(false)
  const [modelLoadError, setModelLoadError] = useState<string | null>(null)

  // Show model ready banner for 5 seconds when model loads
  useEffect(() => {
    if (modelState === ModelState.LOADED) {
      setShowModelReadyBanner(true)
      const timer = setTimeout(() => {
        setShowModelReadyBanner(false)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [modelState])

  // Clear error message when model state changes from ERROR
  useEffect(() => {
    if (modelState !== ModelState.ERROR) {
      setModelLoadError(null)
    }
  }, [modelState])

  // Cleanup model instance when page unmounts to prevent memory leaks
  useEffect(() => {
    return () => {
      disposeModelInstance()
    }
  }, [])

  return (
    <div className='min-h-screen pb-28 md:pb-24 selection:bg-orange-100 dark:selection:bg-orange-900/30 relative bg-[#fffaf5] dark:bg-gray-950'>
      {/* Noise texture overlay */}
      <div className='noise-overlay' />

      {/* Decorative floating elements */}
      <div className='absolute top-1/4 left-1/4 opacity-10 dark:opacity-5 animate-float-soft pointer-events-none'>
        <Heart className='w-12 h-12 text-orange-400' />
      </div>

      <div className='relative z-10'>
        {/* Hero Section */}
        <section className='text-center px-4 sm:px-6 pt-24 md:pt-40 mb-8 md:mb-16 relative animate-fade-in'>

          {/* Title */}
          <h1 className='text-4xl sm:text-5xl md:text-7xl font-bold text-gray-800 dark:text-gray-100 tracking-tighter leading-[0.9] mb-6 md:mb-8'>
            {t('page.title1')}
            <br />
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-400'>
              {t('page.title2')}
            </span>
          </h1>

          {/* Subtitle */}
          <p className='max-w-md mx-auto text-gray-400 dark:text-gray-500 text-sm md:text-base leading-relaxed font-medium'>
            {t('page.subtitle')}
            <br />
            {t('page.subtitle2')}
          </p>
        </section>

        {/* Model Status Banner - minimal design */}
        <div className='max-w-6xl mx-auto px-4 mb-8'>
          {modelState === ModelState.LOADING && (
            <div className='p-4 bg-orange-50/80 dark:bg-orange-950/30 backdrop-blur-sm border border-orange-100 dark:border-orange-800/30 rounded-2xl'>
              <div className='flex items-center gap-3'>
                <div className='w-5 h-5 border-2 border-orange-400 border-t-transparent rounded-full animate-spin' />
                <div>
                  <p className='text-sm font-medium text-orange-700 dark:text-orange-300'>
                    {t('model.loading')}
                  </p>
                  <p className='text-xs text-orange-500/80 dark:text-orange-400/60'>
                    {t('model.loadingHint')}
                  </p>
                </div>
              </div>
            </div>
          )}

          {modelState === ModelState.NOT_LOADED && (
            <div className='p-4 bg-amber-50/80 dark:bg-amber-950/30 backdrop-blur-sm border border-amber-100 dark:border-amber-800/30 rounded-2xl'>
              <div className='flex items-center gap-3'>
                <div className='w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center'>
                  <span className='text-white text-xs font-bold'>!</span>
                </div>
                <div>
                  <p className='text-sm font-medium text-amber-700 dark:text-amber-300'>
                    {t('model.notLoaded')}
                  </p>
                  <p className='text-xs text-amber-500/80 dark:text-amber-400/60'>
                    {t('model.notLoadedHint')}
                  </p>
                </div>
              </div>
            </div>
          )}

          {modelState === ModelState.ERROR && (
            <div className='p-4 bg-red-50/80 dark:bg-red-950/30 backdrop-blur-sm border border-red-100 dark:border-red-800/30 rounded-2xl'>
              <div className='flex items-start gap-3'>
                <div className='w-5 h-5 bg-red-400 rounded-full flex items-center justify-center mt-0.5'>
                  <span className='text-white text-xs font-bold'>✕</span>
                </div>
                <div className='flex-1'>
                  <p className='text-sm font-medium text-red-700 dark:text-red-300'>
                    {t('model.loadFailed')}
                  </p>
                  <p className='text-xs text-red-500/80 dark:text-red-400/60 mt-1'>
                    {t('model.loadFailedHint')}
                  </p>
                  {modelLoadError && (
                    <p className='text-xs font-mono text-red-600/80 dark:text-red-300/80 mt-2 break-all'>
                      {modelLoadError}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {showModelReadyBanner && modelState === ModelState.LOADED && (
            <div className='p-4 bg-green-50/80 dark:bg-green-950/30 backdrop-blur-sm border border-green-100 dark:border-green-800/30 rounded-2xl'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <div className='w-5 h-5 bg-green-400 rounded-full flex items-center justify-center'>
                    <span className='text-white text-xs'>✓</span>
                  </div>
                  <div>
                    <p className='text-sm font-medium text-green-700 dark:text-green-300'>
                      {t('model.ready')}
                    </p>
                    <p className='text-xs text-green-500/80 dark:text-green-400/60'>
                      {t('model.readyHint')}
                    </p>
                  </div>
                </div>
                <button
                  aria-label={t('model.closeBanner')}
                  className='text-green-500 hover:text-green-600 dark:text-green-400 dark:hover:text-green-300 transition-colors'
                  onClick={() => setShowModelReadyBanner(false)}
                >
                  <span className='text-lg'>×</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Model Management Section (hidden by default) */}
        <ModelManager
          confidenceThreshold={confidenceThreshold}
          modelPath={modelPath}
          modelState={modelState}
          setConfidenceThreshold={setConfidenceThreshold}
          setModelPath={setModelPath}
          setModelState={setModelState}
          onLoadError={setModelLoadError}
        />

        {/* Main Analysis Component */}
        <TopViewAnalysis
          confidenceThreshold={confidenceThreshold}
          modelPath={modelPath}
          modelState={modelState}
        />

        {/* Parent Education Feature Cards - Always visible */}
        <div className='mt-16 md:mt-32 max-w-5xl mx-auto'>
          <div className='text-center mb-6 md:mb-16 px-4 sm:px-6'>
            <h3 className='text-xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-3 md:mb-4 tracking-tight'>
              {t('page.featureSection.title')}
            </h3>
            <div className='w-10 md:w-12 h-1 md:h-1.5 bg-orange-200 dark:bg-orange-700 mx-auto rounded-full' />
          </div>

          {/* Mobile: Horizontal scroll | Desktop: Grid */}
          <div className='md:px-6'>
            {/* Mobile horizontal scroll container */}
            <div className='flex md:grid md:grid-cols-3 gap-3 md:gap-10 overflow-x-auto md:overflow-visible px-4 md:px-0 pb-4 md:pb-0 snap-x snap-mandatory scrollbar-hide'>
              {/* Card 1 */}
              <div className='flex-shrink-0 w-[280px] md:w-auto snap-center p-5 md:p-10 rounded-2xl md:rounded-[2.8rem] bg-gradient-to-br from-orange-50 to-amber-50/50 dark:from-orange-950/30 dark:to-amber-950/20 border border-orange-100/50 dark:border-gray-700 shadow-sm hover:shadow-md transition-all active:scale-[0.98] touch-manipulation'>
                <div className='w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-gradient-to-br from-orange-400 to-amber-400 flex items-center justify-center mb-3 md:mb-4 shadow-lg shadow-orange-200/50 dark:shadow-none'>
                  <BarChart3 className='w-5 h-5 md:w-6 md:h-6 text-white' />
                </div>
                <h4 className='text-sm md:text-lg font-bold text-gray-800 dark:text-gray-100 mb-2 md:mb-4'>
                  {t('page.featureSection.card1.title')}
                </h4>
                <p className='text-[11px] md:text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-medium line-clamp-3 md:line-clamp-none'>
                  {t('page.featureSection.card1.desc')}
                </p>
              </div>

              {/* Card 2 */}
              <div className='flex-shrink-0 w-[280px] md:w-auto snap-center p-5 md:p-10 rounded-2xl md:rounded-[2.8rem] bg-gradient-to-br from-rose-50 to-pink-50/50 dark:from-rose-950/30 dark:to-pink-950/20 border border-rose-100/50 dark:border-gray-700 shadow-sm hover:shadow-md transition-all active:scale-[0.98] touch-manipulation'>
                <div className='w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-gradient-to-br from-rose-400 to-pink-400 flex items-center justify-center mb-3 md:mb-4 shadow-lg shadow-rose-200/50 dark:shadow-none'>
                  <Shield className='w-5 h-5 md:w-6 md:h-6 text-white' />
                </div>
                <h4 className='text-sm md:text-lg font-bold text-gray-800 dark:text-gray-100 mb-2 md:mb-4'>
                  {t('page.featureSection.card2.title')}
                </h4>
                <p className='text-[11px] md:text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-medium line-clamp-3 md:line-clamp-none'>
                  {t('page.featureSection.card2.desc')}
                </p>
              </div>

              {/* Card 3 */}
              <div className='flex-shrink-0 w-[280px] md:w-auto snap-center p-5 md:p-10 rounded-2xl md:rounded-[2.8rem] bg-gradient-to-br from-purple-50 to-violet-50/50 dark:from-purple-950/30 dark:to-violet-950/20 border border-purple-100/50 dark:border-gray-700 shadow-sm hover:shadow-md transition-all group active:scale-[0.98] touch-manipulation'>
                <div className='w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-gradient-to-br from-purple-400 to-violet-400 flex items-center justify-center mb-3 md:mb-4 shadow-lg shadow-purple-200/50 dark:shadow-none'>
                  <BookOpen className='w-5 h-5 md:w-6 md:h-6 text-white' />
                </div>
                <h4 className='text-sm md:text-lg font-bold text-gray-800 dark:text-gray-100 mb-2 md:mb-4'>
                  {t('page.featureSection.card3.title')}
                </h4>
                <p className='text-[11px] md:text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-medium line-clamp-3 md:line-clamp-none mb-2 md:mb-4'>
                  {t('page.featureSection.card3.desc')}
                </p>
                <a
                  className='inline-flex items-center text-[10px] font-bold text-purple-400 dark:text-purple-300 hover:text-purple-600 dark:hover:text-purple-200 transition-colors'
                  href='/learn'
                >
                  {t('page.featureSection.card3.link')}
                  <span className='ml-1 group-hover:translate-x-1 transition-transform'>
                    →
                  </span>
                </a>
              </div>
            </div>

            {/* Mobile scroll hint */}
            <div className='flex md:hidden justify-center mt-3 gap-1.5'>
              <div className='w-6 h-1 rounded-full bg-orange-300/60' />
              <div className='w-1.5 h-1 rounded-full bg-gray-300/60' />
              <div className='w-1.5 h-1 rounded-full bg-gray-300/60' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
