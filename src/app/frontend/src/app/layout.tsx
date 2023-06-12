import '~/styles/common.scss'
import { AppProvider } from '~/providers/AppProvider'
import { LayoutDefault } from '~/layouts/Default'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    // eslint-disable-next-line react/no-unknown-property
    <html lang='jp' prefix='og: http://ogp.me/ns#'>
      <body>
        <AppProvider>
          <LayoutDefault>{children}</LayoutDefault>
        </AppProvider>
      </body>
    </html>
  )
}

export default RootLayout
