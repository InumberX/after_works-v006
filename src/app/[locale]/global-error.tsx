'use client'

import NextError from 'next/error'
import { useEffect, useRef } from 'react'

const GlobalError = ({
  error,
}: {
  error: Error & {
    digest?: string
  }
}) => {
  const statusCode = error.digest ? 500 : 404
  const hasReportedRef = useRef(false)

  useEffect(() => {
    if (!hasReportedRef.current) {
      hasReportedRef.current = true
    }
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
