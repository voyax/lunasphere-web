'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
    HelpCircle,
    Stethoscope,
    Baby,
    AlertTriangle,
    Info,
    EyeOff
} from 'lucide-react'

// ... Keep interfaces ...
interface HeadShapeType {
    id: string
    translationKey: string
    severity: 'normal' | 'common' | 'moderate' | 'rare'
    category: 'normal' | 'positional' | 'pathological'
    color: string
    images: {
        main: string
        alt1?: string
        alt2?: string
    }
    imageLabels?: string[]
    sensitiveImages?: boolean
}

export function HeadShapeTypesSection() {
    const t = useTranslations('learn.headTypes')
    const tClass = useTranslations('classification')
    const [activeTab, setActiveTab] = useState('normal')

    const headTypes: HeadShapeType[] = [
        {
            id: 'normal',
            translationKey: 'normal',
            severity: 'normal',
            category: 'normal',
            color: 'emerald',
            images: {
                main: '/images/head-examples/normal_head_shape_0-3months.webp',
                alt1: '/images/head-examples/normal_head_shape_6months.webp',
                alt2: '/images/head-examples/normal_head_shape_9months.webp',
            },
            imageLabels: [t('ages.0to3'), t('ages.6'), t('ages.9')],
        },
        // ... (keep other types same)
        {
            id: 'plagiocephaly',
            translationKey: 'plagiocephaly',
            severity: 'common',
            category: 'positional',
            color: 'amber',
            images: {
                main: '/images/head-examples/plagiocephaly_top_view.png',
                alt1: '/images/head-examples/plagiocephaly_front_view.png',
                alt2: '/images/head-examples/plagiocephaly_profile_view.png',
            },
        },
        {
            id: 'brachycephaly',
            translationKey: 'brachycephaly',
            severity: 'common',
            category: 'positional',
            color: 'orange',
            images: {
                main: '/images/head-examples/brachycephaly_top_view.png',
                alt1: '/images/head-examples/brachycephaly_front_view.png',
                alt2: '/images/head-examples/brachycephaly_profile_view.png',
            },
        },
        {
            id: 'dolichocephaly',
            translationKey: 'dolichocephaly',
            severity: 'moderate',
            category: 'positional',
            color: 'blue',
            images: {
                main: '/images/head-examples/dolichocephaly_top_view.png',
                alt1: '/images/head-examples/dolichocephaly_front_view.png',
                alt2: '/images/head-examples/dolichocephaly_profile_view.png',
            },
        },
        {
            id: 'scaphocephaly',
            translationKey: 'scaphocephaly',
            severity: 'rare',
            category: 'pathological',
            color: 'rose',
            images: {
                main: '/images/head-examples/scaphocephaly_3D_1.png',
                alt1: '/images/head-examples/scaphocephaly_3D_2.png',
                alt2: '/images/head-examples/scaphocephaly_3D_3.png',
            },
            imageLabels: [t('views3D.1'), t('views3D.2'), t('views3D.3')],
            sensitiveImages: true,
        },
    ]

    return (
        <section id='headtypes' className='py-24 px-4 md:px-6 relative'>
            <div className='max-w-7xl mx-auto'>
                {/* Header */}
                <div className='text-center mb-16'>
                    <h2 className='text-3xl md:text-5xl font-serif font-medium text-gray-900 dark:text-gray-100 mb-6'>
                        {t('title')}
                    </h2>
                    <p className='text-xl text-gray-500 font-light max-w-2xl mx-auto'>
                        {t('subtitle')}
                    </p>
                </div>

                {/* Segmented Control */}
                <div className='flex justify-center mb-16'>
                    <div className='bg-gray-100 dark:bg-gray-800/50 p-1.5 rounded-full inline-flex flex-wrap justify-center gap-1 shadow-inner'>
                        {headTypes.map((type) => {
                            const isActive = activeTab === type.id
                            return (
                                <button
                                    key={type.id}
                                    onClick={() => setActiveTab(type.id)}
                                    className={`
                                        relative px-6 py-2.5 rounded-full text-sm font-medium transition-colors duration-200 z-10
                                        ${isActive ? 'text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}
                                    `}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute inset-0 bg-white dark:bg-gray-700 rounded-full shadow-sm -z-10"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    {tClass(`${type.translationKey}.name`)}
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Content Display: No fixed height container to allow natural growth, but use a grid to stack them */}
                <div className="relative">
                    {headTypes.map((type) => {
                        const isActive = activeTab === type.id
                        return (
                            <HeadShapeCard
                                key={type.id}
                                type={type}
                                isActive={isActive}
                                t={t}
                                tClass={tClass}
                            />
                        )
                    })}
                </div>

            </div>
        </section>
    )
}

function HeadShapeCard({
    type,
    isActive,
    t,
    tClass
}: {
    type: HeadShapeType,
    isActive: boolean,
    t: any,
    tClass: any
}) {
    const imagesList = [type.images.main, type.images.alt1, type.images.alt2].filter(Boolean) as string[]
    const defaultLabels = [t('views.top'), t('views.front'), t('views.profile')]
    const labels = type.imageLabels || defaultLabels

    const [selectedImgIndex, setSelectedImgIndex] = useState(0)
    const [revealed, setRevealed] = useState(false)

    return (
        <div
            className={`
                w-full transition-all duration-500 ease-out
                ${isActive
                    ? 'relative opacity-100 z-10 translate-x-0'
                    : 'hidden opacity-0 z-0 translate-x-8'} 
            `}
        // Note: 'hidden' effectively removes it from flow, causing layout shift if heights differ.
        // If we want smooth crossfade of height, we'd need ResizeObserver.
        // For now, let's accept slight height jump or ensure content is similar.
        >
            <div className="bg-white dark:bg-gray-900 rounded-[3rem] overflow-hidden shadow-2xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 flex flex-col lg:flex-row">

                {/* Left: Pure Visuals (No Text) */}
                <div className="lg:w-5/12 bg-gray-50 dark:bg-gray-800/50 p-8 lg:p-12 flex flex-col items-center justify-center relative overflow-hidden group min-h-[400px]">
                    {/* Ambient Light */}
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-${type.color}-500/10 blur-[80px] rounded-full transition-colors duration-500`} />

                    {/* Main Image */}
                    <div className="relative w-full aspect-square flex items-center justify-center z-10">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedImgIndex}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                                className="relative w-full h-full flex items-center justify-center"
                            >
                                <Image
                                    src={imagesList[selectedImgIndex]}
                                    alt={tClass(`${type.translationKey}.name`)}
                                    fill
                                    className="object-contain drop-shadow-xl"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority={isActive}
                                />
                                {type.sensitiveImages && (
                                    <div
                                        className={`absolute inset-0 z-20 bg-stone-100 dark:bg-gray-800 flex items-center justify-center transition-opacity duration-500 ${revealed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                                    >
                                        <button
                                            onClick={() => setRevealed(true)}
                                            className="flex flex-col items-center gap-4 px-8 py-6 rounded-2xl bg-white dark:bg-gray-700 shadow-sm border border-stone-200/60 dark:border-gray-600 cursor-pointer hover:shadow-md transition-shadow"
                                        >
                                            <EyeOff className="w-8 h-8 text-stone-400 dark:text-stone-500" />
                                            <div className="text-center">
                                                <p className="text-[15px] font-medium text-stone-700 dark:text-stone-200">{t('sensitiveImage.warning')}</p>
                                                <p className="text-[13px] text-stone-400 dark:text-stone-500 mt-1.5">{t('sensitiveImage.clickToReveal')}</p>
                                            </div>
                                        </button>
                                    </div>
                                )}
                                <div className="absolute bottom-4 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium">
                                    {labels[selectedImgIndex]}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Thumbnails */}
                    {imagesList.length > 1 && (
                        <div className="flex gap-3 mt-8 relative z-10">
                            {imagesList.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedImgIndex(idx)}
                                    className={`
                                        w-14 h-14 rounded-xl border-2 overflow-hidden shadow-sm transition-all duration-200 bg-white
                                        ${selectedImgIndex === idx
                                            ? `border-${type.color}-500 scale-110 ring-2 ring-${type.color}-200 dark:ring-${type.color}-900`
                                            : 'border-white dark:border-gray-700 opacity-70 hover:opacity-100 hover:scale-105'}
                                    `}
                                >
                                    <Image src={img} alt="View" width={56} height={56} className="w-full h-full object-contain p-1" />
                                    {type.sensitiveImages && !revealed && (
                                        <div className="absolute inset-0 bg-stone-100 dark:bg-gray-800 flex items-center justify-center rounded-xl">
                                            <EyeOff className="w-4 h-4 text-stone-300 dark:text-stone-600" />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right: All Content (Text Moved Here) */}
                <div className="lg:w-7/12 p-8 lg:p-12 flex flex-col justify-start"> {/* Removed justify-between to fix whitespace */}

                    {/* 1. Header Info */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-${type.color}-100 dark:bg-${type.color}-900/30 text-${type.color}-700 dark:text-${type.color}-300`}>
                                {tClass(`severity.${type.severity}`)}
                            </span>
                            {/* Medical Warning Badge if needed */}
                            {type.category === 'pathological' && (
                                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-100 text-rose-700 flex items-center gap-1">
                                    <AlertTriangle className="w-3 h-3" /> {tClass('category.medicalAttention')}
                                </span>
                            )}
                        </div>
                        <h3 className="text-4xl font-serif text-gray-900 dark:text-white mb-4">
                            {tClass(`${type.translationKey}.name`)}
                        </h3>
                        <div className="h-1 w-20 bg-gray-100 dark:bg-gray-800 rounded-full" />
                    </div>

                    {/* 2. Description (Now closer to title) */}
                    <div className="mb-10">
                        {/* <h4 className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">
                            <Info className="w-4 h-4" /> Description
                        </h4> */}
                        {/* Replaced implicit label with just clean text */}
                        <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-light">
                            {tClass(`${type.translationKey}.description`)}
                        </p>
                    </div>

                    {/* 3. Details Grid */}
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div className="bg-gray-50 dark:bg-gray-800/30 p-5 rounded-2xl">
                            <h4 className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-widest mb-3">
                                <HelpCircle className="w-4 h-4 text-orange-500" /> {t('labels.causes')}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                                {tClass(`${type.translationKey}.causes`)}
                            </p>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-800/30 p-5 rounded-2xl">
                            <h4 className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-widest mb-3">
                                <Stethoscope className="w-4 h-4 text-emerald-500" /> {t('labels.correction')}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                                {tClass(`${type.translationKey}.correction`)}
                            </p>
                        </div>
                    </div>

                    {/* 4. Tips (Bottom) */}
                    {(type.category === 'positional' || type.category === 'pathological') && (
                        <div className={`mt-auto p-5 rounded-2xl flex items-start gap-4 ${type.category === 'pathological'
                                ? 'bg-rose-50 dark:bg-rose-900/10 text-rose-800 dark:text-rose-300'
                                : 'bg-indigo-50 dark:bg-indigo-900/10 text-indigo-800 dark:text-indigo-300'
                            }`}>
                            {type.category === 'pathological' ? <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" /> : <Baby className="w-5 h-5 shrink-0 mt-0.5" />}
                            <div>
                                <h5 className="font-bold text-sm mb-1 uppercase tracking-wide">
                                    {type.category === 'pathological' ? tClass('medical_warning_title') : tClass('reminder_title')}
                                </h5>
                                <p className="text-sm opacity-90 leading-relaxed">
                                    {type.category === 'pathological' ? tClass('medical_warning_content') : tClass('reminder_content')}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}
