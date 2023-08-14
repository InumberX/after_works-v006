import { Metadata } from 'next'
import { AppHead } from '~/components/common/AppHead'
import { Index } from './_components'
import { SITE_URL } from '~/config/env'
import { routes } from '~/config/routes'

export const generateMetadata = (): Metadata => {
  return AppHead({
    title: 'お問い合わせ',
    description:
      '東京都在住のフロントエンドエンジニア：N/NE（ナイン）のポートフォリオ用Webサイトです。お問い合わせはこちらのページからお気軽にご連絡ください。',
    canonical: `${SITE_URL}${routes.contact.url({})}`,
  })
}

const HomePage = () => {
  return <Index />
}

export default HomePage
