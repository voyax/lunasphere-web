'use client'

import React from 'react'
import { Upload, ZoomIn, ImagePlus, Sparkles, RotateCw, RotateCcw } from 'lucide-react'
import Image from 'next/image'
import { useRef, useEffect, useCallback, useState, useMemo } from 'react'
import { Stage, Layer, Image as KonvaImage, Transformer } from 'react-konva'
import useImage from 'use-image'
import Konva from 'konva'
import { KonvaEventObject } from 'konva/lib/Node'
import { RefObject } from 'react'
import { Slider, Input } from '@heroui/react'

import { GestureVisualFeedback } from './GestureVisualFeedback'
import RotationControl from '@/components/RotationControl'
import GradientSlider from '@/components/GradientSlider'

import { useTranslations } from 'next-intl'
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

// Accent color configurations - Warm organic style matching homepage
const accentColors = {
  orange: {
    gradient: 'from-orange-400 to-amber-400',
    gradientHover: 'group-hover:from-orange-300 group-hover:to-amber-300',
    border: 'border-orange-200/60 dark:border-orange-700/40',
    borderHover: 'hover:border-orange-300 dark:hover:border-orange-600',
    bg: 'from-orange-50 via-amber-50/50 to-orange-50 dark:from-orange-950/30 dark:via-amber-950/20 dark:to-orange-950/30',
    iconBg: 'bg-orange-100 dark:bg-orange-900/50',
    iconColor: 'text-orange-500 dark:text-orange-400',
    shadow: 'shadow-orange-500/15',
    ring: 'ring-orange-400/30',
    sliderColor: 'warning' as const,
  },
  rose: {
    gradient: 'from-rose-400 to-pink-400',
    gradientHover: 'group-hover:from-rose-300 group-hover:to-pink-300',
    border: 'border-rose-200/60 dark:border-rose-700/40',
    borderHover: 'hover:border-rose-300 dark:hover:border-rose-600',
    bg: 'from-rose-50 via-pink-50/50 to-rose-50 dark:from-rose-950/30 dark:via-pink-950/20 dark:to-rose-950/30',
    iconBg: 'bg-rose-100 dark:bg-rose-900/50',
    iconColor: 'text-rose-500 dark:text-rose-400',
    shadow: 'shadow-rose-500/15',
    ring: 'ring-rose-400/30',
    sliderColor: 'danger' as const,
  },
}

interface ProfileUploadAreaProps {
  // Image data
  image: UploadedImage | null
  isSelected?: boolean

  // Template configuration
  templateSrc: string
  templateAltKey: string

  // Required ref for file input control
  fileInputRef: RefObject<HTMLInputElement | null>

  // Stage configuration
  stageSize?: { width: number; height: number }

