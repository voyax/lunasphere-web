'use client'

import React from 'react'
import { Upload, RotateCw, ZoomIn } from 'lucide-react'
import Image from 'next/image'
import { useRef, useEffect, useCallback, useState, useMemo } from 'react'
import { Stage, Layer, Image as KonvaImage, Transformer } from 'react-konva'
import useImage from 'use-image'
import Konva from 'konva'
import { KonvaEventObject } from 'konva/lib/Node'
import { RefObject } from 'react'
import { Slider, Input } from '@heroui/react'

import { GestureVisualFeedback } from './GestureVisualFeedback'

import { useLocale } from '@/contexts/LocaleContext'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useMemoryManager } from '@/hooks/useMemoryManager'
import {
  getDistance,
  getCenter,
  getAngle,
  getCenterMovement,
  normalizeRotationChange,
  GESTURE_CONFIG,
  type Point,
} from '@/lib/gesture-utils'

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
  onShowGestureHint?: () => void
  onHideGestureHint?: () => void
  onShowGestureVisualFeedback?: (
    gestureType: 'scale' | 'rotate' | 'move',
    centerPoint: { x: number; y: number },
    scaleValue?: number,
    rotationValue?: number
  ) => void
  onHideGestureVisualFeedback?: () => void
}> = React.memo(
  ({
    image,
    isSelected,
    onSelect,
    onChange,
    opacity = 1,
    onShowGestureHint,
    onHideGestureHint,
    onShowGestureVisualFeedback,
    onHideGestureVisualFeedback,
  }) => {
    const [img] = useImage(image.url)
    const imageRef = useRef<Konva.Image>(null)
    const transformerRef = useRef<Konva.Transformer>(null)
    const lastCenter = useRef<Point | null>(null)
    const isMobile = useIsMobile()
    const memoryManager = useMemoryManager()
    const lastDist = useRef<number>(0)
    const lastRotation = useRef<number>(0)
    const [isMultiTouch, setIsMultiTouch] = useState(false)
    const gestureStartTime = useRef<number>(0)
    const stageBoxRef = useRef<DOMRect | null>(null)
    const pendingChanges = useRef<Partial<UploadedImage> | null>(null)

    useEffect(() => {
      if (isSelected && transformerRef.current && imageRef.current) {
        transformerRef.current.nodes([imageRef.current])
        transformerRef.current.getLayer()?.batchDraw()
      }
    }, [isSelected])

    // Optimized onChange with requestAnimationFrame batching using memory manager
    const optimizedOnChange = useCallback(
      (newAttrs: Partial<UploadedImage>) => {
        // Store pending changes
        pendingChanges.current = { ...pendingChanges.current, ...newAttrs }

        // Schedule update on next frame using memory manager
        memoryManager.createAnimationFrame(() => {
          if (pendingChanges.current) {
            onChange(pendingChanges.current)
            pendingChanges.current = null
          }
        })
      },
      [onChange, memoryManager]
    )

    // Memoized gesture calculations for performance optimization
    const gestureCalculations = useMemo(
      () => ({
        getDistance,
        getCenter,
        getAngle,
        getCenterMovement,
        normalizeRotationChange,
      }),
      []
    )

    // Handle touch start for multi-touch gestures
    const handleTouchStart = useCallback(
      (e: KonvaEventObject<TouchEvent>) => {
        e.evt.preventDefault()
        const touches = e.evt.touches

        gestureStartTime.current = Date.now()

        if (touches.length === 2) {
          // Multi-touch gesture started
          setIsMultiTouch(true)
          onShowGestureHint?.()

          const stage = e.target.getStage()

          if (stage) {
            // Cache stage bounding box for better performance
            stageBoxRef.current = stage.container().getBoundingClientRect()
            const stageBox = stageBoxRef.current

            const p1 = {
              x: touches[0].clientX - stageBox.left,
              y: touches[0].clientY - stageBox.top,
            }
            const p2 = {
              x: touches[1].clientX - stageBox.left,
              y: touches[1].clientY - stageBox.top,
            }

            lastCenter.current = gestureCalculations.getCenter(p1, p2)
            lastDist.current = gestureCalculations.getDistance(p1, p2)
            lastRotation.current = gestureCalculations.getAngle(p1, p2)
          }
        } else if (touches.length === 1) {
          // Single touch - select the image after a short delay to distinguish from gestures
          setIsMultiTouch(false)
          memoryManager.createTimeout(() => {
            if (
              !isMultiTouch &&
              Date.now() - gestureStartTime.current <
                GESTURE_CONFIG.GESTURE_TIMEOUT
            ) {
              onSelect()
            }
          }, GESTURE_CONFIG.DEBOUNCE_DELAY)
        }
      },
      [onSelect, isMultiTouch, onShowGestureHint]
    )

    // Handle touch move for multi-touch gestures
    const handleTouchMove = useCallback(
      (e: KonvaEventObject<TouchEvent>) => {
        e.evt.preventDefault()
        const touches = e.evt.touches

        if (
          touches.length === 2 &&
          lastCenter.current &&
          isMultiTouch &&
          stageBoxRef.current
        ) {
          // Use cached stage box for better performance
          const stageBox = stageBoxRef.current
          const p1 = {
            x: touches[0].clientX - stageBox.left,
            y: touches[0].clientY - stageBox.top,
          }
          const p2 = {
            x: touches[1].clientX - stageBox.left,
            y: touches[1].clientY - stageBox.top,
          }

          const newCenter = gestureCalculations.getCenter(p1, p2)
          const newDist = gestureCalculations.getDistance(p1, p2)
          const newRotation = gestureCalculations.getAngle(p1, p2)

          // Add minimum threshold to avoid micro-movements
          const distanceChange = Math.abs(newDist - lastDist.current)
          const rotationChangeAbs = Math.abs(newRotation - lastRotation.current)

          let newScaleX = image.scaleX
          let newScaleY = image.scaleY
          let newRotationValue = image.rotation

          // Only apply scale change if movement is significant enough
          if (distanceChange > GESTURE_CONFIG.MIN_DISTANCE_THRESHOLD) {
            const scale = newDist / lastDist.current
            const scaleFactor =
              1 + (scale - 1) * GESTURE_CONFIG.SCALE_SENSITIVITY

            newScaleX = image.scaleX * scaleFactor
            newScaleY = image.scaleY * scaleFactor

            // Show scale visual feedback
            onShowGestureVisualFeedback?.('scale', newCenter, newScaleX)
          }

          // Only apply rotation change if movement is significant enough
          if (rotationChangeAbs > GESTURE_CONFIG.MIN_ROTATION_THRESHOLD) {
            const rotationChange = gestureCalculations.normalizeRotationChange(
              newRotation - lastRotation.current
            )
            const dampedRotationChange =
              rotationChange * GESTURE_CONFIG.ROTATION_SENSITIVITY

            newRotationValue = image.rotation + dampedRotationChange

            // Show rotation visual feedback
            onShowGestureVisualFeedback?.(
              'rotate',
              newCenter,
              undefined,
              newRotationValue
            )
          }

          // Calculate position change using optimized function
          const centerMovement = gestureCalculations.getCenterMovement(
            lastCenter.current,
            newCenter
          )

          let newX = image.x
          let newY = image.y

          // Only apply position change if center movement is significant
          if (centerMovement > GESTURE_CONFIG.MIN_POSITION_THRESHOLD) {
            const dx =
              (newCenter.x - lastCenter.current.x) *
              GESTURE_CONFIG.POSITION_SENSITIVITY
            const dy =
              (newCenter.y - lastCenter.current.y) *
              GESTURE_CONFIG.POSITION_SENSITIVITY

            newX = image.x + dx
            newY = image.y + dy

            // Show move visual feedback
            onShowGestureVisualFeedback?.('move', newCenter)
          }

          // Use optimized onChange for better performance
          optimizedOnChange({
            x: newX,
            y: newY,
            scaleX: newScaleX,
            scaleY: newScaleY,
            rotation: newRotationValue,
          })

          // Update last values
          lastCenter.current = newCenter
          lastDist.current = newDist
          lastRotation.current = newRotation
        }
      },
      [
        gestureCalculations,
        image,
        optimizedOnChange,
        isMultiTouch,
        onShowGestureVisualFeedback,
      ]
    )

    // Handle touch end
    const handleTouchEnd = useCallback(
      (e: KonvaEventObject<TouchEvent>) => {
        e.evt.preventDefault()
        const touches = e.evt.touches

        if (touches.length < 2) {
          // Multi-touch gesture ended
          setIsMultiTouch(false)
          onHideGestureHint?.()
          onHideGestureVisualFeedback?.()

          // Clear cached values
          lastCenter.current = null
          lastDist.current = 0
          lastRotation.current = 0
          stageBoxRef.current = null
        }
      },
      [onHideGestureHint, onHideGestureVisualFeedback]
    )

    return (
      <>
        <KonvaImage
          ref={imageRef}
          draggable={!isMultiTouch}
          height={image.height}
          image={img}
          offsetX={image.width / 2}
          offsetY={image.height / 2}
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
          onTouchEnd={handleTouchEnd}
          onTouchMove={handleTouchMove}
          onTouchStart={handleTouchStart}
          onTransformEnd={e => {
            const node = e.target
            const scaleX = node.scaleX()
            const scaleY = node.scaleY()

            // Use the absolute scale values from the transform
            // Reset node scale to 1 to avoid double scaling
            node.scaleX(1)
            node.scaleY(1)

            onChange({
              x: node.x(),
              y: node.y(),
              rotation: node.rotation(),
              scaleX: scaleX,
              scaleY: scaleY,
            })
          }}
        />
        {isSelected && !isMobile && (
          <Transformer
            ref={transformerRef}
            boundBoxFunc={(oldBox, newBox) => {
              // Limit resize
              if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
                return oldBox
              }

              return newBox
            }}
            enabledAnchors={[
              'top-left',
              'top-center',
              'top-right',
              'bottom-left',
              'bottom-center',
              'bottom-right',
            ]}
            flipEnabled={false}
          />
        )}
      </>
    )
  },
  (prevProps, nextProps) => {
    // Custom comparison for better performance
    return (
      prevProps.image.x === nextProps.image.x &&
      prevProps.image.y === nextProps.image.y &&
      prevProps.image.scaleX === nextProps.image.scaleX &&
      prevProps.image.scaleY === nextProps.image.scaleY &&
      prevProps.image.rotation === nextProps.image.rotation &&
      prevProps.isSelected === nextProps.isSelected &&
      prevProps.opacity === nextProps.opacity
    )
  }
)

