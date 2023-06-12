const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    // eslint-disable-next-line react/no-unknown-property
    <html lang='jp' prefix='og: http://ogp.me/ns#'>
      <body>{children}</body>
    </html>
  )
}

export default RootLayout
