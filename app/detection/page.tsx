'use client'

import { useState } from 'react'
import { Card, CardBody } from '@heroui/card'
import { Chip } from '@heroui/chip'

import ModelManager from './components/ModelManager'
import TopViewAnalysis from './components/TopViewAnalysis'
import ProfileViewComparison from './components/ProfileViewComparison'
import { useLocale } from '@/contexts/LocaleContext'
import type { ImageType, ImageUploadData, AnalysisResult } from './types'

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



  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/20'>
      {/* Background Pattern */}
      <div className='absolute inset-0'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05),transparent_50%)]' />
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.04),transparent_50%)]' />
        <div className='absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-200/50 to-transparent' />
      </div>

      <div className='relative z-10'>
        <div className='container mx-auto px-6 py-12'>
          {/* Hero Section */}
          <div className='text-center mb-20'>
            <h1 className='text-5xl md:text-6xl font-light mb-6 tracking-tight leading-tight'>
              <span className='font-semibold text-gray-900 dark:text-white drop-shadow-sm'>
                {t('detection.hero.title')}
              </span>
            </h1>
            {/* <p className='text-xl text-primary font-medium mb-6'>
              {t('detection.hero.subtitle')}
            </p> */}
            <p className='text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed font-light mb-8'>
              {t('detection.hero.description')}
            </p>
            
            {/* Feature highlights */}
            <div className='flex flex-wrap justify-center gap-4 max-w-2xl mx-auto'>
              <Chip
                variant='flat'
                color='primary'
                size='lg'
                className='px-4 py-2'
              >
                {t('detection.hero.features.ai')}
              </Chip>
              <Chip
                variant='flat'
                color='success'
                size='lg'
                className='px-4 py-2'
              >
                {t('detection.hero.features.privacy')}
              </Chip>
              <Chip
                variant='flat'
                color='secondary'
                size='lg'
                className='px-4 py-2'
              >
                {t('detection.hero.features.professional')}
              </Chip>
            </div>
          </div>

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
