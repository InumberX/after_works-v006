import { afterEach, describe, expect, it, vi } from 'vitest'

import { getBlogsDetailInfo } from '~/apis/fetch/blogs-detail'
import { getHobbyDetailInfo } from '~/apis/fetch/hobby-detail'
import { getWorksDetailInfo } from '~/apis/fetch/works-detail'
import { API_URL } from '~/config/env'

const fetchers = [
  ['blogs', getBlogsDetailInfo],
  ['works', getWorksDetailInfo],
  ['hobby', getHobbyDetailInfo],
] as const

describe.each(fetchers)('%s の詳細の取得', (endpoint, getDetailInfo) => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('topics_id で Kuroco に問い合わせ、details を返す', async () => {
    const details = { topics_id: 12 }
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(Response.json({ details }))

    await expect(getDetailInfo({ id: '12' })).resolves.toEqual(details)
    expect(fetchMock).toHaveBeenCalledWith(
      `${API_URL}/${endpoint}/12`,
      expect.anything(),
    )
  })

  it.each(['x?cnt=-1', '../works', '..%2Fworks', '0', '01', '1abc', ''])(
    'id が %j なら Kuroco に問い合わせずに undefined を返す',
    async (id) => {
      const fetchMock = vi.spyOn(globalThis, 'fetch')

      await expect(getDetailInfo({ id })).resolves.toBeUndefined()
      expect(fetchMock).not.toHaveBeenCalled()
    },
  )
})
