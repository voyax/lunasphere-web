'use client'

import { useTranslations, useMessages } from 'next-intl'

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
 * Displays a list of reference sources with customizable content
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
      className={`bg-gradient-to-r from-slate-50 via-gray-50 to-zinc-50 border border-slate-200 rounded-3xl p-4 sm:p-6 lg:p-8 shadow-lg ${className}`}
    >
      <div className='flex items-start gap-3 sm:gap-4 lg:gap-6'>
        <div className='flex-1'>
          <h3 className='text-lg sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3'>
            {t(titleKeyParts.join('.'))}
          </h3>
          <div className='text-slate-700 leading-relaxed text-sm sm:text-base lg:text-lg space-y-2 sm:space-y-4'>
            <ul className='space-y-1 sm:space-y-2'>
              {sources.map((source, index) => (
                <li key={index} className='flex items-start'>
                  <span className='text-slate-400 mr-1 sm:mr-2 mt-0.5'>•</span>
                  <a
                    className='text-blue-600 hover:text-blue-800 underline transition-colors duration-200 break-words leading-relaxed'
                    href={source.url}
                    rel='noopener noreferrer'
                    target='_blank'
                  >
                    {source.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
