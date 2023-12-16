import '~/styles/common.scss'
import { AppProvider } from '@/providers/AppProvider'
import { LayoutDefault } from '@/layouts/Default'
import { GoogleAnalytics } from '@/components/common/GoogleAnalytics'

const RootLayout = ({
  children,
  params,
}: {
  children: React.ReactNode
  params: {
    locale: string
  }
}) => {
  return (
    // eslint-disable-next-line react/no-unknown-property
    <html lang={params.locale} prefix='og: http://ogp.me/ns#'>
      <head>
        <GoogleAnalytics />
      </head>

      <body>
        <AppProvider locale={params.locale}>
          <LayoutDefault>{children}</LayoutDefault>
        </AppProvider>
      </body>
    </html>
  )
}

export default RootLayout
