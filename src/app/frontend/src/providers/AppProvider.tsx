import { StrictMode, ReactNode } from 'react'
import { JotaiProvider } from '@/providers/JotaiProvider'
import { BreakpointsProvider } from '@/providers/BreakpointsProvider'
import { ZodProvider } from '@/providers/ZodProvider'

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <StrictMode>
      <JotaiProvider>
        <ZodProvider>
          <BreakpointsProvider>{children}</BreakpointsProvider>
        </ZodProvider>
      </JotaiProvider>
    </StrictMode>
  )
}
