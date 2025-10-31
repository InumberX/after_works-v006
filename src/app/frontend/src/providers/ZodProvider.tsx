'use client'

import { ReactNode, useEffect } from 'react'
import * as zod from 'zod'
import { zodCustomErrorMap } from '@/libs/validation/zodCustomErrorMap'

export const ZodProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    zod.config({
      localeError: zodCustomErrorMap,
    })
  }, [])

  return children
}
