import { cleanup, render, screen } from '@testing-library/react'
import { Suspense } from 'react'
import { afterEach, describe, expect, it } from 'vitest'

import { useI18n, useScopedI18n } from '~/locales/client'
import en from '~/locales/en'
import ja from '~/locales/ja'
import { LocaleProvider } from '~/providers/LocaleProvider'

// useCurrentLocale は Context ではなく URL のパラメータ（useParams）を読むので、ここでは見ない
const Texts = () => {
  const t = useI18n()
  const scopedT = useScopedI18n('notFound')

  return (
    <>
      <p>{t('home.title')}</p>
      <p>{scopedT('pageTitle')}</p>
    </>
  )
}

describe('LocaleProvider', () => {
  afterEach(() => {
    cleanup()
  })

  it.each([
    ['ja', ja],
    ['en', en],
  ] as const)(
    '%s: next-international のフックが、渡した辞書の文言を返す',
    (locale, messages) => {
      render(
        <LocaleProvider locale={locale} messages={messages}>
          <Texts />
        </LocaleProvider>,
      )

      expect(screen.getByText(messages.home.title)).toBeInTheDocument()
      expect(screen.getByText(messages.notFound.pageTitle)).toBeInTheDocument()
    },
  )

  it('描画中に suspend しない（ページで notFound() を呼んだときに 404 を返すため。#284）', () => {
    // 外側の Suspense の fallback が出たら、Provider の中で suspend している
    render(
      <Suspense fallback={<p>suspended</p>}>
        <LocaleProvider locale='ja' messages={ja}>
          <Texts />
        </LocaleProvider>
      </Suspense>,
    )

    expect(screen.queryByText('suspended')).not.toBeInTheDocument()
    expect(screen.getByText(ja.home.title)).toBeInTheDocument()
  })
})
