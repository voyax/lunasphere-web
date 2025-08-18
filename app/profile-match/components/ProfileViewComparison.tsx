'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { Button } from '@heroui/button'
import { Tooltip } from '@heroui/tooltip'
import { Upload, RotateCcw, Eye, EyeOff } from 'lucide-react'
import { Stage, Layer, Image as KonvaImage, Transformer } from 'react-konva'
import useImage from 'use-image'
import Konva from 'konva'
import NextImage from 'next/image'

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

// Konva Image Component with Transformer
const TransformableImage: React.FC<{
  image: UploadedImage
  isSelected: boolean
  onSelect: () => void
  onChange: (newAttrs: Partial<UploadedImage>) => void
  opacity?: number
}> = ({ image, isSelected, onSelect, onChange, opacity = 1 }) => {
  const [img] = useImage(image.url)
  const imageRef = useRef<Konva.Image>(null)
  const transformerRef = useRef<Konva.Transformer>(null)

  useEffect(() => {
    if (isSelected && transformerRef.current && imageRef.current) {
      transformerRef.current.nodes([imageRef.current])
      transformerRef.current.getLayer()?.batchDraw()
    }
  }, [isSelected])

  return (
    <>
      <KonvaImage
        ref={imageRef}
        draggable
        height={image.height}
        image={img}
        opacity={opacity}
        rotation={image.rotation}
        scaleX={image.scaleX}
        scaleY={image.scaleY}
        width={image.width}
        x={image.x}
        y={image.y}
        onClick={onSelect}
        onDragEnd={e => {
          onChange({
            x: e.target.x(),
            y: e.target.y(),
          })
        }}
        onTap={onSelect}
        onTransformEnd={e => {
          const node = e.target as Konva.Image
          const scaleX = node.scaleX()
          const scaleY = node.scaleY()

          // Reset scale and adjust width/height instead
          node.scaleX(1)
          node.scaleY(1)

          onChange({
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(5, node.height() * scaleY),
            rotation: node.rotation(),
          })
        }}
      />
      {isSelected && (
        <Transformer
          ref={transformerRef}
          anchorFill='white'
          anchorSize={8}
          anchorStroke='#4F46E5'
          anchorStrokeWidth={2}
          borderStroke='#4F46E5'
          borderStrokeWidth={2}
          boundBoxFunc={(oldBox, newBox) => {
            // Limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox
            }

            return newBox
          }}
          enabledAnchors={[
            'top-left',
            'top-right',
            'bottom-left',
            'bottom-right',
          ]}
          rotateEnabled={true}
        />
      )}
    </>
  )
}

// Standard template image component
const StandardTemplateImage: React.FC<{
  src: string
  opacity: number
  stageWidth: number
  stageHeight: number
}> = ({ src, opacity, stageWidth, stageHeight }) => {
  const [img] = useImage(src)

  if (!img) return null

  // Center the template image and scale it to fit the stage
  const scale = Math.min(stageWidth / img.width, stageHeight / img.height) * 0.8
  const x = (stageWidth - img.width * scale) / 2
  const y = (stageHeight - img.height * scale) / 2

  return (
    <KonvaImage
      image={img}
      listening={false} // Make it non-interactive
      opacity={opacity}
      scaleX={scale}
      scaleY={scale}
      x={x}
      y={y}
    />
  )
}

