import { describe, expect, it } from 'vitest'

import { flattenLocale } from '~/utils/flatten-locale'

describe('flattenLocale', () => {
  it('入れ子のキーを . でつないだ 1 段のオブジェクトにする', () => {
    expect(
      flattenLocale({
        title: 'ホーム',
        mainVisual: {
          lead: { text: 'リード' },
          button: 'ボタン',
        },
      }),
    ).toEqual({
      title: 'ホーム',
      'mainVisual.lead.text': 'リード',
      'mainVisual.button': 'ボタン',
    })
  })

  it('空の辞書は空のオブジェクトにする', () => {
    expect(flattenLocale({})).toEqual({})
  })
})
