import { MetadataRoute } from 'next'

const BASE_URL = 'https://head.melolib.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['zh', 'en']
  const lastModified = new Date()

  const pages = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/detection', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/learn', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/profile-match', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/faq', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/research', priority: 0.5, changeFrequency: 'monthly' as const },
    { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
  ]

  return pages.flatMap((page) =>
    locales.map((locale) => ({
      url: `${BASE_URL}${locale === 'zh' ? '' : '/en'}${page.path}`,
      lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: {
          'zh-CN': `${BASE_URL}${page.path}`,
          'en-US': `${BASE_URL}/en${page.path}`,
        },
      },
    }))
  )
}
