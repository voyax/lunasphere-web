'use client'

import { useEffect, useState } from 'react'
import { Button } from '@heroui/button'
import { Card, CardBody, CardHeader } from '@heroui/card'
import { Brain, Settings } from 'lucide-react'

import { getModelInstance } from '@/lib/model-inference'
import { useLocale } from '@/contexts/LocaleContext'

interface ModelManagerProps {
  modelPath: string
  setModelPath: (path: string) => void
  isModelLoaded: boolean
  setIsModelLoaded: (loaded: boolean) => void
  isLoadingModel: boolean
  setIsLoadingModel: (loading: boolean) => void
  confidenceThreshold: number
  setConfidenceThreshold: (threshold: number) => void
}

export default function ModelManager({
  modelPath,
  setModelPath,
  isModelLoaded,
  setIsModelLoaded,
  isLoadingModel,
  setIsLoadingModel,
  confidenceThreshold,
  setConfidenceThreshold,
}: ModelManagerProps) {
  const { t } = useLocale()
  const [isDebugOpen, setIsDebugOpen] = useState(false)
  const [loadError, setLoadError] = useState<string | null>(null)

  // Global keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
        e.preventDefault()
        setIsDebugOpen(prev => !prev)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Auto-load default model on component mount
  useEffect(() => {
    const autoLoadModel = async () => {
      if (modelPath && !isModelLoaded && !isLoadingModel) {
        setIsLoadingModel(true)
        try {
          const model = getModelInstance(modelPath, { confidenceThreshold })

          // Check if model is already loaded to avoid duplicate loading
          if (model.isModelLoaded(modelPath)) {
            setIsModelLoaded(true)
            return
          }

          await model.loadModel(modelPath)
          setIsModelLoaded(true)
          // Default model loaded successfully
        } catch (error) {
          // Failed to auto-load default model
          setIsModelLoaded(false)
        } finally {
          setIsLoadingModel(false)
        }
      }
    }

    autoLoadModel()
  }, []) // Empty dependency array means this runs once on mount

  const loadModel = async () => {
    if (!modelPath.trim()) {
      setLoadError(t('detection.modelManager.errors.enterModelPath'))

      return
    }

    setIsLoadingModel(true)
    setLoadError(null) // Clear previous errors
    try {
      const model = getModelInstance(modelPath.trim(), { confidenceThreshold })

      // Check if model is already loaded to avoid duplicate loading
      if (model.isModelLoaded(modelPath.trim())) {
        setIsModelLoaded(true)
        setLoadError(null)
        return
      }

      await model.loadModel(modelPath.trim())
      setIsModelLoaded(true)
      setLoadError(null)
    } catch (error) {
      // Model loading failed
      setIsModelLoaded(false)
      setLoadError(error instanceof Error ? error.message : t('detection.modelManager.errors.unknownError'))
    } finally {
      setIsLoadingModel(false)
    }
  }

  return (
    <>
      {/* Debug Trigger - Industry Standard Approach */}
      <div className='fixed bottom-4 right-4 z-50'>
        <Button
          isIconOnly
          aria-label={t('detection.modelManager.openDebugMode')}
          className='bg-gray-800/80 hover:bg-gray-700/90 text-white backdrop-blur-sm shadow-lg border border-gray-600/50'
          size='sm'
          title={t('detection.modelManager.debugModeTitle')}
          variant='flat'
          onClick={() => setIsDebugOpen(!isDebugOpen)}
        >
          <Settings className='w-4 h-4' />
        </Button>
      </div>

      {/* Debug Panel as Modal Overlay */}
      {isDebugOpen && (
        <div className='fixed inset-0 z-40 flex items-center justify-center p-4'>
          {/* Backdrop */}
          <div
            aria-label={t('detection.modelManager.closeDebugMode')}
            className='absolute inset-0 bg-black/20 backdrop-blur-sm'
            role='button'
            tabIndex={0}
            onClick={() => setIsDebugOpen(false)}
            onKeyDown={e => {
              if (e.key === 'Escape') {
                setIsDebugOpen(false)
              }
            }}
          />

          {/* Modal Content */}
          <div className='relative z-50 w-full max-w-2xl max-h-[80vh] overflow-y-auto'>
            <Card className='bg-white/95 dark:bg-gray-900/95 border border-purple-200/40 dark:border-purple-700/40 shadow-2xl backdrop-blur-md'>
              <CardHeader className='pb-3 relative'>
                {/* Close button in top-right corner */}
                <Button
                  isIconOnly
                  className='absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 z-10'
                  size='sm'
                  variant='light'
                  onClick={() => setIsDebugOpen(false)}
                >
                  ×
                </Button>

                <div className='flex items-center gap-3 pr-8'>
                  <div className='inline-flex items-center gap-2 bg-purple-500/10 text-purple-600 dark:text-purple-400 px-3 py-1 rounded-full text-sm font-medium'>
                    <Brain className='w-4 h-4' />
                    {t('detection.modelManager.title')}
                  </div>
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                      isLoadingModel
                        ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                        : loadError
                          ? 'bg-red-500/10 text-red-600 dark:text-red-400'
                          : isModelLoaded
                            ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                            : 'bg-gray-500/10 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        isLoadingModel
                          ? 'bg-blue-500 animate-pulse'
                          : loadError
                            ? 'bg-red-500'
                            : isModelLoaded
                              ? 'bg-green-500'
                              : 'bg-gray-400'
                      }`}
                    />
                    {isLoadingModel
                      ? t('detection.modelManager.status.loading')
                      : loadError
                        ? t('detection.modelManager.status.loadFailed')
                        : isModelLoaded
                          ? t('detection.modelManager.status.loaded')
                          : t('detection.modelManager.status.notLoaded')}
                  </div>
                  {loadError && (
                    <div className='text-xs text-red-500 dark:text-red-400 mt-1 px-3 py-1 bg-red-50 dark:bg-red-900/20 rounded border border-red-200 dark:border-red-800'>
                      {t('detection.modelManager.error')}: {loadError}
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardBody className='pt-0'>
                <div className='space-y-4'>
                  <div className='flex flex-col sm:flex-row gap-3'>
                    <div className='flex-1'>
                      <input
                        className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all'
                        disabled={isLoadingModel}
                        placeholder={t('detection.modelManager.modelPathPlaceholder')}
                        type='text'
                        value={modelPath}
                        onChange={e => setModelPath(e.target.value)}
                      />
                    </div>
                    <Button
                      className='bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors min-w-[120px]'
                      disabled={isLoadingModel || !modelPath.trim()}
                      isLoading={isLoadingModel}
                      onClick={loadModel}
                    >
                      {isLoadingModel ? t('detection.modelManager.status.loading') : t('detection.modelManager.loadModel')}
                    </Button>
                  </div>

                  <div className='flex flex-col sm:flex-row gap-3 items-start sm:items-center'>
                    <label
                      className='text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[120px]'
                      htmlFor='confidence-threshold'
                    >
                      {t('detection.modelManager.confidenceThreshold')}：
                    </label>
                    <div className='flex-1 flex items-center gap-3'>
                      <input
                        className='flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider'
                        disabled={isLoadingModel}
                        id='confidence-threshold'
                        max='0.9'
                        min='0.1'
                        step='0.05'
                        type='range'
                        value={confidenceThreshold}
                        onChange={e =>
                          setConfidenceThreshold(parseFloat(e.target.value))
                        }
                      />
                      <span className='text-sm font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-gray-700 dark:text-gray-300 min-w-[50px] text-center'>
                        {confidenceThreshold.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className='space-y-2 mt-3'>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>
                    {t('detection.modelManager.tips.defaultModel')}
                  </p>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>
                    {t('detection.modelManager.tips.confidenceThreshold')}
                  </p>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      )}
    </>
  )
}
