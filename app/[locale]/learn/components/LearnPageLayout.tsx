'use client'

import { motion, useScroll, useSpring } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

export function LearnPageLayout({ children }: { children: React.ReactNode }) {
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    return (
        // unique-id 用于避免 hydration 时的干扰
        <div className="min-h-screen bg-[#FDFBF7] dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 font-sans selection:bg-orange-200 dark:selection:bg-orange-900">
            {/* 顶部进度条 - 使用 layout 属性避免重绘 */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-orange-500 origin-left z-50 will-change-transform" // 添加 will-change 提示浏览器优化
                style={{ scaleX }}
            />

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
