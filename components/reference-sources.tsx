'use client'

import { useTranslations, useMessages } from 'next-intl'
import { BookOpen } from 'lucide-react'

// Reference sources data structure
interface ReferenceSource {
  text: string
  url: string
}

interface ReferenceSourcesProps {
  titleKey?: string
  sourceKeyPrefix?: string
  className?: string
}

/**
 * Generate reference sources from i18n data dynamically
 */
const generateReferenceSources = (
  messages: Record<string, unknown>,
  sourceKeyPrefix: string
): ReferenceSource[] => {
  const sources: ReferenceSource[] = []

  // Parse the prefix to navigate the messages object
  // e.g., 'faq.references' -> messages.faq.references
  const prefixParts = sourceKeyPrefix.split('.')
  let current: unknown = messages

  for (const part of prefixParts) {
    if (current && typeof current === 'object' && part in current) {
      current = (current as Record<string, unknown>)[part]
    } else {
      return sources
    }
  }

  // Now current should be the references object
  // Look for source1, source2, etc.
  if (typeof current === 'object' && current !== null) {
    let i = 1
    while (true) {
      const sourceKey = `source${i}`
      const sourceObj = (current as Record<string, unknown>)[sourceKey]

      if (!sourceObj || typeof sourceObj !== 'object') {
        break
      }

      const source = sourceObj as { text?: string; url?: string }
      if (source.text && source.url) {
        sources.push({ text: source.text, url: source.url })
      }
      i++
    }
  }

  return sources
}

/**
 * Reference Sources Component
 * Displays a list of reference sources with warm glassmorphism style
 */
export default function ReferenceSources({
  titleKey = 'faq.references.title',
  sourceKeyPrefix = 'faq.references',
  className = '',
}: ReferenceSourcesProps) {
  const messages = useMessages()

  // Parse namespace from the titleKey
  const [titleNamespace, ...titleKeyParts] = titleKey.split('.')
  const t = useTranslations(titleNamespace)

  const sources = generateReferenceSources(messages as Record<string, unknown>, sourceKeyPrefix)

  return (
    <div
      className={`
        relative overflow-hidden
        bg-white/60 dark:bg-gray-800/60
        backdrop-blur-sm
        border border-orange-100 dark:border-orange-900/30
        rounded-[2rem]
        p-6 sm:p-8 lg:p-10
        shadow-sm hover:shadow-md
        transition-shadow duration-300
        ${className}
      `}
    >
      {/* Decorative icon */}
      <div className='absolute top-4 right-4 opacity-10 dark:opacity-5'>
        <BookOpen className='w-16 h-16 text-orange-300' />
      </div>

      <div className='relative z-10'>
        <h3 className='text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 tracking-tight flex items-center gap-2'>
          <BookOpen className='w-5 h-5 text-orange-400' />
          {t(titleKeyParts.join('.'))}
        </h3>

        <ul className='space-y-3'>
          {sources.map((source, index) => (
            <li key={index} className='flex items-start group'>
              <span className='text-orange-300 dark:text-orange-600 mr-3 mt-1 text-sm'>
                {index + 1}.
              </span>
              <a
                className='text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 text-sm font-medium leading-relaxed transition-colors duration-200 break-words'
                href={source.url}
                rel='noopener noreferrer'
                target='_blank'
              >
                {source.text}
                <span className='inline-block ml-1 opacity-0 group-hover:opacity-100 transition-opacity'>
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
