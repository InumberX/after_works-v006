export const SITE_URL =
  // eslint-disable-next-line no-undef
  process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export const SITE_ROOT =
  // eslint-disable-next-line no-undef
  process.env.NEXT_PUBLIC_SITE_ROOT || ''

export const STATIC_IMAGE_DIR =
  // eslint-disable-next-line no-undef
  process.env.NEXT_PUBLIC_STATIC_IMAGE_DIR || '/assets/img'

export const SITE_NAME =
  // eslint-disable-next-line no-undef
  process.env.NEXT_PUBLIC_SITE_NAME || 'AfterWorks.（開発）'

export const API_URL =
  // eslint-disable-next-line no-undef
  process.env.NEXT_PUBLIC_API_URL ||
  'https://afterworks.g.kuroco.app/rcms-api/6'

export const GOOGLE_ANALYTICS_ID =
  // eslint-disable-next-line no-undef
  process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || 'G-XVVDZTWTWS'

export const CASH_BUSTER =
  // eslint-disable-next-line no-undef
  process.env.NEXT_PUBLIC_CASH_BUSTER || `ver=${new Date().toISOString()}`

export const LASTMOD =
  // eslint-disable-next-line no-undef
  process.env.NEXT_PUBLIC_LASTMOD || new Date().toISOString()