  // Accent color
  accentColor?: 'orange' | 'rose'

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
  accentColor = 'orange',
  onImageUpload,
  onImageChange,
  onImageSelect,
}: ProfileUploadAreaProps) {
  const t = useTranslations()
  const isMobile = useIsMobile()
  const memoryManager = useMemoryManager()
  const [showGestureHint, setShowGestureHint] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)

  const colors = accentColors[accentColor]

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
    if (!image) return 0
    // Normalize rotation to -180 to 180 range for the slider
    let rotation = image.rotation % 360
    if (rotation > 180) rotation -= 360
    if (rotation < -180) rotation += 360
    return Math.round(rotation)
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

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
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

  const handleStageClick = (e: KonvaEventObject<any>) => {
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
        // Empty State - Upload Area (Warm Organic Style)
        <div
          className={`relative aspect-square rounded-[2rem] overflow-hidden cursor-pointer transition-all duration-300
            ${isDragOver
              ? `border-2 border-dashed ${colors.border} bg-gradient-to-br ${colors.bg} scale-[1.01]`
              : `border-2 border-dashed border-gray-200 dark:border-gray-700 ${colors.borderHover} bg-white dark:bg-gray-900/50`
            }
            shadow-soft hover:shadow-md
          `}
          role='button'
          tabIndex={0}
          onClick={handleFileInputClick}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onKeyDown={handleKeyDown}
        >
          {/* Background template image */}
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className='w-4/5 h-4/5 relative opacity-60 group-hover:opacity-80 transition-opacity duration-300'>
              <Image
                fill
                alt={t(templateAltKey)}
                className='w-full h-full object-contain'
                sizes='(max-width: 768px) 100vw, 50vw'
                src={templateSrc}
              />
            </div>
            <div className='absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-white/40 dark:from-gray-900/80 dark:via-transparent dark:to-gray-900/40' />
          </div>

          {/* Upload content overlay */}
          <div className='relative z-10 flex items-center justify-center h-full'>
            <div className='text-center space-y-4 p-6'>
              {/* Icon */}
              <div className='relative inline-flex'>
                <div className={`w-16 h-16 ${colors.iconBg} rounded-2xl flex items-center justify-center shadow-soft group-hover:scale-105 transition-transform duration-300`}>
                  <ImagePlus className={`w-7 h-7 ${colors.iconColor}`} />
                </div>
              </div>

              {/* Text */}
              <div className='space-y-2'>
                <p className='text-base font-semibold text-gray-800 dark:text-gray-200'>
                  {t('detection.profileView.uploadPrompt')}
                </p>
                <div className='flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400'>
                  <Upload className='w-4 h-4' />
                  <span>{t('detection.profileView.uploadHint')}</span>
                </div>
              </div>

              {/* Supported formats */}
              <div className='flex items-center justify-center gap-2'>
                {['JPG', 'PNG', 'HEIC'].map((format, index) => (
                  <span
                    key={index}
                    className='px-2 py-0.5 text-xs font-medium rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700'
                  >
                    {format}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Corner Decorations */}
          <div className={`absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 ${isDragOver ? colors.border : 'border-gray-200 dark:border-gray-700'} rounded-tl-lg transition-colors duration-300`} />
          <div className={`absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 ${isDragOver ? colors.border : 'border-gray-200 dark:border-gray-700'} rounded-tr-lg transition-colors duration-300`} />
          <div className={`absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 ${isDragOver ? colors.border : 'border-gray-200 dark:border-gray-700'} rounded-bl-lg transition-colors duration-300`} />
          <div className={`absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 ${isDragOver ? colors.border : 'border-gray-200 dark:border-gray-700'} rounded-br-lg transition-colors duration-300`} />
        </div>
      ) : (
        // Image Uploaded State (Warm Organic Style)
        <div className='space-y-4'>
          {/* Canvas Area */}
          <div className='relative'>
            <div className={`relative aspect-square bg-white dark:bg-gray-900/50 rounded-[2rem] overflow-hidden shadow-soft border border-white dark:border-gray-700 ring-1 ${colors.ring}`}>
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
                    image={image!}
                    isSelected={isSelected}
                    opacity={0.8}
                    onChange={onImageChange || (() => { })}
                    onHideGestureHint={hideGestureHint}
                    onHideGestureVisualFeedback={hideGestureVisualFeedback}
                    onSelect={onImageSelect || (() => { })}
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

              {/* Status Badge */}
              <div className='absolute top-3 left-3'>
                <div className='flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-white/50 dark:border-gray-700/50 shadow-sm'>
                  <Sparkles className='w-3 h-3 text-amber-500' />
                  <span className='text-xs font-medium text-gray-700 dark:text-gray-300'>
                    {t('detection.profileView.uploaded')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Image Controls - Warm Organic Style */}
          <div className='p-4 rounded-2xl bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700 shadow-soft space-y-4'>
            {/* Scale Control - Hidden on mobile */}
            {!isMobile && (
              <div className='flex items-center gap-3'>
                <div className={`w-8 h-8 rounded-lg ${colors.iconBg} flex items-center justify-center flex-shrink-0`} title={t('detection.profileView.scale')}>
                  <ZoomIn className={`w-4 h-4 ${colors.iconColor}`} />
                </div>
                <div className='flex-1'>
                  <GradientSlider
                    value={currentScalePercentage}
                    onChange={(val) => handleScaleChange(val)}
                    min={0}
                    max={300}
                    step={1}
                    trackGradient={accentColor === 'orange' ? undefined : 'from-rose-100 via-rose-200 to-rose-100 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700'}
                  />
                </div>
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
            )}

            {/* Rotation Control - Integrated Style */}
            <div className='flex items-center gap-3'>
              {/* No outer icon - we use the buttons themselves as the visual anchors */}
              <div className='flex-1'>
                <RotationControl
                  value={currentRotationValue}
                  onChange={(newRotation) => {
                    if (onImageChange) {
                      onImageChange({ rotation: newRotation })
                    }
                  }}
                  min={-180}
                  max={180}
                  step={1}
                  buttonStep={15}
                  // Style the left button to look like the "Unified Icon Box"
                  leftButtonClassName={`w-8 h-8 rounded-lg ${colors.iconBg} flex items-center justify-center flex-shrink-0 transition-transform active:scale-95 hover:bg-opacity-80`}
                  leftIcon={<RotateCcw className={`w-4 h-4 ${colors.iconColor}`} />}
                  // Style the right button similarly for symmetry, or slightly different
                  rightButtonClassName={`w-8 h-8 rounded-lg ${colors.iconBg} flex items-center justify-center flex-shrink-0 transition-transform active:scale-95 hover:bg-opacity-80`}
                  rightIcon={<RotateCw className={`w-4 h-4 ${colors.iconColor}`} />}
                />
              </div>
            </div>
          </div>
        </div>
      )
      }

      <input
        ref={fileInputRef}
        accept='image/*'
        className='hidden'
        type='file'
        onChange={handleFileInputChange}
      />
    </div >
  )
}
