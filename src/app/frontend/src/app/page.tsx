import { Metadata } from 'next'
import { AppHead } from '~/components/common/AppHead'
import { Index } from './_components'

export const dynamic = 'force-dynamic'

export const generateMetadata = (): Metadata => {
  return AppHead({})
}

const HomePage = () => {
  return <Index />
}

export default HomePage
