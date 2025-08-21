'use client'

import { useState, useEffect } from 'react'

import { ModelState } from './types'
import ModelManager from './components/ModelManager'
import TopViewAnalysis from './components/TopViewAnalysis'

import { useLocale } from '@/contexts/LocaleContext'
import { disposeModelInstance } from '@/lib/model-inference'
import MedicalDisclaimer from '@/components/medical-disclaimer'
import ReferenceSources from '@/components/reference-sources'

export default function DetectionPage() {
  const { t } = useLocale()

  const [modelPath, setModelPath] = useState('/models/model_weights_best.onnx')
  const [modelState, setModelState] = useState(ModelState.NOT_LOADED)
  const [confidenceThreshold, setConfidenceThreshold] = useState(0.7)
  const [showModelReadyBanner, setShowModelReadyBanner] = useState(false)
  const [modelLoadError, setModelLoadError] = useState<string | null>(null)
  const [hasAnalysisResult, setHasAnalysisResult] = useState(false)

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
      // Dispose model instance when detection page unmounts
      disposeModelInstance()
    }
  }, [])

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/20'>
      {/* Background Pattern */}
      <div className='absolute inset-0'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05),transparent_50%)]' />
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.04),transparent_50%)]' />
        <div className='absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-200/50 to-transparent' />
      </div>

      <div className='relative z-10'>
        <div className='container mx-auto px-6 py-8'>
          {/* Model Status Banner */}
          {modelState === ModelState.LOADING && (
            <div className='mb-6 p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg'>
              <div className='flex items-center gap-3'>
                <div className='w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin' />
                <div>
                  <p className='text-sm font-medium text-blue-900 dark:text-blue-100'>
                    {t('detection.model.loading')}
                  </p>
                  <p className='text-xs text-blue-700 dark:text-blue-300'>
                    {t('detection.model.loadingHint')}
                  </p>
                </div>
              </div>
            </div>
          )}

          {modelState === ModelState.NOT_LOADED && (
            <div className='mb-6 p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg'>
              <div className='flex items-center gap-3'>
                <div className='w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center'>
                  <span className='text-white text-xs font-bold'>!</span>
                </div>
                <div>
                  <p className='text-sm font-medium text-amber-900 dark:text-amber-100'>
                    {t('detection.model.notLoaded')}
                  </p>
                  <p className='text-xs text-amber-700 dark:text-amber-300'>
                    {t('detection.model.notLoadedHint')}
                  </p>
                </div>
              </div>
            </div>
          )}

          {modelState === ModelState.ERROR && (
            <div className='mb-6 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg'>
              <div className='flex items-start gap-3'>
                <div className='w-5 h-5 bg-red-500 rounded-full flex items-center justify-center mt-0.5'>
                  <span className='text-white text-xs font-bold'>✕</span>
                </div>
                <div className='flex-1'>
                  <p className='text-sm font-medium text-red-900 dark:text-red-100'>
                    {t('detection.model.loadFailed')}
                  </p>
                  <p className='text-xs text-red-700 dark:text-red-300 mt-1'>
                    {t('detection.model.loadFailedHint')}
                  </p>
                  {modelLoadError && (
                    <div className='mt-2 py-2'>
                      <p className='text-xs font-mono text-red-800 dark:text-red-200 break-all'>
                         <strong>{t('detection.model.detailedError')}:</strong> {modelLoadError}
                       </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {showModelReadyBanner && modelState === ModelState.LOADED && (
            <div className='mb-6 p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <div className='w-5 h-5 bg-green-500 rounded-full flex items-center justify-center'>
                    <span className='text-white text-xs'>✓</span>
                  </div>
                  <div>
                    <p className='text-sm font-medium text-green-900 dark:text-green-100'>
                      {t('detection.model.ready')}
                    </p>
                    <p className='text-xs text-green-700 dark:text-green-300'>
                      {t('detection.model.readyHint')}
                    </p>
                  </div>
                </div>
                <button
                  aria-label={t('detection.model.closeBanner')}
                  className='text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200 transition-colors'
                  onClick={() => setShowModelReadyBanner(false)}
                >
                  <span className='text-lg'>×</span>
                </button>
              </div>
            </div>
          )}

          {/* Model Management Section */}
          <ModelManager
            confidenceThreshold={confidenceThreshold}
            modelPath={modelPath}
            modelState={modelState}
            setConfidenceThreshold={setConfidenceThreshold}
            setModelPath={setModelPath}
            setModelState={setModelState}
            onLoadError={setModelLoadError}
          />

          {/* Main Content */}
          <div className='w-full space-y-8'>
            {/* Top View Analysis Section */}
            <TopViewAnalysis
              confidenceThreshold={confidenceThreshold}
              modelPath={modelPath}
              modelState={modelState}
              onAnalysisResultChange={setHasAnalysisResult}
            />
            
            {/* Medical Disclaimer - only show when there's an analysis result */}
            {hasAnalysisResult && (
              <div className='max-w-7xl mx-auto lg:px-8'>
                <MedicalDisclaimer 
                  className='mt-12 sm:mt-16 lg:mt-20'
                  titleKey='detection.medicalDisclaimerTitle'
                  contentKey='detection.medicalDisclaimer'
                />
              </div>
            )}
            
            {/* References - only show when there's an analysis result */}
            {hasAnalysisResult && (
              <div className='max-w-7xl mx-auto lg:px-8'>
                <ReferenceSources 
                  className='mt-8 sm:mt-10 lg:mt-12'
                  titleKey='detection.references.title'
                  sourceKeyPrefix='detection.references'
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
