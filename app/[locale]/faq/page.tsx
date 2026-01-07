'use client'

import { ChevronDown, Search, Brain, Baby, Clock, Sparkles, HelpCircle } from 'lucide-react'
import { useState, useMemo } from 'react'
import { useTranslations } from 'next-intl'

import ReferenceSources from '@/components/reference-sources'

interface FAQItem {
  id: string
  category: 'basic_knowledge' | 'daily_care' | 'treatment_timeline'
  question: string
  answer: string
}

const categoryConfig = {
  basic_knowledge: {
    gradient: 'from-orange-400 to-amber-400',
    bgGradient: 'from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30',
    borderColor: 'border-orange-200 dark:border-orange-800/30',
    Icon: Brain,
    color: 'orange',
  },
  daily_care: {
    gradient: 'from-rose-400 to-pink-400',
    bgGradient: 'from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30',
    borderColor: 'border-rose-200 dark:border-rose-800/30',
    Icon: Baby,
    color: 'rose',
  },
  treatment_timeline: {
    gradient: 'from-violet-400 to-purple-400',
    bgGradient: 'from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30',
    borderColor: 'border-violet-200 dark:border-violet-800/30',
    Icon: Clock,
    color: 'violet',
  },
}

export default function FAQPage() {
  const t = useTranslations('faq')
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const faqItems: FAQItem[] = [
    {
      id: 'normalDevelopment',
      category: 'basic_knowledge',
      question: t('normalDevelopment.question'),
      answer: t('normalDevelopment.answer'),
    },
    {
      id: 'whenToWorry',
      category: 'basic_knowledge',
      question: t('whenToWorry.question'),
      answer: t('whenToWorry.answer'),
    },
    {
      id: 'brainDevelopment',
      category: 'basic_knowledge',
      question: t('brainDevelopment.question'),
      answer: t('brainDevelopment.answer'),
    },
    {
      id: 'sleepPosition',
      category: 'daily_care',
      question: t('sleepPosition.question'),
      answer: t('sleepPosition.answer'),
    },
    {
      id: 'tummyTime',
      category: 'daily_care',
      question: t('tummyTime.question'),
      answer: t('tummyTime.answer'),
    },
    {
      id: 'pillowEffect',
      category: 'daily_care',
      question: t('pillowEffect.question'),
      answer: t('pillowEffect.answer'),
    },
    {
      id: 'helmetTreatment',
      category: 'treatment_timeline',
      question: t('helmetTreatment.question'),
      answer: t('helmetTreatment.answer'),
    },
    {
      id: 'improvementTime',
      category: 'treatment_timeline',
      question: t('improvementTime.question'),
      answer: t('improvementTime.answer'),
    },
    {
      id: 'prevention',
      category: 'daily_care',
      question: t('prevention.question'),
      answer: t('prevention.answer'),
    },
    {
      id: 'doctorConsultation',
      category: 'treatment_timeline',
      question: t('doctorConsultation.question'),
      answer: t('doctorConsultation.answer'),
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
    <div className='min-h-screen bg-[#fffaf5] dark:bg-gray-950 selection:bg-orange-100 dark:selection:bg-orange-900/30'>
      {/* Noise texture overlay */}
      <div className='noise-overlay' />

      {/* Background Pattern */}
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(251,191,36,0.03),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(156,163,175,0.02),transparent_50%)]' />
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(245,158,11,0.02),transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_80%,rgba(107,114,128,0.015),transparent_50%)]' />
      </div>

      <div className='relative z-10'>
        {/* Hero Section - Warm Organic Style */}
        <section className='text-center px-6 pt-32 pb-12 sm:pb-16 relative animate-fade-in'>
          {/* Decorative elements */}
          <div className='absolute top-20 left-1/4 opacity-10 dark:opacity-5 animate-float-soft pointer-events-none'>
            <Sparkles className='w-8 h-8 text-orange-400' />
          </div>
          <div className='absolute top-32 right-1/3 opacity-10 dark:opacity-5 animate-float-soft pointer-events-none' style={{ animationDelay: '1s' }}>
            <HelpCircle className='w-6 h-6 text-rose-400' />
          </div>

          {/* Title */}
          <h1 className='text-4xl md:text-6xl font-bold text-gray-800 dark:text-gray-100 tracking-tighter leading-[0.9] mb-6'>
            {t('title')}
          </h1>

          {/* Subtitle */}
          <p className='max-w-lg mx-auto text-gray-400 dark:text-gray-500 text-sm md:text-base leading-relaxed font-medium mb-8'>
            {t('subtitle')}
          </p>

          {/* Search Bar - Premium Style */}
          <div className='mx-auto max-w-md mb-6'>
            <div className='relative group'>
              <div className='absolute -inset-1 bg-gradient-to-r from-orange-200 via-rose-200 to-amber-200 dark:from-orange-900/30 dark:via-rose-900/30 dark:to-amber-900/30 rounded-2xl blur opacity-40 group-hover:opacity-60 transition-opacity duration-300' />
              <div className='relative'>
                <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                <input
                  className='w-full pl-12 pr-4 py-3.5 text-sm bg-white dark:bg-gray-900 rounded-xl border border-gray-200/60 dark:border-gray-700/60 focus:ring-2 focus:ring-orange-300/50 dark:focus:ring-orange-700/50 focus:border-orange-300 dark:focus:border-orange-700 transition-all duration-200 placeholder-gray-400 shadow-soft'
                  placeholder={t('searchPlaceholder')}
                  type='text'
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Decorative line */}
          <div className='w-12 h-1.5 bg-orange-200 dark:bg-orange-700 mx-auto rounded-full' />
        </section>
      </div>

      <div className='mx-auto max-w-7xl px-4 py-8 sm:py-12 lg:py-16 sm:px-6 lg:px-8'>
        {/* Category Filter - Premium Pill Style */}
        <div className='mb-8 sm:mb-12'>
          <div className='flex flex-wrap gap-2 sm:gap-3 justify-center'>
            <button
              className={`group inline-flex items-center gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full font-medium text-sm transition-all duration-300 ${selectedCategory === null
                ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg shadow-gray-500/20'
                : 'bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 border border-gray-200/60 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md backdrop-blur-sm'
                }`}
              onClick={() => setSelectedCategory(null)}
            >
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${selectedCategory === null
                ? 'bg-white/20'
                : 'bg-gray-100 dark:bg-gray-700'
                }`}>
                <HelpCircle className={`w-4 h-4 ${selectedCategory === null ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`} />
              </div>
              <span className='hidden sm:inline'>{t('allQuestions')}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${selectedCategory === null ? 'bg-white/20 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}>
                {faqItems.length}
              </span>
            </button>
            {categories.map(category => {
              const config = categoryConfig[category]
              const IconComponent = config.Icon
              const count = faqItems.filter(
                item => item.category === category
              ).length

              return (
                <button
                  key={category}
                  className={`group inline-flex items-center gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full font-medium text-sm transition-all duration-300 ${selectedCategory === category
                    ? `bg-gradient-to-r ${config.gradient} text-white shadow-lg`
                    : 'bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 border border-gray-200/60 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md backdrop-blur-sm'
                    }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${selectedCategory === category
                    ? 'bg-white/20'
                    : `bg-gradient-to-br ${config.gradient} bg-opacity-10`
                    }`}>
                    <IconComponent className={`w-4 h-4 ${selectedCategory === category ? 'text-white' : 'text-white'}`} />
                  </div>
                  <span className='hidden sm:inline'>{t(`category.${category}`)}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${selectedCategory === category ? 'bg-white/20 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}>
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Results Count */}
        {(searchQuery || selectedCategory) && (
          <div className='mb-6 sm:mb-8 text-center'>
            <p className='text-sm sm:text-base text-gray-600'>
              {t('searchResults.prefix')}{' '}
              <span className='font-semibold text-gray-900'>
                {filteredItems.length}
              </span>{' '}
              {t('searchResults.suffix')}
            </p>
          </div>
        )}

        {/* FAQ Items - Premium Card Design */}
        <div className='space-y-3'>
          {filteredItems.length === 0 ? (
            <div className='text-center py-16 sm:py-20'>
              <div className='w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center'>
                <Search className='w-7 h-7 text-gray-400' />
              </div>
              <h3 className='text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200 mb-2'>
                {t('noResults.title')}
              </h3>
              <p className='text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto leading-relaxed'>
                {t('noResults.description')}
              </p>
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const config = categoryConfig[item.category]
              const IconComponent = config.Icon
              const isOpen = openItems.has(item.id)

              return (
                <div
                  key={item.id}
                  className={`group relative bg-white dark:bg-gray-900/50 rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen
                    ? `${config.borderColor} shadow-lg`
                    : 'border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-md'
                    }`}
                  style={{
                    animationDelay: `${index * 30}ms`,
                  }}
                >
                  {/* Colored accent bar */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${config.gradient} transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`} />

                  <button
                    className='w-full pl-5 pr-4 sm:pl-6 sm:pr-5 py-4 sm:py-5 text-left flex items-center gap-4 transition-all duration-200'
                    onClick={() => toggleItem(item.id)}
                  >
                    {/* Category Icon */}
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                      <IconComponent className='w-5 h-5 text-white' />
                    </div>

                    {/* Question Text */}
                    <div className='flex-1 min-w-0'>
                      <h3 className={`text-base sm:text-lg font-semibold leading-snug transition-colors duration-200 ${isOpen
                        ? `text-${config.color}-600 dark:text-${config.color}-400`
                        : 'text-gray-800 dark:text-gray-200'
                        }`}>
                        {item.question}
                      </h3>
                    </div>

                    {/* Chevron */}
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isOpen
                      ? `bg-gradient-to-br ${config.gradient}`
                      : 'bg-gray-100 dark:bg-gray-800 group-hover:bg-gray-200 dark:group-hover:bg-gray-700'
                      }`}>
                      <ChevronDown
                        className={`w-4 h-4 transition-all duration-300 ${isOpen
                          ? 'rotate-180 text-white'
                          : 'text-gray-500 dark:text-gray-400'
                          }`}
                      />
                    </div>
                  </button>

                  {/* Answer Panel */}
                  {isOpen && (
                    <div className='px-5 sm:px-6 pb-5 sm:pb-6'>
                      <div className={`p-4 sm:p-5 rounded-xl bg-gradient-to-r ${config.bgGradient} border ${config.borderColor}`}>
                        <div className='text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line'>
                          {item.answer}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>

        {/* References */}
        <ReferenceSources className='mt-8 sm:mt-10 lg:mt-12' />
      </div>
    </div>
  )
}
