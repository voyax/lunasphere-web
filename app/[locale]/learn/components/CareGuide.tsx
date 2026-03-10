'use client'

import { useTranslations } from 'next-intl'
import { Lightbulb, AlertTriangle } from 'lucide-react'
import Image from 'next/image'
import clsx from 'clsx'
import type { LucideIcon } from 'lucide-react'

export function CareGuide() {
    const t = useTranslations('learn.care')

    const tummyTimeTips = [t('tummyTime.tip1'), t('tummyTime.tip2'), t('tummyTime.tip3'), t('tummyTime.tip4')]
    const sleepTips = [t('sleep.tip1'), t('sleep.tip2'), t('sleep.tip3'), t('sleep.tip4')]
    const feedingTips = [t('feeding.tip1'), t('feeding.tip2'), t('feeding.tip3')]
    const envTips = [t('environment.tip1'), t('environment.tip2'), t('environment.tip3')]
    const mattressTips = [t('mattress.tip1'), t('mattress.tip2'), t('mattress.tip3')]

    return (
        <div className="w-full space-y-32">

            {/* 1. Tummy Time Section (Orange) */}
            <SectionLayout
                title={t('tummyTime.title')}
                subtitle={t('tummyTime.subtitle')}
                label="Daily Routine"
                theme="orange"
                imageSrc="/images/care/tummy-time-lineart.png"
                direction="ltr"
            >
                <div className="space-y-6">
                    <TipList tips={tummyTimeTips} theme="orange" />
                    <ProTip
                        theme="orange"
                        title="Pro Tip"
                        content={t('tummyTime.proTip')}
                        icon={Lightbulb}
                    />
                </div>
            </SectionLayout>

            {/* 2. Sleep Positioning Section (Indigo) */}
            <SectionLayout
                title={t('sleep.title')}
                subtitle={t('sleep.subtitle')}
                label="Safety First"
                theme="indigo"
                imageSrc="/images/care/sleep-position-lineart.png"
                direction="rtl"
            >
                <div className="space-y-6">
                    <TipList tips={sleepTips} theme="indigo" />
                    <ProTip
                        theme="rose" // Warning typically red/rose
                        title="Medical Warning"
                        content={t('sleep.warning')}
                        icon={AlertTriangle}
                    />
                </div>
            </SectionLayout>

            {/* 3. Feeding Section (Teal) */}
            <SectionLayout
                title={t('feeding.title')}
                subtitle={t('feeding.subtitle')}
                label="Nourishment"
                theme="teal"
                imageSrc="/images/care/feeding-lineart.png"
                direction="ltr"
            >
                <div className="space-y-6">
                    <TipList tips={feedingTips} theme="teal" />
                </div>
            </SectionLayout>

            {/* 4. Environment Section (Amber) */}
            <SectionLayout
                title={t('environment.title')}
                subtitle={t('environment.subtitle')}
                label="Curiosity"
                theme="amber"
                imageSrc="/images/care/environment-lineart.png"
                direction="rtl"
            >
                <div className="space-y-6">
                    <TipList tips={envTips} theme="amber" />
                </div>
            </SectionLayout>

            {/* 5. Mattress Section (Rose) */}
            <SectionLayout
                title={t('mattress.title')}
                subtitle={t('mattress.subtitle')}
                label="Support"
                theme="rose"
                imageSrc="/images/care/mattress-lineart-warm.png"
                direction="ltr"
            >
                <div className="space-y-6">
                    <TipList tips={mattressTips} theme="rose" />
                </div>
            </SectionLayout>
        </div>
    )
}

// --- Sub Components ---

type ThemeColor = 'orange' | 'indigo' | 'teal' | 'amber' | 'rose'

