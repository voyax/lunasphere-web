'use client'

import type { ImageType, ImageUploadData, AnalysisResult } from './types'

import { useState, useEffect } from 'react'

import ModelManager from './components/ModelManager'
import TopViewAnalysis from './components/TopViewAnalysis'
import ProfileViewComparison from './components/ProfileViewComparison'

import { useLocale } from '@/contexts/LocaleContext'

export default function DetectionPage() {
  const { t } = useLocale()
  const [images, setImages] = useState<
    Record<ImageType, ImageUploadData | null>
  >({
    top: null,
    left: null,
    right: null,
  })
  const [currentStep, setCurrentStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  )

  const [modelPath, setModelPath] = useState('/models/model_weights_best.onnx')
  const [isModelLoaded, setIsModelLoaded] = useState(false)
  const [isLoadingModel, setIsLoadingModel] = useState(false)
  const [confidenceThreshold, setConfidenceThreshold] = useState(0.7)
  const [showModelReadyBanner, setShowModelReadyBanner] = useState(false)

  // Show model ready banner for 5 seconds when model loads
  useEffect(() => {
    if (isModelLoaded && !isLoadingModel) {
      setShowModelReadyBanner(true)
      const timer = setTimeout(() => {
        setShowModelReadyBanner(false)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [isModelLoaded, isLoadingModel])

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
          {isLoadingModel && (
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

          {!isModelLoaded && !isLoadingModel && (
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

          {showModelReadyBanner && isModelLoaded && !isLoadingModel && (
            <div className='mb-6 p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg transition-all duration-300'>
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
            isLoadingModel={isLoadingModel}
            isModelLoaded={isModelLoaded}
            modelPath={modelPath}
            setConfidenceThreshold={setConfidenceThreshold}
            setIsLoadingModel={setIsLoadingModel}
            setIsModelLoaded={setIsModelLoaded}
            setModelPath={setModelPath}
          />

          {/* Main Content */}
          <div className='w-full space-y-24'>
            {/* Top View Analysis Section */}
            <TopViewAnalysis
              analysisResult={analysisResult}
              confidenceThreshold={confidenceThreshold}
              currentStep={currentStep}
              images={images}
              isLoadingModel={isLoadingModel}
              isModelLoaded={isModelLoaded}
              isProcessing={isProcessing}
              modelPath={modelPath}
              setAnalysisResult={setAnalysisResult}
              setCurrentStep={setCurrentStep}
              setImages={setImages}
              setIsProcessing={setIsProcessing}
            />

            {/* Side View Comparison Section */}
            <ProfileViewComparison />
          </div>
        </div>
      </div>
    </div>
  )
}
