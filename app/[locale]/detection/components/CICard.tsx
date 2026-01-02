/**
 * CI (Cephalic Index) Classification Card Component
 * Design V2: Warm, organic style with glassmorphism
 */

'use client'

import {
  classifyCI,
  CI_CLASSIFICATION_CONFIG,
} from './config/headShapeClassification'
import LinearGauge from './LinearGauge'

import { useTranslations } from 'next-intl'

interface CICardProps {
  value: number // CI value (0-1 range)
  measurements?: {
    bpd: number
    ofd: number
  }
}

/**
 * Get color classes based on severity - warm palette version
 */
function getSeverityColors(severity: string) {
  switch (severity) {
    case 'normal':
      return {
        text: 'text-green-600 dark:text-green-400',
        bg: 'bg-green-50/80 dark:bg-green-950/30 border-green-200/50 dark:border-green-700/50',
        dot: 'bg-green-400',
      }
    case 'mild':
      return {
        text: 'text-yellow-600 dark:text-yellow-400',
        bg: 'bg-yellow-50/80 dark:bg-yellow-950/30 border-yellow-200/50 dark:border-yellow-700/50',
        dot: 'bg-yellow-400',
      }
    case 'moderate':
      return {
        text: 'text-orange-600 dark:text-orange-400',
        bg: 'bg-orange-50/80 dark:bg-orange-950/30 border-orange-200/50 dark:border-orange-700/50',
        dot: 'bg-orange-400',
      }
    case 'severe':
      return {
        text: 'text-red-600 dark:text-red-400',
        bg: 'bg-red-50/80 dark:bg-red-950/30 border-red-200/50 dark:border-red-700/50',
        dot: 'bg-red-500',
      }
    default:
      return {
        text: 'text-gray-600 dark:text-gray-400',
        bg: 'bg-gray-50/80 dark:bg-gray-950/30 border-gray-200/50 dark:border-gray-700/50',
        dot: 'bg-gray-400',
      }
  }
}

// CI gauge segments configuration
const CI_GAUGE_SEGMENTS = [
  {
    label: '长头',
    widthFlex: 2,
    colorClass: 'bg-red-300 dark:bg-red-500/70',
    textColorClass: 'text-red-400 dark:text-red-300',
  },
  {
    label: '中度',
    widthFlex: 2,
    colorClass: 'bg-orange-300 dark:bg-orange-500/70',
    textColorClass: 'text-orange-400 dark:text-orange-300',
  },
  {
    label: '轻度',
    widthFlex: 2,
    colorClass: 'bg-yellow-300 dark:bg-yellow-500/70',
    textColorClass: 'text-yellow-400 dark:text-yellow-300',
  },
  {
    label: '正常',
    widthFlex: 4,
    colorClass: 'bg-green-400 dark:bg-green-500/70',
    textColorClass: 'text-green-500 dark:text-green-400',
  },
  {
    label: '轻度',
    widthFlex: 2,
    colorClass: 'bg-yellow-300 dark:bg-yellow-500/70',
    textColorClass: 'text-yellow-400 dark:text-yellow-300',
  },
  {
    label: '中度',
    widthFlex: 2,
    colorClass: 'bg-orange-300 dark:bg-orange-500/70',
    textColorClass: 'text-orange-400 dark:text-orange-300',
  },
  {
    label: '扁头',
    widthFlex: 3,
    colorClass: 'bg-red-400 dark:bg-red-500/70',
    textColorClass: 'text-red-500 dark:text-red-400',
  },
]

export default function CICard({ value, measurements }: CICardProps) {
  const t = useTranslations()
  const ciPercentage = value * 100
  const result = classifyCI(value)
  const colors = getSeverityColors(result.severity)

  return (
    <div className='bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-[2.5rem] p-6 border border-white dark:border-gray-700/50 shadow-sm hover:shadow-md transition-all duration-300'>
      {/* Header */}
      <div className='flex justify-between items-start mb-2'>
        <div>
          <div className='flex items-center space-x-2 mb-1'>
            <div className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
            <h3 className='text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider'>
              {t('detection.analysis.ci.title')}
            </h3>
          </div>
          {/* Formula display */}
          {measurements && (
            <div className='text-[10px] text-gray-400 dark:text-gray-500 font-mono'>
              = BPD({measurements.bpd.toFixed(1)}) / OFD(
              {measurements.ofd.toFixed(1)}) × 100
            </div>
          )}
        </div>
        <div className='text-right'>
          <span className='block text-xl font-black text-gray-800 dark:text-gray-100'>
            {ciPercentage.toFixed(1)}%
          </span>
        </div>
      </div>

      {/* Linear Gauge */}
      <LinearGauge
        formatValue={v => v.toFixed(1)}
        max={105}
        min={65}
        segments={CI_GAUGE_SEGMENTS}
        value={ciPercentage}
      />

      {/* Scale labels */}
      <div className='flex justify-between text-[9px] text-gray-300 dark:text-gray-600 px-1 font-mono'>
        <span>65</span>
        <span className='ml-8'>75</span>
        <span className='mr-8'>85</span>
        <span>105</span>
      </div>

      {/* Classification result badge */}
      <div className='mt-4 flex items-center justify-between'>
        <div className={`text-sm font-bold ${colors.text}`}>
          {t(result.classification)}
        </div>
        <div
          className={`px-3 py-1.5 rounded-2xl text-xs font-bold border ${colors.bg} ${colors.text}`}
        >
          {result.severity === 'normal'
            ? '✓ ' + t('detection.analysis.status.healthy')
            : t('detection.analysis.status.attention')}
        </div>
      </div>
    </div>
  )
}

export type { CICardProps }
