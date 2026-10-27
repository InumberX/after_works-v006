import { afterEach, describe, expect, it, vi } from 'vitest'

import { getBlogsList } from '~/apis/fetch/blogs'
import { getHobbyList } from '~/apis/fetch/hobby'
import { getWorksList } from '~/apis/fetch/works'
import { API_ERROR_CODE, HTTP_STATUS } from '~/consts/api'

const fetchers = [
  ['blogs', getBlogsList],
  ['works', getWorksList],
  ['hobby', getHobbyList],
] as const

describe.each(fetchers)('%s の一覧の取得', (_, getList) => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('一覧とページ情報を返す', async () => {
    const value = { list: [], pageInfo: { totalCnt: 0 } }
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(Response.json(value))

    await expect(getList({ page: 1 })).resolves.toEqual({
      success: true,
      data: value,
    })
  })

  it('範囲外のページで Kuroco が 404 を返したら code が not_found になる', async () => {
    // 範囲外の pageID に Kuroco が返す応答（ステージングの API で確認）
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      Response.json(
        { errors: [{ code: 'not_found', message: 'pageID is too big.' }] },
        { status: HTTP_STATUS.NOT_FOUND },
      ),
    )

    await expect(getList({ page: 999 })).resolves.toMatchObject({
      success: false,
      code: API_ERROR_CODE.NOT_FOUND,
    })
  })

  it.each([
    ['500 のエラー', () => Response.json({ errors: [] }, { status: 500 })],
    ['JSON でない応答', () => new Response('<html>', { status: 502 })],
    ['一覧のない応答', () => Response.json({ errors: [] })],
  ])('%s なら code が failed になる', async (_label, createResponse) => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(createResponse())

    await expect(getList({ page: 2 })).resolves.toMatchObject({
      success: false,
      code: API_ERROR_CODE.FAILED,
    })
  })
})
