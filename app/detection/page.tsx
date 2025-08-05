'use client'

import { useState, useEffect } from 'react'
import React from 'react'
import { Button } from '@heroui/button'
import { Card, CardBody, CardHeader } from '@heroui/card'
import { Tabs, Tab } from '@heroui/tabs'
import { Upload, RotateCcw, Sparkles, Brain, Target, RotateCw } from 'lucide-react'

type ImageType = 'top' | 'left' | 'right'

// Rotation Control Component
interface RotationControlProps {
  rotation: number
  onChange: (rotation: number) => void
  className?: string
}

const RotationControl: React.FC<RotationControlProps> = ({ rotation, onChange, className = '' }) => {
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, rotation: 0 })

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX, y: e.clientY, rotation })
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return
    
    const deltaX = e.clientX - dragStart.x
    const newRotation = (dragStart.rotation + deltaX) % 360
    onChange(newRotation < 0 ? newRotation + 360 : newRotation)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, dragStart])

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Button
        size='sm'
        variant='light'
        isIconOnly
        className='w-8 h-8 min-w-8'
        onClick={() => onChange((rotation - 15) % 360)}
      >
        <RotateCcw className='w-3 h-3' />
      </Button>
      
      <div className='flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-1'>
        <input
          type='number'
          value={Math.round(rotation)}
          onChange={(e) => onChange(parseInt(e.target.value) || 0)}
          className='w-12 text-xs text-center bg-transparent border-none outline-none'
          min='0'
          max='359'
        />
        <span className='text-xs text-gray-500'>°</span>
      </div>
      
      <div
         className='w-6 h-6 border-2 border-gray-300 dark:border-gray-600 rounded-full cursor-grab active:cursor-grabbing relative'
         role='slider'
         tabIndex={0}
         aria-label='Rotation control'
         aria-valuemin={0}
         aria-valuemax={359}
         aria-valuenow={Math.round(rotation)}
         onMouseDown={handleMouseDown}
         onKeyDown={(e) => {
           if (e.key === 'ArrowLeft') {
             e.preventDefault()
             onChange((rotation - 15) % 360)
           } else if (e.key === 'ArrowRight') {
             e.preventDefault()
             onChange((rotation + 15) % 360)
           }
         }}
       >
        <div 
          className='absolute w-1 h-3 bg-primary rounded-full'
          style={{
            top: '1px',
            left: '50%',
            transform: `translateX(-50%) rotate(${rotation}deg)`,
            transformOrigin: '50% 10px'
          }}
        />
      </div>
      
      <Button
        size='sm'
        variant='light'
        isIconOnly
        className='w-8 h-8 min-w-8'
        onClick={() => onChange((rotation + 15) % 360)}
      >
        <RotateCw className='w-3 h-3' />
      </Button>
    </div>
  )
}

interface ImageData {
  file: File
  url: string
  rotation: number
  scale: number
}

interface AnalysisResult {
  ci: number
  cvai: number
  headShape: string
  confidence: number
}

