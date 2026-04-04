import { GOOGLE_ANALYTICS_ID } from '@/config/env'

export const isActiveGA = GOOGLE_ANALYTICS_ID !== ''

type GtagWindow = Window &
  typeof globalThis & {
    gtag: (
      command: string,
      action: string,
      params: Record<string, unknown>,
    ) => void
  }

export const pageview = (path: string) => {
  ;(window as GtagWindow).gtag('config', GOOGLE_ANALYTICS_ID, {
    page_path: path,
  })
}
