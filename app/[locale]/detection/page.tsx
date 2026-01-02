'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Heart } from 'lucide-react'

import { ModelState } from './types'
import ModelManager from './components/ModelManager'
import TopViewAnalysis from './components/TopViewAnalysis'

import { disposeModelInstance } from '@/lib/model-inference'

export default function DetectionPage() {
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
    <div className='min-h-screen pb-24 selection:bg-orange-100 dark:selection:bg-orange-900/30 relative bg-[#fffaf5] dark:bg-gray-950'>
      {/* Noise texture overlay */}
      <div className='noise-overlay' />

      {/* Decorative floating elements */}
      <div className='absolute top-1/4 left-1/4 opacity-10 dark:opacity-5 animate-float-soft pointer-events-none'>
        <Heart className='w-12 h-12 text-orange-400' />
      </div>

      <div className='relative z-10'>
        {/* Hero Section */}
        <section className='text-center px-6 pt-32 mb-16 relative animate-fade-in'>
          {/* Badge */}
          <div className='inline-flex items-center space-x-2 px-5 py-2 rounded-full bg-white/60 dark:bg-gray-800/60 border border-orange-100 dark:border-orange-900/30 shadow-sm mb-10 transform -rotate-1 hover:rotate-0 transition-transform cursor-default'>
            <div className='w-2 h-2 rounded-full bg-orange-400 animate-pulse' />
            <span className='text-[11px] font-bold tracking-[0.2em] text-orange-500 dark:text-orange-400 uppercase'>
              让科技拥抱新生命
            </span>
          </div>

          {/* Title */}
          <h1 className='text-5xl md:text-7xl font-bold text-gray-800 dark:text-gray-100 tracking-tighter leading-[0.9] mb-8'>
            从头开始，
            <br />
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-400'>
              予你圆满
            </span>
          </h1>

          {/* Subtitle */}
          <p className='max-w-md mx-auto text-gray-400 dark:text-gray-500 text-sm md:text-base leading-relaxed font-medium'>
            基于深度几何算法与纯本地计算，我们为您提供最私密、最温暖的婴儿头型分析服务。
            <br />
            守护宝宝的每一个瞬间，我们与您同行。
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
        <div className='mt-32 max-w-5xl mx-auto px-6'>
          <div className='text-center mb-16'>
            <h3 className='text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4 tracking-tight'>
              我们想为您分担的
            </h3>
            <div className='w-12 h-1.5 bg-orange-200 dark:bg-orange-700 mx-auto rounded-full' />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
            <div className='p-10 rounded-[2.8rem] bg-orange-50 dark:bg-orange-950/30 border border-white dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow'>
              <h4 className='text-lg font-bold text-gray-800 dark:text-gray-100 mb-4'>
                不仅是数据
              </h4>
              <p className='text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-medium'>
                我们将医学指标转化为通俗易懂的家长建议，让您不再为各种指数感到迷茫。
              </p>
            </div>

            <div className='p-10 rounded-[2.8rem] bg-rose-50 dark:bg-rose-950/30 border border-white dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow'>
              <h4 className='text-lg font-bold text-gray-800 dark:text-gray-100 mb-4'>
                绝对的尊重
              </h4>
              <p className='text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-medium'>
                照片仅在您的浏览器中存在，解析完成即销毁。宝宝的每一张照片，我们都倍加珍惜。
              </p>
            </div>

            <div className='p-10 rounded-[2.8rem] bg-purple-50 dark:bg-purple-950/30 border border-white dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow group'>
              <h4 className='text-lg font-bold text-gray-800 dark:text-gray-100 mb-4'>
                科学的陪伴
              </h4>
              <p className='text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-medium mb-4'>
                基于儿科临床共识，提供关于 Tummy Time 和睡姿引导的专业知识库。
              </p>
              <a
                className='inline-flex items-center text-[10px] font-bold text-purple-400 dark:text-purple-300 hover:text-purple-600 dark:hover:text-purple-200 transition-colors'
                href='/faq#references'
              >
                查看参考文献
                <span className='ml-1 opacity-0 group-hover:opacity-100 transition-opacity'>
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
