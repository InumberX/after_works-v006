'use client'

import { useEffect } from 'react'
import * as Sentry from '@sentry/nextjs'

const ErrorPage = ({
  error,
}: {
  error: Error & {
    digest?: string
  }
}) => {
  useEffect(() => {
    // Log the error to Sentry
    Sentry.captureException(error)
  }, [error])

  return (
    <div>
      <h2>Something went wrong!</h2>
    </div>
  )
}

export default ErrorPage
