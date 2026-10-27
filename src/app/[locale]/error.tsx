'use client'

import { Message } from './[...not-found]/_components/Message'

import { Contact } from '~/components/common/Contact'
import { LayoutPageWrapper } from '~/components/ui/layouts/LayoutPageWrapper'
import { PageTitle } from '~/components/ui/typographies/PageTitle'
import { SITE_NAME } from '~/config/env'
import { routes } from '~/config/routes'
import { useCurrentLocale, useScopedI18n } from '~/locales/client'

// ページの処理中に例外が投げられたとき（Kuroco の取得に失敗したときなど）の
// 画面。404 のページと同じ見た目にする。エラーのページはクライアントコンポーネント
// なので、メタデータの代わりに <title> を直接出す（AppHead と同じ形式）
const ErrorPage = () => {
  const scopedT = useScopedI18n('error')
  const locale = useCurrentLocale()

  return (
    <>
      <title>{`${scopedT('title')} | ${SITE_NAME}`}</title>

      <LayoutPageWrapper>
        <PageTitle
          title={scopedT('pageTitle')}
          subTitle={scopedT('pageSubTitle')}
        />

        <Message
          text={scopedT('message.text')}
          buttonText={scopedT('message.buttonText')}
          buttonUrl={routes.home.url({
            locale,
          })}
        />

        <Contact />
      </LayoutPageWrapper>
    </>
  )
}

export default ErrorPage
