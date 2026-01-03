'use client'

import { useTranslations } from 'next-intl'
import { Lightbulb, AlertTriangle, Check } from 'lucide-react'
import Image from 'next/image'
import clsx from 'clsx'

export function CareGuide() {
    const t = useTranslations('learn.care')

    const tummyTimeTips = [t('tummyTime.tip1'), t('tummyTime.tip2'), t('tummyTime.tip3'), t('tummyTime.tip4')]
    const sleepTips = [t('sleep.tip1'), t('sleep.tip2'), t('sleep.tip3'), t('sleep.tip4')]

    return (
        <div className="w-full space-y-32">
            {/* 1. Tummy Time Section */}
            <SectionLayout
                title={t('tummyTime.title')}
                subtitle={t('tummyTime.subtitle')}
                label="Daily Routine"
                labelColor="text-orange-600 dark:text-orange-400"
                labelBg="bg-orange-100 dark:bg-orange-900/30"
                imageSrc="/images/care/tummy-time-lineart.png"
                imageBg="bg-orange-50/50 dark:bg-orange-900/10"
                direction="ltr"
            >
                <div className="space-y-6">
                    <div className="grid gap-3">
                        {tummyTimeTips.map((tip, i) => (
                            <TipItem key={i} index={i} text={tip} theme="orange" />
                        ))}
                    </div>

                    {/* Pro Tip - Elegant Quote Style */}
                    <div className="mt-8 p-6 rounded-2xl bg-[#FFF8F4] dark:bg-orange-900/10 border border-orange-100 dark:border-orange-800/30">
                        <div className="flex gap-4">
                            <div className="shrink-0 mt-1">
                                <Lightbulb className="w-5 h-5 text-orange-500 fill-orange-100 dark:fill-orange-900" />
                            </div>
                            <div className="space-y-1">
                                <span className="block text-xs font-bold text-orange-400 uppercase tracking-widest">Pro Tip</span>
                                <p className="text-gray-700 dark:text-gray-300 font-serif italic leading-relaxed">
                                    "{t('tummyTime.proTip')}"
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionLayout>

            {/* 2. Sleep Positioning Section */}
            <SectionLayout
                title={t('sleep.title')}
                subtitle={t('sleep.subtitle')}
                label="Safety First"
                labelColor="text-indigo-600 dark:text-indigo-400"
                labelBg="bg-indigo-100 dark:bg-indigo-900/30"
                imageSrc="/images/care/sleep-position-lineart.png"
                imageBg="bg-indigo-50/50 dark:bg-indigo-900/10"
                direction="rtl"
            >
                <div className="space-y-6">
                    <div className="grid gap-3">
                        {sleepTips.map((tip, i) => (
                            <TipItem key={i} index={i} text={tip} theme="indigo" />
                        ))}
                    </div>

                    {/* Warning - Elegant Quote Style */}
                    <div className="mt-8 p-6 rounded-2xl bg-[#F5F7FA] dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-800/30">
                        <div className="flex gap-4">
                            <div className="shrink-0 mt-1">
                                <AlertTriangle className="w-5 h-5 text-rose-500 fill-rose-100 dark:fill-rose-900" />
                            </div>
                            <div className="space-y-1">
                                <span className="block text-xs font-bold text-rose-500 uppercase tracking-widest">Medical Warning</span>
                                <p className="text-gray-700 dark:text-gray-300 font-serif font-medium leading-relaxed">
                                    {t('sleep.warning')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionLayout>
        </div>
    )
}

function SectionLayout({
    children, title, subtitle, label, labelColor, labelBg, imageSrc, imageBg, direction = 'ltr'
}: {
    children: React.ReactNode
    title: string
    subtitle: string
    label: string
    labelColor: string
    labelBg: string
    imageSrc: string
    imageBg: string
    direction?: 'ltr' | 'rtl'
}) {
    return (
        <div className={clsx("flex flex-col lg:flex-row gap-12 lg:gap-16 xl:gap-24 items-center", direction === 'rtl' ? 'lg:flex-row-reverse' : '')}>
            {/* Visual Side */}
            <div className="w-full lg:w-1/2">
                <div className="relative aspect-[4/3] flex items-center justify-center p-6">
                    {/* Organic Shape Background */}
                    <div className={clsx("absolute inset-0 rounded-[4rem] rotate-[-2deg] scale-95 transition-transform duration-700 hover:rotate-0 hover:scale-100", imageBg)} />
                    <Image
                        src={imageSrc}
                        alt={title}
                        fill
                        className="object-contain drop-shadow-lg relative z-10 mixture-blend-multiply dark:mix-blend-normal hover:scale-105 transition-transform duration-700"
                    />
                </div>
            </div>

            {/* Content Side */}
            <div className="w-full lg:w-1/2 space-y-8">
                <div className="space-y-4">
                    <span className={clsx("inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest", labelBg, labelColor)}>
                        {label}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif font-medium text-gray-900 dark:text-gray-100 leading-tight">
                        {title}
                    </h2>
                    <p className="text-lg text-gray-500 dark:text-gray-400 font-light leading-relaxed">
                        {subtitle}
                    </p>
                </div>

                {children}
            </div>
        </div>
    )
}

function TipItem({ index, text, theme }: { index: number, text: string, theme: 'orange' | 'indigo' }) {
    const themeStyles = {
        orange: 'hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:border-orange-100 dark:hover:border-orange-800',
        indigo: 'hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:border-indigo-100 dark:hover:border-indigo-800'
    }[theme]

    return (
        <div className={clsx(
            "group flex items-start gap-4 p-4 -mx-4 rounded-xl transition-all duration-300 border border-transparent",
            themeStyles
        )}>
            {/* Minimalist Numbering */}
            <span className={clsx(
                "flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold shrink-0 mt-0.5 transition-colors",
                theme === 'orange' ? "bg-orange-100 text-orange-600 group-hover:bg-orange-500 group-hover:text-white" : "bg-indigo-100 text-indigo-600 group-hover:bg-indigo-500 group-hover:text-white"
            )}>
                {index + 1}
            </span>
            <p className="text-gray-600 dark:text-gray-300 text-lg font-light leading-relaxed">
                {text}
            </p>
        </div>
    )
}
