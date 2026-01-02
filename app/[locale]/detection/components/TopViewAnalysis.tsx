'use client'

import type { ImageUploadData, AnalysisResult } from '../types'

import { useState, useRef, memo, useMemo, useCallback, useEffect } from 'react'
import {
  Heart,
  Loader2,
  RefreshCw,
  Info,
  Sparkles,
  CheckCircle2,
  UploadCloud,
  ScanLine,
} from 'lucide-react'
import NextImage from 'next/image'

import { ModelState, AnalysisState } from '../types'
import SchematicHeadGuide from './SchematicHeadGuide'
import CICard from './CICard'
import CVAICard from './CVAICard'
import IntegratedAssessment from './IntegratedAssessment'
import {
  drawMeasurementAnnotations,
  downloadCanvasAsPNG,
  createDownloadableCanvas,
} from './utils/canvasDrawing'

import { getModelInstance, type ModelPrediction } from '@/lib/model-inference'
import { useTranslations } from 'next-intl'

interface TopViewAnalysisProps {
  modelPath: string
  confidenceThreshold: number
  modelState: ModelState
  onAnalysisResultChange?: (hasResult: boolean) => void
}

// 分析中的加载文字序列
const LOADING_TEXTS = [
  '正在温柔地观察照片...',
  '正在寻找宝宝的头型轮廓...',
  '正在测量每一条可爱的弧度...',
  '正在为您准备专家建议...',
]

// 分析前的引导面板
interface GuidancePanelProps {
  t: (key: string) => string
}

const GuidancePanel = memo(({ t }: GuidancePanelProps) => (
  <div className='bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-[3rem] p-8 md:p-10 border border-white dark:border-gray-700 shadow-sm h-full flex flex-col justify-center animate-fade-in'>
    <div className='relative mb-8'>
      <div className='absolute -left-4 top-0 w-1 h-12 bg-orange-300 dark:bg-orange-500 rounded-full' />
      <h2 className='text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 leading-[1.1]'>
        每张照片
        <br />
        <span className='text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-400'>
          都是一次爱的对焦
        </span>
      </h2>
    </div>

    <div className='space-y-6'>
      <div className='p-6 rounded-[2rem] bg-orange-50/50 dark:bg-orange-950/20 border border-orange-100/30 dark:border-orange-800/30'>
        <h4 className='font-bold text-gray-700 dark:text-gray-300 text-sm mb-2 flex items-center'>
          <Info className='w-4 h-4 mr-2 text-orange-400' />
          小贴士：如何拍出完美照片？
        </h4>
        <p className='text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-medium'>
          如左图所示，请尽量垂直于宝宝头顶拍摄。当宝宝熟睡时拍摄效果最佳，因为此时小脑袋不会晃动。
        </p>
      </div>

      <ul className='space-y-4 px-2'>
        <li className='flex items-start space-x-3 text-xs text-gray-500 dark:text-gray-400 font-medium'>
          <div className='w-5 h-5 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center flex-shrink-0 text-rose-500 dark:text-rose-400 font-bold'>
            1
          </div>
          <span className='mt-0.5'>
            寻找光线明亮的地方，避免头部产生浓重的阴影干扰分析。
          </span>
        </li>
        <li className='flex items-start space-x-3 text-xs text-gray-500 dark:text-gray-400 font-medium'>
          <div className='w-5 h-5 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0 text-orange-500 dark:text-orange-400 font-bold'>
            2
          </div>
          <span className='mt-0.5'>
            轻轻拨开头发，尽量露出头型的真实轮廓。
          </span>
        </li>
        <li className='flex items-start space-x-3 text-xs text-gray-500 dark:text-gray-400 font-medium'>
          <div className='w-5 h-5 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center flex-shrink-0 text-yellow-600 dark:text-yellow-400 font-bold'>
            3
          </div>
          <span className='mt-0.5'>
            确保鼻子刚好在视野上方露出，这是判断头型是否偏转的关键参照。
          </span>
        </li>
      </ul>
    </div>
  </div>
))

GuidancePanel.displayName = 'GuidancePanel'

// 图片可视化组件
interface ImageVisualizationProps {
  analysisResult: AnalysisResult | null
  t: (key: string) => string
}