TransformableImage.displayName = 'TransformableImage'

// Standard Template Image Component
const StandardTemplateImage: React.FC<{
  src: string
  opacity: number
  stageWidth: number
  stageHeight: number
}> = React.memo(({ src, opacity, stageWidth, stageHeight }) => {
  const [img] = useImage(src)

  if (!img) return null

  // Calculate centered position and scale to fit 4/5 of stage
  const maxSize = Math.min(stageWidth, stageHeight) * 0.8
  const scale = Math.min(maxSize / img.width, maxSize / img.height)
  const width = img.width * scale
  const height = img.height * scale
  const x = (stageWidth - width) / 2
  const y = (stageHeight - height) / 2

  return (
    <KonvaImage
      height={height}
      image={img}
      listening={false}
      opacity={opacity}
      width={width}
      x={x}
      y={y}
    />
  )
})

StandardTemplateImage.displayName = 'StandardTemplateImage'

interface ProfileUploadAreaProps {
  // Image data
  image: UploadedImage | null
  isSelected?: boolean

  // Template configuration
  templateSrc: string
  templateAltKey: string

  // Required ref for file input control
  fileInputRef: RefObject<HTMLInputElement>

  // Stage configuration
  stageSize?: { width: number; height: number }

  // Event handlers
  onImageUpload: (file: File) => void
  onImageChange?: (newAttrs: Partial<UploadedImage>) => void
  onImageSelect?: () => void
}

