import { describe, expect, it } from 'vitest'

import { isKurocoNotFound } from '~/utils/is-kuroco-not-found'

describe('isKurocoNotFound', () => {
  it('範囲外の pageID に Kuroco が返す not_found のエラーを見分ける', () => {
    expect(
      isKurocoNotFound({
        errors: [{ code: 'not_found', message: 'pageID is too big.' }],
      }),
    ).toBe(true)
  })

  it.each([
    undefined,
    null,
    'not_found',
    {},
    { errors: [] },
    { errors: 'not_found' },
    { errors: [{ code: 'invalid' }] },
    { errors: [null] },
  ])('%j は not_found ではない', (value) => {
    expect(isKurocoNotFound(value)).toBe(false)
  })
})
