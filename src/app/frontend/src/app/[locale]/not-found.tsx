import { Metadata } from 'next'
import { AppHead } from '@/components/common/AppHead'
import { Index } from './[...not-found]/_components'
import { routes } from '@/config/routes'
import { getScopedI18n, getCurrentLocale } from '@/locales/server'

export const generateMetadata = async (): Promise<Metadata> => {
  const scopedT = await getScopedI18n('notFound')

  return AppHead({
    title: scopedT('title'),
    canonical: routes.notFound.url({
      isFullPath: true,
      locale: getCurrentLocale(),
    }),
    robots: 'noindex, nofollow',
  })
}

const NotFoundPage = () => {
  return <Index />
}

export default NotFoundPage
