'use client'

import { useTranslations } from 'next-intl'
import { Heart } from 'lucide-react'

interface MedicalDisclaimerProps {
  titleKey?: string
  contentKey?: string
  className?: string
}

/**
 * Medical Disclaimer Component
 * Displays medical disclaimer information with warm glassmorphism style
 * 
 * Note: This component uses dynamic translation keys.
 * The keys are expected to be in the format 'namespace.key' (e.g., 'faq.medicalDisclaimer')
 */
export default function MedicalDisclaimer({
  titleKey = 'faq.medicalDisclaimerTitle',
  contentKey = 'faq.medicalDisclaimer',
  className = '',
}: MedicalDisclaimerProps) {
  // Parse namespace from the key (e.g., 'faq.medicalDisclaimer' -> namespace: 'faq', key: 'medicalDisclaimer')
  const [titleNamespace, ...titleKeyParts] = titleKey.split('.')
  const [contentNamespace, ...contentKeyParts] = contentKey.split('.')

  const tTitle = useTranslations(titleNamespace)
  const tContent = useTranslations(contentNamespace)

  return (
    <div
      className={`
        relative overflow-hidden
        bg-white/60 dark:bg-gray-800/60
        backdrop-blur-sm
        border border-orange-100 dark:border-orange-900/30
        rounded-[2rem]
        p-6 sm:p-8 lg:p-10
        shadow-sm hover:shadow-md
        transition-shadow duration-300
        ${className}
      `}
    >
      {/* Decorative icon */}
      <div className='absolute top-4 right-4 opacity-10 dark:opacity-5'>
        <Heart className='w-16 h-16 text-orange-300' />
      </div>

      <div className='relative z-10'>
        {/* Badge */}
        <div className='inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-50/80 dark:bg-orange-950/50 border border-orange-100 dark:border-orange-800/30 mb-4'>
          <div className='w-1.5 h-1.5 rounded-full bg-orange-400' />
          <span className='text-[10px] font-bold tracking-[0.15em] text-orange-500 dark:text-orange-400 uppercase'>
            温馨提示
          </span>
        </div>

        <h3 className='text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100 mb-3 tracking-tight'>
          {tTitle(titleKeyParts.join('.'))}
        </h3>

        <p className='text-gray-500 dark:text-gray-400 leading-relaxed text-sm sm:text-base font-medium'>
          {tContent(contentKeyParts.join('.'))}
        </p>
      </div>
    </div>
  )
}
