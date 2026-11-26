import { describe, expect, it } from 'vitest'

import { toTagName } from '~/utils/to-tag-name'

describe('toTagName', () => {
  it('拡張項目 1 が空ならタイトルを返す', () => {
    expect(toTagName({ tag_nm: '設計', ext_col_01: '' })).toBe('設計')
  })

  it('拡張項目 1 があれば、前後の空白を外して返す', () => {
    expect(
      toTagName({ tag_nm: 'system_design', ext_col_01: ' System Design ' }),
    ).toBe('System Design')
  })

  it.each([' 　\n', null])(
    '拡張項目 1 が %j ならタイトルを返す',
    (ext_col_01) => {
      expect(toTagName({ tag_nm: 'TypeScript', ext_col_01 })).toBe('TypeScript')
    },
  )
})