export default function DetectionPage() {
  const [images, setImages] = useState<Record<ImageType, ImageData | null>>({
    top: null,
    left: null,
    right: null,
  })
  const [currentStep, setCurrentStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  )
  const [showSideComparison, setShowSideComparison] = useState(false)
  const [activeTab, setActiveTab] = useState<ImageType>('left')
  const [showTopGuide, setShowTopGuide] = useState(false)
  const [showSideGuide, setShowSideGuide] = useState(false)

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
        setShowSideComparison(true)
      }
    }
  }

  const analyzeTopView = async () => {
    if (!images.top) return

    setIsProcessing(true)
    setCurrentStep(2)

    // Simulate AI analysis
    setTimeout(() => {
      const mockResult: AnalysisResult = {
        ci: 0.75 + Math.random() * 0.2,
        cvai: 0.85 + Math.random() * 0.1,
        headShape: Math.random() > 0.5 ? '正常' : '轻微扁头',
        confidence: 0.9 + Math.random() * 0.1,
      }

      setAnalysisResult(mockResult)
      setCurrentStep(3)
      setIsProcessing(false)
    }, 3000)
  }

  const rotateImage = (imageType: ImageType, angle?: number) => {
    setImages(prev => {
      const currentImage = prev[imageType]
      if (!currentImage) return prev
      
      return {
        ...prev,
        [imageType]: {
          ...currentImage,
          rotation: angle !== undefined ? angle : (currentImage.rotation + 90) % 360,
        },
      }
    })
  }

  const setImageRotation = (imageType: ImageType, rotation: number) => {
    setImages(prev => {
      const currentImage = prev[imageType]
      if (!currentImage) return prev
      
      return {
        ...prev,
        [imageType]: {
          ...currentImage,
          rotation: rotation % 360,
        },
      }
    })
  }

  const reset = () => {
    setImages({ top: null, left: null, right: null })
    setCurrentStep(1)
    setIsProcessing(false)
    setAnalysisResult(null)
    setShowSideComparison(false)
  }

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
            <h1 className='text-6xl md:text-7xl font-light mb-8 tracking-tight leading-tight'>
              <span className='font-extralight text-gray-900 dark:text-white drop-shadow-sm'>
                婴儿
              </span>
              <span className='font-medium bg-gradient-to-r from-primary via-blue-600 to-secondary bg-clip-text text-transparent drop-shadow-sm'>
                头型分析
              </span>
            </h1>
            <p className='text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed font-light'>
              基于深度学习算法的专业头型评估系统
            </p>
          </div>

          {/* Main Content */}
          <div className='w-full space-y-24'>
            {/* Top View Analysis Section */}
            <div className='max-w-7xl mx-auto'>
              <div className='text-center mb-16'>
                <div className='inline-flex items-center gap-2 px-3 py-1 bg-primary/5 rounded-full text-primary text-sm font-medium mb-6'>
                  <Brain className='w-4 h-4' />
                  俯视图分析
                </div>
                <h2 className='text-4xl font-light mb-6 text-gray-900 dark:text-white'>
                  精准的头型测量
                </h2>
                <p className='text-lg text-gray-600 dark:text-gray-400 font-light'>
                  上传宝宝俯视图，获得CI和CVAI指数的专业分析
                </p>
              </div>

              {/* Compact Shooting Guide Section */}
              <Card className='mb-6 bg-gradient-to-r from-blue-50/80 via-indigo-50/40 to-purple-50/30 dark:from-blue-950/50 dark:via-indigo-950/30 dark:to-purple-950/20 border border-blue-200/40 dark:border-blue-700/40 shadow-lg backdrop-blur-sm'>
                <CardBody className='p-6'>
                  <div
                    className='cursor-pointer select-none'
                    role='button'
                    tabIndex={0}
                    onClick={() => setShowTopGuide(!showTopGuide)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        setShowTopGuide(!showTopGuide)
                      }
                    }}
                  >
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-4'>
                        <div className='inline-flex items-center gap-2 bg-blue-500/10 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-medium'>
                          <svg
                            className='w-4 h-4'
                            fill='currentColor'
                            viewBox='0 0 20 20'
                          >
                            <path
                              clipRule='evenodd'
                              d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                              fillRule='evenodd'
                            />
                          </svg>
                          拍摄指南
                        </div>
                        <div>
                          <h3 className='text-lg font-bold text-gray-900 dark:text-white'>
                            如何正确拍摄俯视图
                          </h3>
                          <p className='text-sm text-gray-600 dark:text-gray-400'>
                            点击查看详细拍摄示例和要点
                          </p>
                        </div>
                      </div>
                      <div className='flex items-center gap-3'>
                        {/* Quick tips */}
                        <div className='hidden sm:flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400'>
                          <span className='bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-full'>
                            垂直拍摄
                          </span>
                          <span className='bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-1 rounded-full'>
                            头部居中
                          </span>
                          <span className='bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 px-2 py-1 rounded-full'>
                            光线充足
                          </span>
                        </div>
                        <svg
                          className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${showTopGuide ? 'rotate-180' : ''}`}
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            d='M19 9l-7 7-7-7'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {showTopGuide && (
                    <div className='mt-8 pt-6 border-t border-gray-200/60 dark:border-gray-700/60'>
                      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                        {/* Example Image */}
                        <div className='space-y-4'>
                          <div className='text-center'>
                            <h4 className='font-semibold text-base text-gray-800 dark:text-gray-200 mb-3'>
                              ✅ 正确示例
                            </h4>
                            <div className='aspect-square bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-xl border-2 border-green-200 dark:border-green-700 overflow-hidden shadow-lg relative group hover:shadow-xl transition-all duration-300'>
                              {/* Example SVG illustration */}
                              <div className='w-full h-full flex items-center justify-center p-6'>
                                <svg
                                  className='w-full h-full max-w-48 max-h-48'
                                  viewBox='0 0 240 240'
                                >
                                  {/* Background circle representing head outline */}
                                  <circle
                                    cx='120'
                                    cy='120'
                                    fill='none'
                                    opacity='0.6'
                                    r='95'
                                    stroke='#10b981'
                                    strokeDasharray='8,4'
                                    strokeWidth='2'
                                  />
                                  {/* Head shape */}
                                  <ellipse
                                    cx='120'
                                    cy='120'
                                    fill='#fef3c7'
                                    rx='75'
                                    ry='85'
                                    stroke='#d97706'
                                    strokeWidth='2.5'
                                  />
                                  {/* Hair */}
                                  <path
                                    d='M 55 85 Q 120 50 185 85 Q 165 70 120 75 Q 75 70 55 85'
                                    fill='#92400e'
                                  />
                                  {/* Eyes */}
                                  <circle
                                    cx='100'
                                    cy='105'
                                    fill='#374151'
                                    r='4'
                                  />
                                  <circle
                                    cx='140'
                                    cy='105'
                                    fill='#374151'
                                    r='4'
                                  />
                                  {/* Nose */}
                                  <ellipse
                                    cx='120'
                                    cy='125'
                                    fill='#f59e0b'
                                    rx='3'
                                    ry='5'
                                  />
                                  {/* Mouth */}
                                  <path
                                    d='M 108 145 Q 120 152 132 145'
                                    fill='none'
                                    stroke='#dc2626'
                                    strokeLinecap='round'
                                    strokeWidth='2.5'
                                  />
                                  {/* Center guidelines */}
                                  <line
                                    opacity='0.8'
                                    stroke='#10b981'
                                    strokeDasharray='4,4'
                                    strokeWidth='1.5'
                                    x1='120'
                                    x2='120'
                                    y1='25'
                                    y2='215'
                                  />
                                  <line
                                    opacity='0.8'
                                    stroke='#10b981'
                                    strokeDasharray='4,4'
                                    strokeWidth='1.5'
                                    x1='25'
                                    x2='215'
                                    y1='120'
                                    y2='120'
                                  />
                                  {/* Camera icon */}
                                  <g transform='translate(180, 35)'>
                                    <rect
                                      fill='#374151'
                                      height='18'
                                      rx='4'
                                      width='30'
                                      x='0'
                                      y='6'
                                    />
                                    <circle
                                      cx='15'
                                      cy='15'
                                      fill='#6b7280'
                                      r='5'
                                    />
                                    <circle
                                      cx='15'
                                      cy='15'
                                      fill='#9ca3af'
                                      r='3'
                                    />
                                    <rect
                                      fill='#4b5563'
                                      height='4'
                                      rx='2'
                                      width='10'
                                      x='10'
                                      y='2'
                                    />
                                  </g>
                                  {/* Arrow pointing down */}
                                  <path
                                    d='M 195 50 L 195 65 M 188 58 L 195 65 L 202 58'
                                    fill='none'
                                    stroke='#10b981'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2.5'
                                  />
                                  {/* Distance indicator */}
                                  <g transform='translate(30, 180)'>
                                    <text
                                      fill='#059669'
                                      fontSize='12'
                                      fontWeight='600'
                                      x='0'
                                      y='0'
                                    >
                                      30-50cm
                                    </text>
                                  </g>
                                </svg>
                              </div>
                              {/* Success badge */}
                              <div className='absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-md'>
                                <svg
                                  className='w-3 h-3'
                                  fill='currentColor'
                                  viewBox='0 0 20 20'
                                >
                                  <path
                                    clipRule='evenodd'
                                    d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                                    fillRule='evenodd'
                                  />
                                </svg>
                                标准
                              </div>
                            </div>
                            <p className='text-xs text-gray-600 dark:text-gray-400 mt-2 font-medium'>
                              头部居中，轮廓清晰，光线均匀
                            </p>
                          </div>
                        </div>

                        {/* Requirements List */}
                        <div className='space-y-4'>
                          <h4 className='font-semibold text-base text-gray-800 dark:text-gray-200 text-center mb-4'>
                            📋 拍摄要点
                          </h4>
                          <div className='space-y-3'>
                            <div className='flex items-start gap-3 p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg border border-gray-200/60 dark:border-gray-700/60 shadow-sm hover:shadow-md transition-all duration-300'>
                              <div className='w-8 h-8 bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                                <span className='text-blue-600 dark:text-blue-400 font-bold text-sm'>
                                  1
                                </span>
                              </div>
                              <div>
                                <h5 className='font-semibold text-gray-900 dark:text-white mb-1 text-sm'>
                                  📐 垂直拍摄
                                </h5>
                                <p className='text-xs text-gray-600 dark:text-gray-400 leading-relaxed'>
                                  相机垂直向下，与宝宝头部保持90度角，距离30-50cm
                                </p>
                              </div>
                            </div>

                            <div className='flex items-start gap-3 p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg border border-gray-200/60 dark:border-gray-700/60 shadow-sm hover:shadow-md transition-all duration-300'>
                              <div className='w-8 h-8 bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                                <span className='text-green-600 dark:text-green-400 font-bold text-sm'>
                                  2
                                </span>
                              </div>
                              <div>
                                <h5 className='font-semibold text-gray-900 dark:text-white mb-1 text-sm'>
                                  🎯 头部居中
                                </h5>
                                <p className='text-xs text-gray-600 dark:text-gray-400 leading-relaxed'>
                                  确保头部完整且位于画面正中央，参考十字辅助线
                                </p>
                              </div>
                            </div>

                            <div className='flex items-start gap-3 p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg border border-gray-200/60 dark:border-gray-700/60 shadow-sm hover:shadow-md transition-all duration-300'>
                              <div className='w-8 h-8 bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                                <span className='text-yellow-600 dark:text-yellow-400 font-bold text-sm'>
                                  3
                                </span>
                              </div>
                              <div>
                                <h5 className='font-semibold text-gray-900 dark:text-white mb-1 text-sm'>
                                  💡 光线充足
                                </h5>
                                <p className='text-xs text-gray-600 dark:text-gray-400 leading-relaxed'>
                                  避免阴影，确保头型轮廓清晰可见，建议自然光拍摄
                                </p>
                              </div>
                            </div>

                            <div className='flex items-start gap-3 p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg border border-gray-200/60 dark:border-gray-700/60 shadow-sm hover:shadow-md transition-all duration-300'>
                              <div className='w-8 h-8 bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                                <span className='text-purple-600 dark:text-purple-400 font-bold text-sm'>
                                  4
                                </span>
                              </div>
                              <div>
                                <h5 className='font-semibold text-gray-900 dark:text-white mb-1 text-sm'>
                                  🎨 背景简洁
                                </h5>
                                <p className='text-xs text-gray-600 dark:text-gray-400 leading-relaxed'>
                                  使用纯色背景，与头部形成良好对比，避免花纹干扰
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardBody>
              </Card>

              {/* Analysis Interface */}
              <div className='grid grid-cols-1 xl:grid-cols-2 gap-16 py-8'>
                {/* Upload Section */}
                <div className='space-y-6'>
                  <div className='text-center xl:text-left'>
                    <h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
                      俯视图上传
                    </h3>
                    <p className='text-gray-600 dark:text-gray-400'>
                      按照指南拍摄并上传头部俯视图
                    </p>
                  </div>

                  {!images.top ? (
                    <div
                      className='relative aspect-square border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl overflow-hidden cursor-pointer hover:border-primary transition-all duration-300'
                      role='button'
                      tabIndex={0}
                      onClick={() =>
                        document.getElementById('top-upload')?.click()
                      }
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
                            <div className='w-2 h-2 bg-primary/60 rounded-full'></div>
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
                           <div className='absolute left-1/2 top-0 bottom-0 w-0.5 border-l-2 border-dashed border-rose-500/70 transform -translate-x-1/2'></div>
                           
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
                          <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>旋转调整</span>
                          <RotationControl
                            rotation={images.top?.rotation || 0}
                            onChange={(rotation) => setImageRotation('top', rotation)}
                          />
                        </div>
                        
                        {/* Action Buttons */}
                        <div className='flex gap-2'>
                          <Button
                            className='flex-1 h-10 bg-primary text-white font-medium'
                            disabled={isProcessing}
                            size='md'
                            startContent={
                              isProcessing ? (
                                <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
                              ) : (
                                <Sparkles className='w-4 h-4' />
                              )
                            }
                            onClick={analyzeTopView}
                          >
                            {isProcessing ? '分析中...' : '开始分析'}
                          </Button>
                          <Button
                            className='h-10 px-3'
                            size='md'
                            variant='bordered'
                            startContent={<Upload className='w-4 h-4' />}
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
                      AI智能评估与头型判断
                    </p>
                  </div>

                  {currentStep < 3 ? (
                    <div className='aspect-square flex items-center justify-center bg-gray-50/50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700'>
                      <div className='text-center space-y-6'>
                        {currentStep === 1 ? (
                          <>
                            <div className='w-20 h-20 mx-auto bg-white dark:bg-gray-700 rounded-2xl flex items-center justify-center shadow-lg'>
                              <Brain className='w-10 h-10 text-gray-400' />
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
                        <div className='aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl border border-primary/20 dark:border-primary/30 flex items-center justify-center'>
                          <div className='text-center space-y-4'>
                            <div className='w-16 h-16 mx-auto bg-primary rounded-2xl flex items-center justify-center shadow-lg'>
                              <Brain className='w-8 h-8 text-white' />
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

                        {/* Metrics */}
                        <div className='space-y-6'>
                          <div className='grid grid-cols-2 gap-4'>
                            <div className='bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm'>
                              <div className='text-3xl font-bold text-primary mb-2'>
                                {(analysisResult.ci * 100).toFixed(1)}%
                              </div>
                              <div className='text-sm text-gray-600 dark:text-gray-400 font-medium'>
                                CI指数
                              </div>
                              <div className='text-xs text-gray-500 dark:text-gray-500 mt-1'>
                                头颅指数
                              </div>
                            </div>
                            <div className='bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm'>
                              <div className='text-3xl font-bold text-secondary mb-2'>
                                {(analysisResult.cvai * 100).toFixed(1)}%
                              </div>
                              <div className='text-sm text-gray-600 dark:text-gray-400 font-medium'>
                                CVAI指数
                              </div>
                              <div className='text-xs text-gray-500 dark:text-gray-500 mt-1'>
                                头型评估
                              </div>
                            </div>
                          </div>

                          <div className='bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm'>
                            <div className='flex items-center gap-3 mb-3'>
                              <div className='w-3 h-3 bg-success rounded-full' />
                              <div className='text-xl font-bold text-gray-900 dark:text-white'>
                                {analysisResult.headShape}
                              </div>
                            </div>
                            <div className='text-sm text-gray-600 dark:text-gray-400'>
                              置信度:{' '}
                              <span className='font-semibold'>
                                {(analysisResult.confidence * 100).toFixed(1)}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Side View Comparison Section */}
            <div className='max-w-7xl mx-auto'>
              <div className='text-center mb-16'>
                <div className='inline-flex items-center gap-2 px-3 py-1 bg-secondary/5 rounded-full text-secondary text-sm font-medium mb-6'>
                  <Target className='w-4 h-4' />
                  侧视图对比
                </div>
                <h2 className='text-4xl font-light mb-6 text-gray-900 dark:text-white'>
                  轮廓对比分析
                </h2>
                <p className='text-lg text-gray-600 dark:text-gray-400 font-light'>
                  上传侧视图与标准轮廓进行专业对比
                </p>
              </div>

              {/* Compact Side View Shooting Guide */}
              <Card className='mb-6 bg-gradient-to-r from-purple-50/80 via-pink-50/40 to-orange-50/30 dark:from-purple-950/50 dark:via-pink-950/30 dark:to-orange-950/20 border border-purple-200/40 dark:border-purple-700/40 shadow-lg backdrop-blur-sm'>
                <CardBody className='p-6'>
                  <div
                    className='cursor-pointer select-none'
                    role='button'
                    tabIndex={0}
                    onClick={() => setShowSideGuide(!showSideGuide)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        setShowSideGuide(!showSideGuide)
                      }
                    }}
                  >
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-4'>
                        <div className='inline-flex items-center gap-2 bg-purple-500/10 text-purple-600 dark:text-purple-400 px-4 py-2 rounded-full text-sm font-medium'>
                          <svg
                            className='w-4 h-4'
                            fill='currentColor'
                            viewBox='0 0 20 20'
                          >
                            <path
                              clipRule='evenodd'
                              d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                              fillRule='evenodd'
                            />
                          </svg>
                          侧视图指南
                        </div>
                        <div>
                          <h3 className='text-lg font-bold text-gray-900 dark:text-white'>
                            如何正确拍摄侧视图
                          </h3>
                          <p className='text-sm text-gray-600 dark:text-gray-400'>
                            点击查看详细拍摄示例和要点
                          </p>
                        </div>
                      </div>
                      <div className='flex items-center gap-3'>
                        {/* Quick tips */}
                        <div className='hidden sm:flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400'>
                          <span className='bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 px-2 py-1 rounded-full'>
                            侧面姿势
                          </span>
                          <span className='bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400 px-2 py-1 rounded-full'>
                            轮廓清晰
                          </span>
                          <span className='bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 px-2 py-1 rounded-full'>
                            避免遮挡
                          </span>
                        </div>
                        <svg
                          className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${showSideGuide ? 'rotate-180' : ''}`}
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            d='M19 9l-7 7-7-7'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {showSideGuide && (
                    <div className='mt-8 pt-6 border-t border-gray-200/60 dark:border-gray-700/60'>
                      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                        {/* Example Images */}
                        <div className='space-y-4'>
                          <div className='text-center'>
                            <h4 className='font-semibold text-base text-gray-800 dark:text-gray-200 mb-3'>
                              ✅ 正确示例
                            </h4>
                            <div className='aspect-[4/3] bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-xl border-2 border-green-200 dark:border-green-700 overflow-hidden shadow-lg relative group hover:shadow-xl transition-all duration-300'>
                              {/* Side view SVG illustration */}
                              <div className='w-full h-full flex items-center justify-center p-6'>
                                <svg
                                  className='w-full h-full max-w-64 max-h-48'
                                  viewBox='0 0 300 240'
                                >
                                  {/* Head profile outline */}
                                  <path
                                    d='M 80 60 Q 120 40 160 60 Q 180 80 185 120 Q 180 160 160 180 Q 120 200 80 180 Q 60 160 55 120 Q 60 80 80 60'
                                    fill='#fef3c7'
                                    stroke='#d97706'
                                    strokeWidth='2.5'
                                  />
                                  {/* Hair */}
                                  <path
                                    d='M 75 65 Q 115 45 155 65 Q 140 55 120 58 Q 100 55 85 60 Q 80 62 75 65'
                                    fill='#92400e'
                                  />
                                  {/* Forehead line */}
                                  <line
                                    stroke='#d97706'
                                    strokeWidth='1.5'
                                    x1='80'
                                    x2='75'
                                    y1='80'
                                    y2='85'
                                  />
                                  {/* Eye */}
                                  <circle
                                    cx='95'
                                    cy='100'
                                    fill='#374151'
                                    r='3'
                                  />
                                  {/* Nose profile */}
                                  <path
                                    d='M 55 110 Q 50 115 55 120'
                                    fill='none'
                                    stroke='#d97706'
                                    strokeLinecap='round'
                                    strokeWidth='2'
                                  />
                                  {/* Mouth */}
                                  <path
                                    d='M 65 140 Q 70 145 75 140'
                                    fill='none'
                                    stroke='#dc2626'
                                    strokeLinecap='round'
                                    strokeWidth='2'
                                  />
                                  {/* Ear */}
                                  <ellipse
                                    cx='175'
                                    cy='120'
                                    fill='#fbbf24'
                                    rx='8'
                                    ry='15'
                                    stroke='#d97706'
                                    strokeWidth='1.5'
                                  />
                                  {/* Profile guidelines */}
                                  <line
                                    opacity='0.8'
                                    stroke='#10b981'
                                    strokeDasharray='4,4'
                                    strokeWidth='1.5'
                                    x1='50'
                                    x2='50'
                                    y1='60'
                                    y2='180'
                                  />
                                  <line
                                    opacity='0.8'
                                    stroke='#10b981'
                                    strokeDasharray='4,4'
                                    strokeWidth='1.5'
                                    x1='185'
                                    x2='185'
                                    y1='60'
                                    y2='180'
                                  />
                                  {/* Camera position */}
                                  <g transform='translate(220, 100)'>
                                    <rect
                                      fill='#374151'
                                      height='18'
                                      rx='4'
                                      width='30'
                                      x='0'
                                      y='6'
                                    />
                                    <circle
                                      cx='15'
                                      cy='15'
                                      fill='#6b7280'
                                      r='5'
                                    />
                                    <circle
                                      cx='15'
                                      cy='15'
                                      fill='#9ca3af'
                                      r='3'
                                    />
                                    <rect
                                      fill='#4b5563'
                                      height='4'
                                      rx='2'
                                      width='10'
                                      x='10'
                                      y='2'
                                    />
                                  </g>
                                  {/* Arrow pointing left */}
                                  <path
                                    d='M 210 120 L 195 120 M 202 113 L 195 120 L 202 127'
                                    fill='none'
                                    stroke='#10b981'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2.5'
                                  />
                                  {/* Distance indicator */}
                                  <g transform='translate(220, 160)'>
                                    <text
                                      fill='#059669'
                                      fontSize='12'
                                      fontWeight='600'
                                      x='0'
                                      y='0'
                                    >
                                      30-50cm
                                    </text>
                                  </g>
                                </svg>
                              </div>
                              {/* Success badge */}
                              <div className='absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-md'>
                                <svg
                                  className='w-3 h-3'
                                  fill='currentColor'
                                  viewBox='0 0 20 20'
                                >
                                  <path
                                    clipRule='evenodd'
                                    d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                                    fillRule='evenodd'
                                  />
                                </svg>
                                标准
                              </div>
                            </div>
                            <p className='text-xs text-gray-600 dark:text-gray-400 mt-2 font-medium'>
                              轮廓完整，耳朵可见，无遮挡
                            </p>
                          </div>
                        </div>

                        {/* Requirements List */}
                        <div className='space-y-4'>
                          <h4 className='font-semibold text-base text-gray-800 dark:text-gray-200 text-center mb-4'>
                            📋 拍摄要点
                          </h4>
                          <div className='space-y-3'>
                            <div className='flex items-start gap-3 p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg border border-gray-200/60 dark:border-gray-700/60 shadow-sm hover:shadow-md transition-all duration-300'>
                              <div className='w-8 h-8 bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                                <span className='text-purple-600 dark:text-purple-400 font-bold text-sm'>
                                  1
                                </span>
                              </div>
                              <div>
                                <h5 className='font-semibold text-gray-900 dark:text-white mb-1 text-sm'>
                                  👶 侧面姿势
                                </h5>
                                <p className='text-xs text-gray-600 dark:text-gray-400 leading-relaxed'>
                                  宝宝侧躺或抱起侧拍，确保头部侧面完全展现
                                </p>
                              </div>
                            </div>

                            <div className='flex items-start gap-3 p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg border border-gray-200/60 dark:border-gray-700/60 shadow-sm hover:shadow-md transition-all duration-300'>
                              <div className='w-8 h-8 bg-gradient-to-br from-pink-500/20 to-pink-600/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                                <span className='text-pink-600 dark:text-pink-400 font-bold text-sm'>
                                  2
                                </span>
                              </div>
                              <div>
                                <h5 className='font-semibold text-gray-900 dark:text-white mb-1 text-sm'>
                                  👂 轮廓清晰
                                </h5>
                                <p className='text-xs text-gray-600 dark:text-gray-400 leading-relaxed'>
                                  从前额到后脑勺的完整轮廓线条，耳朵清晰可见
                                </p>
                              </div>
                            </div>

                            <div className='flex items-start gap-3 p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg border border-gray-200/60 dark:border-gray-700/60 shadow-sm hover:shadow-md transition-all duration-300'>
                              <div className='w-8 h-8 bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                                <span className='text-orange-600 dark:text-orange-400 font-bold text-sm'>
                                  3
                                </span>
                              </div>
                              <div>
                                <h5 className='font-semibold text-gray-900 dark:text-white mb-1 text-sm'>
                                  ✂️ 避免遮挡
                                </h5>
                                <p className='text-xs text-gray-600 dark:text-gray-400 leading-relaxed'>
                                  头发不要遮挡头型轮廓，必要时可轻轻整理
                                </p>
                              </div>
                            </div>

                            <div className='flex items-start gap-3 p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg border border-gray-200/60 dark:border-gray-700/60 shadow-sm hover:shadow-md transition-all duration-300'>
                              <div className='w-8 h-8 bg-gradient-to-br from-teal-500/20 to-teal-600/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                                <span className='text-teal-600 dark:text-teal-400 font-bold text-sm'>
                                  4
                                </span>
                              </div>
                              <div>
                                <h5 className='font-semibold text-gray-900 dark:text-white mb-1 text-sm'>
                                  📐 水平拍摄
                                </h5>
                                <p className='text-xs text-gray-600 dark:text-gray-400 leading-relaxed'>
                                  相机与头部保持水平，距离30-50cm，避免仰拍俯拍
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardBody>
              </Card>

              {/* Comparison Interface */}
              <Card className='border border-gray-200/60 dark:border-gray-700/60 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group'>
                <CardHeader className='border-b border-gray-200/60 dark:border-gray-700/60 p-6 bg-gray-50/50 dark:bg-gray-800/30 group-hover:bg-gray-50/70 dark:group-hover:bg-gray-800/50 transition-all duration-300'>
                  <div className='flex justify-between items-center w-full'>
                    <Tabs
                      selectedKey={activeTab}
                      size='lg'
                      variant='underlined'
                      onSelectionChange={key => setActiveTab(key as ImageType)}
                    >
                      <Tab key='left' title='左侧视图' />
                      <Tab key='right' title='右侧视图' />
                    </Tabs>
                    <div className='flex gap-2'>
                      <Button
                        className='h-9 px-3'
                        size='sm'
                        variant='bordered'
                        startContent={<Upload className='w-4 h-4' />}
                        onClick={() =>
                          document
                            .getElementById(`${activeTab}-upload`)
                            ?.click()
                        }
                      >
                        上传
                      </Button>
                      {(activeTab === 'left' ? images.left : images.right) && (
                        <Button
                          className='h-9 px-3'
                          size='sm'
                          variant='bordered'
                          color='danger'
                          onClick={() => {
                            setImages(prev => ({ ...prev, [activeTab]: null }))
                            if (!images.left && !images.right) {
                              setShowSideComparison(false)
                            }
                          }}
                        >
                          清除
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardBody className='p-8'>
                  <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 min-h-[500px]'>
                    {/* User's Image */}
                    <div className='space-y-4'>
                      <h4 className='text-lg font-medium text-center text-gray-900 dark:text-white'>
                        您的宝宝
                      </h4>
                      <div className='aspect-square bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 flex items-center justify-center overflow-hidden hover:border-primary/30 transition-all duration-300 group'>
                        {(activeTab === 'left' ? images.left : images.right) ? (
                          <img
                            alt={`${activeTab}侧视图`}
                            className='max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-300'
                            src={
                              (activeTab === 'left'
                                ? images.left
                                : images.right)!.url
                            }
                            style={{
                              transform: `rotate(${(activeTab === 'left' ? images.left : images.right)!.rotation}deg) scale(${(activeTab === 'left' ? images.left : images.right)!.scale})`,
                            }}
                          />
                        ) : (
                          <div
                            className='text-center space-y-6 relative z-10'
                            role='button'
                            style={{ cursor: 'pointer' }}
                            tabIndex={0}
                            onClick={() =>
                              document
                                .getElementById(`${activeTab}-upload`)
                                ?.click()
                            }
                            onKeyDown={e => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault()
                                document
                                  .getElementById(`${activeTab}-upload`)
                                  ?.click()
                              }
                            }}
                          >
                            <div className='w-16 h-16 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-105'>
                              <Upload className='w-8 h-8 text-gray-400 group-hover:text-primary transition-colors duration-300' />
                            </div>
                            <div>
                              <p className='text-gray-600 dark:text-gray-400 mb-2 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300 font-medium'>
                                点击上传{activeTab === 'left' ? '左' : '右'}
                                侧视图
                              </p>
                              <p className='text-sm text-gray-400 group-hover:text-gray-500 transition-colors duration-300'>
                                或拖拽文件到此处
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Rotation Control for Side View */}
                      {(activeTab === 'left' ? images.left : images.right) && (
                        <div className='flex items-center justify-between bg-gray-50 dark:bg-gray-800 rounded-lg p-3'>
                          <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>旋转调整</span>
                          <RotationControl
                            rotation={(activeTab === 'left' ? images.left : images.right)?.rotation || 0}
                            onChange={(rotation) => setImageRotation(activeTab, rotation)}
                          />
                        </div>
                      )}
                    </div>

                    {/* Reference Image */}
                    <div className='space-y-6'>
                      <h4 className='text-lg font-medium text-center text-gray-900 dark:text-white'>
                        标准参考
                      </h4>
                      <div className='aspect-square bg-gradient-to-br from-secondary/5 to-primary/5 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-inner hover:shadow-md transition-all duration-300 group'>
                        <div className='text-center space-y-4'>
                          <div className='w-20 h-20 mx-auto bg-gradient-to-br from-secondary/20 to-primary/20 rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-300'>
                            <span className='text-3xl group-hover:scale-110 transition-transform duration-300'>
                              👶
                            </span>
                          </div>
                          <p className='text-gray-500 font-medium group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors duration-300'>
                            标准{activeTab === 'left' ? '左' : '右'}侧轮廓
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hidden file inputs */}
                  <input
                    accept='image/*'
                    className='hidden'
                    id='left-upload'
                    type='file'
                    onChange={e => handleFileUpload(e, 'left')}
                  />
                  <input
                    accept='image/*'
                    className='hidden'
                    id='right-upload'
                    type='file'
                    onChange={e => handleFileUpload(e, 'right')}
                  />
                </CardBody>
              </Card>
            </div>

            {/* Reset Button */}
            <div className='flex justify-center pt-8'>
              <Button
                className='px-12 py-3 font-medium border-2 border-gray-300 dark:border-gray-600 hover:border-primary/50 hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300 backdrop-blur-sm shadow-sm hover:shadow-md hover:scale-105 active:scale-95 group'
                size='lg'
                startContent={
                  <RotateCcw className='w-5 h-5 group-hover:rotate-180 transition-transform duration-500' />
                }
                variant='bordered'
                onClick={reset}
              >
                重置所有内容
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
