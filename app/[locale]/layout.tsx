import '@/styles/globals.css'
import { Metadata, Viewport } from 'next'
import clsx from 'clsx'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'

import { Providers } from '../providers'

import { fontSans } from '@/config/fonts'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { routing } from '@/i18n/routing'
import { Locale } from '@/i18n/config'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

/**
 * 生成静态路由参数
 * 为每个支持的语言生成静态页面
 */
export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
}

/**
 * 生成页面元数据
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const messages = await getMessages({ locale })

  // 类型安全地获取翻译
  const site = messages.site as { title: string; description: string }
  const page = messages.page as { home: { title: string; description: string } }

  return {
    title: {
      default: site.title,
      template: `%s - ${site.title}`,
    },
    description: site.description,
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
      languages: {
        'zh-CN': '/zh',
        'en-US': '/en',
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
      alternateLocale: locale === 'zh' ? ['en_US'] : ['zh_CN'],
      url: 'https://head.melolib.com',
      title: `${site.title} - ${page.home.title}`,
      description: site.description,
      siteName: site.title,
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `${site.title} - ${page.home.title}`,
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

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  // 验证语言是否支持
  if (!routing.locales.includes(locale as Locale)) {
    notFound()
  }

  // 启用静态渲染
  setRequestLocale(locale)

  // 获取翻译消息
  const messages = await getMessages()
  const site = messages.site as { title: string }

  return (
    <html suppressHydrationWarning lang={locale === 'zh' ? 'zh-CN' : 'en-US'}>
      <head>
        {/* Additional meta tags for better SEO */}
        <meta content={site.title} name='application-name' />
        <meta content='yes' name='apple-mobile-web-app-capable' />
        <meta content='default' name='apple-mobile-web-app-status-bar-style' />
        <meta content={site.title} name='apple-mobile-web-app-title' />
        <meta content='telephone=no' name='format-detection' />
        <meta content='yes' name='mobile-web-app-capable' />
        <meta content='/browserconfig.xml' name='msapplication-config' />
        <meta content='#ffffff' name='msapplication-TileColor' />
        <meta content='no' name='msapplication-tap-highlight' />
        {process.env.GOOGLE_ANALYTICS_ID && (
          <meta
            content={process.env.GOOGLE_ANALYTICS_ID}
            name='google-adsense-account'
          />
        )}
      </head>
      <body
        className={clsx(
          'min-h-screen text-foreground font-sans antialiased',
          fontSans.variable
        )}
      >
        <NextIntlClientProvider messages={messages}>
          <Providers themeProps={{ attribute: 'class', defaultTheme: 'light' }}>
            <div className='relative flex flex-col min-h-screen w-full max-w-full overflow-x-hidden'>
              <Navbar />
              <main className='flex-grow w-full max-w-full'>{children}</main>
              <Footer />
            </div>
          </Providers>
        </NextIntlClientProvider>

        {/* Analytics script */}
        {process.env.UMAMI_WEBSITE_ID && process.env.UMAMI_SCRIPT_URL && (
          <script
            defer
            data-website-id={process.env.UMAMI_WEBSITE_ID}
            src={process.env.UMAMI_SCRIPT_URL}
          />
        )}

        {/* Google Ads */}
        {process.env.GOOGLE_ANALYTICS_ID && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.GOOGLE_ANALYTICS_ID}`}
            crossOrigin='anonymous'
          />
        )}
      </body>
    </html>
  )
}


