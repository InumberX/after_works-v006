'use client'
// 言語の切り替えは ~/hooks/use-change-locale の useChangeLocale を使う。
// Provider は ~/providers/LocaleProvider（I18nProviderClient は使わない）
import { createI18nClient } from 'next-international/client'

export const { useI18n, useScopedI18n, I18nClientContext, useCurrentLocale } =
  createI18nClient({
    ja: () => import('./ja'),
    en: () => import('./en'),
  })
