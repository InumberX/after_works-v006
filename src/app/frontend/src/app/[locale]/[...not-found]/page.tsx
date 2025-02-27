import { Metadata } from 'next'
import { AppHead } from '@/components/common/AppHead'
import { Index } from './_components'
import { routes } from '@/config/routes'
import { getScopedI18n, getCurrentLocale } from '@/locales/server'

export const generateMetadata = async (): Promise<Metadata> => {
  const scopedT = await getScopedI18n('notFound')
  const locale = await getCurrentLocale()

  return AppHead({
    title: scopedT('title'),
    canonical: routes.notFound.url({
      isFullPath: true,
      locale,
    }),
    robots: 'noindex, nofollow',
  })
}

const NotFoundPage = () => {
  return <Index />
}

export default NotFoundPage
