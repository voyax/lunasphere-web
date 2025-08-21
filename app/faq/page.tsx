'use client'

import { ChevronDown, Search } from 'lucide-react'
import { useState, useMemo } from 'react'

import { useLocale } from '@/contexts/LocaleContext'
import MedicalDisclaimer from '@/components/medical-disclaimer'
import ReferenceSources from '@/components/reference-sources'

interface FAQItem {
  id: string
  category: 'basic_knowledge' | 'daily_care' | 'treatment_timeline'
  question: string
  answer: string
}

const categoryConfig = {
  basic_knowledge: {
    gradient: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-50 to-cyan-50',
    icon: '🧠',
    color: 'blue',
  },
  daily_care: {
    gradient: 'from-green-500 to-emerald-500',
    bgGradient: 'from-green-50 to-emerald-50',
    icon: '👶',
    color: 'green',
  },
  treatment_timeline: {
    gradient: 'from-purple-500 to-pink-500',
    bgGradient: 'from-purple-50 to-pink-50',
    icon: '⏰',
    color: 'purple',
  },
}

export default function FAQPage() {
  const { t } = useLocale()
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const faqItems: FAQItem[] = [
    {
      id: 'normalDevelopment',
      category: 'basic_knowledge',
      question: t('faq.normalDevelopment.question'),
      answer: t('faq.normalDevelopment.answer'),
    },
    {
      id: 'whenToWorry',
      category: 'basic_knowledge',
      question: t('faq.whenToWorry.question'),
      answer: t('faq.whenToWorry.answer'),
    },
    {
      id: 'brainDevelopment',
      category: 'basic_knowledge',
      question: t('faq.brainDevelopment.question'),
      answer: t('faq.brainDevelopment.answer'),
    },
    {
      id: 'sleepPosition',
      category: 'daily_care',
      question: t('faq.sleepPosition.question'),
      answer: t('faq.sleepPosition.answer'),
    },
    {
      id: 'tummyTime',
      category: 'daily_care',
      question: t('faq.tummyTime.question'),
      answer: t('faq.tummyTime.answer'),
    },
    {
      id: 'pillowEffect',
      category: 'daily_care',
      question: t('faq.pillowEffect.question'),
      answer: t('faq.pillowEffect.answer'),
    },
    {
      id: 'helmetTreatment',
      category: 'treatment_timeline',
      question: t('faq.helmetTreatment.question'),
      answer: t('faq.helmetTreatment.answer'),
    },
    {
      id: 'improvementTime',
      category: 'treatment_timeline',
      question: t('faq.improvementTime.question'),
      answer: t('faq.improvementTime.answer'),
    },
    {
      id: 'prevention',
      category: 'daily_care',
      question: t('faq.prevention.question'),
      answer: t('faq.prevention.answer'),
    },
    {
      id: 'doctorConsultation',
      category: 'treatment_timeline',
      question: t('faq.doctorConsultation.question'),
      answer: t('faq.doctorConsultation.answer'),
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

  const filteredItems = useMemo(() => {
    let items = faqItems

    // Filter by category
    if (selectedCategory) {
      items = items.filter(item => item.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()

      items = items.filter(
        item =>
          item.question.toLowerCase().includes(query) ||
          item.answer.toLowerCase().includes(query)
      )
    }

    return items
  }, [selectedCategory, searchQuery, faqItems])

  const categories = Array.from(new Set(faqItems.map(item => item.category)))

  return (
    <div className='min-h-screen bg-gradient-to-br from-white via-yellow-50/20 to-amber-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800'>
      {/* Background Pattern */}
      <div className='absolute inset-0'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(251,191,36,0.015),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(156,163,175,0.02),transparent_50%)]' />
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(245,158,11,0.01),transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_80%,rgba(107,114,128,0.015),transparent_50%)]' />
        <div className='absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-200/20 to-transparent dark:via-gray-600/20' />
      </div>

      <div className='relative z-10'>
        {/* Hero Section */}
        <div className='relative overflow-hidden'>
          <div className='absolute inset-0 bg-gradient-to-br from-yellow-200 via-amber-200 to-orange-300 dark:from-yellow-900/40 dark:via-amber-900/40 dark:to-orange-900/40' />
          <div className='absolute inset-0 opacity-20'>
            <div
              className='w-full h-full'
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>
          <div className='relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8'>
            <div className='text-center'>
              <h1 className='text-4xl font-normal tracking-tight text-default-700 sm:text-5xl lg:text-6xl mb-6'>
                {t('faq.title')}
              </h1>
              <p className='mx-auto max-w-2xl text-xl font-extralight text-default-700 mb-8'>
                {t('faq.subtitle')}
              </p>

              {/* Search Bar */}
              <div className='mx-auto max-w-md'>
                <div className='relative'>
                  <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                  <input
                    className='w-full pl-12 pr-4 py-3 bg-white/90 backdrop-blur-sm rounded-2xl border-0 focus:ring-2 focus:ring-white/50 focus:bg-white transition-all duration-200 placeholder-gray-500'
                    placeholder={t('faq.searchPlaceholder')}
                    type='text'
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent dark:from-gray-950 dark:to-transparent' />
        </div>

        <div className='mx-auto max-w-7xl px-4 lg:py-16 sm:py-0 sm:px-6 lg:px-8'>
          {/* Category Filter */}
          <div className='mb-12 hidden sm:block'>
            <div className='flex flex-wrap gap-3 justify-center'>
              <button
                className={`group px-6 py-3 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === null
                    ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg shadow-gray-500/25'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
                onClick={() => setSelectedCategory(null)}
              >
                <span className='flex items-center gap-2'>
                  <span className='text-lg'>📋</span>
                  {t('faq.allQuestions')}
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      selectedCategory === null ? 'bg-white/20' : 'bg-gray-100'
                    }`}
                  >
                    {faqItems.length}
                  </span>
                </span>
              </button>
              {categories.map(category => {
                const config = categoryConfig[category]
                const count = faqItems.filter(
                  item => item.category === category
                ).length

                return (
                  <button
                    key={category}
                    className={`group px-6 py-3 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 ${
                      selectedCategory === category
                        ? `bg-gradient-to-r ${config.gradient} text-white shadow-lg shadow-${config.color}-500/25`
                        : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:shadow-md'
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    <span className='flex items-center gap-2'>
                      <span className='text-lg'>{config.icon}</span>
                      {t(`faq.category.${category}`)}
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          selectedCategory === category
                            ? 'bg-white/20'
                            : 'bg-gray-100'
                        }`}
                      >
                        {count}
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Results Count */}
          {(searchQuery || selectedCategory) && (
            <div className='mb-8 text-center'>
              <p className='text-gray-600'>
                {t('faq.searchResults.prefix')} <span className='font-semibold text-gray-900'>{filteredItems.length}</span> {t('faq.searchResults.suffix')}
              </p>
            </div>
          )}

          {/* FAQ Items */}
          <div className='space-y-4'>
            {filteredItems.length === 0 ? (
              <div className='text-center py-16'>
                <div className='text-6xl mb-4'>🔍</div>
                <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                  {t('faq.noResults.title')}
                </h3>
                <p className='text-gray-600'>
                  {t('faq.noResults.description')}
                </p>
              </div>
            ) : (
              filteredItems.map((item, index) => {
                const config = categoryConfig[item.category]

                return (
                  <div
                    key={item.id}
                    className='group bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 overflow-hidden'
                    style={{
                      animationDelay: `${index * 50}ms`,
                    }}
                  >
                    <button
                      className='w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50/50 transition-all duration-200'
                      onClick={() => toggleItem(item.id)}
                    >
                      <div className='flex items-center gap-4 flex-1'>
                        {/* <div
                          className={`w-10 h-10 rounded-xl bg-gradient-to-r ${config.gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}
                        >
                          <span className='text-white text-lg'>
                            {config.icon}
                          </span>
                        </div> */}
                        <div className='flex-1'>
                          {/* <div className='flex items-center gap-2 mb-1'>
                            <span
                              className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${config.bgGradient} text-${config.color}-700 font-medium`}
                            >
                              {t(`faq.category.${item.category}`)}
                            </span>
                          </div> */}
                          <h3 className='text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200'>
                            {item.question}
                          </h3>
                        </div>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-400 transition-all duration-300 group-hover:text-gray-600 ${
                          openItems.has(item.id)
                            ? 'rotate-180 text-blue-500'
                            : ''
                        }`}
                      />
                    </button>
                    {openItems.has(item.id) && (
                      <div className='border-t border-gray-100'>
                        <div className='px-8 py-6'>
                          <div
                            className={`p-6 rounded-xl bg-gradient-to-r ${config.bgGradient}`}
                          >
                            <div className='text-gray-700 leading-relaxed whitespace-pre-line'>
                              {item.answer}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })
            )}
          </div>

          {/* Medical Disclaimer */}
          <MedicalDisclaimer className='mt-12 sm:mt-16 lg:mt-20' />

          {/* References */}
          <ReferenceSources className='mt-8 sm:mt-10 lg:mt-12' />
        </div>
      </div>
    </div>
  )
}
