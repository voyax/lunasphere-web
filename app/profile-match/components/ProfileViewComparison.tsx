'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { Button } from '@heroui/button'
import { Chip } from '@heroui/chip'
import { Upload, ChevronDown, ChevronUp } from 'lucide-react'

import { ProfileUploadArea } from './ProfileUploadArea'

import { useLocale } from '@/contexts/LocaleContext'

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

export default function ProfileViewComparison({}: ProfileViewComparisonProps) {
  const { t } = useLocale()
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

  return (
    <div className='w-full max-w-6xl mx-auto'>
      <div className='space-y-4 sm:space-y-8'>
        {/* Shooting Tips Banner - Mobile Optimized */}
        <div className='bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-xl border border-blue-200/50 dark:border-blue-700/50'>
          {/* Mobile Compact Header */}
          <div className='sm:hidden'>
            <button
              className='w-full p-3 flex items-center justify-between text-left'
              onClick={() => setIsTipsExpanded(!isTipsExpanded)}
            >
              <div className='flex items-center gap-2'>
                <div className='w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xs flex-shrink-0'>
                  📸
                </div>
                <h3 className='font-medium text-blue-900 dark:text-blue-100 text-sm'>
                  {t('detection.profileView.shootingTips.title')}
                </h3>
                <Chip
                  className='text-xs'
                  color='danger'
                  size='sm'
                  variant='flat'
                >
                  {t('detection.profileView.shootingTips.safety')}
                </Chip>
              </div>
              {isTipsExpanded ? (
                <ChevronUp className='w-4 h-4 text-blue-600 dark:text-blue-400' />
              ) : (
                <ChevronDown className='w-4 h-4 text-blue-600 dark:text-blue-400' />
              )}
            </button>

            {/* Mobile Expanded Content */}
            {isTipsExpanded && (
              <div className='px-3 pb-3'>
                <div className='space-y-2 text-xs'>
                  <div className='bg-white/60 dark:bg-gray-800/60 rounded-lg p-2 border border-blue-200/30 dark:border-blue-700/30'>
                    <p className='font-medium text-green-800 dark:text-green-200 mb-1'>
                      {t('detection.profileView.shootingTips.tip1')}
                    </p>
                    <p className='text-green-700 dark:text-green-300 leading-relaxed'>
                      {t('detection.profileView.shootingTips.tip1Desc')}
                    </p>
                  </div>
                  <div className='bg-white/60 dark:bg-gray-800/60 rounded-lg p-2 border border-green-200/30 dark:border-green-700/30'>
                    <p className='font-medium text-green-800 dark:text-green-200 mb-1'>
                      {t('detection.profileView.shootingTips.tip2')}
                    </p>
                    <p className='text-green-700 dark:text-green-300 leading-relaxed'>
                      {t('detection.profileView.shootingTips.tip2Desc')}
                    </p>
                  </div>
                  <div className='bg-white/60 dark:bg-gray-800/60 rounded-lg p-2 border border-orange-200/30 dark:border-orange-700/30'>
                    <p className='font-medium text-green-800 dark:text-green-200 mb-1'>
                      {t('detection.profileView.shootingTips.tip3')}
                    </p>
                    <p className='text-green-700 dark:text-green-300 leading-relaxed'>
                      {t('detection.profileView.shootingTips.tip3Desc')}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Desktop Full Display */}
          <div className='hidden sm:block p-4'>
            <div className='flex items-start gap-3'>
              <div className='w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white text-sm flex-shrink-0'>
                📸
              </div>
              <div className='flex-1 min-w-0'>
                <div className='mb-3'>
                  <div className='flex flex-col sm:flex-row sm:items-center gap-3 mb-2'>
                    <h3 className='font-semibold text-blue-900 dark:text-blue-100 text-base'>
                      {t('detection.profileView.shootingTips.title')}
                    </h3>
                    <Chip color='danger' size='sm' variant='flat'>
                      {t('detection.profileView.shootingTips.safety')}
                    </Chip>
                  </div>
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-3 text-xs'>
                  <div className='bg-white/60 dark:bg-gray-800/60 rounded-lg p-3 border border-blue-200/30 dark:border-blue-700/30'>
                    <p className='font-medium text-green-800 dark:text-green-200 mb-1'>
                      {t('detection.profileView.shootingTips.tip1')}
                    </p>
                    <p className='text-green-700 dark:text-green-300 leading-relaxed'>
                      {t('detection.profileView.shootingTips.tip1Desc')}
                    </p>
                  </div>
                  <div className='bg-white/60 dark:bg-gray-800/60 rounded-lg p-3 border border-green-200/30 dark:border-green-700/30'>
                    <p className='font-medium text-green-800 dark:text-green-200 mb-1'>
                      {t('detection.profileView.shootingTips.tip2')}
                    </p>
                    <p className='text-green-700 dark:text-green-300 leading-relaxed'>
                      {t('detection.profileView.shootingTips.tip2Desc')}
                    </p>
                  </div>
                  <div className='bg-white/60 dark:bg-gray-800/60 rounded-lg p-3 border border-orange-200/30 dark:border-orange-700/30'>
                    <p className='font-medium text-green-800 dark:text-green-200 mb-1'>
                      {t('detection.profileView.shootingTips.tip3')}
                    </p>
                    <p className='text-green-700 dark:text-green-300 leading-relaxed'>
                      {t('detection.profileView.shootingTips.tip3Desc')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 py-4 sm:py-8'>
          {/* Right Side */}
          <div ref={rightContainerRef} className='space-y-3 sm:space-y-6'>
            <div className='flex items-center justify-between relative h-10'>
              <div className='flex items-center gap-3'>
                <div className='w-1 h-6 bg-gradient-to-b from-purple-400 to-blue-500 rounded-full' />
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                  {t('detection.profileView.rightProfile')}
                </h3>
              </div>
              <div className='flex items-center gap-2 h-full'>
                {rightImage && (
                  <Button
                    color='primary'
                    size='sm'
                    startContent={<Upload className='w-4 h-4' />}
                    variant='ghost'
                    onPress={() => reuploadImage('right')}
                  >
                    {t('detection.profileView.reuploadImage')}
                  </Button>
                )}
              </div>
            </div>

            <ProfileUploadArea
              fileInputRef={rightFileInputRef}
              image={rightImage}
              isSelected={selectedId === 'right'}
              stageSize={rightStageSize}
              templateAltKey='detection.profileView.rightTemplateAlt'
              templateSrc='/images/detection/head_right.svg'
              onImageChange={newAttrs => updateImage('right', newAttrs)}
              onImageSelect={() =>
                setSelectedId(selectedId === 'right' ? null : 'right')
              }
              onImageUpload={file => handleFileUpload(file, 'right')}
            />
          </div>
          {/* Left Side */}
          <div ref={leftContainerRef} className='space-y-3 sm:space-y-6'>
            <div className='flex items-center justify-between relative h-10'>
              <div className='flex items-center gap-3'>
                <div className='w-1 h-6 bg-gradient-to-b from-purple-400 to-blue-500 rounded-full' />
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                  {t('detection.profileView.leftProfile')}
                </h3>
              </div>
              <div className='flex items-center gap-2 h-full'>
                {leftImage && (
                  <Button
                    color='primary'
                    size='sm'
                    startContent={<Upload className='w-4 h-4' />}
                    variant='ghost'
                    onPress={() => reuploadImage('left')}
                  >
                    {t('detection.profileView.reuploadImage')}
                  </Button>
                )}
              </div>
            </div>

            <ProfileUploadArea
              fileInputRef={leftFileInputRef}
              image={leftImage}
              isSelected={selectedId === 'left'}
              stageSize={leftStageSize}
              templateAltKey='detection.profileView.leftTemplateAlt'
              templateSrc='/images/detection/head_left.svg'
              onImageChange={newAttrs => updateImage('left', newAttrs)}
              onImageSelect={() =>
                setSelectedId(selectedId === 'left' ? null : 'left')
              }
              onImageUpload={file => handleFileUpload(file, 'left')}
            />
          </div>
        </div>

        {/* Instructions - Desktop Only */}
        {(leftImage || rightImage) && (
          <div className='hidden sm:block bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-2xl p-6 border border-blue-200/50 dark:border-blue-700/50'>
            <h4 className='font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2'>
              <span className='w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center text-white text-sm'>
                💡
              </span>
              {t('detection.profileView.instructions.title')}
            </h4>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm'>
              <div className='space-y-2'>
                <div className='flex items-start gap-2'>
                  <span className='text-blue-500 font-bold text-xs mt-0.5'>
                    •
                  </span>
                  <p className='text-blue-800 dark:text-blue-200'>
                    {t('detection.profileView.instructions.clickToSelect')}
                  </p>
                </div>
                <div className='flex items-start gap-2'>
                  <span className='text-blue-500 font-bold text-xs mt-0.5'>
                    •
                  </span>
                  <p className='text-blue-800 dark:text-blue-200'>
                    {t('detection.profileView.instructions.dragToMove')}
                  </p>
                </div>
                <div className='flex items-start gap-2'>
                  <span className='text-blue-500 font-bold text-xs mt-0.5'>
                    •
                  </span>
                  <p className='text-blue-800 dark:text-blue-200'>
                    {t('detection.profileView.instructions.dragToResize')}
                  </p>
                </div>
              </div>
              <div className='space-y-2'>
                <div className='flex items-start gap-2'>
                  <span className='text-blue-500 font-bold text-xs mt-0.5'>
                    •
                  </span>
                  <p className='text-blue-800 dark:text-blue-200'>
                    {t('detection.profileView.instructions.dragToRotate')}
                  </p>
                </div>

                <div className='flex items-start gap-2'>
                  <span className='text-blue-500 font-bold text-xs mt-0.5'>
                    •
                  </span>
                  <p className='text-blue-800 dark:text-blue-200'>
                    {t('detection.profileView.instructions.clickToDeselect')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Gesture Hints */}
        {(leftImage || rightImage) && (
          <div className='sm:hidden bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/30 dark:to-blue-950/30 rounded-xl p-3 border border-green-200/50 dark:border-green-700/50'>
            <div className='flex items-center gap-2 mb-2'>
              <span className='text-lg'>👆</span>
              <h4 className='font-medium text-green-900 dark:text-green-100 text-sm'>
                手势操作提示
              </h4>
            </div>
            <div className='text-xs text-green-800 dark:text-green-200 space-y-1'>
              <p>• 拖动移动图片位置</p>
              <p>• 双指缩放调整大小</p>
              <p>• 双指旋转调整角度，或使用下方滑块精确控制</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
