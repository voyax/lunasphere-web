'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import {
    ChevronDown,
    CheckCircle2,
    XCircle,
    AlertTriangle,
    Clock,
    ArrowRight,
    EyeOff
} from 'lucide-react'

// ============================================
// 高亮组件 - 用于标注关键内容
// ============================================
function Highlight({ children, variant = 'default' }: {
    children: React.ReactNode
    variant?: 'default' | 'warning' | 'success'
}) {
    const styles = {
        default: 'bg-amber-100 dark:bg-amber-800/30 text-amber-900 dark:text-amber-100',
        warning: 'bg-rose-100 dark:bg-rose-800/30 text-rose-900 dark:text-rose-100',
        success: 'bg-emerald-100 dark:bg-emerald-800/30 text-emerald-900 dark:text-emerald-100',
    }
    return (
        <mark className={`${styles[variant]} px-1 py-0.5 rounded font-medium not-italic`}>
            {children}
        </mark>
    )
}

// ============================================
// 参考文献组件 - 悬停显示来源，可点击跳转
// ============================================
interface ReferenceSource {
    name: string
    url: string
    summary: string
}

function Reference({ children, source, viewSourceText }: {
    children: React.ReactNode
    source: ReferenceSource
    viewSourceText: string
}) {
    return (
        <span className="relative inline-block group">
            <span className="border-b border-dashed border-stone-400 dark:border-stone-500 cursor-help">
                {children}
            </span>
            <span className="
                absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                w-72 p-3 rounded-lg shadow-lg
                bg-white dark:bg-stone-800
                border border-stone-200 dark:border-stone-700
                opacity-0 invisible group-hover:opacity-100 group-hover:visible
                transition-all duration-200 z-[100]
                text-left
            ">
                <span className="block text-[13px] font-medium text-stone-800 dark:text-stone-100 mb-1">
                    {source.name}
                </span>
                <span className="block text-[12px] text-stone-500 dark:text-stone-400 leading-[1.6] mb-2">
                    {source.summary}
                </span>
                <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[12px] text-blue-600 dark:text-blue-400 hover:underline"
                >
                    {viewSourceText}
                    <ArrowRight className="w-3 h-3" />
                </a>
                <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-8 border-transparent border-t-white dark:border-t-stone-800" />
            </span>
        </span>
    )
}

// 预定义的参考来源
// 参考来源的静态数据（URL不需要翻译）
const REFERENCE_SOURCES = {
    aapTummyTime: {
        name: 'AAP HealthyChildren.org',
        url: 'https://www.healthychildren.org/English/ages-stages/baby/sleep/Pages/back-to-sleep-tummy-to-play.aspx',
    },
    aapSafeSleep: {
        name: 'AAP Safe Sleep Guidelines 2022',
        url: 'https://publications.aap.org/pediatrics/article/150/1/e2022057990/188304/',
    },
    aapNoPillow: {
        name: 'AAP Evidence Base 2022',
        url: 'https://publications.aap.org/pediatrics/article/150/1/e2022057991/188305/',
    },
    fontanelleClosure: {
        name: 'NCBI StatPearls',
        url: 'https://www.ncbi.nlm.nih.gov/books/NBK542197/',
    },
    plagiocephalyTiming: {
        name: 'Cleveland Clinic',
        url: 'https://my.clevelandclinic.org/health/diseases/10691-plagiocephaly-flat-head-syndrome',
    },
    helmetTherapy: {
        name: 'AANS',
        url: 'https://www.aans.org/patients/conditions-treatments/positional-plagiocephaly/',
    },
    cranialGrowth: {
        name: 'PMC Research',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7206465/',
    },
    feedingPositions: {
        name: "Children's Hospital of Atlanta",
        url: 'https://www.choa.org/parent-resources/orthopedics/how-to-prevent-a-flat-head',
    },
    repositioning: {
        name: 'Technology in Motion',
        url: 'https://www.technologyinmotion.com/community-and-resources/repositioning-guide',
    },
    deviceTime: {
        name: "Children's Hospital of Richmond",
        url: 'https://www.chrichmond.org/blog/flat-head-position-for-prevention',
    },
} as const

// 获取带翻译的参考来源
function useReferences() {
    const t = useTranslations('learn.references')
    const tUI = useTranslations('learn.ui')

    const getRef = (key: keyof typeof REFERENCE_SOURCES): ReferenceSource => ({
        ...REFERENCE_SOURCES[key],
        summary: t(key),
    })

    return {
        refs: {
            aapTummyTime: getRef('aapTummyTime'),
            aapSafeSleep: getRef('aapSafeSleep'),
            aapNoPillow: getRef('aapNoPillow'),
            fontanelleClosure: getRef('fontanelleClosure'),
            plagiocephalyTiming: getRef('plagiocephalyTiming'),
            helmetTherapy: getRef('helmetTherapy'),
            cranialGrowth: getRef('cranialGrowth'),
            feedingPositions: getRef('feedingPositions'),
            repositioning: getRef('repositioning'),
            deviceTime: getRef('deviceTime'),
        },
        viewSourceText: tUI('viewSource'),
    }
}

// ============================================
// 头型图鉴组件
// ============================================
interface HeadTypeImage {
    src: string
    label: string
}

interface HeadType {
    id: string
    translationKey: string
    severity: 'normal' | 'common' | 'moderate' | 'rare'
    images: HeadTypeImage[]
    sensitiveImages?: boolean
}

