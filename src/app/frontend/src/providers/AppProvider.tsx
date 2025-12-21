import { StrictMode, ReactNode } from 'react'

import { BreakpointsProvider } from '@/providers/BreakpointsProvider'
import { JotaiProvider } from '@/providers/JotaiProvider'
import { LocaleProvider } from '@/providers/LocaleProvider'
import { ZodProvider } from '@/providers/ZodProvider'

export const AppProvider = ({
  children,
  locale,
}: {
  children: ReactNode
  locale: string
}) => {
  return (
    <StrictMode>
      <LocaleProvider locale={locale}>
        <JotaiProvider>
          <ZodProvider>
            <BreakpointsProvider>{children}</BreakpointsProvider>
          </ZodProvider>
        </JotaiProvider>
      </LocaleProvider>
    </StrictMode>
  )
}
