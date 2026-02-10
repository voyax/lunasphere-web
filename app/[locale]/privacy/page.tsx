'use client'

import { useTranslations } from 'next-intl'
import { ArrowLeft, Shield, Eye, Lock, Trash2, Baby, ServerOff } from 'lucide-react'
import Link from 'next/link'

export default function PrivacyPage() {
  const t = useTranslations('privacy')
  const tNav = useTranslations('nav')

  const principles = [
    { key: 'noTraining', icon: ServerOff },
    { key: 'noCommercial', icon: Shield },
    { key: 'encryption', icon: Lock },
    { key: 'userControl', icon: Trash2 },
  ]

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
        <header className="pt-8 md:pt-12 pb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">
            {t('title')}
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl">
            {t('intro')}
          </p>
        </header>

        {/* Core Principles */}
        <section className="pb-16">
          <div className="grid sm:grid-cols-2 gap-6">
            {principles.map(({ key, icon: Icon }) => (
              <div
                key={key}
                className="flex gap-4 p-6 bg-white dark:bg-gray-900 rounded-xl border border-orange-100 dark:border-gray-800"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-50 mb-1">
                    {t(`principles.${key}.title`)}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t(`principles.${key}.desc`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Detailed Sections */}
        <section className="pb-16 space-y-12">
          {['dataCollection', 'dataUsage', 'dataSecurity', 'userRights', 'children', 'updates'].map((section) => (
            <div key={section}>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-4">
                {t(`sections.${section}.title`)}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                {t(`sections.${section}.content`)}
              </p>
            </div>
          ))}
        </section>

        {/* Contact */}
        <section className="py-12 border-t border-orange-100 dark:border-gray-800">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">
            {t('contact.title')}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            {t('contact.desc')}
          </p>
          <a
            href="mailto:privacy@lunasphere.app"
            className="text-orange-600 dark:text-orange-400 hover:underline"
          >
            privacy@lunasphere.app
          </a>
        </section>

        {/* Last updated */}
        <p className="py-8 text-sm text-gray-400 dark:text-gray-500 border-t border-orange-100 dark:border-gray-800">
          {t('lastUpdated')}: 2025-01-01
        </p>
      </div>
    </div>
  )
}
