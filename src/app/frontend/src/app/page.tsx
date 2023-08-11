import { Metadata } from 'next'
import { AppHead } from '~/components/common/AppHead'

export const dynamic = 'force-dynamic'

export const generateMetadata = (): Metadata => {
  return AppHead({})
}

const HomePage = () => {
  return <div>トップページ</div>
}

export default HomePage
