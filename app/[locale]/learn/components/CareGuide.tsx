'use client'

import { useTranslations } from 'next-intl'
import { Lightbulb, AlertTriangle } from 'lucide-react'
import Image from 'next/image'

export function CareGuide() {
    const t = useTranslations('learn.care')

    const tummyTimeTips = [
        t('tummyTime.tip1'),
        t('tummyTime.tip2'),
        t('tummyTime.tip3'),
        t('tummyTime.tip4'),
    ]

    const sleepTips = [
        t('sleep.tip1'),
        t('sleep.tip2'),
        t('sleep.tip3'),
        t('sleep.tip4'),
    ]

    return (
        <div className="w-full space-y-24">

            {/* 1. Tummy Time Section */}
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
                <div className="w-full lg:w-1/2 order-2 lg:order-1">
                    {/* Cute Line Art Container */}
                    <div className="relative aspect-[4/3] flex items-center justify-center p-4">
                        {/* Subtle warm background shape */}
                        <div className="absolute inset-0 bg-orange-50/50 dark:bg-orange-900/10 rounded-[3rem] -rotate-2 scale-95" />
                        <Image
                            src="/images/care/tummy-time-lineart.png"
                            alt="Tummy Time Guide"
                            fill
                            className="object-contain drop-shadow-lg hover:scale-105 transition-transform duration-700 mixture-blend-multiply dark:mix-blend-normal"
                        />
                    </div>
                </div>

                <div className="w-full lg:w-1/2 order-1 lg:order-2 space-y-8">
                    <div className="space-y-3">
                        <h2 className="text-3xl md:text-5xl font-serif font-medium text-gray-900 dark:text-gray-100">
                            {t('tummyTime.title')}
                        </h2>
                        <p className="text-xl text-gray-500 font-light">
                            {t('tummyTime.subtitle')}
                        </p>
                    </div>

                    <div className="space-y-4">
                        {tummyTimeTips.map((tip, i) => (
                            <div key={i} className="flex gap-4 items-start p-4 rounded-xl border border-transparent hover:border-orange-100 hover:bg-orange-50/30 dark:hover:bg-gray-800 transition-all">
                                <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-3 shrink-0" />
                                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">{tip}</p>
                            </div>
                        ))}
                    </div>

                    <div className="bg-orange-50 dark:bg-orange-900/10 p-6 rounded-2xl border border-orange-100 dark:border-orange-800/30">
                        <p className="text-orange-800 dark:text-orange-300 font-medium italic flex gap-2">
                            <Lightbulb className="w-5 h-5 shrink-0" />
                            {t('tummyTime.proTip')}
                        </p>
                    </div>
                </div>
            </div>

            {/* 2. Sleep Positioning Section */}
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
                <div className="w-full lg:w-1/2 space-y-8">
                    <div className="space-y-3">
                        <h2 className="text-3xl md:text-5xl font-serif font-medium text-gray-900 dark:text-gray-100">
                            {t('sleep.title')}
                        </h2>
                        <p className="text-xl text-gray-500 font-light">
                            {t('sleep.subtitle')}
                        </p>
                    </div>

                    <div className="space-y-4">
                        {sleepTips.map((tip, i) => (
                            <div key={i} className="flex gap-4 items-start p-4 rounded-xl border border-transparent hover:border-indigo-100 hover:bg-indigo-50/30 dark:hover:bg-gray-800 transition-all">
                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-3 shrink-0" />
                                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">{tip}</p>
                            </div>
                        ))}
                    </div>

                    <div className="bg-rose-50 dark:bg-rose-900/10 p-6 rounded-2xl border border-rose-100 dark:border-rose-800/30">
                        <p className="text-rose-800 dark:text-rose-300 font-medium flex gap-2">
                            <AlertTriangle className="w-5 h-5 shrink-0" />
                            {t('sleep.warning')}
                        </p>
                    </div>
                </div>

                <div className="w-full lg:w-1/2">
                    <div className="relative aspect-[4/3] flex items-center justify-center p-4">
                        {/* Subtle warm background shape - matching tummy time but angled differently */}
                        <div className="absolute inset-0 bg-orange-50/50 dark:bg-orange-900/10 rounded-[3rem] rotate-2 scale-95" />
                        <Image
                            src="/images/care/sleep-position-lineart.png"
                            alt="Safe Sleep Guide"
                            fill
                            className="object-contain drop-shadow-lg hover:scale-105 transition-transform duration-700 mixture-blend-multiply dark:mix-blend-normal"
                        />
                    </div>
                </div>
            </div>

        </div>
    )
}
