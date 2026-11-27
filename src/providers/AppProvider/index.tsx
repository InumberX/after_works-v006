import { notFound } from 'next/navigation'
import { StrictMode, type ReactNode } from 'react'

import { LOCALES, type Locale } from '~/consts/locale'
import en from '~/locales/en'
import ja from '~/locales/ja'
import { BreakpointsProvider } from '~/providers/BreakpointsProvider'
import { JotaiProvider } from '~/providers/JotaiProvider'
import { LocaleProvider } from '~/providers/LocaleProvider'
import { ZodProvider } from '~/providers/ZodProvider'

// サーバーコンポーネントなので、辞書はクライアントのバンドルに入らない。
// 表示する言語の辞書だけを LocaleProvider に props で渡す
const MESSAGES = { ja, en } as const

const isLocale = (locale: string): locale is Locale =>
  (LOCALES as readonly string[]).includes(locale)

export const AppProvider = ({
  children,
  locale,
}: {
  children: ReactNode
  locale: string
}) => {
  // next-international の I18nProviderClient と同じく、対応しない言語は 404 にする
  if (!isLocale(locale)) {
    notFound()
  }

  return (
    <StrictMode>
      <LocaleProvider locale={locale} messages={MESSAGES[locale]}>
        <JotaiProvider>
          <ZodProvider>
            <BreakpointsProvider>{children}</BreakpointsProvider>
          </ZodProvider>
        </JotaiProvider>
      </LocaleProvider>
    </StrictMode>
  )
}