function HeadTypeSelector({
    type,
    t,
    isSelected,
    onSelect
}: {
    type: HeadType
    t: any
    isSelected: boolean
    onSelect: () => void
}) {
    return (
        <button
            onClick={onSelect}
            className={`
                group flex flex-col items-center p-2 rounded-lg transition-all
                ${isSelected
                    ? 'bg-white dark:bg-gray-800 shadow-sm'
                    : 'hover:bg-white/60 dark:hover:bg-gray-800/60'
                }
            `}
        >
            <div className={`
                relative w-14 h-14 md:w-16 md:h-16 rounded-lg overflow-hidden mb-2 transition-all
                ${isSelected ? 'ring-2 ring-stone-400 dark:ring-stone-500 ring-offset-1' : 'opacity-60 group-hover:opacity-100'}
            `}>
                <Image
                    src={type.images[0].src}
                    alt={t(`${type.translationKey}.name`)}
                    fill
                    className="object-contain bg-stone-50 dark:bg-gray-900 p-1"
                />
                {type.sensitiveImages && (
                    <div className="absolute inset-0 bg-gradient-to-b from-rose-50 to-stone-100 dark:from-rose-950/40 dark:to-gray-800 flex items-center justify-center">
                        <EyeOff className="w-4 h-4 text-rose-300 dark:text-rose-400" />
                    </div>
                )}
            </div>
            <span className={`text-[13px] ${isSelected ? 'text-stone-800 dark:text-stone-200' : 'text-stone-400 dark:text-stone-500'}`}>
                {t(`${type.translationKey}.name`)}
            </span>
        </button>
    )
}

