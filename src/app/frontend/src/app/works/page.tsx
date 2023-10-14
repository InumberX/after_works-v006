import { Metadata } from 'next'
import { AppHead } from '@/components/common/AppHead'
import { Index } from './_components'
import { SITE_URL } from '@/config/env'
import { routes } from '@/config/routes'

export const generateMetadata = (): Metadata => {
  return AppHead({
    title: '実績',
    description:
      '東京都在住のフロントエンドエンジニア：N/NE（ナイン）のポートフォリオ用Webサイトです。このページでは、私のこれまでの実績・制作物の一覧を閲覧できます。',
    canonical: `${SITE_URL}${routes.works.url({})}`,
  })
}

const WorksPage = () => {
  return <Index />
}

export default WorksPage
