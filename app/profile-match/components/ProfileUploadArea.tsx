'use client'

import { Upload } from 'lucide-react'
import Image from 'next/image'
import { useRef, useEffect } from 'react'
import { Stage, Layer, Image as KonvaImage, Transformer } from 'react-konva'
import useImage from 'use-image'
import Konva from 'konva'
import { KonvaEventObject } from 'konva/lib/Node'
import { RefObject } from 'react'

import { useLocale } from '@/contexts/LocaleContext'

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
          const node = e.target
          const scaleX = node.scaleX()
          const scaleY = node.scaleY()

          // Reset scale and apply to width/height
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
}

// Standard Template Image Component
const StandardTemplateImage: React.FC<{
  src: string
  opacity: number
  stageWidth: number
  stageHeight: number
}> = ({ src, opacity, stageWidth, stageHeight }) => {
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
}

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

  // Event handlers
  const handleFileInputClick = () => {
    fileInputRef.current?.click()
  }

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
            <div className='relative aspect-square bg-gradient-to-br from-white via-gray-50/50 to-white dark:from-gray-800 dark:via-gray-750 dark:to-gray-800 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm'>
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
                    image={image}
                    isSelected={isSelected}
                    opacity={0.8}
                    onChange={onImageChange || (() => {})}
                    onSelect={onImageSelect || (() => {})}
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
