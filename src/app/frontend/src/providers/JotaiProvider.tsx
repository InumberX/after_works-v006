'use client'

import { ReactNode } from 'react'
import { Provider } from 'jotai'

export const JotaiProvider = ({ children }: { children: ReactNode }) => {
  return <Provider>{children}</Provider>
}
