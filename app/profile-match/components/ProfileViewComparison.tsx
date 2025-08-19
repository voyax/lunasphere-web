'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { Button } from '@heroui/button'
import { Tooltip } from '@heroui/tooltip'
import { RotateCcw } from 'lucide-react'

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

  const [stageSize, setStageSize] = useState({ width: 400, height: 300 })
  const leftContainerRef = useRef<HTMLDivElement>(null)
  const rightContainerRef = useRef<HTMLDivElement>(null)
  const leftStageRef = useRef<any>(null)
  const rightStageRef = useRef<any>(null)

  // Update stage size based on container
  useEffect(() => {
    const updateStageSize = () => {
      const container = leftContainerRef.current || rightContainerRef.current

      if (container) {
        const rect = container.getBoundingClientRect()

        if (rect.width > 0 && rect.height > 0) {
          setStageSize({ width: rect.width, height: rect.height })
        }
      }
    }

    // Use setTimeout to ensure DOM is fully rendered
    const timer = setTimeout(updateStageSize, 100)

    window.addEventListener('resize', updateStageSize)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', updateStageSize)
    }
  }, [leftImage, rightImage])

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
          Math.min(stageSize.width / img.width, stageSize.height / img.height) *
          0.6
        const newImage: UploadedImage = {
          file,
          url,
          x: (stageSize.width - img.width * scale) / 2,
          y: (stageSize.height - img.height * scale) / 2,
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
        // Failed to load image
      }

      img.src = url
    },
    [leftImage, rightImage, stageSize.width, stageSize.height]
  )

  // Reset image
  const resetImage = useCallback(
    (side: 'left' | 'right') => {
      if (side === 'left') {
        if (leftImage) {
          URL.revokeObjectURL(leftImage.url)
        }
        setLeftImage(null)
      } else {
        if (rightImage) {
          URL.revokeObjectURL(rightImage.url)
        }
        setRightImage(null)
      }
      setSelectedId(null)
    },
    [leftImage, rightImage]
  )

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
      <div className='space-y-8'>
        {/* Shooting Tips Banner */}
        <div className='bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-xl p-4 border border-blue-200/50 dark:border-blue-700/50'>
          <div className='flex items-start gap-3'>
            <div className='w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white text-sm flex-shrink-0'>
              📸
            </div>
            <div className='flex-1 min-w-0'>
              <div className='mb-3'>
                <div className='flex items-center gap-4 mb-2'>
                  <h3 className='font-semibold text-blue-900 dark:text-blue-100 text-base'>
                    {t('detection.profileView.shootingTips.title')}
                  </h3>
                  <p className='text-xs text-red-600 dark:text-red-400 font-medium flex items-center gap-1'>
                    {/* <span>⚠️</span> */}
                    {t('detection.profileView.shootingTips.safety')}
                  </p>
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

        {/* Main Content */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 py-8'>
          {/* Right Side */}
          <div className='space-y-6'>
            <div className='flex items-center justify-between relative'>
              <div className='flex items-center gap-3'>
                <div className='w-1 h-6 bg-gradient-to-b from-purple-400 to-blue-500 rounded-full' />
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                  {t('detection.profileView.rightProfile')}
                </h3>
              </div>
              <div className='flex items-center gap-2'>
                {rightImage && (
                  <>
                    <Tooltip content={t('detection.profileView.resetImage')}>
                      <Button
                        isIconOnly
                        size='sm'
                        variant='light'
                        onClick={() => resetImage('right')}
                      >
                        <RotateCcw className='h-4 w-4' />
                      </Button>
                    </Tooltip>
                  </>
                )}
              </div>
            </div>

            <ProfileUploadArea
              containerRef={rightContainerRef}
              image={rightImage}
              isSelected={selectedId === 'right'}
              stageRef={rightStageRef}
              stageSize={stageSize}
              templateAltKey='detection.profileView.rightTemplateAlt'
              templateSrc='/images/detection/head_right.svg'
              onImageChange={newAttrs => updateImage('right', newAttrs)}
              onImageSelect={() => setSelectedId('right')}
              onImageUpload={file => handleFileUpload(file, 'right')}
            />
          </div>
          {/* Left Side */}
          <div className='space-y-6'>
            <div className='flex items-center justify-between relative'>
              <div className='flex items-center gap-3'>
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                  {t('detection.profileView.leftProfile')}
                </h3>
              </div>
              <div className='flex items-center gap-2'>
                {leftImage && (
                  <>
                    <Tooltip content={t('detection.profileView.resetImage')}>
                      <Button
                        isIconOnly
                        size='sm'
                        variant='light'
                        onClick={() => resetImage('left')}
                      >
                        <RotateCcw className='h-4 w-4' />
                      </Button>
                    </Tooltip>
                  </>
                )}
              </div>
            </div>

            <ProfileUploadArea
              containerRef={leftContainerRef}
              image={leftImage}
              isSelected={selectedId === 'left'}
              stageRef={leftStageRef}
              stageSize={stageSize}
              templateAltKey='detection.profileView.leftTemplateAlt'
              templateSrc='/images/detection/head_left.svg'
              onImageChange={newAttrs => updateImage('left', newAttrs)}
              onImageSelect={() => setSelectedId('left')}
              onImageUpload={file => handleFileUpload(file, 'left')}
            />
          </div>
        </div>

        {/* Instructions */}
        {(leftImage || rightImage) && (
          <div className='bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-2xl p-6 border border-blue-200/50 dark:border-blue-700/50'>
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
      </div>
    </div>
  )
}
