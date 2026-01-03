'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Baby, BookOpen, Heart, Stethoscope } from 'lucide-react'
import { Link } from '@/i18n/routing'

/**
 * Learn Page Hero Section with age selector
 */
export function LearnHero() {
    const t = useTranslations('learn')
    const [selectedAge, setSelectedAge] = useState<string | null>(null)

    const ageGroups = [
        { id: '0-3', label: t('hero.ageGroups.0to3'), months: '0-3' },
        { id: '3-6', label: t('hero.ageGroups.3to6'), months: '3-6' },
        { id: '6-12', label: t('hero.ageGroups.6to12'), months: '6-12' },
        { id: '12+', label: t('hero.ageGroups.12plus'), months: '12+' },
    ]

    return (
        <section className='relative px-6 pt-32 pb-16 text-center'>
            {/* Background decorations */}
            <div className='absolute inset-0 overflow-hidden pointer-events-none'>
                <div className='absolute top-20 left-10 w-64 h-64 bg-orange-200/20 dark:bg-orange-900/10 rounded-full blur-3xl' />
                <div className='absolute bottom-10 right-10 w-48 h-48 bg-rose-200/20 dark:bg-rose-900/10 rounded-full blur-3xl' />
            </div>

            <div className='relative z-10 max-w-4xl mx-auto'>
                {/* Icon */}
                <div className='inline-flex items-center justify-center w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-3xl mb-6'>
                    <BookOpen className='w-8 h-8 text-orange-500 dark:text-orange-400' />
                </div>

                {/* Title */}
                <h1 className='text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4'>
                    {t('hero.title')}
                </h1>

                {/* Subtitle */}
                <p className='text-gray-500 dark:text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-10'>
                    {t('hero.subtitle')}
                </p>

                {/* Age Selector */}
                <div className='bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-3xl p-6 border border-white dark:border-gray-700 shadow-sm max-w-xl mx-auto'>
                    <p className='text-sm font-medium text-gray-600 dark:text-gray-400 mb-4'>
                        {t('hero.ageQuestion')}
                    </p>
                    <div className='flex flex-wrap justify-center gap-3'>
                        {ageGroups.map((group) => (
                            <button
                                key={group.id}
                                onClick={() => setSelectedAge(group.id)}
                                className={`px-5 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300 ${selectedAge === group.id
                                        ? 'bg-orange-400 text-white shadow-lg shadow-orange-200/50 dark:shadow-none'
                                        : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'
                                    }`}
                            >
                                {group.label}
                            </button>
                        ))}
                    </div>
                    {selectedAge && (
                        <p className='mt-4 text-xs text-orange-500 dark:text-orange-400 font-medium animate-fade-in'>
                            {t('hero.ageSelected', { age: selectedAge })}
                        </p>
                    )}
                </div>

                {/* Quick Links */}
                <div className='flex flex-wrap justify-center gap-4 mt-10'>
                    <a
                        href='#development'
                        className='flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 text-sm font-medium hover:bg-white dark:hover:bg-gray-800 transition-colors'
                    >
                        <Baby className='w-4 h-4' />
                        {t('nav.development')}
                    </a>
                    <a
                        href='#care'
                        className='flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 text-sm font-medium hover:bg-white dark:hover:bg-gray-800 transition-colors'
                    >
                        <Heart className='w-4 h-4' />
                        {t('nav.care')}
                    </a>
                    <a
                        href='#consult'
                        className='flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 text-sm font-medium hover:bg-white dark:hover:bg-gray-800 transition-colors'
                    >
                        <Stethoscope className='w-4 h-4' />
                        {t('nav.consult')}
                    </a>
                </div>
            </div>
        </section>
    )
}
