import '@/styles/globals.css'
import { Metadata, Viewport } from 'next'
import clsx from 'clsx'

import { Providers } from './providers'

import { siteConfig } from '@/config/site'
import { fontSans } from '@/config/fonts'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

// Enhanced SEO metadata with multilingual support
export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    '婴儿头型',
    '头型发育',
    '扁头综合征',
    '斜头畸形',
    '婴儿护理',
    '新生儿',
    'infant head shape',
    'plagiocephaly',
    'brachycephaly',
    'positional head deformity',
    'baby care',
    'newborn development',
  ],
  authors: [{ name: 'MeloLib Team' }],
  creator: 'Melo',
  publisher: 'Melo',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://head.melolib.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    alternateLocale: ['en_US'],
    url: 'https://head.melolib.com',
    title: '小月颅 - 婴儿头型发育科学指南',
    description:
      '科学认知婴儿头型发育，理性护理减少焦虑。专业的婴儿头型评估和护理建议，帮助新手父母建立正确认知。',
    siteName: '小月颅',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '小月颅 - 婴儿头型发育指南',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  colorScheme: 'light dark',
}

// JSON-LD structured data for SEO
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: '小月颅',
  alternateName: 'HeadStart',
  url: 'https://head.melolib.com',
  description: '科学认知婴儿头型发育，理性护理减少焦虑',
  inLanguage: ['zh-CN', 'en-US'],
  publisher: {
    '@type': 'Organization',
    name: '小月颅',
    url: 'https://head.melolib.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://head.melolib.com/logo.png',
    },
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://head.melolib.com/search?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
  mainEntity: {
    '@type': 'MedicalWebPage',
    name: '婴儿头型发育指南',
    description: '专业的婴儿头型发育知识和护理指导',
    medicalAudience: {
      '@type': 'MedicalAudience',
      audienceType: 'Patient',
    },
    about: {
      '@type': 'MedicalCondition',
      name: '婴儿头型发育',
      alternateName: [
        '扁头综合征',
        '斜头畸形',
        'Plagiocephaly',
        'Brachycephaly',
      ],
    },
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning lang='zh-CN'>
      <head>
        {/* Preconnect to external domains for performance */}
        <link href='https://cloud.umami.is' rel='preconnect' />

        {/* Single domain multilingual site - no hreflang needed */}

        {/* Additional meta tags for better SEO */}
        <meta content='小月颅' name='application-name' />
        <meta content='yes' name='apple-mobile-web-app-capable' />
        <meta content='default' name='apple-mobile-web-app-status-bar-style' />
        <meta content='小月颅' name='apple-mobile-web-app-title' />
        <meta content='telephone=no' name='format-detection' />
        <meta content='yes' name='mobile-web-app-capable' />
        <meta content='/browserconfig.xml' name='msapplication-config' />
        <meta content='#ffffff' name='msapplication-TileColor' />
        <meta content='no' name='msapplication-tap-highlight' />

        {/* Structured data */}
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          type='application/ld+json'
        />
      </head>
      <body
        className={clsx(
          'min-h-screen text-foreground bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'light' }}>
          <div className='relative flex flex-col min-h-screen w-full max-w-full overflow-x-hidden'>
            <Navbar />
            <main className='flex-grow w-full max-w-full'>{children}</main>
            <Footer />
          </div>
        </Providers>

        {/* Analytics script */}
        <script
          defer
          data-website-id='ca3cd041-c67b-4dc9-bce5-08188632f253'
          src='/u/script.js'
        />
      </body>
    </html>
  )
}
