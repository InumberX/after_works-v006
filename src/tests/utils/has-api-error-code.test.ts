import { describe, expect, it } from 'vitest'

import { hasApiErrorCode } from '~/utils/has-api-error-code'

// 範囲外の pageID に Kuroco が返すエラー（ステージングの API で確認）
const NOT_FOUND_BODY = {
  errors: [{ code: 'not_found', message: 'pageID is too big.' }],
}

describe('hasApiErrorCode', () => {
  it('指定したコードのエラーがあれば true を返す', () => {
    expect(hasApiErrorCode(NOT_FOUND_BODY, 'not_found')).toBe(true)
  })

  it('複数のエラーのうち 1 つが一致すれば true を返す', () => {
    expect(
      hasApiErrorCode(
        { errors: [{ code: 'invalid' }, { code: 'not_found' }] },
        'not_found',
      ),
    ).toBe(true)
  })

  it('別のコードのエラーだけなら false を返す', () => {
    expect(hasApiErrorCode(NOT_FOUND_BODY, 'invalid')).toBe(false)
  })

  it.each([
    undefined,
    null,
    'not_found',
    {},
    { errors: [] },
    { errors: 'not_found' },
    { errors: [null] },
    { errors: [{ message: 'not_found' }] },
  ])('%j は not_found のエラーを含まない', (value) => {
    expect(hasApiErrorCode(value, 'not_found')).toBe(false)
  })
})
