import { afterEach, describe, expect, it, vi } from 'vitest'

import { getBlogsList } from '~/apis/fetch/blogs'
import { getHobbyList } from '~/apis/fetch/hobby'
import { getWorksList } from '~/apis/fetch/works'

// 範囲外の pageID に Kuroco が返すエラー（ステージングの API で確認）
const NOT_FOUND_BODY = {
  errors: [{ code: 'not_found', message: 'pageID is too big.' }],
}

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

    await expect(getList({ page: 1 })).resolves.toEqual(value)
  })

  it('範囲外のページで Kuroco が not_found を返したら null を返す', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      Response.json(NOT_FOUND_BODY, { status: 404 }),
    )

    await expect(getList({ page: 999 })).resolves.toBeNull()
  })

  it.each([
    ['500 のエラー', () => Response.json({ errors: [] }, { status: 500 })],
    ['JSON でない応答', () => new Response('<html>', { status: 502 })],
    ['一覧のない応答', () => Response.json({ errors: [] })],
  ])('%s なら undefined を返す', async (_label, createResponse) => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(createResponse())

    await expect(getList({ page: 2 })).resolves.toBeUndefined()
  })
})
