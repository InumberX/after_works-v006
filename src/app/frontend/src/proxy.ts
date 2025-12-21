import { NextRequest } from 'next/server'
import { createI18nMiddleware } from 'next-international/middleware'

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

export function proxy(request: NextRequest) {
  return I18nMiddleware(request)
}

export const config = {
  matcher: [
    '/((?!api|static|assets|.*\\..*|_next|favicon.ico|apple-icon.png|robots.txt|sitemap.xml|ads.txt).*)',
  ],
}
