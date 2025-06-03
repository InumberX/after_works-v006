import { Metadata, Viewport } from 'next'
import { SITE_URL, SITE_NAME } from '@/config/env'
import { getCurrentLocale } from '@/locales/server'

type Props = {
  title?: string
  description?: string
  ogImage?: string
  ogType?: 'website' | 'article'
  canonical?: string
  robots?: 'noindex' | 'nofollow' | 'noindex, nofollow'
  prev?: string
  next?: string
}

const siteName = SITE_NAME
export const baseDescriptions = {
  ja: '東京都在住のフロントエンドエンジニア：N/NE（ナイン）のポートフォリオ用Webサイトです。',
  en: 'This is the portfolio website for N/NE (Nine), a Front-end Engineer based in Tokyo.',
}

export const AppHead = async ({
  title,
  description,
  ogImage,
  ogType,
  canonical,
  robots,
  prev,
  next,
}: Props): Promise<Metadata> => {
  const locale = await getCurrentLocale()
  const titleText = title
    ? `${title} | ${siteName}`
    : `${siteName} - N/NE's Portfolio Site`
  const descriptionText = description ?? baseDescriptions[locale]
  const ogImageUrl = ogImage ?? `${SITE_URL}/assets/img/img-ogp.png`
  const canonicalUrl = canonical ?? SITE_URL

  const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    /*
    viewport:
      'width=device-width, initial-scale=1.0, minimum-scale=1.0, shrink-to-fit=no, viewport-fit=cover',
      */
    formatDetection: {
      telephone: false,
    },
    title: titleText,
    description: descriptionText,
    // themeColor: '#000911',
    twitter: {
      card: 'summary_large_image',
      images: ogImageUrl,
      title: titleText,
      description: descriptionText,
      site: '@InumberX',
    },
    openGraph: {
      siteName,
      type: ogType ?? 'website',
      url: canonicalUrl,
      title: titleText,
      description: descriptionText,
      images: {
        url: ogImageUrl,
      },
    },
    alternates: {
      canonical: canonicalUrl,
    },
    ...(robots && { robots }),
    ...(prev && { prev }),
    ...(next && { next }),
  }

  return metadata
}

export const viewport: Viewport = {
  themeColor: '#000911',
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  viewportFit: 'cover',
}