function SectionLayout({
    children, title, subtitle, label, theme, imageSrc, direction = 'ltr'
}: {
    children: React.ReactNode
    title: string
    subtitle: string
    label: string
    theme: ThemeColor
    imageSrc: string
    direction?: 'ltr' | 'rtl'
}) {
    const colors = {
        orange: { labelBg: 'bg-orange-100 dark:bg-orange-900/30', labelText: 'text-orange-600 dark:text-orange-400', imgBg: 'bg-orange-50/50 dark:bg-orange-900/10' },
        indigo: { labelBg: 'bg-indigo-100 dark:bg-indigo-900/30', labelText: 'text-indigo-600 dark:text-indigo-400', imgBg: 'bg-indigo-50/50 dark:bg-indigo-900/10' },
        teal: { labelBg: 'bg-teal-100 dark:bg-teal-900/30', labelText: 'text-teal-600 dark:text-teal-400', imgBg: 'bg-teal-50/50 dark:bg-teal-900/10' },
        amber: { labelBg: 'bg-amber-100 dark:bg-amber-900/30', labelText: 'text-amber-600 dark:text-amber-400', imgBg: 'bg-amber-50/50 dark:bg-amber-900/10' },
        rose: { labelBg: 'bg-rose-100 dark:bg-rose-900/30', labelText: 'text-rose-600 dark:text-rose-400', imgBg: 'bg-rose-50/50 dark:bg-rose-900/10' },
    }[theme]

    return (
        <div className={clsx("flex flex-col lg:flex-row gap-12 lg:gap-16 xl:gap-24 items-center", direction === 'rtl' ? 'lg:flex-row-reverse' : '')}>
            {/* Visual Side */}
            <div className="w-full lg:w-1/2">
                <div className="relative aspect-[4/3] flex items-center justify-center p-6">
                    {/* Organic Shape Background */}
                    <div className={clsx("absolute inset-0 rounded-[4rem] rotate-[-2deg] scale-95 transition-transform duration-700 hover:rotate-0 hover:scale-100", colors.imgBg)} />
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
                    <span className={clsx("inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest", colors.labelBg, colors.labelText)}>
                        {label}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif font-medium text-gray-900 dark:text-gray-100 leading-tight">
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

function TipList({ tips, theme }: { tips: string[], theme: ThemeColor }) {
    const styles = {
        orange: {
            badge: 'bg-orange-100 text-orange-600 group-hover:bg-orange-500 group-hover:text-white',
            container: 'hover:bg-orange-50 dark:hover:bg-orange-900/20'
        },
        indigo: {
            badge: 'bg-indigo-100 text-indigo-600 group-hover:bg-indigo-500 group-hover:text-white',
            container: 'hover:bg-indigo-50 dark:hover:bg-indigo-900/20'
        },
        teal: {
            badge: 'bg-teal-100 text-teal-600 group-hover:bg-teal-500 group-hover:text-white',
            container: 'hover:bg-teal-50 dark:hover:bg-teal-900/20'
        },
        amber: {
            badge: 'bg-amber-100 text-amber-600 group-hover:bg-amber-500 group-hover:text-white',
            container: 'hover:bg-amber-50 dark:hover:bg-amber-900/20'
        },
        rose: {
            badge: 'bg-rose-100 text-rose-600 group-hover:bg-rose-500 group-hover:text-white',
            container: 'hover:bg-rose-50 dark:hover:bg-rose-900/20'
        }
    }[theme]

    return (
        <div className="grid gap-3">
            {tips.map((tip, i) => (
                <div key={i} className={clsx(
                    "group flex items-start gap-4 p-4 -mx-4 rounded-xl transition-all duration-300 border border-transparent",
                    styles.container
                )}>
                    <span className={clsx(
                        "flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold shrink-0 mt-0.5 transition-colors",
                        styles.badge
                    )}>
                        {i + 1}
                    </span>
                    <p className="text-gray-600 dark:text-gray-300 text-lg font-light leading-relaxed">
                        {tip}
                    </p>
                </div>
            ))}
        </div>
    )
}

function ProTip({ theme, title, content, icon: Icon }: { theme: ThemeColor, title: string, content: string, icon: LucideIcon }) {
    const colors = {
        orange: { bg: 'bg-[#FFF8F4] dark:bg-orange-900/10', border: 'border-orange-100 dark:border-orange-800/30', icon: 'text-orange-500', title: 'text-orange-400' },
        indigo: { bg: 'bg-[#F5F7FA] dark:bg-indigo-900/10', border: 'border-indigo-100 dark:border-indigo-800/30', icon: 'text-indigo-500', title: 'text-indigo-400' },
        teal: { bg: 'bg-teal-50 dark:bg-teal-900/10', border: 'border-teal-100 dark:border-teal-800/30', icon: 'text-teal-500', title: 'text-teal-400' },
        amber: { bg: 'bg-amber-50 dark:bg-amber-900/10', border: 'border-amber-100 dark:border-amber-800/30', icon: 'text-amber-500', title: 'text-amber-400' },
        rose: { bg: 'bg-rose-50 dark:bg-rose-900/10', border: 'border-rose-100 dark:border-rose-800/30', icon: 'text-rose-500', title: 'text-rose-500' },
    }[theme]

    return (
        <div className={clsx("mt-8 p-6 rounded-2xl border", colors.bg, colors.border)}>
            <div className="flex gap-4">
                <div className="shrink-0 mt-1">
                    <Icon className={clsx("w-5 h-5", colors.icon)} strokeWidth={2.5} />
                </div>
                <div className="space-y-1">
                    <span className={clsx("block text-xs font-bold uppercase tracking-widest", colors.title)}>{title}</span>
                    <p className="text-gray-700 dark:text-gray-300 font-serif italic leading-relaxed">
                        &ldquo;{content}&rdquo;
                    </p>
                </div>
            </div>
        </div>
    )
}
