import { Metadata } from 'next'

import { Index } from './_components'

import { AppHead } from '~/components/common/AppHead'
import { routes } from '~/config/routes'
import { getScopedI18n, getCurrentLocale } from '~/locales/server'

export const generateMetadata = async (): Promise<Metadata> => {
  const [locale, scopedT] = await Promise.all([
    getCurrentLocale(),
    getScopedI18n('contact'),
  ])

  return AppHead({
    title: scopedT('title'),
    description: scopedT('description'),
    canonical: routes.contact.url({
      isFullPath: true,
      locale,
    }),
  })
}

const ContactPage = () => {
  return <Index />
}

export default ContactPage
