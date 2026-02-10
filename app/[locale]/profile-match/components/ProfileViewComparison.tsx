'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { Button } from '@heroui/button'
import {
  Upload,
  ArrowRight,
  Move,
  ZoomIn,
  RotateCcw,
  Camera,
  Lightbulb,
  Sparkles,
  Shield,
} from 'lucide-react'

import { ProfileUploadArea } from './ProfileUploadArea'

import { useTranslations } from 'next-intl'

interface ProfileViewComparisonProps {
  // Add any props if needed
}

interface UploadedImage {
  file: File
  url: string
  x: number
  y: number
  scaleX: number
  scaleY: number
  rotation: number
  width: number
  height: number
}

export default function ProfileViewComparison({ }: ProfileViewComparisonProps) {
  const t = useTranslations()
  const [leftImage, setLeftImage] = useState<UploadedImage | null>(null)
  const [rightImage, setRightImage] = useState<UploadedImage | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [isTipsExpanded, setIsTipsExpanded] = useState(false)

  // Separate stage sizes for left and right containers
  const [leftStageSize, setLeftStageSize] = useState({
    width: 400,
    height: 300,
  })
  const [rightStageSize, setRightStageSize] = useState({
    width: 400,
    height: 300,
  })
  // Container refs for ResizeObserver to monitor size changes
  const leftContainerRef = useRef<HTMLDivElement>(null)
  const rightContainerRef = useRef<HTMLDivElement>(null)
  // File input refs for triggering file selection dialog
  const leftFileInputRef = useRef<HTMLInputElement>(null)
  const rightFileInputRef = useRef<HTMLInputElement>(null)

  // Use ResizeObserver to monitor container size changes
  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      entries.forEach(entry => {
        const { width } = entry.contentRect

        if (width > 0) {
          // Since ProfileUploadArea uses aspect-square, the stage should be square based on container width
          const size = Math.min(width, 600) // Cap at reasonable max size

          if (entry.target === leftContainerRef.current) {
            setLeftStageSize({ width: size, height: size })
          } else if (entry.target === rightContainerRef.current) {
            setRightStageSize({ width: size, height: size })
          }
        }
      })
    })

    // Set up ResizeObserver
    const observerTimer = setTimeout(() => {
      if (leftContainerRef.current) {
        resizeObserver.observe(leftContainerRef.current)
      }
      if (rightContainerRef.current) {
        resizeObserver.observe(rightContainerRef.current)
      }
    }, 200)

    return () => {
      clearTimeout(observerTimer)
      resizeObserver.disconnect()
    }
  }, [])

  // Cleanup URL objects on component unmount
  useEffect(() => {
    return () => {
      if (leftImage) {
        URL.revokeObjectURL(leftImage.url)
      }
      if (rightImage) {
        URL.revokeObjectURL(rightImage.url)
      }
    }
  }, [])

  // Handle file upload
  const handleFileUpload = useCallback(
    (file: File, side: 'left' | 'right') => {
      // Get the appropriate stage size for the side
      const currentStageSize = side === 'left' ? leftStageSize : rightStageSize

      console.log('leftStageSize: ', leftStageSize)
      // Ensure stage size is properly initialized
      if (currentStageSize.width <= 0 || currentStageSize.height <= 0) {
        console.warn(`Stage size not ready for ${side} side, delaying upload`)
        // Retry after a short delay
        setTimeout(() => handleFileUpload(file, side), 100)

        return
      }

      // Clean up previous URL object before creating new one
      if (side === 'left' && leftImage) {
        URL.revokeObjectURL(leftImage.url)
      } else if (side === 'right' && rightImage) {
        URL.revokeObjectURL(rightImage.url)
      }

      const url = URL.createObjectURL(file)

      // Create image to get dimensions
      const img = new Image()

      img.onload = () => {
        const scale =
          Math.min(
            currentStageSize.width / img.width,
            currentStageSize.height / img.height
          ) * 0.6
        const newImage: UploadedImage = {
          file,
          url,
          x: currentStageSize.width / 2,
          y: currentStageSize.height / 2,
          scaleX: 1,
          scaleY: 1,
          rotation: 0,
          width: img.width * scale,
          height: img.height * scale,
        }

        if (side === 'left') {
          setLeftImage(newImage)
          setSelectedId('left')
        } else {
          setRightImage(newImage)
          setSelectedId('right')
        }
      }

      img.onerror = () => {
        // Clean up URL object if image loading fails
        URL.revokeObjectURL(url)
        console.error('Failed to load image')
      }

      img.src = url
    },
    [leftImage, rightImage, leftStageSize, rightStageSize]
  )

  // Trigger file upload dialog for re-upload
  const reuploadImage = useCallback((side: 'left' | 'right') => {
    if (side === 'left' && leftFileInputRef.current) {
      leftFileInputRef.current.click()
    } else if (side === 'right' && rightFileInputRef.current) {
      rightFileInputRef.current.click()
    }
  }, [])

  // Update image attributes
  const updateImage = useCallback(
    (side: 'left' | 'right', newAttrs: Partial<UploadedImage>) => {
      if (side === 'left' && leftImage) {
        setLeftImage(prev => (prev ? { ...prev, ...newAttrs } : null))
      } else if (side === 'right' && rightImage) {
        setRightImage(prev => (prev ? { ...prev, ...newAttrs } : null))
      }
    },
    [leftImage, rightImage]
  )

  const tips = [
    {
      icon: Camera,
      title: t('detection.profileView.shootingTips.tip1'),
      desc: t('detection.profileView.shootingTips.tip1Desc'),
      bgColor: 'bg-orange-50 dark:bg-orange-950/30',
      iconBgColor: 'bg-orange-100 dark:bg-orange-900/50',
      iconColor: 'text-orange-500 dark:text-orange-400',
    },
    {
      icon: Lightbulb,
      title: t('detection.profileView.shootingTips.tip2'),
      desc: t('detection.profileView.shootingTips.tip2Desc'),
      bgColor: 'bg-rose-50 dark:bg-rose-950/30',
      iconBgColor: 'bg-rose-100 dark:bg-rose-900/50',
      iconColor: 'text-rose-500 dark:text-rose-400',
    },
    {
      icon: Sparkles,
      title: t('detection.profileView.shootingTips.tip3'),
      desc: t('detection.profileView.shootingTips.tip3Desc'),
      bgColor: 'bg-purple-50 dark:bg-purple-950/30',
      iconBgColor: 'bg-purple-100 dark:bg-purple-900/50',
      iconColor: 'text-purple-500 dark:text-purple-400',
    },
  ]

  return (
    <div className='w-full'>
      <div className='space-y-6'>
        {/* Shooting Tips - Compact Inline Style */}
        <div className='flex flex-wrap items-center gap-3 px-4 py-3 rounded-2xl bg-orange-50/50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-800/30'>
          <div className='flex items-center gap-2'>
            <Camera className='w-4 h-4 text-orange-500 dark:text-orange-400' />
            <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
              {t('detection.profileView.shootingTips.title')}:
            </span>
          </div>

          <div className='flex flex-wrap items-center gap-2'>
            {tips.map((tip, index) => (
              <div
                key={index}
                className='flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm'
              >
                <tip.icon className={`w-3.5 h-3.5 ${tip.iconColor}`} />
                <span className='text-xs font-medium text-gray-600 dark:text-gray-400'>
                  {tip.title}
                </span>
              </div>
            ))}
          </div>

          <span className='ml-auto px-2.5 py-1 text-xs font-medium rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center gap-1'>
            <Shield className='w-3 h-3' />
            {t('detection.profileView.shootingTips.safety')}
          </span>
        </div>

        {/* Main Upload Area */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8'>
          {/* Left Side */}
          <div ref={leftContainerRef} className='space-y-4'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center'>
                  <span className='text-orange-600 dark:text-orange-400 text-sm font-bold'>L</span>
                </div>
                <div>
                  <h3 className='text-lg font-bold text-gray-800 dark:text-gray-100'>
                    {t('detection.profileView.leftProfile')}
                  </h3>
                  <p className='text-xs text-gray-400 dark:text-gray-500'>
                    {t('detection.profileView.leftProfileDesc')}
                  </p>
                </div>
              </div>

              {leftImage && (
                <Button
                  className='bg-orange-500 hover:bg-orange-600 text-white shadow-sm'
                  size='sm'
                  startContent={<Upload className='w-4 h-4' />}
                  onPress={() => reuploadImage('left')}
                >
                  {t('detection.profileView.reuploadImage')}
                </Button>
              )}
            </div>

            <ProfileUploadArea
              fileInputRef={leftFileInputRef}
              image={leftImage}
              isSelected={selectedId === 'left'}
              stageSize={leftStageSize}
              templateAltKey='detection.profileView.leftTemplateAlt'
              templateSrc='/images/detection/head_left.svg'
              accentColor='orange'
              onImageChange={newAttrs => updateImage('left', newAttrs)}
              onImageSelect={() =>
                setSelectedId(selectedId === 'left' ? null : 'left')
              }
              onImageUpload={file => handleFileUpload(file, 'left')}
            />
          </div>

          {/* Right Side */}
          <div ref={rightContainerRef} className='space-y-4'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-900/50 flex items-center justify-center'>
                  <span className='text-rose-600 dark:text-rose-400 text-sm font-bold'>R</span>
                </div>
                <div>
                  <h3 className='text-lg font-bold text-gray-800 dark:text-gray-100'>
                    {t('detection.profileView.rightProfile')}
                  </h3>
                  <p className='text-xs text-gray-400 dark:text-gray-500'>
                    {t('detection.profileView.rightProfileDesc')}
                  </p>
                </div>
              </div>

              {rightImage && (
                <Button
                  className='bg-rose-500 hover:bg-rose-600 text-white shadow-sm'
                  size='sm'
                  startContent={<Upload className='w-4 h-4' />}
                  onPress={() => reuploadImage('right')}
                >
                  {t('detection.profileView.reuploadImage')}
                </Button>
              )}
            </div>

            <ProfileUploadArea
              fileInputRef={rightFileInputRef}
              image={rightImage}
              isSelected={selectedId === 'right'}
              stageSize={rightStageSize}
              templateAltKey='detection.profileView.rightTemplateAlt'
              templateSrc='/images/detection/head_right.svg'
              accentColor='rose'
              onImageChange={newAttrs => updateImage('right', newAttrs)}
              onImageSelect={() =>
                setSelectedId(selectedId === 'right' ? null : 'right')
              }
              onImageUpload={file => handleFileUpload(file, 'right')}
            />
          </div>
        </div>

        {/* Instructions Panel - Premium Compact Style */}
        {(leftImage || rightImage) && (
          <div className='p-5 md:p-6 rounded-2xl bg-gradient-to-r from-amber-50/80 via-orange-50/50 to-rose-50/80 dark:from-gray-800/80 dark:via-gray-850/50 dark:to-gray-800/80 border border-amber-100/50 dark:border-gray-700/50 backdrop-blur-sm'>
            <div className='flex flex-col sm:flex-row sm:items-center gap-4'>
              {/* Title Section */}
              <div className='flex items-center gap-3 flex-shrink-0'>
                <div className='w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center shadow-sm'>
                  <Lightbulb className='w-4.5 h-4.5 text-white' />
                </div>
                <span className='font-bold text-gray-700 dark:text-gray-200 text-sm'>
                  {t('detection.profileView.instructions.title')}
                </span>
              </div>

              {/* Instruction Pills - Horizontal Flow */}
              <div className='flex flex-wrap items-center gap-2 sm:gap-3'>
                {[
                  { num: '1', text: t('detection.profileView.instructions.clickToSelect'), color: 'from-orange-400 to-amber-400' },
                  { num: '2', text: t('detection.profileView.instructions.dragToMove'), color: 'from-rose-400 to-pink-400' },
                  { num: '3', text: t('detection.profileView.instructions.dragToResize'), color: 'from-violet-400 to-purple-400' },
                  { num: '4', text: t('detection.profileView.instructions.dragToRotate'), color: 'from-cyan-400 to-blue-400' },
                ].map((instruction, index) => (
                  <div
                    key={index}
                    className='inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 dark:bg-gray-800/90 border border-white/50 dark:border-gray-600/50 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200'
                  >
                    <span className={`w-5 h-5 rounded-full bg-gradient-to-br ${instruction.color} flex items-center justify-center text-[10px] font-bold text-white shadow-sm`}>
                      {instruction.num}
                    </span>
                    <span className='text-xs font-medium text-gray-600 dark:text-gray-300 whitespace-nowrap'>
                      {instruction.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Mobile Gesture Hints - Warm Style */}
        {(leftImage || rightImage) && (
          <div className='sm:hidden p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-800/30'>
            <div className='flex items-center gap-2 mb-3'>
              <Move className='w-4 h-4 text-amber-600 dark:text-amber-400' />
              <h4 className='font-medium text-gray-800 dark:text-gray-100 text-sm'>
                {t('detection.profileView.gestureHints.title')}
              </h4>
            </div>
            <div className='space-y-2'>
              {[
                { icon: Move, text: t('detection.profileView.gestureHints.drag') },
                { icon: ZoomIn, text: t('detection.profileView.gestureHints.pinch') },
                { icon: RotateCcw, text: t('detection.profileView.gestureHints.rotate') },
              ].map((item, index) => (
                <div key={index} className='flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400'>
                  <item.icon className='w-3.5 h-3.5 text-amber-500 dark:text-amber-400 shrink-0' />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Button - Only when both images are uploaded */}
        {leftImage && rightImage && (
          <div className='flex justify-center pt-4'>
            <Button
              className='px-8 py-6 text-lg font-bold bg-gradient-to-r from-orange-400 to-rose-400 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 rounded-2xl'
              size='lg'
              endContent={<ArrowRight className='w-5 h-5' />}
            >
              {t('detection.profileView.startComparison')}
            </Button>
          </div>
        )}
      </div>
    </div >
  )
}
