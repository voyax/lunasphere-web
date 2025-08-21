'use client'

import type { ImageUploadData, AnalysisResult } from '../types'

import { useState, useRef, memo, useMemo, useCallback, useEffect } from 'react'
import { Button } from '@heroui/button'
import { Tooltip } from '@heroui/tooltip'
import { Upload, Camera, CheckCircle } from 'lucide-react'
import NextImage from 'next/image'

import { ModelState, AnalysisState } from '../types'

import RotationControl from './RotationControl'
import {
  drawMeasurementAnnotations,
  downloadCanvasAsPNG,
  createDownloadableCanvas,
} from './utils/canvasDrawing'
import CICard from './CICard'
import CVAICard from './CVAICard'
import ShootingTipsDisplay from './ShootingTipsDisplay'

import { getModelInstance, type ModelPrediction } from '@/lib/model-inference'
import { useLocale } from '@/contexts/LocaleContext'

interface TopViewAnalysisProps {
  modelPath: string
  confidenceThreshold: number
  modelState: ModelState
}

// Component for upload state indicator
interface UploadStateIndicatorProps {
  modelState: ModelState
  t: (key: string) => string
}

const UploadStateIndicator = memo(
  ({ modelState, t }: UploadStateIndicatorProps) => {
    switch (modelState) {
      case ModelState.LOADING:
        return (
          <>
            <div className='w-12 h-12 bg-blue-50/80 dark:bg-blue-950/80 rounded-xl flex items-center justify-center shadow-md backdrop-blur-sm border border-blue-200/50 dark:border-blue-700/50 transition-all duration-200'>
              <div className='w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin' />
            </div>
            <div className='text-center'>
              <p className='text-base font-medium text-blue-600 dark:text-blue-400 drop-shadow-sm'>
                {t('detection.model.loading')}
              </p>
            </div>
          </>
        )

      case ModelState.NOT_LOADED:
        return (
          <>
            <div className='w-12 h-12 bg-gray-50/80 dark:bg-gray-800/80 rounded-xl flex items-center justify-center shadow-md backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 transition-all duration-200'>
              <Upload className='w-5 h-5 text-gray-400 dark:text-gray-500' />
            </div>
            <div className='text-center'>
              <p className='text-base font-medium text-gray-500 dark:text-gray-500 drop-shadow-sm'>
                {t('detection.model.notLoadedMessage')}
              </p>
            </div>
          </>
        )

      case ModelState.ERROR:
        return (
          <>
            <div className='w-12 h-12 bg-red-50/80 dark:bg-red-950/80 rounded-xl flex items-center justify-center shadow-md backdrop-blur-sm border border-red-200/50 dark:border-red-700/50 transition-all duration-200'>
              <span className='text-red-500 text-lg font-bold'>✕</span>
            </div>
            <div className='text-center'>
              <p className='text-base font-medium text-red-600 dark:text-red-400 drop-shadow-sm'>
                {t('detection.model.loadFailed')}
              </p>
            </div>
          </>
        )

      case ModelState.LOADED:
      default:
        return (
          <>
            <div className='w-12 h-12 bg-white/80 dark:bg-gray-700/80 rounded-xl flex items-center justify-center shadow-md backdrop-blur-sm border border-white/50 dark:border-gray-600/50 transition-all duration-200 hover:scale-102'>
              <Upload className='w-5 h-5 text-gray-600 dark:text-gray-400' />
            </div>
            <div className='text-center'>
              <p className='text-base font-medium text-gray-700 dark:text-gray-300 drop-shadow-sm'>
                {t('detection.topView.upload.clickOrDrag')}
              </p>
            </div>
          </>
        )
    }
  }
)

UploadStateIndicator.displayName = 'UploadStateIndicator'

// Component for status information
interface StatusInfoProps {
  modelState: ModelState
  t: (key: string) => string
}

