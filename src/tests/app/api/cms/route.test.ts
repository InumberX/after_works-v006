// @vitest-environment node
import { afterEach, describe, expect, it, vi } from 'vitest'

import { GET as getAboutHistory } from '~/app/api/cms/about-history/route'
import { GET as getBlogs } from '~/app/api/cms/blogs/route'
import { GET as getHobby } from '~/app/api/cms/hobby/route'
import { GET as getWorks } from '~/app/api/cms/works/route'
import { API_URL } from '~/config/env'

const request = (query: string) =>
  new Request(`http://localhost/api/cms/x${query}`)

const listRoutes = [
  ['blogs', getBlogs],
  ['works', getWorks],
  ['hobby', getHobby],
] as const

describe('API の中継（/api/cms）', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it.each(listRoutes)(
    '%s は一覧のクエリで Kuroco に問い合わせて JSON を返す',
    async (endpoint, GET) => {
      const value = { list: [], pageInfo: { totalCnt: 0 } }
      const fetchMock = vi
        .spyOn(globalThis, 'fetch')
        .mockImplementation(async () => Response.json(value))
      const query = '?cnt=12&pageID=2&order_query=inst_ymdhi%3DDESC'

      const response = await GET(request(query))

      expect(response.status).toBe(200)
      await expect(response.json()).resolves.toEqual(value)
      expect(String(fetchMock.mock.calls[0]?.[0])).toBe(
        `${API_URL}/${endpoint}${query}`,
      )
    },
  )

  it('about-history は category_parent_id[] を含むクエリで問い合わせる', async () => {
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockImplementation(async () => Response.json([]))
    const query = '?category_parent_id%5B%5D=3&cnt=0&pageID=1'

    expect((await getAboutHistory(request(query))).status).toBe(200)
    expect(String(fetchMock.mock.calls[0]?.[0])).toBe(
      `${API_URL}/about-history${query}`,
    )
  })

  it.each([
    ['blogs', getBlogs, '?cnt=12&filter=x'],
    ['works', getWorks, '?category_parent_id%5B%5D=3'],
    ['about-history', getAboutHistory, '?order_query=x'],
  ] as const)(
    '%s は受け付けないクエリ %s があれば Kuroco に問い合わせずに 400 を返す',
    async (_endpoint, GET, query) => {
      const fetchMock = vi.spyOn(globalThis, 'fetch')

      expect((await GET(request(query))).status).toBe(400)
      expect(fetchMock).not.toHaveBeenCalled()
    },
  )

  it('Kuroco の 404 は 404、それ以外の失敗は 502 にする', async () => {
    vi.spyOn(globalThis, 'fetch').mockImplementation(
      async () => new Response(null, { status: 404 }),
    )
    expect((await getWorks(request('?pageID=999'))).status).toBe(404)

    vi.spyOn(globalThis, 'fetch').mockImplementation(
      async () => new Response(null, { status: 500 }),
    )
    expect((await getWorks(request(''))).status).toBe(502)
  })
})
