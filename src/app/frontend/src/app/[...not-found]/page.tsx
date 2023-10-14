import { Metadata } from 'next'
import { AppHead } from '@/components/common/AppHead'
import { Index } from './_components'
import { SITE_URL } from '@/config/env'
import { routes } from '@/config/routes'

export const generateMetadata = (): Metadata => {
  return AppHead({
    title: 'お探しのページが見つかりませんでした',
    canonical: `${SITE_URL}${routes.notFound.url({})}`,
    robots: 'noindex, nofollow',
  })
}

const NotFoundPage = () => {
  return <Index />
}

export default NotFoundPage
