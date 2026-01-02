/**
 * LinearGauge Component
 * A reusable linear gauge/scale visualization with animated indicator
 * Ported from design2 with dark mode support
 */

'use client'

interface GaugeSegment {
    label: string
    widthFlex: number
    colorClass: string
    textColorClass: string
}

interface LinearGaugeProps {
    value: number
    min: number
    max: number
    segments: GaugeSegment[]
    formatValue?: (v: number) => string
}

/**
 * Calculate the percentage position of the indicator on the gauge
 */
function calculatePosition(value: number, min: number, max: number): number {
    const clampedValue = Math.min(Math.max(value, min), max)
    return ((clampedValue - min) / (max - min)) * 100
}

export default function LinearGauge({
    value,
    min,
    max,
    segments,
    formatValue,
}: LinearGaugeProps) {
    const percentage = calculatePosition(value, min, max)

    return (
        <div className='mt-6 mb-2 relative'>
            {/* Color bar container */}
            <div className='h-3 w-full rounded-full flex overflow-hidden relative shadow-inner bg-gray-100/50 dark:bg-gray-700/50'>
                {segments.map((seg, idx) => (
                    <div
                        key={idx}
                        className={`h-full ${seg.colorClass} opacity-80`}
                        style={{ flex: seg.widthFlex }}
                    />
                ))}
            </div>

            {/* Animated indicator */}
            <div
                className='absolute top-1/2 -translate-y-1/2 w-1.5 h-6 bg-gray-700 dark:bg-white rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.2)] transition-all duration-1000 ease-out z-10 border border-white dark:border-gray-800'
                style={{ left: `calc(${percentage}% - 3px)` }}
            >
                {/* Value tooltip */}
                <div className='absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap'>
                    {formatValue ? formatValue(value) : value}
                    {/* Tooltip arrow */}
                    <div className='absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[3px] border-t-gray-800 dark:border-t-gray-200' />
                </div>
            </div>

            {/* Bottom segment labels */}
            <div className='flex justify-between mt-2 text-[9px] font-bold text-gray-400 dark:text-gray-500 px-1'>
                {segments.map((seg, idx) => (
                    <span
                        key={idx}
                        className={`${seg.textColorClass} text-center`}
                        style={{ flex: seg.widthFlex }}
                    >
                        {seg.label}
                    </span>
                ))}
            </div>
        </div>
    )
}

export type { LinearGaugeProps, GaugeSegment }
