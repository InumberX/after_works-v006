import { SITE_ROOT } from '@/config/env'

export const routes: {
  [key: string]: {
    id: string
    url: ({ id }: { id?: number }) => string
  }
} = {
  // トップ
  top: {
    id: 'top',
    url: () => `${SITE_ROOT}/`,
  },
}
