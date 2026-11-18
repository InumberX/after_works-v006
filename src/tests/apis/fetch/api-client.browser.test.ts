// ブラウザ（jsdom）での API の呼び出し。Kuroco ではなく、サイトの中継に問い合わせる
import { afterEach, describe, expect, it, vi } from 'vitest'

import { apiClient, toProxyUrl } from '~/apis/fetch/api-client'
import { getBlogsList } from '~/apis/fetch/blogs'
import { API_ERROR_CODE, HTTP_STATUS } from '~/consts/api'

describe('ブラウザでの apiClient', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('Kuroco ではなく、同じクエリで中継に問い合わせる', async () => {
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockImplementation(async () =>
        Response.json({ list: [], pageInfo: { totalCnt: 0 } }),
      )

    await expect(getBlogsList({ page: 2 })).resolves.toMatchObject({
      success: true,
    })
    expect(String(fetchMock.mock.calls[0]?.[0])).toBe(
      '/api/cms/blogs?cnt=12&pageID=2&order_query=inst_ymdhi%3DDESC',
    )
  })

  it('中継の 404 は code が not_found になる', async () => {
    vi.spyOn(globalThis, 'fetch').mockImplementation(
      async () => new Response(null, { status: HTTP_STATUS.NOT_FOUND }),
    )

    await expect(apiClient('/works', { pageID: 999 })).resolves.toMatchObject({
      success: false,
      code: API_ERROR_CODE.NOT_FOUND,
    })
  })

  it('toProxyUrl は配列を同じ名前で並べ、undefined を送らない', () => {
    expect(
      toProxyUrl('/about-history', {
        'category_parent_id[]': 3,
        cnt: 0,
        filter: undefined,
      }),
    ).toBe('/api/cms/about-history?category_parent_id%5B%5D=3&cnt=0')
  })
})
