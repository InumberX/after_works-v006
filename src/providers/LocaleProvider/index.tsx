'use client'

import { useMemo, type ContextType, type ReactNode } from 'react'

import type { Locale } from '~/consts/locale'
import { I18nClientContext } from '~/locales/client'
import type en from '~/locales/en'
import type ja from '~/locales/ja'
import { flattenLocale } from '~/utils/flatten-locale'

type LocaleContextValue = NonNullable<ContextType<typeof I18nClientContext>>

// next-international の I18nProviderClient は使わない。I18nProviderClient は
// 辞書を動的 import で読み込むために子要素を <Suspense> で包むので、ページ全体が
// その中に入る。ページの描画を待つ間に Suspense の外側（200 のシェル）が先に
// 送られ、ページで notFound() を呼んでもステータスが 404 にならない（#284）。
// ここでは辞書をサーバーから props で受け取り、Suspense なしで同じ Context に渡す。
// useI18n などのフックは next-international のものをそのまま使う
export const LocaleProvider = ({
  children,
  locale,
  messages,
}: {
  children: ReactNode
  locale: Locale
  messages: typeof ja | typeof en
}) => {
  const value = useMemo<LocaleContextValue>(
    () => ({
      localeContent: flattenLocale(
        messages,
      ) as LocaleContextValue['localeContent'],
      fallbackLocale: undefined,
      locale,
    }),
    [locale, messages],
  )

  return (
    <I18nClientContext.Provider value={value}>
      {children}
    </I18nClientContext.Provider>
  )
}
