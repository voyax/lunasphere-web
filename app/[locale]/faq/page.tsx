'use client'

import { ChevronDown, ArrowRight, MessageCircle } from 'lucide-react'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'

interface FAQItem {
  id: string
  question: string
  answer: string
}

interface FAQSection {
  id: string
  title: string
  items: FAQItem[]
}

// 简单的 Markdown 渲染：支持 **粗体**、[链接](/path)、换行、• 列表
function renderInline(text: string, keyPrefix: string) {
  // 匹配 **粗体** 和 [链接文字](/路径)
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g)
  return parts.map((part, j) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={`${keyPrefix}-${j}`} className="font-semibold text-stone-800 dark:text-stone-100">
          {part.slice(2, -2)}
        </strong>
      )
    }
    // 匹配 [text](url)
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (linkMatch) {
      return (
        <Link key={`${keyPrefix}-${j}`} href={linkMatch[2]} className="text-orange-600 dark:text-orange-400 hover:underline font-medium">
          {linkMatch[1]}
        </Link>
      )
    }
    return part
  })
}

function renderAnswer(text: string) {
  const lines = text.split('\n')

  return lines.map((line, i) => {
    // 空行 - 用于分隔段落组
    if (line.trim() === '') {
      return <div key={i} className="h-3" />
    }

    // 列表项
    if (line.trim().startsWith('•')) {
      const content = line.trim().slice(1).trim()
      return (
        <div key={i} className="flex gap-2.5 pl-1 py-0.5">
          <span className="text-stone-400 dark:text-stone-500 select-none">•</span>
          <span>{renderInline(content, `${i}`)}</span>
        </div>
      )
    }

    // 普通段落
    return <p key={i} className="py-0.5">{renderInline(line, `${i}`)}</p>
  })
}

export default function FAQPage() {
  const t = useTranslations('faq')
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())

  const sections: FAQSection[] = [
    {
      id: 'about',
      title: t('category.about'),
      items: [
        { id: 'about', question: t('about.question'), answer: t('about.answer') },
      ],
    },
    {
      id: 'howTo',
      title: t('category.howTo'),
      items: [
        { id: 'photoTips', question: t('photoTips.question'), answer: t('photoTips.answer') },
        { id: 'detectionFailed', question: t('detectionFailed.question'), answer: t('detectionFailed.answer') },
        { id: 'deviceSupport', question: t('deviceSupport.question'), answer: t('deviceSupport.answer') },
      ],
    },
    {
      id: 'results',
      title: t('category.results'),
      items: [
        { id: 'whatIsCICVAI', question: t('whatIsCICVAI.question'), answer: t('whatIsCICVAI.answer') },
        { id: 'abnormalResult', question: t('abnormalResult.question'), answer: t('abnormalResult.answer') },
        { id: 'howOften', question: t('howOften.question'), answer: t('howOften.answer') },
      ],
    },
  ]

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id)
    } else {
      newOpenItems.add(id)
    }
    setOpenItems(newOpenItems)
  }

  return (
    <div className="min-h-screen pb-24 bg-[#fffaf5] dark:bg-gray-950">
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 pt-24 md:pt-28">
        {/* 页面头部 */}
        <header className="mb-12">
          <h1 className="text-[32px] font-bold text-stone-800 dark:text-stone-100 leading-[1.3]">
            {t('title')}
          </h1>
        </header>

        {/* FAQ 内容 */}
        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.id}>
              {/* 分类标题 */}
              <h2 className="text-[13px] font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-4">
                {section.title}
              </h2>

              {/* 问题列表 */}
              <div className="space-y-2">
                {section.items.map((item) => {
                  const isOpen = openItems.has(item.id)

                  return (
                    <div
                      key={item.id}
                      className={`
                        bg-white dark:bg-gray-800/80 rounded-xl border overflow-hidden transition-all duration-200
                        ${isOpen
                          ? 'border-stone-200 dark:border-gray-600 shadow-sm'
                          : 'border-stone-100 dark:border-gray-700/50 hover:border-stone-200 dark:hover:border-gray-600'
                        }
                      `}
                    >
                      <button
                        className="w-full px-5 py-4 text-left flex items-center justify-between gap-4"
                        onClick={() => toggleItem(item.id)}
                      >
                        <span className="text-[15px] font-medium text-stone-800 dark:text-stone-100 leading-[1.5]">
                          {item.question}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-stone-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        />
                      </button>

                      <div
                        className={`
                          grid transition-all duration-200 ease-in-out
                          ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}
                        `}
                      >
                        <div className="overflow-hidden">
                          <div className="px-5 pb-5">
                            <div className="text-[15px] text-stone-700 dark:text-stone-300 leading-[1.75]">
                              {renderAnswer(item.answer)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          ))}
        </div>

        {/* 底部引导 */}
        <div className="mt-16 pt-8 border-t border-stone-200 dark:border-gray-800">
          {/* 两个入口并排 */}
          <div className="grid sm:grid-cols-2 gap-4">
            {/* 前往妈妈课堂 */}
            <Link
              href="/learn"
              className="group flex items-center gap-4 p-5 bg-white dark:bg-gray-800/80 rounded-xl border border-stone-100 dark:border-gray-700/50 hover:border-stone-200 dark:hover:border-gray-600 transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-stone-100 dark:bg-gray-700 flex items-center justify-center shrink-0">
                <ArrowRight className="w-5 h-5 text-stone-500 dark:text-stone-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <div>
                <p className="text-[14px] font-medium text-stone-800 dark:text-stone-100">
                  {t('goToLearn')}
                </p>
                <p className="text-[13px] text-stone-500 dark:text-stone-400">
                  {t('learnMore')}
                </p>
              </div>
            </Link>

            {/* 反馈入口 */}
            <a
              href="mailto:domi@melolib.com"
              className="group flex items-center gap-4 p-5 bg-white dark:bg-gray-800/80 rounded-xl border border-stone-100 dark:border-gray-700/50 hover:border-stone-200 dark:hover:border-gray-600 transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-stone-100 dark:bg-gray-700 flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5 text-stone-500 dark:text-stone-400" />
              </div>
              <div>
                <p className="text-[14px] font-medium text-stone-800 dark:text-stone-100">
                  {t('contactUs')}
                </p>
                <p className="text-[13px] text-stone-500 dark:text-stone-400">
                  {t('contactUsDesc')}
                </p>
              </div>
            </a>
          </div>

          {/* 免责声明 */}
          <p className="text-[12px] text-stone-400 dark:text-stone-500 text-center mt-8 max-w-lg mx-auto leading-[1.8]">
            {t('disclaimer')}
          </p>
        </div>
      </div>
    </div>
  )
}
