import { Metadata } from 'next'
import { AppHead } from '~/components/common/AppHead'
import { Index } from './_components'
import { SITE_URL } from '~/config/env'
import { routes } from '~/config/routes'

export const generateMetadata = (): Metadata => {
  return AppHead({
    title: 'ブログ',
    description:
      '東京都在住のフロントエンドエンジニア：N/NE（ナイン）のポートフォリオ用Webサイトです。このページでは、私が投稿した記事の一覧を閲覧できます。',
    canonical: `${SITE_URL}${routes.blogs.url({})}`,
  })
}

const BlogsPage = () => {
  return <Index />
}

export default BlogsPage
