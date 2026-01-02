/**
 * IntegratedAssessment Component
 * AI-powered comprehensive assessment card with gradient background
 * Combines CI and CVAI results into actionable advice
 * Ported from design2's ResultsDashboard
 */

'use client'

import { MessageCircleHeart, Quote, Share2 } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface IntegratedAssessmentProps {
    ci: number // CI percentage value (0-100)
    cvai: number // CVAI percentage value (0-100)
}

/**
 * Determine overall severity based on CI and CVAI values
 */
function getOverallStatus(ci: number, cvai: number) {
    // CVAI takes priority for asymmetry concerns
    if (cvai > 8.75) {
        return {
            headline: 'detection.assessment.headlines.severeAttention',
            severity: 'severe' as const,
        }
    }
    if (cvai > 6.25) {
        return {
            headline: 'detection.assessment.headlines.moderateRisk',
            severity: 'moderate' as const,
        }
    }
    if (cvai > 3.5) {
        return {
            headline: 'detection.assessment.headlines.mildAttention',
            severity: 'mild' as const,
        }
    }
    // Then check CI
    if (ci > 97 || ci < 72) {
        return {
            headline: 'detection.assessment.headlines.severeAttention',
            severity: 'severe' as const,
        }
    }
    if (ci > 93 || ci < 74) {
        return {
            headline: 'detection.assessment.headlines.moderateRisk',
            severity: 'moderate' as const,
        }
    }
    if (ci > 90 || ci < 76) {
        return {
            headline: 'detection.assessment.headlines.mildAttention',
            severity: 'mild' as const,
        }
    }
    return {
        headline: 'detection.assessment.headlines.perfect',
        severity: 'normal' as const,
    }
}

/**
 * Get advice key based on CI and CVAI values
 */
function getAdviceKey(ci: number, cvai: number): string {
    if (cvai > 8.75) return 'detection.assessment.advice.severeCvai'
    if (cvai > 6.25) return 'detection.assessment.advice.moderateCvai'
    if (cvai > 3.5) return 'detection.assessment.advice.mildCvai'
    if (ci > 95) return 'detection.assessment.advice.severeFlat'
    if (ci > 88) return 'detection.assessment.advice.mildFlat'
    if (ci < 75) return 'detection.assessment.advice.longHead'
    return 'detection.assessment.advice.perfect'
}

export default function IntegratedAssessment({
    ci,
    cvai,
}: IntegratedAssessmentProps) {
    const t = useTranslations()
    const status = getOverallStatus(ci, cvai)
    const adviceKey = getAdviceKey(ci, cvai)

    return (
        <div className='relative overflow-hidden bg-gradient-to-br from-[#ff9a8b] to-[#ff6a88] dark:from-[#8b4a5a] dark:to-[#5a3a48] rounded-[2.8rem] p-8 text-white shadow-2xl shadow-rose-200/40 dark:shadow-rose-900/20 animate-slide-in-bottom'>
            {/* Decorative blur circle */}
            <div className='absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl' />

            {/* Header: Emotional Anchor */}
            <div className='flex items-center space-x-3 mb-6 relative z-10 opacity-90'>
                <MessageCircleHeart className='w-5 h-5 text-white' />
                <span className='text-sm font-bold tracking-wider'>
                    {t('detection.assessment.whisper')}
                </span>
            </div>

            {/* Content Flow */}
            <div className='relative z-10 space-y-6'>
                {/* 1. Clinical Status Headline */}
                <div>
                    <h2 className='text-3xl font-bold tracking-tight mb-2'>
                        {t(status.headline)}
                    </h2>
                    {/* 2. Clinical Advice */}
                    <p className='text-[15px] font-medium leading-relaxed text-rose-50/90'>
                        {t(adviceKey)}
                    </p>
                </div>

                {/* Separator */}
                <div className='h-px bg-white/20 w-1/3' />

                {/* 3. AI Insight Quote */}
                <div className='flex items-start space-x-2 opacity-90'>
                    <Quote className='w-4 h-4 text-rose-200 mt-1 flex-shrink-0' />
                    <div className='text-[13px] leading-relaxed font-normal text-rose-50 italic'>
                        {t('detection.assessment.disclaimer')}
                    </div>
                </div>
            </div>

            {/* Save Report Button */}
            <div className='mt-8 flex justify-end relative z-10'>
                <button className='flex items-center space-x-2 px-5 py-2.5 bg-white text-rose-500 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all text-xs font-bold'>
                    <Share2 className='w-3.5 h-3.5' />
                    <span>{t('detection.assessment.saveReport')}</span>
                </button>
            </div>

            {/* Footer branding */}
            <p className='mt-6 text-center text-[9px] font-bold text-white/50 uppercase tracking-[0.4em]'>
                {t('detection.assessment.poweredBy')}
            </p>
        </div>
    )
}

export type { IntegratedAssessmentProps }
