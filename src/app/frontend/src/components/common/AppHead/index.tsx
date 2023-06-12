import { Metadata } from 'next'
import { SITE_URL } from '~/config/env'

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

const siteName = ''
const baseDescription = ''

export const AppHead = ({
  title,
  description,
  ogImage,
  ogType,
  canonical,
  robots,
  prev,
  next,
}: Props): Metadata => {
  const titleText = title ? `${title}|${siteName}` : siteName
  const descriptionText = description ?? baseDescription
  const ogImageUrl = ogImage ?? `${SITE_URL}/assets/img/img-ogp.png`
  const canonicalUrl = canonical ?? SITE_URL

  const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    viewport:
      'width=device-width, initial-scale=1.0, minimum-scale=1.0, shrink-to-fit=no, viewport-fit=cover',
    formatDetection: {
      telephone: false,
    },
    title: titleText,
    description: descriptionText,
    themeColor: '#ffffff',
    twitter: {
      card: 'summary_large_image',
      images: ogImageUrl,
      title: titleText,
      description: descriptionText,
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
