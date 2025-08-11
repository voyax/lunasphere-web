'use client'

import type { ImageType, ImageUploadData, AnalysisResult } from '../types'

import { Button } from '@heroui/button'
import { Tooltip } from '@heroui/tooltip'
import { Upload, Camera, CheckCircle } from 'lucide-react'

import RotationControl from './RotationControl'
import {
  drawMeasurementAnnotations,
  downloadCanvasAsPNG,
  createDownloadableCanvas,
} from './utils/canvasDrawing'
import CICard from './CICard'
import CVAICard from './CVAICard'

import { getModelInstance, type ModelPrediction } from '@/lib/model-inference'

interface TopViewAnalysisProps {
  images: Record<ImageType, ImageUploadData | null>
  setImages: React.Dispatch<
    React.SetStateAction<Record<ImageType, ImageUploadData | null>>
  >
  currentStep: number
  setCurrentStep: (step: number) => void
  isProcessing: boolean
  setIsProcessing: (processing: boolean) => void
  analysisResult: AnalysisResult | null
  setAnalysisResult: (result: AnalysisResult | null) => void
  modelPath: string
  confidenceThreshold: number
  isModelLoaded: boolean
  isLoadingModel: boolean
}

export default function TopViewAnalysis({
  images,
  setImages,
  currentStep,
  setCurrentStep,
  isProcessing,
  setIsProcessing,
  analysisResult,
  setAnalysisResult,
  modelPath,
  confidenceThreshold,
  isModelLoaded,
  isLoadingModel,
}: TopViewAnalysisProps) {
  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    imageType: ImageType
  ) => {
    const file = event.target.files?.[0]

    if (file) {
      const url = URL.createObjectURL(file)

      setImages(prev => ({
        ...prev,
        [imageType]: {
          file,
          url,
          rotation: 0,
          scale: 1,
        },
      }))

      if (imageType === 'left' || imageType === 'right') {
        // This would be handled by parent component if needed
      }
    }
  }

  const setImageRotation = (imageType: ImageType, rotation: number) => {
    setImages(prev => ({
      ...prev,
      [imageType]: prev[imageType] ? { ...prev[imageType]!, rotation } : null,
    }))
  }

  const analyzeTopView = async () => {
    if (!images.top) return

    setIsProcessing(true)
    setCurrentStep(2)
    setAnalysisResult(null)

    try {
      if (!isModelLoaded) {
        throw new Error('模型未加载，请先加载模型')
      }

      const model = getModelInstance(modelPath, { confidenceThreshold })
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')!
      const img = new Image()

      img.onload = async () => {
        try {
          const prediction: ModelPrediction = await model.predict(
            img,
            images.top!.rotation
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
          setCurrentStep(3)
        } catch (error) {
          console.error('Analysis failed:', error)
          setAnalysisResult({
            error: `分析失败: ${error instanceof Error ? error.message : '未知错误'}`,
          })
          setCurrentStep(3)
        }
      }

      img.onerror = () => {
        setAnalysisResult({ error: '图片加载失败，请重新上传' })
        setCurrentStep(3)
      }

      img.src = images.top.url
    } catch (error) {
      console.error('Analysis setup failed:', error)
      setAnalysisResult({
        error: `分析失败: ${error instanceof Error ? error.message : '未知错误'}`,
      })
      setCurrentStep(3)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className='max-w-7xl mx-auto space-y-6'>
      {/* Enhanced Hero Section integrated with Top View Analysis */}
      <div className='text-center mb-12'>
        {/* Main Title */}
        <h1 className='text-4xl md:text-5xl lg:text-6xl font-light mb-6 tracking-tight leading-tight'>
          <span className='font-extralight text-gray-900 dark:text-white drop-shadow-sm'>
            婴儿头型测量
          </span>
        </h1>

        {/* Subtitle */}
        <p className='text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed font-light mb-8'>
          基于深度学习的头型检测，所有计算均在浏览器本地完成，照片不会上传到任何服务器，确保您和宝宝的隐私安全
        </p>

        {/* Feature highlights */}
        <div className='flex flex-wrap justify-center gap-4 max-w-2xl mx-auto mb-8'>
          <div className='inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-950/20 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium border border-blue-200 dark:border-blue-800'>
            <span className='text-base'>🧠</span>
            深度学习算法
          </div>
          <div className='inline-flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-950/20 rounded-full text-green-600 dark:text-green-400 text-sm font-medium border border-green-200 dark:border-green-800'>
            <span className='text-base'>🔒</span>
            本地处理，隐私安全
          </div>
          <div className='inline-flex items-center gap-2 px-4 py-2 bg-purple-50 dark:bg-purple-950/20 rounded-full text-purple-600 dark:text-purple-400 text-sm font-medium border border-purple-200 dark:border-purple-800'>
            <span className='text-base'>⚕️</span>
            专业医学标准
          </div>
        </div>
      </div>

      {/* Analysis Interface */}
      <div className='grid grid-cols-1 xl:grid-cols-2 gap-16 py-8'>
        {/* Upload Section */}
        <div className='space-y-6'>
          <div className='text-center xl:text-left'>
            <div className='flex items-center gap-2 justify-center xl:justify-start mb-2'>
              <h3 className='text-2xl font-bold text-gray-900 dark:text-white'>
                俯视图上传
              </h3>
              <Tooltip
                showArrow
                content={
                  <div className='max-w-sm p-2'>
                    <h4 className='font-semibold text-sm mb-3'>📋 拍摄要点</h4>
                    <div className='space-y-2'>
                      <div className='flex items-start gap-2'>
                        <span className='text-blue-500 font-bold text-xs mt-0.5'>
                          1
                        </span>
                        <div>
                          <p className='font-medium text-xs'>👃 微微透出鼻尖</p>
                          <p className='text-xs text-gray-600 dark:text-gray-400'>
                            拍摄角度应能看到宝宝的鼻尖，确保俯视角度正确
                          </p>
                        </div>
                      </div>
                      <div className='flex items-start gap-2'>
                        <span className='text-green-500 font-bold text-xs mt-0.5'>
                          2
                        </span>
                        <div>
                          <p className='font-medium text-xs'>
                            💡 光线充足，避免阴影
                          </p>
                          <p className='text-xs text-gray-600 dark:text-gray-400'>
                            确保头型轮廓清晰可见，建议自然光拍摄
                          </p>
                        </div>
                      </div>
                      <div className='flex items-start gap-2'>
                        <span className='text-yellow-500 font-bold text-xs mt-0.5'>
                          3
                        </span>
                        <div>
                          <p className='font-medium text-xs'>
                            📱 手机与头部平行
                          </p>
                          <p className='text-xs text-gray-600 dark:text-gray-400'>
                            减少拍摄偏差，保持手机水平
                          </p>
                        </div>
                      </div>
                      <div className='flex items-start gap-2'>
                        <span className='text-purple-500 font-bold text-xs mt-0.5'>
                          4
                        </span>
                        <div>
                          <p className='font-medium text-xs'>💧 避免头发遮挡</p>
                          <p className='text-xs text-gray-600 dark:text-gray-400'>
                            如头发较多，可用水润湿贴在头上，或洗澡后拍摄
                          </p>
                        </div>
                      </div>
                      <p className='text-xs text-red-600 dark:text-red-400 font-medium mt-3'>
                        ⚠️ 所有拍摄请确保宝宝安全、健康！
                      </p>
                    </div>
                  </div>
                }
                placement='bottom'
              >
                <span className='inline-flex items-center gap-1 px-2 py-1 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-medium cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors duration-200 border border-blue-200/50 dark:border-blue-700/50'>
                  📋 拍摄要点
                </span>
              </Tooltip>
            </div>
            <p className='text-gray-600 dark:text-gray-400'>
              按照指南拍摄并上传头部俯视图
            </p>
          </div>

          {!images.top ? (
            <div
              className='relative aspect-square border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl overflow-hidden cursor-pointer hover:border-primary transition-all duration-300'
              role='button'
              tabIndex={0}
              onClick={() => document.getElementById('top-upload')?.click()}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  document.getElementById('top-upload')?.click()
                }
              }}
            >
              {/* Background placeholder image with annotations */}
              <div className='absolute inset-0'>
                <img
                  alt='俯视图拍摄示例'
                  className='w-full h-full object-contain opacity-70 dark:opacity-60'
                  src='/images/detection/head_normal_top.jpg'
                />
                <div className='absolute inset-0 bg-white/30 dark:bg-gray-900/30' />

                {/* Reference indicators */}
                <div className='absolute inset-0'>
                  {/* Vertical dashed line connecting frontal and occipital */}
                  <div className='absolute left-1/2 top-8 bottom-8 w-0.5 border-l-2 border-dashed border-rose-500/70 transform -translate-x-1/2' />

                  {/* 前额 (Frontal) label - top center */}
                  <div className='absolute top-0 left-1/2 transform -translate-x-1/2 bg-rose-500/90 text-white text-xs px-2.5 py-1 rounded font-medium shadow-md backdrop-blur-sm'>
                    前额
                  </div>

                  {/* 鼻子 (Nose) indicator - below frontal area */}
                  <div className='absolute top-8 left-1/2 flex items-center'>
                    {/* Horizontal dashed line pointing right */}
                    <div className='w-32 h-0.5 border-t-2 border-dashed border-rose-500/70' />
                    {/* Label */}
                    <div className='ml-2 bg-orange-100/90 text-orange-800 text-xs px-2.5 py-1 rounded font-medium shadow-md backdrop-blur-sm whitespace-nowrap'>
                      刚刚漏出鼻子
                    </div>
                  </div>

                  {/* 后枕 (Occipital) label - bottom center */}
                  <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-rose-500/90 text-white text-xs px-2.5 py-1 rounded font-medium shadow-md backdrop-blur-sm'>
                    后枕
                  </div>
                </div>
              </div>

              {/* Upload content overlay */}
              <div className='relative z-10 flex items-center justify-center h-full'>
                <div className='text-center space-y-6 p-8'>
                  {/* Centered upload prompt */}
                  <div className='flex flex-col items-center justify-center gap-4'>
                    <div className='w-14 h-14 bg-white/95 dark:bg-gray-700/95 rounded-2xl flex items-center justify-center shadow-xl backdrop-blur-sm border border-white/70 dark:border-gray-600/70 transition-all duration-300 hover:scale-105'>
                      <Upload className='w-7 h-7 text-primary' />
                    </div>
                    <div className='text-center'>
                      <p className='text-lg font-semibold text-gray-900 dark:text-white drop-shadow-sm'>
                        点击或拖拽图片到此处
                      </p>
                    </div>
                  </div>
                  {/* File format info with refined style */}
                  <div className='inline-flex items-center gap-2 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg px-4 py-2.5 border border-white/80 dark:border-gray-600/80 shadow-lg'>
                    <div className='w-2 h-2 bg-primary/60 rounded-full' />
                    <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                      支持 JPG、PNG 格式，最大 10MB
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className='space-y-6'>
              <div className='relative aspect-square bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700'>
                <img
                  alt='俯视图原图'
                  className='w-full h-full object-contain'
                  src={images.top.url}
                  style={{
                    transform: `rotate(${images.top.rotation}deg) scale(${images.top.scale})`,
                  }}
                />

                {/* Overlay annotations */}
                <div className='absolute inset-0 pointer-events-none'>
                  {/* Vertical dashed line connecting forehead and occipital */}
                  <div className='absolute left-1/2 top-0 bottom-0 w-0.5 border-l-2 border-dashed border-rose-500/70 transform -translate-x-1/2' />

                  {/* 前额 (Forehead) label - top center */}
                  <div className='absolute top-0 left-1/2 transform -translate-x-1/2 bg-rose-500/90 text-white text-xs px-2.5 py-1 rounded font-medium shadow-md backdrop-blur-sm'>
                    前额
                  </div>

                  {/* 后枕 (Occipital) label - bottom center */}
                  <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-rose-500/90 text-white text-xs px-2.5 py-1 rounded font-medium shadow-md backdrop-blur-sm'>
                    后枕
                  </div>
                </div>
              </div>
              <div className='space-y-4'>
                {/* Rotation Control */}
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                      旋转调整
                    </span>
                    <span className='text-xs text-gray-500 dark:text-gray-400'>
                      💡 调整图片角度，确保前额朝上
                    </span>
                  </div>
                  <RotationControl
                    rotation={images.top?.rotation || 0}
                    onChange={rotation => setImageRotation('top', rotation)}
                  />
                </div>

                {/* Action Buttons */}
                <div className='flex gap-2'>
                  <Button
                    className='flex-1 h-10 bg-primary text-white font-medium'
                    disabled={isProcessing || isLoadingModel || !isModelLoaded}
                    size='md'
                    startContent={
                      isLoadingModel ? (
                        <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
                      ) : isProcessing ? (
                        <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
                      ) : (
                        <CheckCircle className='w-4 h-4' />
                      )
                    }
                    onClick={analyzeTopView}
                  >
                    {isLoadingModel
                      ? '模型加载中...'
                      : isProcessing
                        ? '分析中...'
                        : '开始分析'}
                  </Button>
                  <Button
                    className='h-10 px-3'
                    size='md'
                    startContent={<Upload className='w-4 h-4' />}
                    variant='bordered'
                    onClick={() =>
                      document.getElementById('top-upload')?.click()
                    }
                  >
                    重新上传
                  </Button>
                </div>
              </div>
            </div>
          )}
          <input
            accept='image/*'
            className='hidden'
            id='top-upload'
            type='file'
            onChange={e => handleFileUpload(e, 'top')}
          />
        </div>

        {/* Results Section */}
        <div className='space-y-6'>
          <div className='text-center xl:text-left'>
            <h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
              分析结果
            </h3>
            <p className='text-gray-600 dark:text-gray-400'>
              根据识别的头型轮廓，计算 CI、CVAI
            </p>
          </div>

          {currentStep < 3 ? (
            <div className='aspect-square flex items-center justify-center bg-gray-50/50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700'>
              <div className='text-center space-y-6'>
                {currentStep === 1 ? (
                  <>
                    <div className='w-20 h-20 mx-auto bg-white dark:bg-gray-700 rounded-2xl flex items-center justify-center shadow-lg'>
                      <Camera className='w-10 h-10 text-gray-400' />
                    </div>
                    <div>
                      <p className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
                        等待图片上传
                      </p>
                      <p className='text-gray-500 dark:text-gray-400'>
                        上传图片后开始AI智能分析
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className='w-20 h-20 mx-auto bg-primary rounded-2xl flex items-center justify-center shadow-lg'>
                      <div className='w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin' />
                    </div>
                    <div>
                      <p className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
                        AI正在分析中
                      </p>
                      <p className='text-gray-500 dark:text-gray-400'>
                        深度学习算法正在处理您的图片...
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            analysisResult && (
              <div className='space-y-8'>
                {/* Visualization */}
                <div className='aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl border border-primary/20 dark:border-primary/30 overflow-hidden relative'>
                  {analysisResult?.mask ? (
                    <>
                      {/* Base mask visualization */}
                      <canvas
                        ref={canvas => {
                          if (canvas && analysisResult.mask) {
                            canvas.width = analysisResult.mask.width
                            canvas.height = analysisResult.mask.height
                            const ctx = canvas.getContext('2d')!

                            ctx.putImageData(analysisResult.mask, 0, 0)
                          }
                        }}
                        className='w-full h-full object-contain'
                      />

                      {/* Measurement lines overlay */}
                      {analysisResult.measurements && (
                        <canvas
                          ref={canvas => {
                            if (
                              canvas &&
                              analysisResult.measurements &&
                              analysisResult.mask
                            ) {
                              canvas.width = analysisResult.mask.width
                              canvas.height = analysisResult.mask.height
                              drawMeasurementAnnotations(
                                canvas,
                                analysisResult.mask,
                                analysisResult.measurements
                              )
                            }
                          }}
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

                            downloadCanvasAsPNG(
                              canvas,
                              'head-analysis-result.png'
                            )
                          }
                        }}
                      >
                        下载结果
                      </button>
                    </>
                  ) : (
                    <div className='flex items-center justify-center h-full'>
                      <div className='text-center space-y-4'>
                        <div className='w-16 h-16 mx-auto bg-primary rounded-2xl flex items-center justify-center shadow-lg'>
                          <CheckCircle className='w-8 h-8 text-white' />
                        </div>
                        <div>
                          <p className='text-lg font-semibold text-gray-900 dark:text-white'>
                            AI分析完成
                          </p>
                          <p className='text-sm text-gray-600 dark:text-gray-400'>
                            基于深度学习的头型识别
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Legend - only show measurement annotations */}
                {analysisResult?.measurements && (
                  <div className='bg-gray-50 dark:bg-gray-800 rounded-lg p-6'>
                    <h6 className='text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4'>
                      测量标注
                    </h6>
                    <div className='flex flex-wrap gap-6 text-sm'>
                      <div className='flex items-center gap-3'>
                        <div
                          className='w-4 h-1 rounded-sm'
                          style={{ backgroundColor: '#FFDC00' }}
                        />
                        <span className='text-gray-700 dark:text-gray-300 font-medium'>
                          BPD (双顶径)
                        </span>
                      </div>
                      <div className='flex items-center gap-3'>
                        <div
                          className='w-1 h-4 rounded-sm'
                          style={{ backgroundColor: '#F24C62' }}
                        />
                        <span className='text-gray-700 dark:text-gray-300 font-medium'>
                          OFD (枕额径)
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
                          对角线
                        </span>
                      </div>
                    </div>
                  </div>
                )}
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
                  检测失败
                </div>
              </div>
              <div className='text-red-600 dark:text-red-400'>
                {analysisResult.error}
              </div>
            </div>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4'>
              {/* CI Index with Classification */}
              <CICard
                measurements={
                  analysisResult.measurements
                    ? {
                        bpd: analysisResult.measurements.bpd,
                        ofd: analysisResult.measurements.ofd,
                      }
                    : undefined
                }
                value={analysisResult.ci || 0}
              />

              {/* CVAI Index with Classification */}
              <CVAICard
                measurements={
                  analysisResult.measurements
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
                }
                value={analysisResult.cvai || 0}
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
