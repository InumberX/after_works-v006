export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export const SITE_ROOT = process.env.NEXT_PUBLIC_SITE_ROOT || ''

export const STATIC_IMAGE_DIR =
  process.env.NEXT_PUBLIC_STATIC_IMAGE_DIR || '/assets/img'

export const SITE_NAME =
  process.env.NEXT_PUBLIC_SITE_NAME || 'AfterWorks.（開発）'

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  'https://afterworks.g.kuroco.app/rcms-api/6'

export const GOOGLE_ANALYTICS_ID =
  process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || 'G-XVVDZTWTWS'

export const CACHE_BUSTER =
  process.env.NEXT_PUBLIC_CACHE_BUSTER || `ver=${new Date().toISOString()}`

export const LASTMOD =
  process.env.NEXT_PUBLIC_LASTMOD || new Date().toISOString()
