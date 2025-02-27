import * as path from 'path'
import { withSentryConfig } from '@sentry/nextjs'

const __dirname = path.dirname(new URL(import.meta.url).pathname)

const now = new Date()
const nowDatetime =
  now.getFullYear() +
  ('0' + (now.getMonth() + 1)).slice(-2) +
  ('0' + now.getDate()).slice(-2) +
  ('0' + now.getHours()).slice(-2) +
  ('0' + now.getMinutes()).slice(-2) +
  ('0' + now.getSeconds()).slice(-2)
const cashBuster = `ver=${nowDatetime}`
const lastmod =
  now.getFullYear() +
  '-' +
  ('0' + (now.getMonth() + 1)).slice(-2) +
  '-' +
  ('0' + now.getDate()).slice(-2) +
  'T' +
  ('0' + now.getHours()).slice(-2) +
  ':' +
  ('0' + now.getMinutes()).slice(-2) +
  ':' +
  ('0' + now.getSeconds()).slice(-2) +
  '+09:00'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // distDir: 'out',
  // output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
    // importした画像の型定義設定を無効にする
    disableStaticImages: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
  env: {
    NEXT_PUBLIC_CASH_BUSTER: cashBuster,
    NEXT_PUBLIC_LASTMOD: lastmod,
  },
  async rewrites() {
    return [
      {
        source: '/rss.xml',
        destination: '/api/rss',
      },
    ]
  },
}

export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,

  // An auth token is required for uploading source maps.
  // authToken: process.env.SENTRY_AUTH_TOKEN,

  sourcemaps: {
    disable: true,
  },

  silent: false, // Can be used to suppress logs
})
