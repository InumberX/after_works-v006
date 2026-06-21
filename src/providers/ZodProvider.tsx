'use client'

import { ReactNode, useEffect } from 'react'
import * as zod from 'zod'

import { zodCustomErrorMap } from '~/libs/validation/zod-custom-error-map'

export const ZodProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    zod.config({
      localeError: zodCustomErrorMap,
    })
  }, [])

  return children
}