export default function ProfileViewComparison({}: ProfileViewComparisonProps) {
  const { t } = useLocale()
  const [leftImage, setLeftImage] = useState<UploadedImage | null>(null)
  const [rightImage, setRightImage] = useState<UploadedImage | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const [showLeftTemplate, setShowLeftTemplate] = useState(true)
  const [showRightTemplate, setShowRightTemplate] = useState(true)
  const [stageSize, setStageSize] = useState({ width: 400, height: 300 })
  const leftFileInputRef = useRef<HTMLInputElement>(null)
  const rightFileInputRef = useRef<HTMLInputElement>(null)
  const leftContainerRef = useRef<HTMLDivElement>(null)
  const rightContainerRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<Konva.Stage>(null)

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

  // Handle drag over for file drop
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
  }, [])

  // Handle file drop
  const handleDrop = useCallback(
    (e: React.DragEvent, side: 'left' | 'right') => {
      e.preventDefault()
      const files = Array.from(e.dataTransfer.files)
      const imageFile = files.find(file => file.type.startsWith('image/'))

      if (imageFile) {
        handleFileUpload(imageFile, side)
      }
    },
    [handleFileUpload]
  )

  // Handle file input change
  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, side: 'left' | 'right') => {
      const file = e.target.files?.[0]

      if (file) {
        handleFileUpload(file, side)
      }

      // Reset input value to allow re-selecting the same file
      e.target.value = ''
    },
    [handleFileUpload]
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

  // Handle stage click to deselect
  const handleStageClick = useCallback(
    (e: Konva.KonvaEventObject<MouseEvent>) => {
      // Check if clicked on empty area
      if (e.target === e.target.getStage()) {
        setSelectedId(null)
      }
    },
    []
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
          {/* Left Side */}
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
                    <Tooltip
                      content={
                        showRightTemplate
                          ? t('detection.profileView.hideTemplate')
                          : t('detection.profileView.showTemplate')
                      }
                    >
                      <Button
                        isIconOnly
                        size='sm'
                        variant='light'
                        onClick={() => setShowRightTemplate(!showRightTemplate)}
                      >
                        {showRightTemplate ? (
                          <EyeOff className='h-4 w-4' />
                        ) : (
                          <Eye className='h-4 w-4' />
                        )}
                      </Button>
                    </Tooltip>
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

            <div className='relative'>
              {!rightImage ? (
                <div
                  className='relative aspect-square border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl overflow-hidden cursor-pointer hover:border-primary transition-all duration-300'
                  role='button'
                  tabIndex={0}
                  onClick={() => rightFileInputRef.current?.click()}
                  onDragOver={handleDragOver}
                  onDrop={e => handleDrop(e, 'right')}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      rightFileInputRef.current?.click()
                    }
                  }}
                >
                  {/* Background template image */}
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <div className='w-4/5 h-4/5 relative'>
                      <NextImage
                        fill
                        alt={t('detection.profileView.rightTemplateAlt')}
                        className='w-full h-full object-contain'
                        sizes='(max-width: 768px) 100vw, 50vw'
                        src='/images/detection/head_right.svg'
                      />
                    </div>
                    <div className='absolute inset-0 bg-white/20 dark:bg-gray-900/20' />
                  </div>

                  {/* Upload content overlay */}
                  <div className='relative z-10 flex items-center justify-center h-full'>
                    <div className='text-center space-y-4 p-6'>
                      <div className='flex flex-col items-center justify-center gap-3'>
                        <div className='w-12 h-12 bg-white/80 dark:bg-gray-700/80 rounded-xl flex items-center justify-center shadow-md backdrop-blur-sm border border-white/50 dark:border-gray-600/50 transition-all duration-200 hover:scale-102'>
                          <Upload className='w-5 h-5 text-gray-600 dark:text-gray-400' />
                        </div>
                        <div className='text-center'>
                          <p className='text-base font-medium text-gray-700 dark:text-gray-300 drop-shadow-sm'>
                            {t('detection.profileView.uploadPrompt')}
                          </p>
                        </div>
                      </div>
                      <div className='inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-md px-3 py-2 border border-white/60 dark:border-gray-600/60 shadow-sm'>
                        <div className='w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full' />
                        <span className='text-xs font-normal text-gray-600 dark:text-gray-400'>
                          {t('detection.profileView.uploadHint')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className='space-y-4'>
                  {/* Decorative background */}
                  <div className='relative'>
                    <div
                      ref={rightContainerRef}
                      className='relative aspect-square bg-gradient-to-br from-white via-gray-50/50 to-white dark:from-gray-800 dark:via-gray-750 dark:to-gray-800 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm'
                    >
                      <Stage
                        height={stageSize.height}
                        style={{ width: '100%', height: '100%' }}
                        width={stageSize.width}
                        onClick={handleStageClick}
                        onTap={handleStageClick}
                      >
                        <Layer>
                          {/* User uploaded image */}
                          <TransformableImage
                            image={rightImage}
                            isSelected={selectedId === 'right'}
                            opacity={0.8}
                            onChange={newAttrs =>
                              updateImage('right', newAttrs)
                            }
                            onSelect={() => setSelectedId('right')}
                          />
                          {/* Standard template image (on top of user image) */}
                          {showRightTemplate && (
                            <StandardTemplateImage
                              opacity={1.0}
                              src='/images/detection/head_right.svg'
                              stageHeight={stageSize.height}
                              stageWidth={stageSize.width}
                            />
                          )}
                        </Layer>
                      </Stage>
                    </div>
                  </div>
                </div>
              )}

              <input
                ref={rightFileInputRef}
                accept='image/*'
                className='hidden'
                type='file'
                onChange={e => handleFileInputChange(e, 'right')}
              />
            </div>
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
                    <Tooltip
                      content={
                        showLeftTemplate
                          ? t('detection.profileView.hideTemplate')
                          : t('detection.profileView.showTemplate')
                      }
                    >
                      <Button
                        isIconOnly
                        size='sm'
                        variant='light'
                        onClick={() => setShowLeftTemplate(!showLeftTemplate)}
                      >
                        {showLeftTemplate ? (
                          <EyeOff className='h-4 w-4' />
                        ) : (
                          <Eye className='h-4 w-4' />
                        )}
                      </Button>
                    </Tooltip>
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

            <div className='relative'>
              {!leftImage ? (
                <div
                  className='relative aspect-square border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl overflow-hidden cursor-pointer hover:border-primary transition-all duration-300'
                  role='button'
                  tabIndex={0}
                  onClick={() => leftFileInputRef.current?.click()}
                  onDragOver={handleDragOver}
                  onDrop={e => handleDrop(e, 'left')}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      leftFileInputRef.current?.click()
                    }
                  }}
                >
                  {/* Background template image */}
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <div className='w-4/5 h-4/5 relative'>
                      <NextImage
                        fill
                        alt={t('detection.profileView.leftTemplateAlt')}
                        className='w-full h-full object-contain'
                        sizes='(max-width: 768px) 100vw, 50vw'
                        src='/images/detection/head_left.svg'
                      />
                    </div>
                    <div className='absolute inset-0 bg-white/20 dark:bg-gray-900/20' />
                  </div>

                  {/* Upload content overlay */}
                  <div className='relative z-10 flex items-center justify-center h-full'>
                    <div className='text-center space-y-4 p-6'>
                      <div className='flex flex-col items-center justify-center gap-3'>
                        <div className='w-12 h-12 bg-white/80 dark:bg-gray-700/80 rounded-xl flex items-center justify-center shadow-md backdrop-blur-sm border border-white/50 dark:border-gray-600/50 transition-all duration-200 hover:scale-102'>
                          <Upload className='w-5 h-5 text-gray-600 dark:text-gray-400' />
                        </div>
                        <div className='text-center'>
                          <p className='text-base font-medium text-gray-700 dark:text-gray-300 drop-shadow-sm'>
                            {t('detection.profileView.clickOrDrag')}
                          </p>
                        </div>
                      </div>
                      <div className='inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-md px-3 py-2 border border-white/60 dark:border-gray-600/60 shadow-sm'>
                        <div className='w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full' />
                        <span className='text-xs font-normal text-gray-600 dark:text-gray-400'>
                          {t('detection.profileView.uploadHint')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className='space-y-4'>
                  {/* Decorative background */}
                  <div className='relative'>
                    <div
                      ref={leftContainerRef}
                      className='relative aspect-square bg-gradient-to-bl from-white via-gray-50/50 to-white dark:from-gray-800 dark:via-gray-750 dark:to-gray-800 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm'
                    >
                      <Stage
                        ref={stageRef}
                        height={stageSize.height}
                        style={{ width: '100%', height: '100%' }}
                        width={stageSize.width}
                        onClick={handleStageClick}
                        onTap={handleStageClick}
                      >
                        <Layer>
                          {/* User uploaded image */}
                          <TransformableImage
                            image={leftImage}
                            isSelected={selectedId === 'left'}
                            opacity={0.8}
                            onChange={newAttrs => updateImage('left', newAttrs)}
                            onSelect={() => setSelectedId('left')}
                          />
                          {/* Standard template image (on top of user image) */}
                          {showLeftTemplate && (
                            <StandardTemplateImage
                              opacity={1.0}
                              src='/images/detection/head_left.svg'
                              stageHeight={stageSize.height}
                              stageWidth={stageSize.width}
                            />
                          )}
                        </Layer>
                      </Stage>
                    </div>
                  </div>
                </div>
              )}

              <input
                ref={leftFileInputRef}
                accept='image/*'
                className='hidden'
                type='file'
                onChange={e => handleFileInputChange(e, 'left')}
              />
            </div>
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
