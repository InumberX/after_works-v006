import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import ErrorPage from '~/app/[locale]/error'
import { SITE_NAME } from '~/config/env'

// next-international の I18nProviderClient は描画のたびに辞書の読み込みを
// やり直すため、テストでは表示されない。辞書をそのまま引くフックに差し替える
const i18n = vi.hoisted(() => ({ locale: 'ja' as 'ja' | 'en' }))

vi.mock('~/locales/client', async () => {
  const { default: ja } = await import('~/locales/ja')
  const { default: en } = await import('~/locales/en')
  const dictionaries = { ja, en }

  const lookup = (value: unknown, path: string): unknown =>
    path
      .split('.')
      .reduce<unknown>(
        (current, key) =>
          (current as Record<string, unknown> | undefined)?.[key],
        value,
      )

  return {
    useCurrentLocale: () => i18n.locale,
    useScopedI18n:
      (scope: string) =>
      (key: string): string =>
        String(lookup(dictionaries[i18n.locale], `${scope}.${key}`)),
  }
})

describe('エラーのページ', () => {
  beforeEach(() => {
    // 見出しなどのアニメーション（useAnimelm）が使う。jsdom にはないので空の実装を置く
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        observe() {}
        unobserve() {}
        disconnect() {}
      },
    )
  })

  afterEach(() => {
    cleanup()
    vi.unstubAllGlobals()
  })

  it.each([
    [
      'ja',
      'ページを表示できませんでした',
      '時間をおいて、もう一度お試しください。',
      'トップに戻る',
      '/',
    ],
    [
      'en',
      'The Page Could Not Be Displayed',
      'Please wait a moment and try again.',
      'Return to Top',
      '/en',
    ],
  ] as const)(
    '%s: 404 のページと同じ構成で、見出し・案内文・トップへのリンクを表示する',
    (locale, pageTitle, text, buttonText, homeUrl) => {
      i18n.locale = locale

      render(<ErrorPage />)

      expect(
        screen.getByRole('heading', { name: new RegExp(pageTitle) }),
      ).toBeInTheDocument()
      expect(screen.getByText(new RegExp(text))).toBeInTheDocument()
      expect(screen.getByRole('link', { name: buttonText })).toHaveAttribute(
        'href',
        homeUrl,
      )
      expect(document.title).toBe(`${pageTitle} | ${SITE_NAME}`)
    },
  )
})
