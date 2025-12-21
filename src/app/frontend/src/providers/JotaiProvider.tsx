'use client'

import { Provider } from 'jotai'
import { ReactNode } from 'react'

export const JotaiProvider = ({ children }: { children: ReactNode }) => {
  return <Provider>{children}</Provider>
}
