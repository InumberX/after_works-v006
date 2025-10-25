'use client'

import { ReactNode } from 'react'
import * as zod from 'zod'
import { zodCustomErrorMap } from '@/libs/validation/zodCustomErrorMap'

export const ZodProvider = ({ children }: { children: ReactNode }) => {
  zod.setErrorMap(zodCustomErrorMap)

  return children
}
