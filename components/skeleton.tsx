'use client'

import { ReactNode } from 'react'

interface SkeletonProps {
  className?: string
  children?: ReactNode
  style?: React.CSSProperties
}

/**
 * Base Skeleton component with shimmer animation
 * Uses CSS animation for optimal performance
 */
export function Skeleton({ className = '', style }: SkeletonProps) {
  return (
    <div
      className={`
        relative overflow-hidden
        bg-gray-200/60 dark:bg-gray-700/40
        rounded-lg
        ${className}
      `}
      style={style}
    >
      {/* Shimmer effect overlay */}
      <div
        className="
          absolute inset-0
          -translate-x-full
          animate-[shimmer_1.5s_infinite]
          bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent
        "
      />
    </div>
  )
}

/**
 * Skeleton for text lines
 */
export function SkeletonText({ 
  lines = 1, 
  className = '' 
}: { 
  lines?: number
  className?: string 
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={`h-4 ${i === lines - 1 && lines > 1 ? 'w-3/4' : 'w-full'}`}
        />
      ))}
    </div>
  )
}

/**
 * Skeleton for circular elements (avatars, icons)
 */
export function SkeletonCircle({ 
  size = 'md',
  className = '' 
}: { 
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string 
}) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  }

  return (
    <Skeleton className={`rounded-full ${sizeClasses[size]} ${className}`} />
  )
}

/**
 * Skeleton for buttons
 */
export function SkeletonButton({ 
  size = 'md',
  className = '' 
}: { 
  size?: 'sm' | 'md' | 'lg'
  className?: string 
}) {
  const sizeClasses = {
    sm: 'h-8 w-20',
    md: 'h-10 w-28',
    lg: 'h-12 w-36',
  }

  return (
    <Skeleton className={`rounded-full ${sizeClasses[size]} ${className}`} />
  )
}

/**
 * Skeleton for cards - common pattern
 */
export function SkeletonCard({ className = '' }: SkeletonProps) {
  return (
    <div className={`p-6 rounded-2xl bg-white/60 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 ${className}`}>
      <div className="flex items-start space-x-4">
        <SkeletonCircle size="md" />
        <div className="flex-1 space-y-3">
          <Skeleton className="h-5 w-3/4" />
          <SkeletonText lines={2} />
        </div>
      </div>
    </div>
  )
}

/**
 * Skeleton for image placeholders
 */
export function SkeletonImage({ 
  aspectRatio = '16/9',
  className = '' 
}: { 
  aspectRatio?: string
  className?: string 
}) {
  return (
    <Skeleton 
      className={`w-full rounded-xl ${className}`}
      style={{ aspectRatio }}
    />
  )
}

/**
 * Skeleton for the main analysis card on home page
 */
export function SkeletonAnalysisCard() {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-[3.5rem] shadow-xl border border-white dark:border-gray-700">
      <div className="aspect-[4/5] rounded-[2.8rem] bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <SkeletonCircle size="xl" className="mx-auto" />
          <Skeleton className="h-5 w-40 mx-auto" />
          <Skeleton className="h-3 w-32 mx-auto" />
        </div>
      </div>
    </div>
  )
}

/**
 * Skeleton for result cards (CI/CVAI)
 */
export function SkeletonResultCard() {
  return (
    <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-[2.5rem] p-6 border border-white dark:border-gray-700/50">
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-3 w-32" />
        </div>
        <Skeleton className="h-8 w-16" />
      </div>
      <Skeleton className="h-6 w-full rounded-full mb-4" />
      <div className="flex justify-between">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
    </div>
  )
}

/**
 * Skeleton for FAQ items
 */
export function SkeletonFAQItem() {
  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
      <div className="flex items-center gap-4">
        <SkeletonCircle size="sm" />
        <div className="flex-1">
          <Skeleton className="h-5 w-full max-w-md" />
        </div>
        <Skeleton className="h-8 w-8 rounded-lg" />
      </div>
    </div>
  )
}

/**
 * Loading skeleton for full page content
 */
export function SkeletonPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 animate-pulse">
      {/* Hero skeleton */}
      <div className="text-center mb-16 space-y-6">
        <Skeleton className="h-12 w-64 mx-auto" />
        <Skeleton className="h-12 w-48 mx-auto" />
        <SkeletonText lines={2} className="max-w-md mx-auto" />
      </div>
      
      {/* Content skeleton */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SkeletonAnalysisCard />
        <div className="space-y-6">
          <SkeletonResultCard />
          <SkeletonResultCard />
        </div>
      </div>
    </div>
  )
}

export default Skeleton
