import { afterEach, describe, expect, it, vi } from 'vitest'

import { apiClient, toApiUrl, toCacheUrl } from '~/apis/fetch/api-client'
import { API_URL, CACHE_BUSTER, SITE_URL } from '~/config/env'
import {
  API_CACHE_MAX_AGE_SECONDS,
  API_ERROR_CODE,
  HTTP_STATUS,
} from '~/consts/api'

/**
 * Workers の `caches.default` の代わり。Map に保存し、`match` と `put` の呼び出しを記録する。
 * テストの後で `vi.unstubAllGlobals()` で外す。
 */
const stubApiCache = ({ failPut = false } = {}) => {
  const store = new Map<string, { body: string; headers: Headers }>()
  const match = vi.fn(async (key: string) => {
    const entry = store.get(key)

    return entry
      ? new Response(entry.body, { headers: entry.headers })
      : undefined
  })
  const put = vi.fn(async (key: string, response: Response) => {
    if (failPut) {
      throw new Error('cache full')
    }

    store.set(key, { body: await response.text(), headers: response.headers })
  })

  vi.stubGlobal('caches', { default: { match, put } })

  return { store, match, put }
}

describe('apiClient', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it('API_URL の下をパラメータ付きで GET し、JSON の本文を返す', async () => {
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(Response.json({ list: [] }))

    await expect(apiClient('/works', { cnt: 1 })).resolves.toEqual({
      success: true,
      data: { list: [] },
    })
    const [url, init] = fetchMock.mock.calls[0] ?? []
    expect(String(url)).toBe(`${API_URL}/works?cnt=1`)
    expect(init).toEqual({ cache: 'no-store' })
  })

  it('404 は code が not_found になる（範囲外のページ・存在しない記事）', async () => {
    // 範囲外の pageID に Kuroco が返す応答（ステージングの API で確認）
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      Response.json(
        { errors: [{ code: 'not_found', message: 'pageID is too big.' }] },
        { status: HTTP_STATUS.NOT_FOUND },
      ),
    )

    await expect(apiClient('/works', { pageID: 999 })).resolves.toMatchObject({
      success: false,
      status: HTTP_STATUS.NOT_FOUND,
      code: API_ERROR_CODE.NOT_FOUND,
    })
  })

  it.each([
    ['500 のエラー', () => Response.json({ errors: [] }, { status: 500 }), 500],
    ['400 のエラー', () => Response.json({ errors: [] }, { status: 400 }), 400],
    ['JSON でない応答', () => new Response('<html>'), null],
  ])('%s は code が failed になる', async (_label, createResponse, status) => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(createResponse())

    await expect(apiClient('/works')).resolves.toMatchObject({
      success: false,
      status,
      code: API_ERROR_CODE.FAILED,
    })
  })

  it('通信に失敗しても例外を投げず、code が failed になる', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new TypeError('network'))

    await expect(apiClient('/works')).resolves.toEqual({
      success: false,
      status: null,
      code: API_ERROR_CODE.FAILED,
      message: 'network',
    })
  })
})

describe('toApiUrl', () => {
  it('パラメータを書いた順にクエリに並べ、配列は同じ名前で並べ、undefined は送らない', () => {
    const url = toApiUrl('/about-history', {
      'category_parent_id[]': 3,
      cnt: 0,
      tag_id: [1, '2'],
      filter: undefined,
      order_query: 'inst_ymdhi=DESC',
    })

    expect(String(url)).toBe(
      `${API_URL}/about-history?category_parent_id%5B%5D=3&cnt=0&tag_id=1&tag_id=2&order_query=inst_ymdhi%3DDESC`,
    )
  })

  it('パラメータがなければクエリを付けない', () => {
    expect(String(toApiUrl('/tags/cms'))).toBe(`${API_URL}/tags/cms`)
  })
})

describe('toCacheUrl', () => {
  it('API の URL のパスとクエリを、サイトのオリジンと CACHE_BUSTER の下に置く', () => {
    const apiUrl = toApiUrl('/works', { cnt: 12, pageID: 2 })

    expect(toCacheUrl(apiUrl)).toBe(
      `${new URL(SITE_URL).origin}/__cache/${CACHE_BUSTER}${apiUrl.pathname}?cnt=12&pageID=2`,
    )
  })
})

describe('apiClient と Workers のキャッシュ', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it('成功した応答を保存し、次の呼び出しはキャッシュから返す', async () => {
    const cache = stubApiCache()
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockImplementation(async () => Response.json({ list: [] }))

    const first = await apiClient('/works', { cnt: 1 })
    const second = await apiClient('/works', { cnt: 1 })

    expect(first).toEqual({ success: true, data: { list: [] } })
    expect(second).toEqual(first)
    expect(fetchMock).toHaveBeenCalledTimes(1)
    const key = toCacheUrl(toApiUrl('/works', { cnt: 1 }))
    expect([...cache.store.keys()]).toEqual([key])
    expect(cache.store.get(key)?.headers.get('Cache-Control')).toBe(
      `max-age=${API_CACHE_MAX_AGE_SECONDS}`,
    )
  })

  it('パラメータが違えば別に保存する', async () => {
    stubApiCache()
    let n = 0
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockImplementation(async () => Response.json({ n: ++n }))

    await expect(apiClient('/works', { pageID: 1 })).resolves.toEqual({
      success: true,
      data: { n: 1 },
    })
    await expect(apiClient('/works', { pageID: 2 })).resolves.toEqual({
      success: true,
      data: { n: 2 },
    })
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it.each([
    ['404', async () => new Response(null, { status: 404 })],
    ['500', async () => new Response(null, { status: 500 })],
    ['JSON でない応答', async () => new Response('<html>')],
    [
      '通信の失敗',
      async () => {
        throw new TypeError('network')
      },
    ],
  ])('%s は保存しない', async (_label, answer) => {
    const cache = stubApiCache()
    vi.spyOn(globalThis, 'fetch').mockImplementation(answer)

    await expect(apiClient('/works')).resolves.toMatchObject({
      success: false,
    })
    expect(cache.put).not.toHaveBeenCalled()
  })

  it('保存してある応答が読めなければ API に問い合わせ、保存に失敗しても結果を返す', async () => {
    const cache = stubApiCache({ failPut: true })
    cache.store.set(toCacheUrl(toApiUrl('/works')), {
      body: '<broken',
      headers: new Headers(),
    })
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockImplementation(async () => Response.json({ list: [] }))

    await expect(apiClient('/works')).resolves.toEqual({
      success: true,
      data: { list: [] },
    })
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(cache.put).toHaveBeenCalledTimes(1)
  })

  it('Workers のキャッシュがない環境では毎回 API に問い合わせる', async () => {
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockImplementation(async () => Response.json({ list: [] }))

    await apiClient('/works')
    await apiClient('/works')

    expect(fetchMock).toHaveBeenCalledTimes(2)
  })
})
