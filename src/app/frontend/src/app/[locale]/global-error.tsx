'use client'

import * as Sentry from '@sentry/nextjs'
import NextError from 'next/error'
import { useEffect, useState } from 'react'

const GlobalError = ({
  error,
}: {
  error: Error & {
    digest?: string
  }
}) => {
  const [statusCode, setStatusCode] = useState(500)

  useEffect(() => {
    setStatusCode(error.digest ? 500 : 404)
    Sentry.captureException(error)
  }, [error])

  return (
    <html>
      <body>
        {/* This is the default Next.js error component but it doesn't allow omitting the statusCode property yet. */}
        <NextError statusCode={statusCode} />
      </body>
    </html>
  )
}

export default GlobalError
