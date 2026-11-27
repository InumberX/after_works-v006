/** サイトの言語。日本語が既定で、英語は `/en` の下に置く */
export const LOCALES = ['ja', 'en'] as const

export type Locale = (typeof LOCALES)[number]

/** サイトの言語（`LOCALES` のどれか）か */
export const isLocale = (value: string): value is Locale =>
  (LOCALES as readonly string[]).includes(value)