const StatusInfo = memo(({ modelState, t }: StatusInfoProps) => {
  switch (modelState) {
    case ModelState.LOADING:
      return (
        <div className='inline-flex items-center gap-2 backdrop-blur-sm rounded-md px-3 py-2 shadow-sm bg-blue-50/80 dark:bg-blue-950/80'>
          <span className='text-xs font-normal text-blue-600 dark:text-blue-400'>
            {t('detection.model.loadingHint')}
          </span>
        </div>
      )

    case ModelState.NOT_LOADED:
      return (
        <div className='inline-flex items-center gap-2 backdrop-blur-sm rounded-md px-3 py-2 shadow-sm bg-gray-50/80 dark:bg-gray-800/80'>
          <span className='text-xs font-normal text-gray-500 dark:text-gray-500'>
            {t('detection.model.notLoadedHint')}
          </span>
        </div>
      )

    case ModelState.ERROR:
      return (
        <div className='inline-flex items-center gap-2 backdrop-blur-sm rounded-md px-3 py-2 shadow-sm bg-red-50/80 dark:bg-red-950/80'>
          <span className='text-xs font-normal text-red-600 dark:text-red-400'>
            {t('detection.model.loadFailedHint')}
          </span>
        </div>
      )

    case ModelState.LOADED:
    default:
      return (
        <div className='inline-flex items-center gap-2 backdrop-blur-sm rounded-md px-3 py-2 shadow-sm bg-white/80 dark:bg-gray-800/80'>
          <span className='text-xs font-normal text-gray-600 dark:text-gray-400'>
            {t('detection.topView.upload.supportFormat')}
          </span>
        </div>
      )
  }
})

StatusInfo.displayName = 'StatusInfo'

// Component for analysis state display
interface AnalysisStateDisplayProps {
  analysisState: AnalysisState
  t: (key: string) => string
}

const AnalysisStateDisplay = memo(
  ({ analysisState, t }: AnalysisStateDisplayProps) => {
    switch (analysisState) {
      case AnalysisState.WAITING_FOR_IMAGE:
        return (
          <>
            <div className='w-16 h-16 md:w-20 md:h-20 mx-auto bg-white dark:bg-gray-700 rounded-2xl flex items-center justify-center shadow-lg'>
              <Camera className='w-8 h-8 md:w-10 md:h-10 text-gray-400' />
            </div>
            <div className='text-center px-2'>
              <p className='text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-1 md:mb-2'>
                {t('detection.topView.analysis.waitingUpload')}
              </p>
              <p className='text-sm md:text-base text-gray-500 dark:text-gray-400'>
                {t('detection.topView.analysis.waitingUploadDesc')}
              </p>
            </div>
          </>
        )

      case AnalysisState.ANALYZING:
        return (
          <>
            <div className='w-14 h-14 md:w-12 md:h-12 mx-auto bg-blue-50/80 dark:bg-blue-950/80 rounded-xl flex items-center justify-center shadow-md backdrop-blur-sm border border-blue-200/50 dark:border-blue-700/50'>
              <div className='w-6 h-6 md:w-5 md:h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin' />
            </div>
            <div className='text-center px-2'>
              <p className='text-base md:text-lg font-semibold text-blue-600 dark:text-blue-400 mb-1 md:mb-2'>
                {t('detection.topView.analysis.analyzing')}
              </p>
              <p className='text-sm md:text-base text-gray-500 dark:text-gray-400'>
                {t('detection.topView.analysis.analyzingDesc')}
              </p>
            </div>
          </>
        )

      case AnalysisState.READY_TO_ANALYZE:
        return (
          <>
            <div className='w-16 h-16 md:w-20 md:h-20 mx-auto bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center shadow-lg border border-green-200 dark:border-green-700'>
              <CheckCircle className='w-8 h-8 md:w-10 md:h-10 text-green-600 dark:text-green-400' />
            </div>
            <div className='text-center px-2'>
              <p className='text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-1 md:mb-2'>
                {t('detection.topView.analysis.readyToAnalyze')}
              </p>
              <p className='text-sm md:text-base text-gray-500 dark:text-gray-400'>
                {t('detection.topView.analysis.readyToAnalyzeDesc')}
              </p>
            </div>
          </>
        )

      default:
        return null
    }
  }
)

AnalysisStateDisplay.displayName = 'AnalysisStateDisplay'

// Component for image visualization
interface ImageVisualizationProps {
  analysisResult: AnalysisResult | null
  t: (key: string) => string
}

