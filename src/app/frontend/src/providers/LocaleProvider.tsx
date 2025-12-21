'use client'

import { ReactNode } from 'react'

import { I18nProviderClient } from '@/locales/client'

export const LocaleProvider = ({
  children,
  locale,
}: {
  children: ReactNode
  locale: string
}) => {
  return <I18nProviderClient locale={locale}>{children}</I18nProviderClient>
}
