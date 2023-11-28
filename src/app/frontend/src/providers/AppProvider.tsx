import { StrictMode, ReactNode } from 'react'
import { JotaiProvider } from '@/providers/JotaiProvider'
import { BreakpointsProvider } from '@/providers/BreakpointsProvider'
import { ZodProvider } from '@/providers/ZodProvider'
import { LocaleProvider } from '@/providers/LocaleProvider'

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
