import { afterEach, describe, expect, it, vi } from 'vitest'

import { getBlogsDetailInfo } from '~/apis/fetch/blogs-detail'
import { getHobbyDetailInfo } from '~/apis/fetch/hobby-detail'
import { getWorksDetailInfo } from '~/apis/fetch/works-detail'
import { API_URL } from '~/config/env'
import { API_ERROR_CODE, HTTP_STATUS } from '~/consts/api'

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

    await expect(getDetailInfo({ id: '12' })).resolves.toEqual({
      success: true,
      data: details,
    })
    expect(fetchMock).toHaveBeenCalledWith(
      `${API_URL}/${endpoint}/12`,
      expect.anything(),
    )
  })

  it.each(['x?cnt=-1', '../works', '..%2Fworks', '0', '01', '1abc', ''])(
    'id が %j なら Kuroco に問い合わせずに code が not_found になる',
    async (id) => {
      const fetchMock = vi.spyOn(globalThis, 'fetch')

      await expect(getDetailInfo({ id })).resolves.toMatchObject({
        success: false,
        status: HTTP_STATUS.NOT_FOUND,
        code: API_ERROR_CODE.NOT_FOUND,
      })
      expect(fetchMock).not.toHaveBeenCalled()
    },
  )

  it('存在しない記事で Kuroco が 404 を返したら code が not_found になる', async () => {
    // 存在しない記事に Kuroco が返す応答（ステージングの API で確認）
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      Response.json(
        { errors: [{ code: 'not_found', message: 'Content is not found.' }] },
        { status: HTTP_STATUS.NOT_FOUND },
      ),
    )

    await expect(getDetailInfo({ id: '99999' })).resolves.toMatchObject({
      success: false,
      code: API_ERROR_CODE.NOT_FOUND,
    })
  })

  it.each([
    ['500 のエラー', () => Response.json({ errors: [] }, { status: 500 })],
    ['JSON でない応答', () => new Response('<html>', { status: 502 })],
    ['details のない応答', () => Response.json({ errors: [] })],
  ])('%s なら code が failed になる', async (_label, createResponse) => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(createResponse())

    await expect(getDetailInfo({ id: '12' })).resolves.toMatchObject({
      success: false,
      code: API_ERROR_CODE.FAILED,
    })
  })
})
