import { describe, expect, it } from 'vitest'

import { isLocale } from '~/consts/locale'

describe('isLocale', () => {
  it.each(['ja', 'en'])('%s はサイトの言語', (value) => {
    expect(isLocale(value)).toBe(true)
  })

  it.each(['fr', 'JA', '', 'ja-JP'])('%j はサイトの言語ではない', (value) => {
    expect(isLocale(value)).toBe(false)
  })
})
