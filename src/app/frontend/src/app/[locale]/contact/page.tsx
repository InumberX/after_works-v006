import { Metadata } from 'next'
import { AppHead } from '@/components/common/AppHead'
import { Index } from './_components'
import { SITE_URL } from '@/config/env'
import { routes } from '@/config/routes'
import { getScopedI18n } from '@/locales/server'

export const generateMetadata = async (): Promise<Metadata> => {
  const scopedT = await getScopedI18n('contact')

  return AppHead({
    title: scopedT('title'),
    description: scopedT('description'),
    canonical: `${SITE_URL}${routes.contact.url({})}`,
  })
}

const ContactPage = () => {
  return <Index />
}

export default ContactPage
