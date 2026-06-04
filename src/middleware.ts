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

// The locale is derived purely from the URL (see `resolveLocaleFromRequest`
// above). However, next-international's middleware reads the `Next-Locale`
// cookie *before* falling back to `resolveLocaleFromRequest`, so a stale cookie
// overrides the explicit URL. That breaks language switching: clicking
// "English" while the cookie still holds "ja" navigates to `/en`, but the
// middleware reads the cookie, decides `/en` doesn't match, and 307-redirects
// back to `/` (Japanese) — the switch appears to do nothing. Deleting the cookie
// from the request makes the URL path the single source of truth, so `/en`
// always resolves to English. The response still re-sets the cookie in sync with
// the resolved locale, so nothing downstream depends on it being present here.
export function middleware(request: NextRequest) {
  request.cookies.delete('Next-Locale')
  return I18nMiddleware(request)
}

export const config = {
  matcher: [
    '/((?!api|static|assets|.*\\..*|_next|favicon.ico|apple-icon.png|robots.txt|sitemap.xml|ads.txt).*)',
  ],
}
