import { Metadata } from 'next'
import { AppHead } from '~/components/common/AppHead'
import { Index } from './_components'
import { SITE_URL } from '~/config/env'
import { routes } from '~/config/routes'

export const generateMetadata = (): Metadata => {
  return AppHead({
    title: '趣味',
    description:
      '東京都在住のフロントエンドエンジニア：N/NE（ナイン）のポートフォリオ用Webサイトです。このページでは、私の趣味および学習のために制作したものをご紹介します。',
    canonical: `${SITE_URL}${routes.hobby.url({})}`,
  })
}

const HomePage = () => {
  return <Index />
}

export default HomePage
