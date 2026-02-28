import '@/styles/globals.css'
import { Metadata, Viewport } from 'next'
import clsx from 'clsx'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'

import { Providers } from '../providers'
import { JsonLd } from '@/components/json-ld'

import { fontSans } from '@/config/fonts'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { MobileBottomNav } from '@/components/mobile-bottom-nav'
import { LayoutWrapper } from '@/components/layout-wrapper'
import { NetworkStatus } from '@/components/network-status'
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
      canonical: locale === 'zh' ? '/' : '/en',
      languages: {
        'zh-CN': '/',
        'en-US': '/en',
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
      alternateLocale: locale === 'zh' ? ['en_US'] : ['zh_CN'],
      url: `https://head.melolib.com${locale === 'zh' ? '' : '/en'}`,
      title: `${site.title} - ${page.home.title}`,
      description: site.description,
      siteName: site.title,
      images: [
        {
          url: locale === 'zh' ? '/og-image.jpg' : '/og-image-en.jpg',
          width: 1200,
          height: 630,
          alt: `${site.title} - ${page.home.title}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${site.title} - ${page.home.title}`,
      description: site.description,
      images: [locale === 'zh' ? '/og-image.jpg' : '/og-image-en.jpg'],
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
      icon: [
        { url: '/favicon.svg', type: 'image/svg+xml' },
        { url: '/favicon.png', type: 'image/png' },
      ],
      apple: '/logo_with_bg.png',
    },
    manifest: '/site.webmanifest',
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fffaf5' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
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
  const site = messages.site as { title: string; description: string }

  return (
    <html suppressHydrationWarning lang={locale === 'zh' ? 'zh-CN' : 'en-US'}>
      <head>
        {/* JSON-LD Structured Data */}
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: site.title,
            url: 'https://head.melolib.com',
            logo: 'https://head.melolib.com/logo_with_bg.png',
            description: site.description,
            sameAs: ['https://github.com/voyax/lunasphere-web'],
          }}
        />
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: site.title,
            url: 'https://head.melolib.com',
            inLanguage: locale === 'zh' ? 'zh-CN' : 'en-US',
          }}
        />
        {/* PWA & Mobile App Meta Tags */}
        <meta content={site.title} name='application-name' />
        <meta content='yes' name='apple-mobile-web-app-capable' />
        <meta content='black-translucent' name='apple-mobile-web-app-status-bar-style' />
        <meta content={site.title} name='apple-mobile-web-app-title' />
        <meta content='telephone=no' name='format-detection' />
        <meta content='yes' name='mobile-web-app-capable' />
        
        {/* iOS Splash Screens - iPhone SE to iPhone 15 Pro Max */}
        <link
          rel='apple-touch-startup-image'
          href='/splash/apple-splash-2048-2732.png'
          media='(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
        />
        <link
          rel='apple-touch-startup-image'
          href='/splash/apple-splash-1170-2532.png'
          media='(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
        />
        <link
          rel='apple-touch-startup-image'
          href='/splash/apple-splash-1179-2556.png'
          media='(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
        />
        <link
          rel='apple-touch-startup-image'
          href='/splash/apple-splash-1290-2796.png'
          media='(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
        />
        <link
          rel='apple-touch-startup-image'
          href='/splash/apple-splash-1284-2778.png'
          media='(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
        />
        <link
          rel='apple-touch-startup-image'
          href='/splash/apple-splash-750-1334.png'
          media='(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
        />
        
        {/* iOS Touch Icon */}
        <link rel='apple-touch-icon' href='/logo_with_bg.png' />
        <link rel='apple-touch-icon' sizes='180x180' href='/logo_with_bg.png' />
        
        {/* Microsoft Tiles */}
        <meta content='/browserconfig.xml' name='msapplication-config' />
        <meta content='#fffaf5' name='msapplication-TileColor' />
        <meta content='no' name='msapplication-tap-highlight' />
        
        {/* Prevent zoom on input focus (iOS Safari) */}
        <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover' />
        
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
              <main className='flex-grow w-full max-w-full'>
                <LayoutWrapper>{children}</LayoutWrapper>
              </main>
              <Footer />
              <MobileBottomNav />
              <NetworkStatus />
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


