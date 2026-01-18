'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Baby, Calendar, Brain, Fingerprint, Star, ArrowRight } from 'lucide-react'

interface TimelineStage {
    id: string
    icon: React.ReactNode
    months: string
    titleKey: string
    highlightsKey: string
    tipsKey: string
    color: string
}

export function DevelopmentTimeline() {
    const t = useTranslations('learn.timeline')
    const [activeStage, setActiveStage] = useState<string>('0-3')

    const stages: TimelineStage[] = [
        {
            id: '0-3',
            icon: <Baby className='w-6 h-6' />,
            months: '0-3',
            titleKey: 'stage1.title',
            highlightsKey: 'stage1.highlights',
            tipsKey: 'stage1.tips',
            color: 'bg-orange-500',
        },
        {
            id: '3-6',
            icon: <Calendar className='w-6 h-6' />,
            months: '3-6',
            titleKey: 'stage2.title',
            highlightsKey: 'stage2.highlights',
            tipsKey: 'stage2.tips',
            color: 'bg-rose-500',
        },
        {
            id: '6-12',
            icon: <Brain className='w-6 h-6' />,
            months: '6-12',
            titleKey: 'stage3.title',
            highlightsKey: 'stage3.highlights',
            tipsKey: 'stage3.tips',
            color: 'bg-purple-500',
        },
        {
            id: '12-18',
            icon: <Fingerprint className='w-6 h-6' />,
            months: '12-18',
            titleKey: 'stage4.title',
            highlightsKey: 'stage4.highlights',
            tipsKey: 'stage4.tips',
            color: 'bg-emerald-500',
        },
    ]

    return (
        <div className="w-full">
            {/* Header */}
            <div className='text-center mb-16'>
                <h2 className='text-3xl md:text-5xl font-serif font-medium text-gray-900 dark:text-gray-100 mb-4'>
                    {t('title')}
                </h2>
                <p className='text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light'>
                    {t('subtitle')}
                </p>
            </div>

            {/* Main Container */}
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-12 xl:gap-24 items-start">

                {/* Left: Navigation */}
                <div className="w-full lg:w-1/3 relative">
                    <div className="absolute left-8 top-4 bottom-4 w-px bg-gray-200 dark:bg-gray-800 hidden lg:block" />
                    
                    {/* Mobile Scroll Hint Overlay */}
                    <div className="absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-white dark:from-gray-900 via-white/80 to-transparent pointer-events-none lg:hidden z-20" />

                    <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 px-4 lg:px-0 scrollbar-hide relative z-10">
                        {stages.map((stage) => {
                            const isActive = activeStage === stage.id
                            return (
                                <button
                                    key={stage.id}
                                    onClick={() => setActiveStage(stage.id)}
                                    className={`
                    relative flex items-center gap-6 p-4 rounded-xl transition-all duration-300 min-w-[200px] lg:min-w-0 text-left group
                    ${isActive ? 'bg-white dark:bg-gray-800 shadow-md ring-1 ring-black/5 lg:ring-0 lg:shadow-none lg:bg-transparent' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'}
                  `}
                                >
                                    {/* Dot Indicator */}
                                    <div className={`
                    w-14 h-14 rounded-full flex items-center justify-center shrink-0 transition-all duration-500 z-10 border-4 border-white dark:border-gray-900
                    ${isActive ? `${stage.color} text-white scale-110 shadow-lg shadow-orange-100 dark:shadow-none` : 'bg-gray-100 dark:bg-gray-800 text-gray-400 group-hover:bg-gray-200'}
                  `}>
                                        {stage.icon}
                                    </div>

                                    {/* Text */}
                                    <div>
                                        <span className={`block text-xl font-serif font-medium transition-colors ${isActive ? 'text-gray-900 dark:text-gray-100' : 'text-gray-400'}`}>
                                            {stage.months}
                                        </span>
                                        <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
                                            {t('months')}
                                        </span>
                                    </div>

                                    {/* Arrow Indicator */}
                                    <div className={`
                      hidden lg:block absolute right-0 transition-all duration-500 ease-in-out
                      ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}
                  `}>
                                        <ArrowRight className="w-5 h-5 text-gray-900 dark:text-white" />
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Right: Content Card with High Performance Crossfade */}
                <div className="w-full lg:w-2/3 relative min-h-[500px]">
                    {stages.map((stage) => {
                        const isActive = activeStage === stage.id
                        return (
                            <div
                                key={stage.id}
                                className={`
                            absolute top-0 left-0 w-full bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl shadow-orange-50/50 dark:shadow-none border border-gray-100 dark:border-gray-700
                            transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)
                            ${isActive
                                        ? 'opacity-100 scale-100 translate-y-0 z-10 visible' // Active: 完整显示
                                        : 'opacity-0 scale-95 translate-y-4 z-0 invisible'   // Inactive: 缩小+下沉+消隐
                                    }
                        `}
                                // 使用 visible/invisible 确保读屏软件和 focus 不能访问隐藏的元素
                                style={{ transitionProperty: 'opacity, transform, visibility' }}
                            >
                                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-10">
                                    <div className={`self-start px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-widest ${stage.color} shadow-sm`}>
                                        Milestone
                                    </div>
                                    <h3 className="text-3xl font-serif font-medium text-gray-900 dark:text-white leading-tight">
                                        {t(stage.titleKey)}
                                    </h3>
                                </div>

                                <div className="space-y-12">
                                    {/* Highlights Section */}
                                    <div>
                                        <h4 className="flex items-center gap-3 text-sm font-bold text-gray-900 dark:text-gray-100 mb-4 uppercase tracking-wider">
                                            <div className="p-1.5 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                                                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                                            </div>
                                            {t('highlightsLabel')}
                                        </h4>
                                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed px-6 border-l-2 border-orange-100 dark:border-gray-700">
                                            {t(stage.highlightsKey)}
                                        </p>
                                    </div>

                                    {/* Tips Section */}
                                    <div className="bg-orange-50/50 dark:bg-gray-900/50 rounded-2xl p-6 md:p-8 border border-orange-100/50 dark:border-gray-800">
                                        <h4 className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest mb-3">
                                            {t('tipsLabel')}
                                        </h4>
                                        <p className="text-gray-800 dark:text-gray-200 font-medium leading-relaxed italic text-lg">
                                            "{t(stage.tipsKey)}"
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>
        </div>
    )
}
