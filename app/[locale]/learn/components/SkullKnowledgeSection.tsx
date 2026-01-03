'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
// Note: Removed Plus icon import as it's no longer used

interface KnowledgeItem {
    id: string
    titleKey: string
    descKey: string
    x: number
    y: number
}

export function SkullKnowledgeSection() {
    const t = useTranslations('learn.skull')
    const [activeItem, setActiveItem] = useState<string | null>('structure')

    const items: KnowledgeItem[] = [
        { id: 'fontanelles', titleKey: 'fontanelles.title', descKey: 'fontanelles.desc', x: 50, y: 30 },
        { id: 'structure', titleKey: 'structure.title', descKey: 'structure.desc', x: 80, y: 50 },
        { id: 'growth', titleKey: 'growth.title', descKey: 'growth.desc', x: 20, y: 60 },
        { id: 'plasticity', titleKey: 'plasticity.title', descKey: 'plasticity.desc', x: 50, y: 80 },
    ]

    return (
        <div className="w-full">
            <div className="flex flex-col md:flex-row gap-12 lg:gap-12 xl:gap-24 items-center">

                {/* Left: Interactive Image */}
                <div className="w-full md:w-1/2 relative bg-white dark:bg-gray-800 rounded-[3rem] p-8 lg:p-12 shadow-xl shadow-gray-200/50 dark:shadow-none">
                    <div className="aspect-square relative">
                        <Image
                            src="/images/head-development.gif"
                            alt="Skull Anatomy"
                            fill
                            className="object-contain opacity-90"
                        />

                        {items.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveItem(activeItem === item.id ? null : item.id)}
                                style={{ left: `${item.x}%`, top: `${item.y}%` }}
                                className="absolute w-8 h-8 -ml-4 -mt-4 flex items-center justify-center group focus:outline-none"
                            >
                                {/* 极简的交互点设计：外圈光晕 + 内圈实心点 */}
                                <span className={`
                    absolute inline-flex h-full w-full rounded-full opacity-40 transition-colors duration-500
                    ${activeItem === item.id ? 'bg-orange-400 animate-ping' : 'bg-gray-400 group-hover:bg-orange-300'}
                 `}></span>
                                <span className={`
                    relative inline-flex rounded-full h-3 w-3 transition-all duration-500
                    ${activeItem === item.id ? 'bg-gray-900 dark:bg-white scale-125' : 'bg-white dark:bg-gray-300 shadow-sm group-hover:scale-110'}
                 `}></span>
                            </button>
                        ))}
                    </div>

                    <div className="absolute bottom-8 left-0 right-0 text-center">
                        <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">Interactive Anatomy</p>
                    </div>
                </div>

                {/* Right: Clean Accordion (No Icons) */}
                <div className="w-full md:w-1/2 space-y-8">
                    <div className="space-y-2">
                        <span className="text-orange-500 font-bold tracking-wider text-sm uppercase">{t('subtitle')}</span>
                        <h2 className="text-3xl md:text-5xl font-serif font-medium text-gray-900 dark:text-gray-100">
                            {t('title')}
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {items.map((item) => {
                            const isOpen = activeItem === item.id

                            return (
                                <motion.div
                                    layout
                                    key={item.id}
                                    initial={false}
                                    animate={{
                                        backgroundColor: isOpen ? (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'rgba(31, 41, 55, 1)' : 'rgba(255, 255, 255, 1)') : 'rgba(0,0,0,0)',
                                        borderColor: isOpen ? (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'rgba(255, 255, 255, 1)' : 'rgba(17, 24, 39, 1)') : 'transparent'
                                    }}
                                    className={`
                     w-full rounded-2xl border-l-4 overflow-hidden relative
                     ${isOpen ? 'shadow-lg z-10' : 'z-0 hover:bg-gray-50 dark:hover:bg-gray-800/30'}
                   `}
                                    transition={{ layout: { type: "spring", stiffness: 90, damping: 14 } }}
                                >
                                    <motion.button
                                        layout="position"
                                        onClick={() => setActiveItem(isOpen ? null : item.id)}
                                        className="w-full text-left p-6 block group"
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <span className={`text-lg font-bold transition-colors duration-300 ${isOpen ? 'text-gray-900 dark:text-white' : 'text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300'}`}>
                                            {t(item.titleKey)}
                                        </span>
                                    </motion.button>

                                    <AnimatePresence initial={false}>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{
                                                    height: { type: "spring", stiffness: 90, damping: 14 },
                                                    opacity: { duration: 0.3, delay: 0.1 }
                                                }}
                                            >
                                                <div className="px-6 pb-6 text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                                                    {t(item.descKey)}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>

            </div>
        </div>
    )
}
