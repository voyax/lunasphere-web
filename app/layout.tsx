import '@/styles/globals.css'
import { Metadata, Viewport } from 'next'
import clsx from 'clsx'

import { Providers } from './providers'

import { fontSans } from '@/config/fonts'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { getServerTranslation, getServerLocale } from '@/lib/i18n-server'

// Enhanced SEO metadata with multilingual support
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale()
  const t = await getServerTranslation(locale)

  return {
    title: {
      default: t('site.title'),
      template: `%s - ${t('site.title')}`,
    },
    description: t('site.description'),
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
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
      alternateLocale: locale === 'zh' ? ['en_US'] : ['zh_CN'],
      url: 'https://head.melolib.com',
      title: `${t('site.title')} - ${t('page.home.title')}`,
      description: t('site.description'),
      siteName: t('site.title'),
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `${t('site.title')} - ${t('page.home.title')}`,
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

// JSON-LD structured data for SEO - moved inside generateMetadata for i18n support

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = await getServerLocale()
  const t = await getServerTranslation(locale)

  return (
    <html suppressHydrationWarning lang={locale === 'zh' ? 'zh-CN' : 'en-US'}>
      <head>
        {/* Preconnect to external domains for performance */}
        <link href='https://cloud.umami.is' rel='preconnect' />

        {/* Single domain multilingual site - no hreflang needed */}

        {/* Additional meta tags for better SEO */}
        <meta content={t('site.title')} name='application-name' />
        <meta content='yes' name='apple-mobile-web-app-capable' />
        <meta content='default' name='apple-mobile-web-app-status-bar-style' />
        <meta content={t('site.title')} name='apple-mobile-web-app-title' />
        <meta content='telephone=no' name='format-detection' />
        <meta content='yes' name='mobile-web-app-capable' />
        <meta content='/browserconfig.xml' name='msapplication-config' />
        <meta content='#ffffff' name='msapplication-TileColor' />
        <meta content='no' name='msapplication-tap-highlight' />
        <meta content='ca-pub-7872850129709956' name='google-adsense-account' />

        {/* Structured data - TODO: Move to generateMetadata for i18n support */}
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
