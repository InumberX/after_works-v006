'use client'

import * as Sentry from '@sentry/nextjs'
import NextError from 'next/error'
import { useEffect, useMemo, useState } from 'react'

const GlobalError = ({
  error,
}: {
  error: Error & {
    digest?: string
  }
}) => {
  const statusCode = useMemo(() => (error.digest ? 500 : 404), [error.digest])
  const [hasReported, setHasReported] = useState(false)

  useEffect(() => {
    if (!hasReported) {
      Sentry.captureException(error)
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHasReported(true)
    }
  }, [error, hasReported])

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
