'use client'

import { useTranslations } from 'next-intl'
import { Mail, Github, ArrowRight, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function ResearchPage() {
  const t = useTranslations('research')
  const tNav = useTranslations('nav')

  return (
    <div className="min-h-screen bg-[#fffaf5] dark:bg-gray-950">
      <div className="max-w-5xl mx-auto px-6">
        {/* Back link */}
        <div className="pt-24 md:pt-28">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {tNav('home')}
          </Link>
        </div>

        {/* Hero */}
        <header className="pt-8 md:pt-12 pb-20">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-8">
            {t('title')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            {t('subtitle')}
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
            {t('vision')}
          </p>
        </header>

        {/* Main Content - Offer & Seek together */}
        <section className="pb-20">
          <div className="grid md:grid-cols-2 gap-16 md:gap-20">
            {/* What We Offer */}
            <div>
              <h2 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-8">
                {t('offer.title')}
              </h2>
              <div className="space-y-8">
                {['openSource', 'technology', 'userReach'].map((key) => (
                  <div key={key}>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-2">
                      {t(`offer.${key}.title`)}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                      {t(`offer.${key}.desc`)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* What We Seek */}
            <div>
              <h2 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-8">
                {t('seek.title')}
              </h2>
              <div className="space-y-8">
                {['validation', 'advisor', 'academic', 'data'].map((key) => (
                  <div key={key}>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-2">
                      {t(`seek.${key}.title`)}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                      {t(`seek.${key}.desc`)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-16 border-t border-orange-100 dark:border-gray-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-3">
            {t('contact.title')}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-lg">
            {t('contact.desc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="mailto:domi@melolib.com"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-900 dark:bg-gray-50 text-white dark:text-gray-900 rounded-full text-sm font-medium hover:bg-gray-800 dark:hover:bg-white transition-colors"
            >
              <Mail className="w-4 h-4" />
              {t('contact.email')}
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/anthropics/head-start"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:bg-white dark:hover:bg-gray-800 transition-colors"
            >
              <Github className="w-4 h-4" />
              {t('contact.github')}
            </a>
          </div>
        </section>

        {/* Disclaimer */}
        <p className="py-12 text-sm text-gray-400 dark:text-gray-500 border-t border-orange-100 dark:border-gray-800">
          {t('disclaimer')}
        </p>
      </div>
    </div>
  )
}
