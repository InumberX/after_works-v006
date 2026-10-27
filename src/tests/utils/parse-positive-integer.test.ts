import { describe, expect, it } from 'vitest'

import { parsePositiveInteger } from '~/utils/parse-positive-integer'

describe('parsePositiveInteger', () => {
  it.each([
    ['1', 1],
    ['12', 12],
    ['9007199254740991', Number.MAX_SAFE_INTEGER],
  ])('正規の形の正の整数 %s を数値にする', (value, expected) => {
    expect(parsePositiveInteger(value)).toBe(expected)
  })

  it.each([
    '0',
    '-1',
    '01',
    '1.5',
    '1abc',
    '1e3',
    ' 1',
    '',
    'x?cnt=-1',
    '..%2Fworks',
    '9007199254740992',
  ])('%j は受け付けない', (value) => {
    expect(parsePositiveInteger(value)).toBeUndefined()
  })

  it('文字列以外（同じクエリが重複した配列・undefined）は受け付けない', () => {
    expect(parsePositiveInteger(['1', '2'])).toBeUndefined()
    expect(parsePositiveInteger(undefined)).toBeUndefined()
    expect(parsePositiveInteger(1)).toBeUndefined()
  })
})
