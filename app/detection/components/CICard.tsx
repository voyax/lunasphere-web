/**
 * CI (Cephalic Index) Classification Card Component
 * Displays CI classification results with specific visualization
 */



import {
  classifyCI,
  CI_CLASSIFICATION_CONFIG,
} from './config/headShapeClassification'
import { useLocale } from '@/contexts/LocaleContext'

interface CICardProps {
  value: number // CI value (0-1 range)
  measurements?: {
    bpd: number
    ofd: number
  }
}

/**
 * Get color classes based on severity
 */
function getSeverityColors(severity: string) {
  switch (severity) {
    case 'normal':
      return {
        text: 'text-green-600 dark:text-green-400',
        bg: 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-700',
        bar: 'bg-green-500',
      }
    case 'mild':
      return {
        text: 'text-yellow-600 dark:text-yellow-400',
        bg: 'bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-700',
        bar: 'bg-yellow-500',
      }
    case 'moderate':
      return {
        text: 'text-orange-600 dark:text-orange-400',
        bg: 'bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-700',
        bar: 'bg-orange-500',
      }
    case 'severe':
      return {
        text: 'text-red-600 dark:text-red-400',
        bg: 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-700',
        bar: 'bg-red-500',
      }
    default:
      return {
        text: 'text-gray-600 dark:text-gray-400',
        bg: 'bg-gray-50 dark:bg-gray-950/20 border-gray-200 dark:border-gray-700',
        bar: 'bg-gray-500',
      }
  }
}

/**
 * Calculate position percentage for CI visualization based on config ranges
 */
function calculateCIPosition(ciPercentage: number): number {
  const ranges = CI_CLASSIFICATION_CONFIG.ranges
  const totalRanges = ranges.length
  const segmentWidth = 100 / totalRanges

  // Find which range the value falls into
  for (let i = 0; i < ranges.length; i++) {
    const range = ranges[i]

    if (
      ciPercentage >= range.min &&
      (ciPercentage < range.max || range.max === Infinity)
    ) {
      // Calculate position within this range
      const rangeProgress =
        range.max === Infinity
          ? Math.min(1, (ciPercentage - range.min) / (range.min * 0.5)) // For infinity range, use reasonable scale
          : (ciPercentage - range.min) / (range.max - range.min)

      return Math.min(100, i * segmentWidth + rangeProgress * segmentWidth)
    }
  }

  // Fallback: if value is outside all ranges
  return ciPercentage < ranges[0].min ? 0 : 100
}

export default function CICard({ value, measurements }: CICardProps) {
  const { t } = useLocale()
  const ciPercentage = value * 100
  const result = classifyCI(value)
  const colors = getSeverityColors(result.severity)
  const position = calculateCIPosition(ciPercentage)
  // Use translated labels from config
  const categoryLabels = CI_CLASSIFICATION_CONFIG.ranges.map(
    range => t(range.labelKey)
  )

  return (
    <div className='bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm'>
      <div className='flex items-center gap-2 mb-3'>
        <div className='w-2 h-2 bg-primary rounded-full' />
        <div className='text-sm font-medium text-gray-700 dark:text-gray-300'>
          {t('detection.analysis.ci.title')}
        </div>
      </div>

      {/* Classification result and value */}
      <div className='flex items-center justify-between mb-2'>
        <div className={`text-xl font-bold ${colors.text}`}>
          {t(result.classification)}
        </div>
        <div
          className={`px-3 py-1 rounded-full text-sm font-medium ${colors.bg} ${colors.text}`}
        >
          CI: {ciPercentage.toFixed(1)}
        </div>
      </div>

      {/* Formula display */}
      {measurements && (
        <div className='text-sm text-gray-600 dark:text-gray-400 mb-3'>
          = BPD({measurements.bpd.toFixed(1)}) / OFD(
          {measurements.ofd.toFixed(1)}) × 100
        </div>
      )}

      {/* Scale labels */}
      <div className='flex justify-between text-xs text-gray-400 mb-1'>
        {CI_CLASSIFICATION_CONFIG.scaleLabels.map((label, index) => (
          <span key={index}>{label}</span>
        ))}
      </div>

      {/* Color bar */}
      <div className='relative h-4 rounded-full overflow-hidden mb-3'>
        <div className='absolute inset-0 flex'>
          <div className='bg-red-500' style={{ width: '14.3%' }} />
          <div className='bg-orange-500' style={{ width: '14.3%' }} />
          <div className='bg-yellow-500' style={{ width: '14.3%' }} />
          <div className='bg-green-500' style={{ width: '14.3%' }} />
          <div className='bg-yellow-500' style={{ width: '14.3%' }} />
          <div className='bg-orange-500' style={{ width: '14.3%' }} />
          <div className='bg-red-500' style={{ width: '14.2%' }} />
        </div>

        {/* Current value marker */}
        <div
          className='absolute top-0 w-0.5 h-full bg-black dark:bg-white transform -translate-x-0.5'
          style={{ left: `${position}%` }}
        />
        <div
          className='absolute -top-1 w-2 h-2 bg-black dark:bg-white rounded-full transform -translate-x-1'
          style={{ left: `${position}%` }}
        />
      </div>

      {/* Category labels */}
      <div className='grid grid-cols-7 gap-1 text-xs text-gray-600 text-center mb-4'>
        {categoryLabels.map((label, index) => (
          <span
            key={index}
            className={`font-medium ${index === 3 ? 'text-green-600' : ''}`}
          >
            {label}
          </span>
        ))}
      </div>

      {/* Annotation lines for head types */}
      <div className='relative mt-4'>
        {/* Long head annotation */}
        <div className='absolute left-0' style={{ width: '42.9%' }}>
          <div className='relative'>
            {/* Left vertical line */}
            <div className='absolute left-0 w-px h-6 bg-gray-400' />
            {/* Right vertical line */}
            <div className='absolute right-0 w-px h-6 bg-gray-400' />
            {/* Left horizontal line */}
            <div className='absolute left-0 top-3 w-2/5 h-px bg-gray-400' />
            {/* Right horizontal line */}
            <div className='absolute right-0 top-3 w-2/5 h-px bg-gray-400' />
            {/* Text in the middle */}
            <div className='absolute left-1/2 top-3 transform -translate-x-1/2 -translate-y-1/2 text-xs text-gray-600 font-medium whitespace-nowrap bg-white dark:bg-gray-800 px-1'>
              {t('detection.analysis.ci.longHead')}
            </div>
          </div>
        </div>

        {/* Flat head annotation */}
        <div className='absolute right-0' style={{ width: '42.9%' }}>
          <div className='relative'>
            {/* Left vertical line */}
            <div className='absolute left-0 w-px h-6 bg-gray-400' />
            {/* Right vertical line */}
            <div className='absolute right-0 w-px h-6 bg-gray-400' />
            {/* Left horizontal line */}
            <div className='absolute left-0 top-3 w-2/5 h-px bg-gray-400' />
            {/* Right horizontal line */}
            <div className='absolute right-0 top-3 w-2/5 h-px bg-gray-400' />
            {/* Text in the middle */}
            <div className='absolute left-1/2 top-3 transform -translate-x-1/2 -translate-y-1/2 text-xs text-gray-600 font-medium whitespace-nowrap bg-white dark:bg-gray-800 px-1'>
              {t('detection.analysis.ci.flatHead')}
            </div>
          </div>
        </div>

        {/* Spacer for annotation height */}
        <div className='h-8' />
      </div>
    </div>
  )
}

export type { CICardProps }
