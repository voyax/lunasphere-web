'use client'

import { LearnPageLayout, CourseHero } from './components/LearnPageLayout'
import { DevelopmentTimeline } from './components/DevelopmentTimeline'
import { HeadShapeTypesSection } from './components/HeadShapeTypesSection'
import { SkullKnowledgeSection } from './components/SkullKnowledgeSection'
import { CareGuide } from './components/CareGuide'
import { ConsultSection } from './components/ConsultSection'
import { motion } from 'framer-motion'

// 统一的章节容器
function SectionContainer({ id, children, className = '' }: { id: string, children: React.ReactNode, className?: string }) {
    return (
        <section id={id} className={`py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto ${className}`}>
            {children}
        </section>
    )
}

/**
 * Lunasphere Parent Academy - Redesigned
 * Concept: Interactive Digital Magazine / "The Growth Journal"
 */
export default function LearnPageClient() {
    return (
        <LearnPageLayout>
            {/* 1. 封面 (The Cover) */}
            <CourseHero />

            {/* 2. 发育旅程 (The Journey) - 0-18个月时间轴 */}
            <div className="bg-white dark:bg-gray-900/50">
                <SectionContainer id="development">
                    <DevelopmentTimeline />
                </SectionContainer>
            </div>

            {/* 3. 解剖学 (The Anatomy) - 深入了解头骨结构 */}
            <div className="bg-[#F4F1EA] dark:bg-gray-900">
                <SectionContainer id="skull">
                    <SkullKnowledgeSection />
                </SectionContainer>
            </div>

            {/* 4. 辨识 (Identification) - 视觉化对比 */}
            <div className="bg-white dark:bg-gray-900/50">
                <SectionContainer id="types">
                    <HeadShapeTypesSection />
                </SectionContainer>
            </div>

            {/* 5. 行动 (Action Plan) - 护理与就医 */}
            <div className="bg-[#FAF9F6] dark:bg-gray-900 relative">
                <SectionContainer id="care">
                    <div className="space-y-24">
                        <CareGuide />

                        {/* 分割线 */}
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent" />

                        <ConsultSection />
                    </div>
                </SectionContainer>
            </div>

            {/* Footer Append */}
            <div className="py-20 text-center bg-gray-50 dark:bg-black border-t border-gray-200 dark:border-gray-800">
                <p className="text-gray-400 font-serif italic text-lg">
                    "Every baby is unique, and so is their journey."
                </p>
            </div>
        </LearnPageLayout>
    )
}