function HeadTypeDetail({ type, t }: { type: HeadType; t: any }) {
    const tClass = useTranslations('classification')
    const tLabels = useTranslations('learn.headTypes.labels')
    const tSensitive = useTranslations('learn.headTypes.sensitiveImage')
    const [activeImageIndex, setActiveImageIndex] = useState(0)
    const [revealed, setRevealed] = useState(false)

    const severityColors: Record<string, string> = {
        normal: 'text-emerald-600 dark:text-emerald-400',
        common: 'text-amber-600 dark:text-amber-400',
        moderate: 'text-blue-600 dark:text-blue-400',
        rare: 'text-rose-600 dark:text-rose-400',
    }

    return (
        <div className="mt-4 bg-white dark:bg-gray-800/80 rounded-xl border border-stone-100 dark:border-gray-700/50 overflow-hidden">
            <div className="flex flex-col md:flex-row">
                {/* 图片区域 */}
                <div className="md:w-[280px] lg:w-[320px] shrink-0 p-4 bg-stone-50 dark:bg-gray-900/30">
                    <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-white dark:bg-gray-800">
                        <Image
                            src={type.images[activeImageIndex].src}
                            alt={t(`${type.translationKey}.name`)}
                            fill
                            className="object-contain p-3"
                        />
                        {type.sensitiveImages && (
                            <button
                                onClick={() => setRevealed(true)}
                                className={`absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-gradient-to-b from-rose-50 to-stone-100 dark:from-rose-950/30 dark:to-gray-800 transition-opacity duration-500 ${revealed ? 'opacity-0 pointer-events-none' : 'opacity-100 cursor-pointer'}`}
                            >
                                <div className="w-12 h-12 rounded-full bg-white/80 dark:bg-gray-700/80 flex items-center justify-center shadow-sm">
                                    <EyeOff className="w-6 h-6 text-rose-400 dark:text-rose-300" />
                                </div>
                                <span className="text-[13px] font-medium text-stone-600 dark:text-stone-300">
                                    {tSensitive('clickToReveal')}
                                </span>
                                <span className="text-[11px] text-stone-400">
                                    {tSensitive('warning')}
                                </span>
                            </button>
                        )}
                    </div>
                    {type.images.length > 1 && (
                        <div className="flex justify-center gap-2 mt-4">
                            {type.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImageIndex(idx)}
                                    className={`
                                        px-3 py-1.5 rounded-full text-[13px] transition-all
                                        ${activeImageIndex === idx
                                            ? 'bg-stone-800 dark:bg-white text-white dark:text-stone-900'
                                            : 'bg-white dark:bg-gray-800 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 border border-stone-200 dark:border-gray-700'
                                        }
                                    `}
                                >
                                    {img.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* 内容区域 */}
                <div className="flex-1 p-6">
                    {/* 标题 */}
                    <div className="flex items-baseline gap-3 mb-6">
                        <h3 className="text-[20px] font-semibold text-stone-800 dark:text-stone-100 leading-[1.3]">
                            {t(`${type.translationKey}.name`)}
                        </h3>
                        <span className={`text-[13px] ${severityColors[type.severity]}`}>
                            {tClass(`severity.${type.severity}`)}
                        </span>
                    </div>

                    {/* 内容 */}
                    <div className="space-y-6">
                        <div>
                            <h4 className="text-[13px] text-stone-400 dark:text-stone-500 mb-2">{tLabels('description')}</h4>
                            <p className="text-[15px] text-stone-800 dark:text-stone-200 leading-[1.8]">
                                {tClass(`${type.id}.description`)}
                            </p>
                        </div>
                        <div>
                            <h4 className="text-[13px] text-stone-400 dark:text-stone-500 mb-2">{tLabels('causes')}</h4>
                            <p className="text-[15px] text-stone-600 dark:text-stone-400 leading-[1.8]">
                                {tClass(`${type.id}.causes`)}
                            </p>
                        </div>
                        <div>
                            <h4 className="text-[13px] text-stone-400 dark:text-stone-500 mb-2">{tLabels('correction')}</h4>
                            <p className="text-[15px] text-stone-600 dark:text-stone-400 leading-[1.8]">
                                {tClass(`${type.id}.correction`)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function HeadShapeGallery() {
    const t = useTranslations('learn.headTypes')
    const tViews = useTranslations('learn.headTypes.views')
    const tAges = useTranslations('learn.headTypes.ages')
    const t3D = useTranslations('learn.headTypes.views3D')
    const [selectedId, setSelectedId] = useState<string>('normal')

    const headTypes: HeadType[] = [
        {
            id: 'normal',
            translationKey: 'normal',
            severity: 'normal',
            images: [
                { src: '/images/head-examples/normal_head_shape_0-3months.webp', label: tAges('0to3') },
                { src: '/images/head-examples/normal_head_shape_6months.webp', label: tAges('6') },
                { src: '/images/head-examples/normal_head_shape_9months.webp', label: tAges('9') },
            ],
        },
        {
            id: 'plagiocephaly',
            translationKey: 'plagiocephaly',
            severity: 'common',
            images: [
                { src: '/images/head-examples/plagiocephaly_top_view.png', label: tViews('top') },
                { src: '/images/head-examples/plagiocephaly_front_view.png', label: tViews('front') },
                { src: '/images/head-examples/plagiocephaly_profile_view.png', label: tViews('profile') },
            ],
        },
        {
            id: 'brachycephaly',
            translationKey: 'brachycephaly',
            severity: 'common',
            images: [
                { src: '/images/head-examples/brachycephaly_top_view.png', label: tViews('top') },
                { src: '/images/head-examples/brachycephaly_front_view.png', label: tViews('front') },
                { src: '/images/head-examples/brachycephaly_profile_view.png', label: tViews('profile') },
            ],
        },
        {
            id: 'dolichocephaly',
            translationKey: 'dolichocephaly',
            severity: 'moderate',
            images: [
                { src: '/images/head-examples/dolichocephaly_top_view.png', label: tViews('top') },
                { src: '/images/head-examples/dolichocephaly_front_view.png', label: tViews('front') },
                { src: '/images/head-examples/dolichocephaly_profile_view.png', label: tViews('profile') },
            ],
        },
        {
            id: 'scaphocephaly',
            translationKey: 'scaphocephaly',
            severity: 'rare',
            sensitiveImages: true,
            images: [
                { src: '/images/head-examples/scaphocephaly_3D_1.png', label: t3D('1') },
                { src: '/images/head-examples/scaphocephaly_3D_2.png', label: t3D('2') },
                { src: '/images/head-examples/scaphocephaly_3D_3.png', label: t3D('3') },
            ],
        },
    ]

    const selectedType = headTypes.find(type => type.id === selectedId) || headTypes[0]

    return (
        <section className="mb-16 pb-12 border-b border-stone-200 dark:border-gray-800">
            <div className="mb-6">
                <h2 className="text-[20px] font-semibold text-stone-800 dark:text-stone-100 leading-[1.3] mb-2">
                    {t('title')}
                </h2>
                <p className="text-[15px] text-stone-500 dark:text-stone-400 leading-[1.8]">
                    {t('subtitle')}
                </p>
            </div>

            <div className="flex gap-1 md:gap-2">
                {headTypes.map((type) => (
                    <HeadTypeSelector
                        key={type.id}
                        type={type}
                        t={t}
                        isSelected={selectedId === type.id}
                        onSelect={() => setSelectedId(type.id)}
                    />
                ))}
            </div>

            <HeadTypeDetail type={selectedType} t={t} />
        </section>
    )
}

// ============================================
// 文章组件
// ============================================
interface Article {
    id: string
    category: string
    readTime: string
    title: string
    subtitle: string
    image?: string
    content: React.ReactNode
}

function ArticleCard({
    article,
    isExpanded,
    onToggle,
}: {
    article: Article
    isExpanded: boolean
    onToggle: () => void
}) {
    return (
        <div
            className={`
                bg-white dark:bg-gray-800/90 rounded-xl border overflow-hidden transition-all
                ${isExpanded
                    ? 'shadow-md border-stone-200 dark:border-gray-600'
                    : 'border-stone-100 dark:border-gray-700/50 hover:border-stone-200 dark:hover:border-gray-600'
                }
            `}
        >
            <div className="p-6">
                {/* 头部 */}
                <div
                    role='button'
                    tabIndex={0}
                    aria-label={article.title}
                    aria-expanded={isExpanded}
                    className="flex justify-between items-start gap-4 cursor-pointer"
                    onClick={onToggle}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            onToggle()
                        }
                    }}
                >
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-3">
                            <span className="text-[12px] text-stone-600 dark:text-stone-400 bg-stone-100 dark:bg-gray-700 px-2 py-0.5 rounded">
                                {article.category}
                            </span>
                            <span className="text-[12px] text-stone-400 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {article.readTime}
                            </span>
                        </div>
                        <h3 className="text-[17px] font-semibold text-stone-800 dark:text-stone-100 leading-[1.4]">
                            {article.title}
                        </h3>
                        {article.subtitle && (
                            <p className="text-[14px] text-stone-500 dark:text-stone-500 mt-1.5 line-clamp-1">
                                {article.subtitle}
                            </p>
                        )}
                    </div>

                    <div className={`
                        w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all
                        ${isExpanded
                            ? 'bg-stone-800 dark:bg-white text-white dark:text-stone-900 rotate-180'
                            : 'bg-stone-100 dark:bg-gray-700 text-stone-400'
                        }
                    `}>
                        <ChevronDown className="w-4 h-4" />
                    </div>
                </div>

                {/* 展开内容 */}
                <div className={`
                    grid transition-all duration-300
                    ${isExpanded ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0'}
                `}>
                    <div className={isExpanded ? 'overflow-visible' : 'overflow-hidden'}>
                        <div className="pt-6 border-t border-stone-100 dark:border-gray-700">
                            {article.image ? (
                                <div className="flex flex-col sm:flex-row gap-6">
                                    <div className="sm:w-2/5 shrink-0">
                                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-stone-50 dark:bg-gray-900">
                                            <Image
                                                src={article.image}
                                                alt={article.title}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        {article.content}
                                    </div>
                                </div>
                            ) : (
                                article.content
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function ArticleList() {
    const t = useTranslations('learn.care')
    const tConsult = useTranslations('learn.consult')
    const tTimeline = useTranslations('learn.timeline')
    const tSkull = useTranslations('learn.skull')
    const tUI = useTranslations('learn.ui')
    const tCategories = useTranslations('learn.categories')
    const tSections = useTranslations('learn.sections')
    const tImprovement = useTranslations('learn.improvement')
    const { refs, viewSourceText } = useReferences()
    const [expandedId, setExpandedId] = useState<string | null>(null)

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id)
    }

    // 第一部分：理解基础
    const foundationArticles: Article[] = [
        {
            id: 'development-timeline',
            category: tCategories('development'),
            readTime: '4 min',
            title: tTimeline('title'),
            subtitle: tTimeline('subtitle'),
            content: (
                <div className="divide-y divide-stone-100 dark:divide-gray-800">
                    {[
                        { months: '0-3', titleKey: 'stage1.title', highlightsKey: 'stage1.highlights', tipsKey: 'stage1.tips', isGolden: false, reference: null },
                        { months: '3-6', titleKey: 'stage2.title', highlightsKey: 'stage2.highlights', tipsKey: 'stage2.tips', isGolden: true, reference: refs.plagiocephalyTiming },
                        { months: '6-12', titleKey: 'stage3.title', highlightsKey: 'stage3.highlights', tipsKey: 'stage3.tips', isGolden: false, reference: refs.helmetTherapy },
                        { months: '12-18', titleKey: 'stage4.title', highlightsKey: 'stage4.highlights', tipsKey: 'stage4.tips', isGolden: false, reference: null },
                    ].map((stage, index) => (
                        <div key={stage.months} className={index === 0 ? 'pb-6' : 'py-6'}>
                            <h4 className="text-[15px] font-medium text-stone-800 dark:text-stone-100 mb-3">
                                {stage.months}{tTimeline('months')} · {stage.isGolden ? <Highlight>{tTimeline(stage.titleKey)}</Highlight> : tTimeline(stage.titleKey)}
                            </h4>
                            <p className="text-[15px] text-stone-600 dark:text-stone-400 leading-[1.8] mb-3">
                                {tTimeline(stage.highlightsKey)}
                            </p>
                            <div className="bg-stone-50 dark:bg-stone-900/30 rounded-lg px-4 py-3">
                                <p className="text-[14px] text-stone-500 dark:text-stone-400 leading-[1.8]">
                                    <span className="text-stone-400 dark:text-stone-500">{tUI('careTips')}</span>
                                    {stage.reference ? (
                                        <Reference viewSourceText={viewSourceText} source={stage.reference}>{tTimeline(stage.tipsKey)}</Reference>
                                    ) : (
                                        tTimeline(stage.tipsKey)
                                    )}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ),
        },
        {
            id: 'skull-structure',
            category: tCategories('basics'),
            readTime: '3 min',
            title: tSkull('title'),
            subtitle: tSkull('subtitle'),
            content: (
                <div className="space-y-6">
                    <p className="text-[15px] text-stone-600 dark:text-stone-400 leading-[1.8]">
                        {tSkull('funFact')}
                    </p>
                    <div className="grid gap-6 sm:grid-cols-2">
                        {[
                            { titleKey: 'structure.title', descKey: 'structure.desc', reference: null },
                            { titleKey: 'fontanelles.title', descKey: 'fontanelles.desc', reference: refs.fontanelleClosure },
                            { titleKey: 'plasticity.title', descKey: 'plasticity.desc', reference: null },
                            { titleKey: 'recovery.title', descKey: 'recovery.desc', reference: null },
                        ].map((item) => (
                            <div key={item.titleKey}>
                                <h4 className="text-[15px] font-semibold text-stone-800 dark:text-stone-100 mb-2">
                                    {tSkull(item.titleKey)}
                                </h4>
                                <p className="text-[14px] text-stone-500 dark:text-stone-400 leading-[1.8]">
                                    {item.reference ? (
                                        <Reference viewSourceText={viewSourceText} source={item.reference}>{tSkull(item.descKey)}</Reference>
                                    ) : (
                                        tSkull(item.descKey)
                                    )}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            ),
        },
        {
            id: 'brain-development',
            category: tCategories('basics'),
            readTime: '2 min',
            title: t('brainDevelopment.title'),
            subtitle: t('brainDevelopment.subtitle'),
            content: (
                <div className="space-y-4">
                    <p className="text-[15px] text-stone-600 dark:text-stone-400 leading-[1.8]">
                        {t('brainDevelopment.intro')}
                    </p>
                    <ul className="space-y-3">
                        {['point1', 'point2', 'point3'].map((key) => (
                            <li key={key} className="text-[14px] text-stone-600 dark:text-stone-400 leading-[1.8] flex gap-3">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                <span>{t(`brainDevelopment.${key}`)}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg px-4 py-3">
                        <p className="text-[14px] text-amber-700 dark:text-amber-300 leading-[1.8]">
                            {t('brainDevelopment.warning')}
                        </p>
                    </div>
                    <p className="text-[15px] text-stone-600 dark:text-stone-400 leading-[1.8] font-medium">
                        {t('brainDevelopment.conclusion')}
                    </p>
                </div>
            ),
        },
    ]

    // 第二部分：日常护理
    const careArticles: Article[] = [
        {
            id: 'tummy-time',
            category: tCategories('coreIntervention'),
            readTime: '3 min',
            title: t('tummyTime.title'),
            subtitle: t('tummyTime.subtitle'),
            image: '/images/care/tummy-time-lineart.png',
            content: (
                <div className="space-y-4">
                    <p className="text-[15px] text-stone-600 dark:text-stone-400 leading-[1.8]">
                        {t('tummyTime.proTip')}
                    </p>
                    <ul className="space-y-3">
                        <li className="text-[14px] text-stone-600 dark:text-stone-400 leading-[1.8] flex gap-3">
                            <span className="text-[13px] text-stone-400 dark:text-stone-500 font-medium shrink-0 w-5">01</span>
                            <span>{t('tummyTime.tip1')}</span>
                        </li>
                        <li className="text-[14px] text-stone-600 dark:text-stone-400 leading-[1.8] flex gap-3">
                            <span className="text-[13px] text-stone-400 dark:text-stone-500 font-medium shrink-0 w-5">02</span>
                            <span><Reference viewSourceText={viewSourceText} source={refs.aapTummyTime}>{t('tummyTime.tip2')}</Reference></span>
                        </li>
                        <li className="text-[14px] text-stone-600 dark:text-stone-400 leading-[1.8] flex gap-3">
                            <span className="text-[13px] text-stone-400 dark:text-stone-500 font-medium shrink-0 w-5">03</span>
                            <span>{t('tummyTime.tip3')}</span>
                        </li>
                        <li className="text-[14px] text-stone-600 dark:text-stone-400 leading-[1.8] flex gap-3">
                            <span className="text-[13px] text-stone-400 dark:text-stone-500 font-medium shrink-0 w-5">04</span>
                            <span><Highlight variant="warning">{t('tummyTime.tip4')}</Highlight></span>
                        </li>
                    </ul>
                </div>
            ),
        },
        {
            id: 'sleep-position',
            category: tCategories('dailyCare'),
            readTime: '3 min',
            title: t('sleep.title'),
            subtitle: t('sleep.subtitle'),
            image: '/images/care/sleep-position-lineart.png',
            content: (
                <div className="space-y-4">
                    <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg px-4 py-3">
                        <p className="text-[14px] text-amber-700 dark:text-amber-300 leading-[1.8]">
                            <Reference viewSourceText={viewSourceText} source={refs.aapNoPillow}>{t('sleep.warning')}</Reference>
                        </p>
                    </div>
                    <ul className="space-y-3">
                        <li className="text-[14px] text-stone-600 dark:text-stone-400 leading-[1.8] flex gap-3">
                            <span className="text-[13px] text-stone-400 dark:text-stone-500 font-medium shrink-0 w-5">01</span>
                            <span><Highlight variant="success"><Reference viewSourceText={viewSourceText} source={refs.aapSafeSleep}>{t('sleep.tip1')}</Reference></Highlight></span>
                        </li>
                        {[t('sleep.tip2'), t('sleep.tip3'), t('sleep.tip4')].map((tip, i) => (
                            <li key={i} className="text-[14px] text-stone-600 dark:text-stone-400 leading-[1.8] flex gap-3">
                                <span className="text-[13px] text-stone-400 dark:text-stone-500 font-medium shrink-0 w-5">{String(i + 2).padStart(2, '0')}</span>
                                <span>{tip}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ),
        },
        {
            id: 'mattress',
            category: tCategories('dailyCare'),
            readTime: '3 min',
            title: t('mattress.title'),
            subtitle: t('mattress.subtitle'),
            image: '/images/care/mattress-lineart-warm.png',
            content: (
                <div className="space-y-4">
                    <p className="text-[15px] text-stone-600 dark:text-stone-400 leading-[1.8]">
                        {t('mattress.intro')}
                    </p>
                    <ul className="space-y-3">
                        <li className="text-[14px] text-stone-600 dark:text-stone-400 leading-[1.8] flex gap-3">
                            <span className="text-[13px] text-stone-400 dark:text-stone-500 font-medium shrink-0 w-5">01</span>
                            <span><Reference viewSourceText={viewSourceText} source={refs.aapSafeSleep}>{t('mattress.tip1')}</Reference></span>
                        </li>
                        <li className="text-[14px] text-stone-600 dark:text-stone-400 leading-[1.8] flex gap-3">
                            <span className="text-[13px] text-stone-400 dark:text-stone-500 font-medium shrink-0 w-5">02</span>
                            <span><Highlight variant="warning">{t('mattress.tip2')}</Highlight></span>
                        </li>
                        {[t('mattress.tip3'), t('mattress.tip4'), t('mattress.tip5')].map((tip, i) => (
                            <li key={i} className="text-[14px] text-stone-600 dark:text-stone-400 leading-[1.8] flex gap-3">
                                <span className="text-[13px] text-stone-400 dark:text-stone-500 font-medium shrink-0 w-5">{String(i + 3).padStart(2, '0')}</span>
                                <span>{tip}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ),
        },
        {
            id: 'feeding',
            category: tCategories('supplementary'),
            readTime: '3 min',
            title: t('feeding.title'),
            subtitle: t('feeding.subtitle'),
            image: '/images/care/feeding-lineart.png',
            content: (
                <div className="space-y-4">
                    <p className="text-[15px] text-stone-600 dark:text-stone-400 leading-[1.8]">
                        <Reference viewSourceText={viewSourceText} source={refs.feedingPositions}>{t('feeding.intro')}</Reference>
                    </p>
                    <ul className="space-y-3">
                        {[t('feeding.tip1'), t('feeding.tip2')].map((tip, i) => (
                            <li key={i} className="text-[14px] text-stone-600 dark:text-stone-400 leading-[1.8] flex gap-3">
                                <span className="text-[13px] text-stone-400 dark:text-stone-500 font-medium shrink-0 w-5">{String(i + 1).padStart(2, '0')}</span>
                                <span>{tip}</span>
                            </li>
                        ))}
                        <li className="text-[14px] text-stone-600 dark:text-stone-400 leading-[1.8] flex gap-3">
                            <span className="text-[13px] text-stone-400 dark:text-stone-500 font-medium shrink-0 w-5">03</span>
                            <span><Highlight>{t('feeding.tip3')}</Highlight></span>
                        </li>
                        {[t('feeding.tip4'), t('feeding.tip5')].map((tip, i) => (
                            <li key={i} className="text-[14px] text-stone-600 dark:text-stone-400 leading-[1.8] flex gap-3">
                                <span className="text-[13px] text-stone-400 dark:text-stone-500 font-medium shrink-0 w-5">{String(i + 4).padStart(2, '0')}</span>
                                <span>{tip}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ),
        },
        {
            id: 'environment',
            category: tCategories('supplementary'),
            readTime: '3 min',
            title: t('environment.title'),
            subtitle: t('environment.subtitle'),
            image: '/images/care/environment-lineart.png',
            content: (
                <div className="space-y-4">
                    <p className="text-[15px] text-stone-600 dark:text-stone-400 leading-[1.8]">
                        {t('environment.intro')}
                    </p>
                    <ul className="space-y-3">
                        <li className="text-[14px] text-stone-600 dark:text-stone-400 leading-[1.8] flex gap-3">
                            <span className="text-[13px] text-stone-400 dark:text-stone-500 font-medium shrink-0 w-5">01</span>
                            <span><Reference viewSourceText={viewSourceText} source={refs.repositioning}>{t('environment.tip1')}</Reference></span>
                        </li>
                        {[t('environment.tip2'), t('environment.tip3')].map((tip, i) => (
                            <li key={i} className="text-[14px] text-stone-600 dark:text-stone-400 leading-[1.8] flex gap-3">
                                <span className="text-[13px] text-stone-400 dark:text-stone-500 font-medium shrink-0 w-5">{String(i + 2).padStart(2, '0')}</span>
                                <span>{tip}</span>
                            </li>
                        ))}
                        <li className="text-[14px] text-stone-600 dark:text-stone-400 leading-[1.8] flex gap-3">
                            <span className="text-[13px] text-stone-400 dark:text-stone-500 font-medium shrink-0 w-5">04</span>
                            <span><Highlight variant="warning"><Reference viewSourceText={viewSourceText} source={refs.deviceTime}>{t('environment.tip4')}</Reference></Highlight></span>
                        </li>
                        <li className="text-[14px] text-stone-600 dark:text-stone-400 leading-[1.8] flex gap-3">
                            <span className="text-[13px] text-stone-400 dark:text-stone-500 font-medium shrink-0 w-5">05</span>
                            <span>{t('environment.tip5')}</span>
                        </li>
                    </ul>
                </div>
            ),
        },
        {
            id: 'pillow-myth',
            category: tCategories('basics'),
            readTime: '2 min',
            title: t('pillowMyth.title'),
            subtitle: t('pillowMyth.subtitle'),
            content: (
                <div className="space-y-4">
                    <p className="text-[15px] text-stone-600 dark:text-stone-400 leading-[1.8]">
                        {t('pillowMyth.intro')}
                    </p>
                    <div className="space-y-4">
                        <div>
                            <h4 className="text-[14px] font-semibold text-stone-800 dark:text-stone-100 mb-1">
                                {t('pillowMyth.reason1title')}
                            </h4>
                            <p className="text-[14px] text-stone-500 dark:text-stone-400 leading-[1.8]">
                                {t('pillowMyth.reason1')}
                            </p>
                        </div>
                        <div>
                            <h4 className="text-[14px] font-semibold text-stone-800 dark:text-stone-100 mb-1">
                                {t('pillowMyth.reason2title')}
                            </h4>
                            <p className="text-[14px] text-stone-500 dark:text-stone-400 leading-[1.8]">
                                {t('pillowMyth.reason2')}
                            </p>
                        </div>
                        <div>
                            <h4 className="text-[14px] font-semibold text-stone-800 dark:text-stone-100 mb-1">
                                {t('pillowMyth.reason3title')}
                            </h4>
                            <p className="text-[14px] text-stone-500 dark:text-stone-400 leading-[1.8]">
                                <Reference viewSourceText={viewSourceText} source={refs.aapNoPillow}>{t('pillowMyth.reason3')}</Reference>
                            </p>
                        </div>
                    </div>
                    <div className="bg-rose-50 dark:bg-rose-900/20 rounded-lg px-4 py-3">
                        <p className="text-[14px] text-rose-700 dark:text-rose-300 leading-[1.8]">
                            <Highlight variant="warning">{t('pillowMyth.warning')}</Highlight>
                        </p>
                    </div>
                </div>
            ),
        },
    ]

    // 第三部分：判断与行动
    const actionArticles: Article[] = [
        {
            id: 'when-to-see-doctor',
            category: tCategories('medical'),
            readTime: '3 min',
            title: tConsult('title'),
            subtitle: tConsult('subtitle'),
            content: (
                <div className="space-y-4">
                        <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-3">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                <span className="text-[14px] font-semibold text-emerald-800 dark:text-emerald-200">
                                    {tConsult('normalSigns.title')}
                                </span>
                            </div>
                            <ul className="space-y-2">
                                {['normalSigns.sign1', 'normalSigns.sign2', 'normalSigns.sign3'].map((key, i) => (
                                    <li key={i} className="text-[14px] text-emerald-700 dark:text-emerald-300 leading-[1.8] flex gap-2">
                                        <span className="text-emerald-400 dark:text-emerald-500 select-none">•</span>
                                        <span>{tConsult(key)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-3">
                                <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                                <span className="text-[14px] font-semibold text-amber-800 dark:text-amber-200">
                                    {tConsult('warningSigns.title')}
                                </span>
                            </div>
                            <ul className="space-y-2">
                                {['warningSigns.sign1', 'warningSigns.sign2', 'warningSigns.sign3'].map((key, i) => (
                                    <li key={i} className="text-[14px] text-amber-700 dark:text-amber-300 leading-[1.8] flex gap-2">
                                        <span className="text-amber-400 dark:text-amber-500 select-none">•</span>
                                        <span>{tConsult(key)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-rose-50 dark:bg-rose-900/20 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-3">
                                <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                                <span className="text-[14px] font-semibold text-rose-800 dark:text-rose-200">
                                    {tConsult('urgentSigns.title')}
                                </span>
                            </div>
                            <ul className="space-y-2">
                                {['urgentSigns.sign1', 'urgentSigns.sign2', 'urgentSigns.sign3'].map((key, i) => (
                                    <li key={i} className="text-[14px] text-rose-700 dark:text-rose-300 leading-[1.8] flex gap-2">
                                        <span className="text-rose-400 dark:text-rose-500 select-none">•</span>
                                        <span>{tConsult(key)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
            ),
        },
        {
            id: 'improvement-timeline',
            category: tCategories('medical'),
            readTime: '3 min',
            title: tImprovement('title'),
            subtitle: tImprovement('subtitle'),
            content: (
                <div className="space-y-6">
                    <p className="text-[15px] text-stone-600 dark:text-stone-400 leading-[1.8]">
                        {tImprovement('intro')}
                    </p>
                    <div className="grid gap-4 sm:grid-cols-3">
                        <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-4">
                            <h4 className="text-[14px] font-semibold text-emerald-800 dark:text-emerald-200 mb-1">
                                {tImprovement('mild.title')}
                            </h4>
                            <p className="text-[18px] font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                                {tImprovement('mild.time')}
                            </p>
                            <p className="text-[13px] text-emerald-700 dark:text-emerald-300 leading-[1.6]">
                                {tImprovement('mild.desc')}
                            </p>
                        </div>
                        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4">
                            <h4 className="text-[14px] font-semibold text-amber-800 dark:text-amber-200 mb-1">
                                {tImprovement('moderate.title')}
                            </h4>
                            <p className="text-[18px] font-bold text-amber-600 dark:text-amber-400 mb-2">
                                {tImprovement('moderate.time')}
                            </p>
                            <p className="text-[13px] text-amber-700 dark:text-amber-300 leading-[1.6]">
                                {tImprovement('moderate.desc')}
                            </p>
                        </div>
                        <div className="bg-rose-50 dark:bg-rose-900/20 rounded-lg p-4">
                            <h4 className="text-[14px] font-semibold text-rose-800 dark:text-rose-200 mb-1">
                                {tImprovement('severe.title')}
                            </h4>
                            <p className="text-[18px] font-bold text-rose-600 dark:text-rose-400 mb-2">
                                {tImprovement('severe.time')}
                            </p>
                            <p className="text-[13px] text-rose-700 dark:text-rose-300 leading-[1.6]">
                                {tImprovement('severe.desc')}
                            </p>
                        </div>
                    </div>
                    <p className="text-[14px] text-stone-500 dark:text-stone-400 leading-[1.8]">
                        {tImprovement('factors')}
                    </p>
                    <div className="border-t border-stone-200 dark:border-gray-700 pt-6">
                        <h4 className="text-[16px] font-semibold text-stone-800 dark:text-stone-100 mb-3">
                            {tImprovement('helmetTitle')}
                        </h4>
                        <p className="text-[14px] text-stone-500 dark:text-stone-400 leading-[1.8] mb-4">
                            {tImprovement('helmetIntro')}
                        </p>
                        <ul className="space-y-2">
                            {['helmetPoint1', 'helmetPoint2', 'helmetPoint3'].map((key) => (
                                <li key={key} className="text-[14px] text-stone-600 dark:text-stone-400 leading-[1.8] flex gap-2">
                                    <span className="text-stone-400 dark:text-stone-500 select-none">•</span>
                                    <span>{tImprovement(key)}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg px-4 py-3 mt-4">
                            <p className="text-[14px] text-blue-700 dark:text-blue-300 leading-[1.8]">
                                {tImprovement('helmetNote')}
                            </p>
                        </div>
                    </div>
                </div>
            ),
        },
    ]

    return (
        <section className="mb-16">
            {/* 第一部分：理解基础 */}
            <div className="mb-12">
                <div className="mb-6">
                    <h2 className="text-[20px] font-semibold text-stone-800 dark:text-stone-100 leading-[1.3]">
                        {tSections('foundation.title')}
                    </h2>
                    <p className="text-[15px] text-stone-500 dark:text-stone-400 mt-2 leading-[1.8]">
                        {tSections('foundation.description')}
                    </p>
                </div>
                <div className="space-y-4">
                    {foundationArticles.map((article) => (
                        <ArticleCard
                            key={article.id}
                            article={article}
                            isExpanded={expandedId === article.id}
                            onToggle={() => toggleExpand(article.id)}
                        />
                    ))}
                </div>
            </div>

            {/* 第二部分：日常护理 */}
            <div className="mb-12">
                <div className="mb-6">
                    <h2 className="text-[20px] font-semibold text-stone-800 dark:text-stone-100 leading-[1.3]">
                        {tSections('care.title')}
                    </h2>
                    <p className="text-[15px] text-stone-500 dark:text-stone-400 mt-2 leading-[1.8]">
                        {tSections('care.description')}
                    </p>
                </div>
                <div className="space-y-4">
                    {careArticles.map((article) => (
                        <ArticleCard
                            key={article.id}
                            article={article}
                            isExpanded={expandedId === article.id}
                            onToggle={() => toggleExpand(article.id)}
                        />
                    ))}
                </div>
            </div>

            {/* 第三部分：判断与行动 */}
            <div>
                <div className="mb-6">
                    <h2 className="text-[20px] font-semibold text-stone-800 dark:text-stone-100 leading-[1.3]">
                        {tSections('action.title')}
                    </h2>
                    <p className="text-[15px] text-stone-500 dark:text-stone-400 mt-2 leading-[1.8]">
                        {tSections('action.description')}
                    </p>
                </div>
                <div className="space-y-4">
                    {actionArticles.map((article) => (
                        <ArticleCard
                            key={article.id}
                            article={article}
                            isExpanded={expandedId === article.id}
                            onToggle={() => toggleExpand(article.id)}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

// ============================================
// 主页面
// ============================================
export default function LearnPageClient() {
    const tPage = useTranslations('page.learn')
    const tHero = useTranslations('learn.hero')
    const tConsult = useTranslations('learn.consult')

    return (
        <div className="pb-24 bg-[#fffaf5] dark:bg-gray-950">
            <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 pt-24 md:pt-28">
                {/* 页面头部 */}
                <header className="mb-16 pb-12 border-b border-stone-200 dark:border-gray-800">
                    <h1 className="text-[32px] font-bold text-stone-800 dark:text-stone-100 leading-[1.3]">
                        {tPage('title')}
                    </h1>
                    <p className="text-[15px] text-stone-500 dark:text-stone-400 leading-[1.8] mt-4">
                        {tHero('subtitle')}
                    </p>

                    {/* 社交证明 */}
                    <div className="flex items-center gap-3 mt-6">
                        <div className="flex -space-x-2">
                            <Image
                                src="/images/avatars/user1.png"
                                alt=""
                                width={32}
                                height={32}
                                className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-900"
                            />
                            <Image
                                src="/images/avatars/user2.png"
                                alt=""
                                width={32}
                                height={32}
                                className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-900"
                            />
                            <Image
                                src="/images/avatars/user3.png"
                                alt=""
                                width={32}
                                height={32}
                                className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-900"
                            />
                        </div>
                        <span className="text-[13px] text-stone-500 dark:text-stone-400">
                            {tHero('trusted_by')}
                        </span>
                    </div>
                </header>

                {/* 头型图鉴 */}
                <HeadShapeGallery />

                {/* 文章列表 */}
                <ArticleList />

                {/* CTA */}
                <section className="text-center py-12 px-8 bg-stone-100 dark:bg-gray-900 rounded-xl">
                    <h3 className="text-[20px] font-semibold text-stone-800 dark:text-stone-100 leading-[1.3]">
                        {tConsult('ctaTitle')}
                    </h3>
                    <p className="text-[15px] text-stone-500 dark:text-stone-400 mt-3 mb-6 max-w-sm mx-auto leading-[1.8]">
                        {tConsult('ctaText')}
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-800 dark:bg-white text-white dark:text-stone-900 rounded-lg text-[15px] font-medium hover:opacity-90 transition-opacity"
                    >
                        {tConsult('ctaButton')}
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </section>
            </div>
        </div>
    )
}