const ImageVisualization = memo(
  ({ analysisResult, t }: ImageVisualizationProps) => {
    const maskCanvasRef = useRef<HTMLCanvasElement>(null)
    const measurementCanvasRef = useRef<HTMLCanvasElement>(null)

    const drawMaskCanvas = useCallback(() => {
      const canvas = maskCanvasRef.current
      if (!canvas || !analysisResult?.mask) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      if (
        canvas.width !== analysisResult.mask.width ||
        canvas.height !== analysisResult.mask.height
      ) {
        canvas.width = analysisResult.mask.width
        canvas.height = analysisResult.mask.height
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.putImageData(analysisResult.mask, 0, 0)
    }, [analysisResult?.mask])

    const drawMeasurementCanvas = useCallback(() => {
      const canvas = measurementCanvasRef.current
      if (!canvas || !analysisResult?.mask || !analysisResult?.measurements)
        return
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      if (
        canvas.width !== analysisResult.mask.width ||
        canvas.height !== analysisResult.mask.height
      ) {
        canvas.width = analysisResult.mask.width
        canvas.height = analysisResult.mask.height
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawMeasurementAnnotations(ctx, analysisResult.measurements)
    }, [analysisResult?.mask, analysisResult?.measurements])

    useEffect(() => {
      drawMaskCanvas()
    }, [drawMaskCanvas])

    useEffect(() => {
      drawMeasurementCanvas()
    }, [drawMeasurementCanvas])

    if (!analysisResult?.mask) {
      return null
    }

    return (
      <div className='absolute inset-0 flex items-center justify-center'>
        {/* Canvas container that fills the parent */}
        <div className='relative w-full h-full'>
          <canvas
            ref={maskCanvasRef}
            className='absolute inset-0 w-full h-full object-cover'
          />
          {analysisResult.measurements && (
            <canvas
              ref={measurementCanvasRef}
              className='absolute inset-0 w-full h-full object-cover pointer-events-none'
            />
          )}
        </div>

        {/* Download button overlay - positioned relative to the container */}
        <button
          className='absolute bottom-4 right-4 z-10 bg-white/90 dark:bg-gray-800/90 px-3 py-2 rounded-2xl shadow-md border border-orange-100 dark:border-orange-900/30 flex items-center space-x-2 hover:shadow-lg hover:scale-105 transition-all'
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
          <CheckCircle2 className='w-3.5 h-3.5 text-green-500' />
          <span className='text-[9px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider'>
            {t('detection.topView.buttons.downloadResult')}
          </span>
        </button>
      </div>
    )
  }
)

ImageVisualization.displayName = 'ImageVisualization'

const TopViewAnalysis = memo(function TopViewAnalysis({
  modelPath,
  confidenceThreshold,
  modelState,
  onAnalysisResultChange,
}: TopViewAnalysisProps) {
  const t = useTranslations()

  // Internal state management
  const [topImage, setTopImage] = useState<ImageUploadData | null>(null)
  const [analysisState, setAnalysisState] = useState(
    AnalysisState.WAITING_FOR_IMAGE
  )
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  )
  const [loadingText, setLoadingText] = useState(LOADING_TEXTS[0])
  const [isHovering, setIsHovering] = useState(false)

  // Ref for file input
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Loading text rotation effect
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (analysisState === AnalysisState.ANALYZING) {
      let i = 0
      interval = setInterval(() => {
        i = (i + 1) % LOADING_TEXTS.length
        setLoadingText(LOADING_TEXTS[i])
      }, 800)
    }
    return () => clearInterval(interval)
  }, [analysisState])

  // Cleanup URL objects
  useEffect(() => {
    const currentUrl = topImage?.url
    return () => {
      if (currentUrl) {
        URL.revokeObjectURL(currentUrl)
      }
    }
  }, [topImage?.url])

  // Notify parent component when analysis result changes
  useEffect(() => {
    if (onAnalysisResultChange) {
      onAnalysisResultChange(!!analysisResult && !analysisResult.error)
    }
  }, [analysisResult, onAnalysisResultChange])

  const handleFileChange = useCallback(
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
        // Auto start analysis
        startAnalysis(imageData)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [modelState, modelPath, confidenceThreshold]
  )

  const startAnalysis = useCallback(
    async (imageData: ImageUploadData) => {
      if (modelState !== ModelState.LOADED) {
        setAnalysisResult({ error: t('detection.errors.modelNotLoaded') })
        setAnalysisState(AnalysisState.ERROR)
        return
      }

      setAnalysisState(AnalysisState.ANALYZING)
      setAnalysisResult(null)

      try {
        const model = getModelInstance(modelPath, { confidenceThreshold })
        const img = new Image()

        img.onload = async () => {
          try {
            const prediction: ModelPrediction = await model.predict(
              img,
              imageData.rotation
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

        img.src = imageData.url
      } catch (error) {
        setAnalysisResult({
          error: `${t('detection.errors.analysisFailed')}: ${error instanceof Error ? error.message : t('detection.errors.unknownError')}`,
        })
        setAnalysisState(AnalysisState.ERROR)
      }
    },
    [modelState, modelPath, confidenceThreshold, t]
  )

  const resetAnalysis = useCallback(() => {
    setTopImage(null)
    setAnalysisState(AnalysisState.WAITING_FOR_IMAGE)
    setAnalysisResult(null)
  }, [])

  // CI/CVAI measurements for cards
  const ciMeasurements = useMemo(() => {
    if (!analysisResult?.measurements) return undefined
    return {
      bpd: analysisResult.measurements.bpd,
      ofd: analysisResult.measurements.ofd,
    }
  }, [analysisResult?.measurements])

  const cvaiMeasurements = useMemo(() => {
    if (!analysisResult?.measurements) return undefined
    return {
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
  }, [analysisResult?.measurements])

  const isModelReady = modelState === ModelState.LOADED

  return (
    <div className='w-full max-w-6xl mx-auto px-4'>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start'>
        {/* Left Area: The Interaction Frame */}
        <div className='lg:col-span-6 flex flex-col items-center'>
          <div className='relative group w-full max-w-[480px]'>
            {/* Soft Shadow Layer */}
            <div className='absolute -inset-2 bg-orange-200/20 dark:bg-orange-900/10 blur-2xl rounded-[4rem]' />

            <div className='relative bg-white dark:bg-gray-800 p-6 rounded-[3.5rem] shadow-xl border border-white dark:border-gray-700'>
              {/* Main Display Area */}
              <div
                className='relative aspect-[4/5] rounded-[2.8rem] overflow-hidden bg-[#faf8f6] dark:bg-gray-900 border border-orange-100 dark:border-orange-900/30 flex flex-col items-center justify-center transition-all duration-500 group-hover:border-orange-200 dark:group-hover:border-orange-800/50'
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {/* UPLOAD STATE */}
                {analysisState === AnalysisState.WAITING_FOR_IMAGE && (
                  <>
                    {/* Background grid texture */}
                    <div
                      className='absolute inset-0 opacity-30 dark:opacity-10 pointer-events-none'
                      style={{
                        backgroundImage:
                          'radial-gradient(#e5e7eb 1px, transparent 1px)',
                        backgroundSize: '20px 20px',
                      }}
                    />

                    {/* SVG Blueprint */}
                    <SchematicHeadGuide />

                    {/* Nose label - top */}
                    <div className='absolute top-[52px] left-[60%] text-left pointer-events-none'>
                      <span className='block text-[10px] text-orange-400 font-bold uppercase tracking-wider'>
                        Nose Visible
                      </span>
                      <span className='block text-[10px] text-gray-400 dark:text-gray-500 font-medium'>
                        刚刚露出鼻尖
                      </span>
                    </div>

                    {/* Occipital label - bottom */}
                    <div className='absolute bottom-[62px] right-[42%] text-right pointer-events-none'>
                      <span className='block text-[10px] text-rose-300 font-bold uppercase tracking-wider'>
                        Occipital
                      </span>
                      <span className='block text-[10px] text-gray-400 dark:text-gray-500 font-medium'>
                        后枕区域
                      </span>
                    </div>

                    {/* Central interaction area */}
                    <div
                      onClick={() =>
                        isModelReady && fileInputRef.current?.click()
                      }
                      className='absolute inset-0 z-20 flex flex-col items-center justify-center cursor-pointer'
                    >
                      <div
                        className={`
                        relative px-8 py-5 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl border border-white dark:border-gray-700 shadow-sm
                        flex flex-col items-center space-y-3 transition-all duration-300
                        ${isHovering && isModelReady ? 'scale-105 bg-white/80 dark:bg-gray-800/80 shadow-md' : 'scale-100'}
                        ${!isModelReady ? 'opacity-60 cursor-not-allowed' : ''}
                      `}
                      >
                        <div className='w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-100 to-rose-50 dark:from-orange-900/30 dark:to-rose-900/20 flex items-center justify-center text-orange-400 shadow-inner'>
                          {modelState === ModelState.LOADING ? (
                            <Loader2 className='w-6 h-6 animate-spin' />
                          ) : (
                            <UploadCloud className='w-6 h-6' />
                          )}
                        </div>
                        <div className='text-center'>
                          <span className='block text-sm font-bold text-gray-700 dark:text-gray-300'>
                            {modelState === ModelState.LOADING
                              ? t('detection.model.loading')
                              : t('detection.topView.upload.clickOrDrag')}
                          </span>
                          <span className='block text-[10px] text-gray-400 dark:text-gray-500 mt-0.5'>
                            自动识别 · 隐私保护
                          </span>
                        </div>
                      </div>
                    </div>

                    <input
                      ref={fileInputRef}
                      type='file'
                      onChange={handleFileChange}
                      className='hidden'
                      accept='image/*'
                      disabled={!isModelReady}
                    />
                  </>
                )}

                {/* ANALYZING or RESULT STATE */}
                {(analysisState === AnalysisState.ANALYZING ||
                  analysisState === AnalysisState.COMPLETED ||
                  analysisState === AnalysisState.ERROR) &&
                  topImage && (
                    <div className='relative w-full h-full'>
                      {/* Show uploaded image during analysis */}
                      {analysisState === AnalysisState.ANALYZING && (
                        <>
                          <NextImage
                            fill
                            src={topImage.url}
                            alt='Analyzing'
                            className='w-full h-full object-cover transition-opacity duration-700 opacity-60'
                          />
                          <div className='absolute inset-0 bg-white/20 dark:bg-black/20 backdrop-blur-[1px] flex flex-col items-center justify-center'>
                            <div className='scan-wave' />
                            <div className='bg-white/90 dark:bg-gray-800/90 backdrop-blur-md px-8 py-6 rounded-[2.5rem] shadow-2xl flex flex-col items-center border border-white dark:border-gray-700'>
                              <Loader2 className='w-10 h-10 text-orange-400 animate-spin mb-4' />
                              <p className='text-sm font-bold text-gray-600 dark:text-gray-300 transition-all duration-300'>
                                {loadingText}
                              </p>
                            </div>
                          </div>
                        </>
                      )}

                      {/* Show result visualization */}
                      {analysisState === AnalysisState.COMPLETED &&
                        analysisResult &&
                        !analysisResult.error && (
                          <ImageVisualization
                            analysisResult={analysisResult}
                            t={t}
                          />
                        )}

                      {/* Error state */}
                      {analysisState === AnalysisState.ERROR &&
                        analysisResult?.error && (
                          <div className='absolute inset-0 flex items-center justify-center bg-red-50/80 dark:bg-red-950/50'>
                            <div className='bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center max-w-xs'>
                              <div className='w-12 h-12 mx-auto mb-4 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center'>
                                <span className='text-red-500 text-2xl'>✕</span>
                              </div>
                              <p className='text-sm text-red-600 dark:text-red-400 font-medium'>
                                {analysisResult.error}
                              </p>
                            </div>
                          </div>
                        )}
                    </div>
                  )}
              </div>

              {/* Bottom Decoration - Scan Text (only show in upload state) */}
              {analysisState === AnalysisState.WAITING_FOR_IMAGE && (
                <div className='absolute bottom-6 left-0 right-0 text-center pointer-events-none'>
                  <div className='inline-flex items-center space-x-1.5 opacity-40'>
                    <ScanLine className='w-3 h-3 text-gray-400' />
                    <span className='text-[9px] font-bold text-gray-400 tracking-[0.3em] uppercase'>
                      AI Geometry Align
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Feature badges and reset button */}
          <div className='mt-10 flex flex-wrap justify-center gap-6'>
            <div className='flex items-center space-x-2 text-gray-400 dark:text-gray-500'>
              <Heart className='w-4 h-4 text-rose-300' />
              <span className='text-xs font-medium'>全本地隐私处理</span>
            </div>
            <div className='flex items-center space-x-2 text-gray-400 dark:text-gray-500'>
              <Sparkles className='w-4 h-4 text-orange-300' />
              <span className='text-xs font-medium'>AI 几何对准技术</span>
            </div>
            {analysisState === AnalysisState.COMPLETED && (
              <button
                onClick={resetAnalysis}
                className='flex items-center space-x-2 text-xs font-bold text-orange-500 hover:text-orange-600 transition-all'
              >
                <RefreshCw className='w-3 h-3' />
                <span>重新记录</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Area: Results or Guidance */}
        <div className='lg:col-span-6'>
          {analysisState === AnalysisState.COMPLETED &&
            analysisResult &&
            !analysisResult.error ? (
            <div className='space-y-6 animate-slide-in-right'>
              {/* CI Card */}
              <CICard
                value={analysisResult.ci || 0}
                measurements={ciMeasurements}
              />

              {/* CVAI Card */}
              <CVAICard
                value={analysisResult.cvai || 0}
                measurements={cvaiMeasurements}
              />

              {/* Integrated Assessment */}
              {analysisResult.ci !== undefined &&
                analysisResult.cvai !== undefined && (
                  <IntegratedAssessment
                    ci={analysisResult.ci * 100}
                    cvai={analysisResult.cvai * 100}
                  />
                )}

              <p className='text-center text-[9px] font-bold text-gray-300 dark:text-gray-600 uppercase tracking-[0.4em]'>
                Powered by LunaSphere AI Studio
              </p>
            </div>
          ) : (
            <GuidancePanel t={t} />
          )}
        </div>
      </div>
    </div>
  )
})

export default TopViewAnalysis
