'use client'

import { useLocale } from '@/contexts/LocaleContext'

interface MedicalDisclaimerProps {
  titleKey?: string
  contentKey?: string
  className?: string
}

/**
 * Medical Disclaimer Component
 * Displays medical disclaimer information with customizable content
 */
export default function MedicalDisclaimer({
  titleKey = 'faq.medicalDisclaimerTitle',
  contentKey = 'faq.medicalDisclaimer',
  className = '',
}: MedicalDisclaimerProps) {
  const { t } = useLocale()

  return (
    <div
      className={`bg-gradient-to-r from-amber-50 via-orange-50 to-red-50 border border-amber-200 rounded-3xl p-4 sm:p-6 lg:p-8 shadow-lg ${className}`}
    >
      <div className='flex items-start gap-3 sm:gap-4 lg:gap-6'>
        <div className='flex-1'>
          <h3 className='text-lg sm:text-xl font-bold text-amber-900 mb-2 sm:mb-3'>
            {t(titleKey)}
          </h3>
          <p className='text-amber-800 leading-relaxed text-sm sm:text-base lg:text-lg'>
            {t(contentKey)}
          </p>
        </div>
      </div>
    </div>
  )
}
