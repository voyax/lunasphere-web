'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { BookOpen, Brain, Activity, HeartHandshake, ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

// 章节定义
const chapters = [
    { id: 'intro', icon: BookOpen, label: 'chapter.intro' },
    { id: 'development', icon: Activity, label: 'chapter.development' },
    { id: 'skull', icon: Brain, label: 'chapter.skull' },
    { id: 'types', icon: Brain, label: 'chapter.types' },
    { id: 'care', icon: HeartHandshake, label: 'chapter.care' },
]

export function LearnPageLayout({ children }: { children: React.ReactNode }) {
    const t = useTranslations('learn')
    const [activeChapter, setActiveChapter] = useState('intro')

    // 性能优化：使用 Ref 存储 observer 避免重复创建
    const observerRef = useRef<IntersectionObserver | null>(null)

    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    useEffect(() => {
        // 性能优化：使用 IntersectionObserver 替代 scroll listener
        // 这种方式不会在每次滚动像素时触发计算，大大降低主线程压力
        const options = {
            root: null,
            rootMargin: '-40% 0px -40% 0px', // 只有当元素进入视口中间 20% 区域时才触发
            threshold: 0
        }

        observerRef.current = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveChapter(entry.target.id)
                }
            })
        }, options)

        // 观察所有章节
        chapters.forEach((chapter) => {
            const element = document.getElementById(chapter.id)
            if (element) {
                observerRef.current?.observe(element)
            }
        })

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect()
            }
        }
    }, []) // 空依赖数组，只运行一次

    const scrollToChapter = (id: string) => {
        const element = document.getElementById(id)
        if (element) {
            // 使用更平滑的滚动行为，但减少动画持续时间以提升响应感
            const offsetTop = element.offsetTop - 100
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            })
        }
    }

    return (
        // unique-id 用于避免 hydration 时的干扰
        <div className="min-h-screen bg-[#FDFBF7] dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 font-sans selection:bg-orange-200 dark:selection:bg-orange-900">
            {/* 顶部进度条 - 使用 layout 属性避免重绘 */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-orange-500 origin-left z-50 will-change-transform" // 添加 will-change 提示浏览器优化
                style={{ scaleX }}
            />

            {/* 侧边导航 (Desktop) */}
            <nav className="fixed left-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-6 z-40">
                {chapters.map((chapter) => (
                    <button
                        key={chapter.id}
                        onClick={() => scrollToChapter(chapter.id)}
                        className="group flex items-center gap-4 relative"
                        aria-label={t(chapter.label)}
                    >
                        <div className={`
              w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 border
              ${activeChapter === chapter.id
                                ? 'bg-orange-500 border-orange-500 text-white shadow-md transform scale-105'
                                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-400 hover:border-orange-300 hover:text-orange-500'}
            `}>
                            <chapter.icon className="w-5 h-5" />
                        </div>
                        {/* 文字标签逻辑优化：使用 opacity 控制显隐，避免 layout thrashing */}
                        <span className={`
              absolute left-14 whitespace-nowrap text-sm font-medium transition-opacity duration-200
              ${activeChapter === chapter.id
                                ? 'opacity-100 text-orange-600 dark:text-orange-400'
                                : 'opacity-0 group-hover:opacity-100 text-gray-400'}
            `}>
                            {t(chapter.label)}
                        </span>
                    </button>
                ))}
            </nav>

            {/* 移动端底部导航 */}
            <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 p-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full border border-gray-200/50 dark:border-gray-700/50 shadow-lg z-40 xl:hidden">
                {chapters.map((chapter) => (
                    <button
                        key={chapter.id}
                        onClick={() => scrollToChapter(chapter.id)}
                        className={`
              p-3 rounded-full transition-colors duration-200
              ${activeChapter === chapter.id
                                ? 'bg-orange-500 text-white shadow-sm'
                                : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}
            `}
                    >
                        <chapter.icon className="w-5 h-5" />
                    </button>
                ))}
            </nav>

            <main className="w-full">
                {children}
            </main>
        </div>
    )
}

// 极致视觉的 Hero Section
export function CourseHero() {
    const t = useTranslations('learn.hero')

    return (
        <section id="intro" className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden px-4">
            {/* 性能优化：移除动态模糊圆球，改用更高效的 CSS 径向渐变背景 */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-orange-50/50 via-transparent to-transparent dark:from-orange-900/20" />
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-blue-50/50 via-transparent to-transparent dark:from-blue-900/20" />
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02]" />

            <div className="max-w-5xl mx-auto text-center space-y-8 z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }} // 缩短动画时间感觉更跟手
                >
                    <span className="inline-block px-4 py-1.5 rounded-full border border-orange-200 dark:border-orange-800 bg-orange-50/80 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 text-sm font-medium tracking-wide mb-6">
                        LUNASPHERE PARENT ACADEMY
                    </span>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium text-gray-900 dark:text-gray-50 tracking-tight leading-[1.1] mb-6">
                        {t('title')}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
                        {t('subtitle')}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }} // 减少 delay，加快响应
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
                >
                    <button
                        onClick={() => document.getElementById('development')?.scrollIntoView({ behavior: 'smooth' })}
                        className="px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-medium active:scale-95 transition-transform duration-200 flex items-center gap-2 shadow-lg"
                    >
                        {t('start_course')} <ChevronRight className="w-4 h-4" />
                    </button>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 px-6 py-4">
                        <span className="flex -space-x-2">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-900 bg-gray-200 dark:bg-gray-700" />
                            ))}
                        </span>
                        <span>{t('trusted_by')}</span>
                    </div>
                </motion.div>
            </div>

            {/* 底部提示 */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 text-xs tracking-widest uppercase"
            >
                <span>Scroll to Explore</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-gray-400 to-transparent" />
            </motion.div>
        </section>
    )
}
