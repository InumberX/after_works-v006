import '~/styles/common.scss'
import { AppProvider } from '@/providers/AppProvider'
import { LayoutDefault } from '@/layouts/Default'
import { GoogleAnalytics } from '@/components/common/GoogleAnalytics'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    // eslint-disable-next-line react/no-unknown-property
    <html lang='ja' prefix='og: http://ogp.me/ns#'>
      <head>
        <GoogleAnalytics />
      </head>

      <body>
        <AppProvider>
          <LayoutDefault>{children}</LayoutDefault>
        </AppProvider>
      </body>
    </html>
  )
}

export default RootLayout
