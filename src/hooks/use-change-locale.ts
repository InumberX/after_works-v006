'use client'

import { usePathname } from 'next/navigation'

import { useCurrentLocale } from '~/locales/client'

type Locale = 'ja' | 'en'

const DEFAULT_LOCALE: Locale = 'ja'

/**
 * Locale switcher used by the language menu.
 *
 * This intentionally replaces next-international's `useChangeLocale`. That hook
 * always prefixes the URL with the locale — even the default one — so switching
 * back to Japanese pushes `/ja/`, which the i18n middleware then has to
 * 308 (trailing slash) + 307 (rewriteDefault) redirect down to `/`. On the
 * OpenNext/Cloudflare runtime that multi-hop redirect during a client-side RSC
 * navigation does not settle reliably: the App Router's `params.locale` gets
 * stuck on the previous locale, so every link (built from `useCurrentLocale`)
 * keeps pointing at the wrong language after a ja → en → ja round trip.
 *
 * Instead we navigate straight to the *canonical* URL for the target locale
 * (no `/ja` prefix for the default, no trailing-slash hop) with a full document
 * load. The middleware then runs exactly once on a real request, so the locale,
 * the `Next-Locale` cookie, and the rendered links all settle consistently. A
 * language switch triggering a full reload is acceptable and sidesteps the RSC
 * redirect fragility entirely.
 */
export const useChangeLocale = () => {
  const pathname = usePathname()
  const currentLocale = useCurrentLocale() as Locale

  return (newLocale: Locale) => {
    if (newLocale === currentLocale) {
      return
    }

    // Strip the current (non-default) locale prefix to get the locale-agnostic
    // path, e.g. `/en/blogs` -> `/blogs`, `/en` -> `/`.
    const basePath =
      currentLocale === DEFAULT_LOCALE
        ? pathname
        : pathname.replace(new RegExp(`^/${currentLocale}`), '') || '/'

    // Build the canonical URL: the default locale has no prefix, and its home is
    // exactly `/` (not `/ja`); other locales are prefixed, with the home being
    // `/en` (no trailing slash).
    const target =
      newLocale === DEFAULT_LOCALE
        ? basePath
        : `/${newLocale}${basePath === '/' ? '' : basePath}`

    window.location.assign(target)
  }
}
