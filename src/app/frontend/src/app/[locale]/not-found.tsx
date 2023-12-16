import { Metadata } from 'next'
import { AppHead } from '@/components/common/AppHead'
import { Index } from './[...not-found]/_components'
import { SITE_URL } from '@/config/env'
import { routes } from '@/config/routes'
import { getScopedI18n } from '@/locales/server'

export const generateMetadata = async (): Promise<Metadata> => {
  const scopedT = await getScopedI18n('notFound')

  return AppHead({
    title: scopedT('title'),
    canonical: `${SITE_URL}${routes.notFound.url({})}`,
    robots: 'noindex, nofollow',
  })
}

const NotFoundPage = () => {
  return <Index />
}

export default NotFoundPage