const ImageVisualization = memo(
  ({ analysisResult, t }: ImageVisualizationProps) => {
    const maskCanvasRef = useRef<HTMLCanvasElement>(null)
    const measurementCanvasRef = useRef<HTMLCanvasElement>(null)

    // Memoize canvas drawing operations to prevent unnecessary redraws
    const drawMaskCanvas = useCallback(() => {
      const canvas = maskCanvasRef.current

      if (!canvas || !analysisResult?.mask) return

      const ctx = canvas.getContext('2d')

      if (!ctx) return

      // Only redraw if dimensions changed
      if (
        canvas.width !== analysisResult.mask.width ||
        canvas.height !== analysisResult.mask.height
      ) {
        canvas.width = analysisResult.mask.width
        canvas.height = analysisResult.mask.height
      }

      // Clear and draw mask
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.putImageData(analysisResult.mask, 0, 0)
    }, [analysisResult?.mask])

    const drawMeasurementCanvas = useCallback(() => {
      const canvas = measurementCanvasRef.current

      if (!canvas || !analysisResult?.mask || !analysisResult?.measurements)
        return

      const ctx = canvas.getContext('2d')

      if (!ctx) return

      // Only redraw if dimensions changed
      if (
        canvas.width !== analysisResult.mask.width ||
        canvas.height !== analysisResult.mask.height
      ) {
        canvas.width = analysisResult.mask.width
        canvas.height = analysisResult.mask.height
      }

      // Clear and draw measurements
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawMeasurementAnnotations(ctx, analysisResult.measurements)
    }, [analysisResult?.mask, analysisResult?.measurements])

    // Effect to draw canvases when data changes
    useEffect(() => {
      drawMaskCanvas()
    }, [drawMaskCanvas])

    useEffect(() => {
      drawMeasurementCanvas()
    }, [drawMeasurementCanvas])

    // Cleanup canvas contexts on unmount
    useEffect(() => {
      return () => {
        // Canvas contexts are automatically cleaned up when canvas elements are removed
        // No explicit cleanup needed for 2D contexts
      }
    }, [])

    if (!analysisResult?.mask) {
      return (
        <div className='flex items-center justify-center h-full'>
          <div className='text-center space-y-4'>
            <div className='w-16 h-16 mx-auto bg-primary rounded-2xl flex items-center justify-center shadow-lg'>
              <CheckCircle className='w-8 h-8 text-white' />
            </div>
            <div>
              <p className='text-lg font-semibold text-gray-900 dark:text-white'>
                {t('detection.topView.analysis.completed')}
              </p>
              <p className='text-sm text-gray-600 dark:text-gray-400'>
                {t('detection.topView.analysis.completedDesc')}
              </p>
            </div>
          </div>
        </div>
      )
    }

    return (
      <>
        {/* Base mask visualization */}
        <canvas ref={maskCanvasRef} className='w-full h-full object-contain' />

        {/* Measurement lines overlay */}
        {analysisResult.measurements && (
          <canvas
            ref={measurementCanvasRef}
            className='absolute inset-0 w-full h-full object-contain pointer-events-none'
          />
        )}

        {/* Download button overlay */}
        <button
          className='absolute top-3 right-3 px-3 py-1 text-xs bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors shadow-md backdrop-blur-sm'
          onClick={() => {
            if (analysisResult?.mask) {
              const canvas = createDownloadableCanvas(
                analysisResult.mask,
                analysisResult.measurements
              )

              downloadCanvasAsPNG(canvas, 'head-analysis-result.png')
            }
          }}
        >
          {t('detection.topView.buttons.downloadResult')}
        </button>
      </>
    )
  }
)

ImageVisualization.displayName = 'ImageVisualization'

