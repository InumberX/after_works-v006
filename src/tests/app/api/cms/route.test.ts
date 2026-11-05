// @vitest-environment node
import { afterEach, describe, expect, it, vi } from 'vitest'

import { GET } from '~/app/api/cms/[...path]/route'
import { API_URL } from '~/config/env'

const get = (path: string) => {
  const url = new URL(path, 'http://localhost')
  const segments = url.pathname.replace(/^\/api\/cms\//, '').split('/')

  return GET(new Request(url), {
    params: Promise.resolve({ path: segments }),
  })
}

describe('API の中継（/api/cms）', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('受け付けるエンドポイントを、同じクエリで Kuroco に問い合わせて JSON を返す', async () => {
    const value = { list: [{ topics_id: 1 }], pageInfo: { totalCnt: 1 } }
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockImplementation(async () => Response.json(value))

    const response = await get(
      '/api/cms/about-history?category_parent_id%5B%5D=3&cnt=0&tag_id=1&tag_id=2',
    )

    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toEqual(value)
    expect(String(fetchMock.mock.calls[0]?.[0])).toBe(
      `${API_URL}/about-history?category_parent_id%5B%5D=3&cnt=0&tag_id=1&tag_id=2`,
    )
  })

  it.each([
    '/api/cms/blogs/1',
    '/api/cms/tags/cms',
    '/api/cms/about',
    '/api/cms/..',
  ])(
    '受け付けないエンドポイント %s は Kuroco に問い合わせずに 404 を返す',
    async (path) => {
      const fetchMock = vi.spyOn(globalThis, 'fetch')

      expect((await get(path)).status).toBe(404)
      expect(fetchMock).not.toHaveBeenCalled()
    },
  )

  it('Kuroco の 404 は 404、それ以外の失敗は 502 にする', async () => {
    vi.spyOn(globalThis, 'fetch').mockImplementation(
      async () => new Response(null, { status: 404 }),
    )
    expect((await get('/api/cms/works?pageID=999')).status).toBe(404)

    vi.spyOn(globalThis, 'fetch').mockImplementation(
      async () => new Response(null, { status: 500 }),
    )
    expect((await get('/api/cms/works')).status).toBe(502)
  })
})
