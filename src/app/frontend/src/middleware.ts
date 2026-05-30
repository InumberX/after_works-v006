import { createI18nMiddleware } from 'next-international/middleware'
import type { NextRequest } from 'next/server'

// NOTE: This file uses the (now deprecated in Next.js 16) `middleware.ts`
// convention on purpose. Next.js 16 renamed middleware to `proxy.ts`, but the
// Proxy always runs on the Node.js runtime, which the OpenNext Cloudflare
// adapter does not yet support. The `middleware.ts` convention still runs on
// the Edge runtime, which OpenNext supports, so the i18n locale rewriting keeps
// working on Cloudflare Workers. See https://github.com/cloudflare/workers-sdk/issues/13755
const I18nMiddleware = createI18nMiddleware({
  locales: ['ja', 'en'],
  defaultLocale: 'ja',
  urlMappingStrategy: 'rewriteDefault',
  resolveLocaleFromRequest: (request) => {
    const paths = request.nextUrl.pathname.split('/').splice(1)

    if (paths.length === 0) {
      return 'ja'
    }

    switch (paths[0]) {
      case 'en':
        return 'en'
      default:
        return 'ja'
    }
  },
})

export function middleware(request: NextRequest) {
  return I18nMiddleware(request)
}

export const config = {
  matcher: [
    '/((?!api|static|assets|.*\\..*|_next|favicon.ico|apple-icon.png|robots.txt|sitemap.xml|ads.txt).*)',
  ],
}
