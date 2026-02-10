'use client'

import { useTranslations } from 'next-intl'
import { CheckCircle, AlertCircle, PhoneCall, ArrowRight, Activity } from 'lucide-react'
import { Link } from '@/i18n/routing'

export function ConsultSection() {
    const t = useTranslations('learn.consult')

    // Normal: Green
    const normalSigns = ['normalSigns.sign1', 'normalSigns.sign2', 'normalSigns.sign3']
    // Warning: Amber
    const warningSigns = ['warningSigns.sign1', 'warningSigns.sign2', 'warningSigns.sign3']
    // Urgent: Red
    const urgentSigns = ['urgentSigns.sign1', 'urgentSigns.sign2', 'urgentSigns.sign3']

    return (
        <div className="w-full">
            <div className="text-center mb-16 space-y-4">
                <h2 className="text-3xl md:text-5xl font-serif font-medium text-gray-900 dark:text-gray-100">
                    {t('title')}
                </h2>
                <p className="text-xl text-gray-500 font-light max-w-2xl mx-auto">
                    {t('subtitle')}
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* 1. Normal - Peace of Mind */}
                <div className="bg-white dark:bg-gray-800 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
                    <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center mb-6">
                        <CheckCircle className="w-6 h-6 text-emerald-500" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('normalSigns.title')}</h3>
                    <p className="text-emerald-600 dark:text-emerald-400 text-sm font-medium uppercase tracking-wide mb-6">{t('normalSigns.action')}</p>
                    <ul className="space-y-3">
                        {normalSigns.map((sign, i) => (
                            <li key={i} className="flex gap-3 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                                {t(sign)}
                            </li>
                        ))}
                    </ul>
                    <div className="mt-6 pt-4 border-t border-emerald-100 dark:border-emerald-800/30">
                        <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                            {t('normalSigns.measurement')}
                        </p>
                    </div>
                </div>

                {/* 2. Warning - Check In */}
                <div className="bg-white dark:bg-gray-800 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-amber-400" />
                    <div className="w-12 h-12 rounded-full bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center mb-6">
                        <Activity className="w-6 h-6 text-amber-500" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('warningSigns.title')}</h3>
                    <p className="text-amber-600 dark:text-amber-400 text-sm font-medium uppercase tracking-wide mb-6">{t('warningSigns.action')}</p>
                    <ul className="space-y-3">
                        {warningSigns.map((sign, i) => (
                            <li key={i} className="flex gap-3 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                                {t(sign)}
                            </li>
                        ))}
                    </ul>
                    <div className="mt-6 pt-4 border-t border-amber-100 dark:border-amber-800/30">
                        <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                            {t('warningSigns.measurement')}
                        </p>
                    </div>
                </div>

                {/* 3. Urgent - Act Now */}
                <div className="bg-rose-50 dark:bg-rose-900/10 p-8 rounded-[2rem] border border-rose-100 dark:border-rose-800/30 hover:shadow-xl transition-shadow duration-300">
                    <div className="w-12 h-12 rounded-full bg-white dark:bg-rose-900/20 flex items-center justify-center mb-6 shadow-sm">
                        <PhoneCall className="w-6 h-6 text-rose-500" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('urgentSigns.title')}</h3>
                    <p className="text-rose-600 dark:text-rose-400 text-sm font-bold uppercase tracking-wide mb-6">{t('urgentSigns.action')}</p>
                    <ul className="space-y-3">
                        {urgentSigns.map((sign, i) => (
                            <li key={i} className="flex gap-3 text-gray-700 dark:text-gray-300 text-sm leading-relaxed font-medium">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                                {t(sign)}
                            </li>
                        ))}
                    </ul>
                    <div className="mt-6 pt-4 border-t border-rose-200 dark:border-rose-800/30">
                        <p className="text-xs text-rose-600 dark:text-rose-400 font-medium">
                            {t('urgentSigns.measurement')}
                        </p>
                    </div>
                </div>
            </div>

            {/* Huge CTA */}
            <div className="mt-24 text-center">
                <Link
                    href="/"
                    className="group relative inline-flex items-center justify-center gap-4 px-12 py-6 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full text-xl font-medium overflow-hidden transition-transform hover:scale-105"
                >
                    <span className="relative z-10">{t('ctaButton')}</span>
                    <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform" />

                    {/* Background glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black dark:from-white dark:to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                <p className="mt-6 text-gray-500 dark:text-gray-400">
                    {t('ctaText')}
                </p>
                <p className="mt-12 text-xs text-gray-400 max-w-xl mx-auto leading-relaxed">
                    {t('disclaimer')}
                </p>
            </div>
        </div>
    )
}