export function ProfileUploadArea({
  image,
  isSelected = false,
  templateSrc,
  templateAltKey,
  fileInputRef,
  stageSize = { width: 400, height: 400 },
  onImageUpload,
  onImageChange,
  onImageSelect,
}: ProfileUploadAreaProps) {
  const { t } = useLocale()
  const isMobile = useIsMobile()
  const memoryManager = useMemoryManager()
  const [showGestureHint, setShowGestureHint] = useState(false)

  // Visual feedback state for gestures
  const [gestureVisualFeedback, setGestureVisualFeedback] = useState<{
    isVisible: boolean
    gestureType: 'scale' | 'rotate' | 'move' | null
    centerPoint?: { x: number; y: number }
    scaleValue?: number
    rotationValue?: number
  }>({
    isVisible: false,
    gestureType: null,
  })

  // Event handlers
  const handleFileInputClick = () => {
    fileInputRef.current?.click()
  }

  // Handle gesture hint display using memory manager
  const showGestureHintMessage = useCallback(() => {
    setShowGestureHint(true)

    // Hide hint after configured duration
    memoryManager.createTimeout(() => {
      setShowGestureHint(false)
    }, GESTURE_CONFIG.HINT_DISPLAY_DURATION)
  }, [memoryManager])

  const hideGestureHint = useCallback(() => {
    setShowGestureHint(false)
  }, [])

  // Visual feedback handlers
  const showGestureVisualFeedback = useCallback(
    (
      gestureType: 'scale' | 'rotate' | 'move',
      centerPoint: { x: number; y: number },
      scaleValue?: number,
      rotationValue?: number
    ) => {
      setGestureVisualFeedback({
        isVisible: true,
        gestureType,
        centerPoint,
        scaleValue,
        rotationValue,
      })
    },
    []
  )

  const hideGestureVisualFeedback = useCallback(() => {
    setGestureVisualFeedback({
      isVisible: false,
      gestureType: null,
    })
  }, [])

  // Memoized scale value for performance
  const currentScalePercentage = useMemo(() => {
    return image ? Math.round(image.scaleX * 100) : 100
  }, [image?.scaleX])

  const currentRotationValue = useMemo(() => {
    return image ? Math.round(image.rotation) : 0
  }, [image?.rotation])

  // Scale and rotation handlers
  const handleScaleChange = useCallback(
    (value: number | number[]) => {
      if (!image || !onImageChange) return
      const scaleValue = Array.isArray(value) ? value[0] : value
      // Convert percentage to scale value (e.g., 100% = 1.0)
      const actualScale = scaleValue / 100

      onImageChange({
        scaleX: actualScale,
        scaleY: actualScale,
      })
    },
    [image, onImageChange, memoryManager]
  )

  const handleScaleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!image || !onImageChange) return
      const value = e.target.value

      // Allow empty input for editing
      if (value === '') {
        return
      }

      const percentageValue = parseFloat(value)

      if (
        !isNaN(percentageValue) &&
        percentageValue >= 0 &&
        percentageValue <= 300
      ) {
        // Debounce the change for better performance using memory manager
        memoryManager.createTimeout(() => {
          const actualScale = percentageValue / 100

          onImageChange({
            scaleX: actualScale,
            scaleY: actualScale,
          })
        }, GESTURE_CONFIG.DEBOUNCE_DELAY)
      }
    },
    [image, onImageChange, memoryManager]
  )

  const handleRotationChange = useCallback(
    (value: number | number[]) => {
      if (!image || !onImageChange) return
      const rotationValue = Array.isArray(value) ? value[0] : value

      onImageChange({
        rotation: rotationValue,
      })
    },
    [image, onImageChange, memoryManager]
  )

  const handleRotationInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!image || !onImageChange) return
      const value = e.target.value

      // Allow empty input for editing
      if (value === '') {
        return
      }

      const rotationValue = parseFloat(value)

      if (
        !isNaN(rotationValue) &&
        rotationValue >= -360 &&
        rotationValue <= 360
      ) {
        // Debounce the change for better performance using memory manager
        memoryManager.createTimeout(() => {
          onImageChange({
            rotation: rotationValue,
          })
        }, GESTURE_CONFIG.DEBOUNCE_DELAY)
      }
    },
    [image, onImageChange]
  )

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const files = e.dataTransfer.files

    if (files.length > 0) {
      onImageUpload(files[0])
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleFileInputClick()
    }
  }

  const handleStageClick = (e: KonvaEventObject<MouseEvent>) => {
    // Deselect if clicking on empty area
    if (e.target === e.target.getStage()) {
      onImageSelect?.()
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      onImageUpload(file)
    }
  }

  return (
    <div className='relative'>
      {!image ? (
        <div
          className='relative aspect-square border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl overflow-hidden cursor-pointer hover:border-primary transition-all duration-300'
          role='button'
          tabIndex={0}
          onClick={handleFileInputClick}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onKeyDown={handleKeyDown}
        >
          {/* Background template image */}
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className='w-4/5 h-4/5 relative'>
              <Image
                fill
                alt={t(templateAltKey)}
                className='w-full h-full object-contain'
                sizes='(max-width: 768px) 100vw, 50vw'
                src={templateSrc}
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
            <div className='relative aspect-square bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 dark:from-gray-800 dark:via-gray-750 dark:to-gray-800 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/60'>
              <Stage
                height={stageSize.height}
                style={{ width: '100%', height: '100%', touchAction: 'none' }}
                width={stageSize.width}
                onClick={handleStageClick}
                onTap={handleStageClick}
              >
                <Layer>
                  {/* User uploaded image */}
                  <TransformableImage
                    image={image}
                    isSelected={isSelected}
                    opacity={0.8}
                    onChange={onImageChange || (() => {})}
                    onHideGestureHint={hideGestureHint}
                    onHideGestureVisualFeedback={hideGestureVisualFeedback}
                    onSelect={onImageSelect || (() => {})}
                    onShowGestureHint={showGestureHintMessage}
                    onShowGestureVisualFeedback={showGestureVisualFeedback}
                  />
                  {/* Standard template image (on top of user image) */}
                  <StandardTemplateImage
                    opacity={1.0}
                    src={templateSrc}
                    stageHeight={stageSize.height}
                    stageWidth={stageSize.width}
                  />
                </Layer>
              </Stage>

              {/* Gesture Visual Feedback Overlay */}
              <GestureVisualFeedback
                centerPoint={gestureVisualFeedback.centerPoint}
                gestureType={gestureVisualFeedback.gestureType}
                isVisible={gestureVisualFeedback.isVisible}
                rotationValue={gestureVisualFeedback.rotationValue}
                scaleValue={gestureVisualFeedback.scaleValue}
                stageSize={stageSize}
              />
            </div>
          </div>

          {/* Image Controls */}
          <div className='p-3 sm:p-4 space-y-3 sm:space-y-4'>
            {/* Scale Control - Hidden on mobile */}
            {!isMobile && (
              <div className='space-y-2'>
                <div className='flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300'>
                  <ZoomIn className='w-4 h-4' />
                  <span>{t('detection.profileView.scale')}</span>
                </div>
                <div className='flex items-center gap-3'>
                  <Slider
                    className='flex-1'
                    color='primary'
                    maxValue={300}
                    minValue={0}
                    step={1}
                    value={currentScalePercentage}
                    onChange={handleScaleChange}
                  />
                  <Input
                    className='w-20'
                    endContent={
                      <span className='text-xs text-gray-500'>%</span>
                    }
                    max={300}
                    min={0}
                    size='sm'
                    step={1}
                    type='number'
                    value={currentScalePercentage.toString()}
                    onChange={handleScaleInputChange}
                  />
                </div>
              </div>
            )}

            {/* Rotation Control - Enhanced for mobile */}
            <div className='space-y-2'>
              <div className='flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300'>
                <RotateCw className='w-4 h-4' />
                <span>{t('detection.profileView.rotation')}</span>
                {isMobile && (
                  <span className='text-xs text-gray-500 ml-auto'>
                    精确控制
                  </span>
                )}
              </div>
              <div className='flex items-center gap-2 sm:gap-3'>
                <Slider
                  className='flex-1'
                  color='primary'
                  maxValue={360}
                  minValue={-360}
                  size={isMobile ? 'md' : 'sm'}
                  step={1}
                  value={currentRotationValue}
                  onChange={handleRotationChange}
                />
                <Input
                  className={isMobile ? 'w-16' : 'w-20'}
                  endContent={<span className='text-xs text-gray-500'>°</span>}
                  max={360}
                  min={-360}
                  size='sm'
                  step={1}
                  type='number'
                  value={currentRotationValue.toString()}
                  onChange={handleRotationInputChange}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        accept='image/*'
        className='hidden'
        type='file'
        onChange={handleFileInputChange}
      />
    </div>
  )
}