const TopViewAnalysis = memo(function TopViewAnalysis({
  modelPath,
  confidenceThreshold,
  modelState,
}: TopViewAnalysisProps) {
  const { t } = useLocale()

  // Internal state management
  const [topImage, setTopImage] = useState<ImageUploadData | null>(null)
  const [analysisState, setAnalysisState] = useState(
    AnalysisState.WAITING_FOR_IMAGE
  )
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  )
  
  // State for drag and drop
  const [isDragOver, setIsDragOver] = useState(false)

  // Ref for file input
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Cleanup URL objects to prevent memory leaks
  useEffect(() => {
    // Store the current URL for cleanup
    const currentUrl = topImage?.url

    return () => {
      // Cleanup URL object when component unmounts or topImage changes
      if (currentUrl) {
        URL.revokeObjectURL(currentUrl)
      }
    }
  }, [topImage?.url])

  // Component for error display
  const ErrorDisplay = () => {
    if (analysisState !== AnalysisState.ERROR || !analysisResult?.error) {
      return null
    }

    return (
      <div className='bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-4'>
        <div className='flex items-start space-x-3'>
          <div className='flex-shrink-0'>
            <div className='w-8 h-8 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center'>
              <svg
                className='w-4 h-4 text-red-600 dark:text-red-400'
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path
                  clipRule='evenodd'
                  d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                  fillRule='evenodd'
                />
              </svg>
            </div>
          </div>
          <div className='flex-1'>
            <h3 className='text-sm font-medium text-red-800 dark:text-red-200'>
              {t('detection.topView.analysis.error')}
            </h3>
            <p className='mt-1 text-sm text-red-700 dark:text-red-300'>
              {analysisResult.error}
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Component for analysis results cards
  const AnalysisResultsCards = useMemo(() => {
    if (!analysisResult) {
      return null
    }

    const ciMeasurements = analysisResult.measurements
      ? {
          bpd: analysisResult.measurements.bpd,
          ofd: analysisResult.measurements.ofd,
        }
      : undefined

    const cvaiMeasurements = analysisResult.measurements
      ? {
          diagonal1: Math.sqrt(
            Math.pow(
              analysisResult.measurements.diagonal1.end.x -
                analysisResult.measurements.diagonal1.start.x,
              2
            ) +
              Math.pow(
                analysisResult.measurements.diagonal1.end.y -
                  analysisResult.measurements.diagonal1.start.y,
                2
              )
          ),
          diagonal2: Math.sqrt(
            Math.pow(
              analysisResult.measurements.diagonal2.end.x -
                analysisResult.measurements.diagonal2.start.x,
              2
            ) +
              Math.pow(
                analysisResult.measurements.diagonal2.end.y -
                  analysisResult.measurements.diagonal2.start.y,
                2
              )
          ),
        }
      : undefined

    return (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4'>
        {/* CI Index with Classification */}
        <CICard measurements={ciMeasurements} value={analysisResult.ci || 0} />

        {/* CVAI Index with Classification */}
        <CVAICard
          measurements={cvaiMeasurements}
          value={analysisResult.cvai || 0}
        />
      </div>
    )
  }, [analysisResult])
  const handleFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]

      if (file) {
        const url = URL.createObjectURL(file)
        const imageData = {
          file,
          url,
          rotation: 0,
          scale: 1,
        }

        setTopImage(imageData)
        setAnalysisState(AnalysisState.READY_TO_ANALYZE)
        setAnalysisResult(null) // Clear any previous results
      }
    },
    []
  )

  // Handle drag and drop events
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (modelState === ModelState.LOADED) {
      setIsDragOver(true)
    }
  }, [modelState])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
    
    if (modelState !== ModelState.LOADED) return
    
    const files = e.dataTransfer.files
    const file = files[0]
    
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file)
      const imageData = {
        file,
        url,
        rotation: 0,
        scale: 1,
      }

      setTopImage(imageData)
      setAnalysisState(AnalysisState.READY_TO_ANALYZE)
      setAnalysisResult(null)
    }
  }, [modelState])

  const setImageRotation = useCallback(
    (rotation: number) => {
      if (topImage) {
        setTopImage({ ...topImage, rotation })
      }
    },
    [topImage]
  )

  const analyzeTopView = useCallback(async () => {
    if (!topImage) {
      setAnalysisResult({ error: t('detection.errors.noImageUploaded') })

      return
    }

    if (modelState !== ModelState.LOADED) {
      let errorMessage: string

      switch (modelState) {
        case ModelState.LOADING:
          errorMessage = t('detection.errors.modelStillLoading')
          break
        case ModelState.NOT_LOADED:
        case ModelState.ERROR:
        default:
          errorMessage = t('detection.errors.modelNotLoaded')
          break
      }

      setAnalysisResult({ error: errorMessage })

      return
    }

    setAnalysisState(AnalysisState.ANALYZING)
    // Set analysis state to analyzing to show the analyzing state in the UI
    setAnalysisResult(null)

    try {
      const model = getModelInstance(modelPath, { confidenceThreshold })
      const img = new Image()

      img.onload = async () => {
        try {
          const prediction: ModelPrediction = await model.predict(
            img,
            topImage.rotation
          )

          setAnalysisResult({
            ci: prediction.ci,
            cvai: prediction.cvai,
            headShape: prediction.headShape,
            confidence: prediction.confidence,
            mask: prediction.mask,
            originalImage: prediction.originalImage,
            measurements: prediction.measurements,
          })
          setAnalysisState(AnalysisState.COMPLETED)
        } catch (error) {
          // Analysis failed
          setAnalysisResult({
            error: `${t('detection.errors.analysisFailed')}: ${error instanceof Error ? error.message : t('detection.errors.unknownError')}`,
          })
          setAnalysisState(AnalysisState.ERROR)
        }
      }

      img.onerror = () => {
        setAnalysisResult({ error: t('detection.errors.imageLoadFailed') })
        setAnalysisState(AnalysisState.ERROR)
      }

      img.src = topImage.url
    } catch (error) {
      // Analysis setup failed
      setAnalysisResult({
        error: `${t('detection.errors.analysisFailed')}: ${error instanceof Error ? error.message : t('detection.errors.unknownError')}`,
      })
      setAnalysisState(AnalysisState.ERROR)
    } finally {
      // Analysis state is already set in success/error cases above
    }
  }, [topImage, modelState, modelPath, confidenceThreshold, t])

  return (
    <div className='max-w-7xl mx-auto space-y-4 md:space-y-6 px-4 sm:px-6 lg:px-8'>
      {/* Enhanced Hero Section integrated with Top View Analysis */}
      <div className='text-center mb-6 md:mb-12'>
        {/* Main Title */}
        <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light mb-4 md:mb-6 tracking-tight leading-tight'>
          <span className='font-extralight text-gray-900 dark:text-white drop-shadow-sm'>
            {t('detection.topView.title')}
          </span>
        </h1>

        {/* Subtitle */}
        <p className='text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed font-light mb-6 md:mb-8 px-4'>
          {t('detection.pageSubtitle')}
        </p>

        {/* Feature highlights */}
        <div className='flex flex-wrap justify-center gap-2 md:gap-4 max-w-2xl mx-auto mb-6 md:mb-8 px-2'>
          <div className='inline-flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-blue-50 dark:bg-blue-950/20 rounded-full text-blue-600 dark:text-blue-400 text-xs md:text-sm font-medium border border-blue-200 dark:border-blue-800'>
            <span className='text-sm md:text-base'>🧠</span>
            <span className='hidden sm:inline'>{t('detection.topView.features.deepLearning')}</span>
            <span className='sm:hidden'>AI</span>
          </div>
          <div className='inline-flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-green-50 dark:bg-green-950/20 rounded-full text-green-600 dark:text-green-400 text-xs md:text-sm font-medium border border-green-200 dark:border-green-800'>
            <span className='text-sm md:text-base'>🔒</span>
            <span className='hidden sm:inline'>{t('detection.topView.features.privacy')}</span>
            <span className='sm:hidden'>隐私</span>
          </div>
          <div className='inline-flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-purple-50 dark:bg-purple-950/20 rounded-full text-purple-600 dark:text-purple-400 text-xs md:text-sm font-medium border border-purple-200 dark:border-purple-800'>
            <span className='text-sm md:text-base'>⚕️</span>
            <span className='hidden sm:inline'>{t('detection.topView.features.medical')}</span>
            <span className='sm:hidden'>医疗</span>
          </div>
        </div>
      </div>

      {/* Analysis Interface */}
      <div className='grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8 lg:gap-12 xl:gap-16 py-4 md:py-8'>
        {/* Upload Section */}
        <div className='space-y-4 md:space-y-6'>
          <div className='text-center xl:text-left px-2 md:px-0'>
            <div className='flex items-center gap-2 justify-center xl:justify-start mb-2 flex-wrap'>
              <h3 className='text-xl md:text-2xl font-bold text-gray-900 dark:text-white'>
                {t('detection.topView.uploadTitle')}
              </h3>
              <ShootingTipsDisplay t={t} />
            </div>
            <p className='text-sm md:text-base text-gray-600 dark:text-gray-400'>
              {t('detection.topView.description')}
            </p>
          </div>

          {!topImage ? (
            <div
              className={`relative aspect-square border-2 border-dashed rounded-2xl overflow-hidden transition-all duration-300 touch-manipulation ${
                modelState !== ModelState.LOADED
                  ? 'border-gray-200 dark:border-gray-700 cursor-not-allowed opacity-60'
                  : isDragOver
                    ? 'border-primary bg-primary/5 scale-[1.02]'
                    : 'border-gray-300 dark:border-gray-600 cursor-pointer hover:border-primary active:border-primary active:scale-[0.98] md:active:scale-100'
              }`}
              role='button'
              tabIndex={modelState === ModelState.LOADED ? 0 : -1}
              onClick={() => {
                if (modelState === ModelState.LOADED) {
                  fileInputRef.current?.click()
                }
              }}
              onKeyDown={e => {
                if (
                  (e.key === 'Enter' || e.key === ' ') &&
                  modelState === ModelState.LOADED
                ) {
                  e.preventDefault()
                  fileInputRef.current?.click()
                }
              }}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {/* Background placeholder image with annotations */}
              <div className='absolute inset-0'>
                <NextImage
                  fill
                  alt={t('detection.topView.exampleImageAlt')}
                  className='w-full h-full object-contain opacity-70 dark:opacity-60'
                  sizes='(max-width: 768px) 100vw, 50vw'
                  src='/images/detection/head_normal_top.jpg'
                />
                <div className='absolute inset-0 bg-white/30 dark:bg-gray-900/30' />

                {/* Reference indicators */}
                <div className='absolute inset-0'>
                  {/* Vertical dashed line connecting frontal and occipital */}
                  <div className='absolute left-1/2 top-8 bottom-8 w-0.5 border-l-2 border-dashed border-rose-500/70 transform -translate-x-1/2' />

                  {/* Frontal label - top center */}
                  <div className='absolute top-0 left-1/2 transform -translate-x-1/2 bg-rose-500/90 text-white text-xs px-2.5 py-1 rounded font-medium shadow-md backdrop-blur-sm'>
                    {t('detection.topView.annotations.forehead')}
                  </div>

                  {/* Nose indicator - below frontal area */}
                  <div className='absolute top-8 left-1/2 flex items-center'>
                    {/* Horizontal dashed line pointing right */}
                    <div className='w-16 sm:w-32 h-0.5 border-t-2 border-dashed border-rose-500/70' />
                    {/* Label */}
                    <div className='ml-1 sm:ml-2 bg-orange-100/90 text-orange-800 text-xs px-1.5 sm:px-2.5 py-1 rounded font-medium shadow-md backdrop-blur-sm whitespace-nowrap transform -translate-x-1/2 sm:translate-x-0'>
                      {t('detection.topView.annotations.noseVisible')}
                    </div>
                  </div>

                  {/* Occipital label - bottom center */}
                  <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-rose-500/90 text-white text-xs px-2.5 py-1 rounded font-medium shadow-md backdrop-blur-sm'>
                    {t('detection.topView.annotations.occiput')}
                  </div>
                </div>
              </div>

              {/* Upload content overlay */}
              <div className='relative z-10 flex items-center justify-center h-full'>
                <div className='text-center space-y-4 p-6'>
                  {/* Centered upload prompt */}
                  <div className='flex flex-col items-center justify-center gap-3'>
                    <UploadStateIndicator modelState={modelState} t={t} />
                  </div>
                  {/* Status info with refined style */}
                  <StatusInfo modelState={modelState} t={t} />
                </div>
              </div>
            </div>
          ) : (
            <div className='space-y-4 md:space-y-6'>
              <div className='relative aspect-square bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700'>
                <NextImage
                  fill
                  alt={t('detection.topView.originalImageAlt')}
                  className='w-full h-full object-contain'
                  sizes='(max-width: 768px) 100vw, 50vw'
                  src={topImage.url}
                  style={{
                    transform: `rotate(${topImage.rotation}deg) scale(${topImage.scale})`,
                  }}
                />

                {/* Overlay annotations */}
                <div className='absolute inset-0 pointer-events-none'>
                  {/* Vertical dashed line connecting forehead and occipital */}
                  <div className='absolute left-1/2 top-0 bottom-0 w-0.5 border-l-2 border-dashed border-rose-500/70 transform -translate-x-1/2' />

                  {/* Forehead label - top center */}
                  <div className='absolute top-0 left-1/2 transform -translate-x-1/2 bg-rose-500/90 text-white text-xs px-2.5 py-1 rounded font-medium shadow-md backdrop-blur-sm'>
                    {t('detection.topView.annotations.forehead')}
                  </div>

                  {/* Occipital label - bottom center */}
                  <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-rose-500/90 text-white text-xs px-2.5 py-1 rounded font-medium shadow-md backdrop-blur-sm'>
                    {t('detection.topView.annotations.occiput')}
                  </div>
                </div>
              </div>
              <div className='space-y-3 md:space-y-4'>
                {/* Rotation Control */}
                <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-2'>
                  <div className='flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2'>
                    <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                      {t('detection.topView.upload.rotation')}
                    </span>
                    <span className='text-xs text-gray-500 dark:text-gray-400'>
                      {t('detection.topView.upload.rotationTip')}
                    </span>
                  </div>
                  <div className='flex justify-center sm:justify-end'>
                    <RotationControl
                      rotation={topImage?.rotation || 0}
                      onChange={rotation => setImageRotation(rotation)}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className='flex flex-col sm:flex-row gap-3 sm:gap-2'>
                  <Tooltip
                    showArrow
                    content={
                      modelState === ModelState.LOADING
                        ? t('detection.model.loadingTooltip')
                        : modelState !== ModelState.LOADED
                          ? t('detection.model.notLoadedTooltip')
                          : analysisState === AnalysisState.ANALYZING
                            ? t('detection.topView.tooltips.analyzing')
                            : t('detection.topView.tooltips.readyToAnalyze')
                    }
                    isDisabled={
                      modelState === ModelState.LOADED &&
                      analysisState !== AnalysisState.ANALYZING
                    }
                  >
                    <Button
                      className='w-full sm:flex-1 h-12 sm:h-10 touch-manipulation'
                      disabled={
                        analysisState === AnalysisState.ANALYZING ||
                        modelState !== ModelState.LOADED
                      }
                      size='lg'
                      color='primary'
                      startContent={
                        modelState === ModelState.LOADING ? (
                          <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
                        ) : analysisState === AnalysisState.ANALYZING ? (
                          <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
                        ) : (
                          <CheckCircle className='w-4 h-4' />
                        )
                      }
                      onClick={analyzeTopView}
                    >
                      {modelState === ModelState.LOADING
                        ? t('detection.model.loadingButton')
                        : analysisState === AnalysisState.ANALYZING
                          ? t('detection.topView.buttons.analyzing')
                          : t('detection.topView.buttons.startAnalysis')}
                    </Button>
                  </Tooltip>
                  <Tooltip
                    showArrow
                    content={
                      modelState === ModelState.LOADING
                        ? t('detection.model.loadingTooltip')
                        : modelState !== ModelState.LOADED
                          ? t('detection.model.notLoadedTooltip')
                          : t('detection.topView.tooltips.reupload')
                    }
                    isDisabled={modelState === ModelState.LOADED}
                  >
                    <Button
                      className='w-full sm:w-auto h-12 sm:h-10 px-4 sm:px-3 touch-manipulation'
                      disabled={modelState !== ModelState.LOADED}
                      size='lg'
                      startContent={
                        modelState === ModelState.LOADING ? (
                          <div className='w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin' />
                        ) : (
                          <Upload className='w-4 h-4' />
                        )
                      }
                      variant='bordered'
                      color='primary'
                      onClick={() => {
                        if (modelState === ModelState.LOADED) {
                          fileInputRef.current?.click()
                        }
                      }}
                    >
                      {modelState === ModelState.LOADING
                        ? t('detection.model.loadingButton')
                        : t('detection.topView.buttons.reupload')}
                    </Button>
                  </Tooltip>
                </div>
              </div>
            </div>
          )}
          <input
            ref={fileInputRef}
            accept='image/*'
            className='hidden'
            disabled={modelState !== ModelState.LOADED}
            type='file'
            onChange={e => handleFileUpload(e)}
          />
        </div>

        {/* Results Section */}
        <div className='space-y-4 md:space-y-6'>
          <div className='text-center xl:text-left px-2 md:px-0'>
            <h3 className='text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2'>
              {t('detection.topView.analysisResult')}
            </h3>
            <p className='text-sm md:text-base text-gray-600 dark:text-gray-400'>
              {t('detection.topView.analysisDescription')}
            </p>
          </div>

          {analysisState !== AnalysisState.COMPLETED ? (
            <div className='aspect-square flex items-center justify-center bg-gray-50/50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700'>
              <div className='text-center space-y-6'>
                <AnalysisStateDisplay analysisState={analysisState} t={t} />
              </div>
            </div>
          ) : (
            analysisResult && (
              <div className='space-y-8'>
                {/* Visualization */}
                <div className='aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl border border-primary/20 dark:border-primary/30 overflow-hidden relative'>
                  <ImageVisualization analysisResult={analysisResult} t={t} />
                </div>

                {/* Legend - only show measurement annotations */}
                {analysisResult?.measurements && (
                  <div className='bg-gray-50 dark:bg-gray-800 rounded-lg p-6'>
                    <h6 className='text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4'>
                      {t('detection.topView.analysis.measurementAnnotations')}
                    </h6>
                    <div className='flex flex-wrap gap-6 text-sm'>
                      <div className='flex items-center gap-3'>
                        <div
                          className='w-4 h-1 rounded-sm'
                          style={{ backgroundColor: '#FFDC00' }}
                        />
                        <span className='text-gray-700 dark:text-gray-300 font-medium'>
                          {t('detection.topView.analysis.bpd')}
                        </span>
                      </div>
                      <div className='flex items-center gap-3'>
                        <div
                          className='w-1 h-4 rounded-sm'
                          style={{ backgroundColor: '#F24C62' }}
                        />
                        <span className='text-gray-700 dark:text-gray-300 font-medium'>
                          {t('detection.topView.analysis.ofd')}
                        </span>
                      </div>
                      <div className='flex items-center gap-3'>
                        <div
                          className='w-4 h-1 rounded-sm'
                          style={{
                            background:
                              'repeating-linear-gradient(to right, #6B7280 0, #6B7280 3px, transparent 3px, transparent 6px)',
                          }}
                        />
                        <span className='text-gray-700 dark:text-gray-300 font-medium'>
                          {t('detection.topView.analysis.diagonal')}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Error Display */}
                <ErrorDisplay />
              </div>
            )
          )}
        </div>
      </div>

      {/* Measurement Results Section */}
      {analysisResult && (
        <div>
          {analysisResult.error ? (
            <div className='bg-red-50 dark:bg-red-950/20 rounded-2xl p-6 border border-red-200 dark:border-red-700 shadow-lg max-w-2xl mx-auto'>
              <div className='flex items-center gap-3 mb-3'>
                <div className='w-5 h-5 bg-red-500 rounded-full flex items-center justify-center'>
                  <svg
                    className='w-3 h-3 text-white'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      clipRule='evenodd'
                      d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                      fillRule='evenodd'
                    />
                  </svg>
                </div>
                <div className='text-lg font-semibold text-red-700 dark:text-red-400'>
                  {t('detection.topView.analysis.detectionFailed')}
                </div>
              </div>
              <div className='text-red-600 dark:text-red-400'>
                {analysisResult.error}
              </div>
            </div>
          ) : (
            AnalysisResultsCards
          )}
        </div>
      )}
    </div>
  )
})

export default TopViewAnalysis
