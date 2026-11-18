// ブラウザで fetch の関数が送るクエリを、中継がすべて受け付けることを確かめる。
// fetch の関数にパラメータを足して中継の allowedParams に足し忘れると、ここで 400 になる
// （ブラウザ（jsdom）で動かすので、fetch の関数は中継の URL に問い合わせる）
import { afterEach, describe, expect, it, vi } from 'vitest'

import { getAboutHistoryInfo } from '~/apis/fetch/about-history'
import { getBlogsList } from '~/apis/fetch/blogs'
import { getHobbyList } from '~/apis/fetch/hobby'
import { getWorksList } from '~/apis/fetch/works'
import { GET as getAboutHistory } from '~/app/api/cms/about-history/route'
import { GET as getBlogs } from '~/app/api/cms/blogs/route'
import { GET as getHobby } from '~/app/api/cms/hobby/route'
import { GET as getWorks } from '~/app/api/cms/works/route'

const listOptions = { cnt: 12, page: 2, orderQuery: 'inst_ymdhi=DESC' }
const listBody = { list: [], pageInfo: { totalCnt: 0 } }

const cases = [
  ['blogs', () => getBlogsList(listOptions), getBlogs, listBody],
  ['works', () => getWorksList(listOptions), getWorks, listBody],
  ['hobby', () => getHobbyList(listOptions), getHobby, listBody],
  [
    'about-history',
    () => getAboutHistoryInfo({ categoryId: '3', cnt: 0, page: 1 }),
    getAboutHistory,
    [{ list: [] }],
  ],
] as const

describe('中継が受け付けるクエリ', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it.each(cases)(
    '%s の fetch の関数がブラウザで送るクエリを、中継が受け付ける',
    async (endpoint, callFetcher, GET, body) => {
      const fetchMock = vi
        .spyOn(globalThis, 'fetch')
        .mockImplementation(async () => Response.json(body))

      await callFetcher()
      const url = new URL(
        String(fetchMock.mock.calls[0]?.[0]),
        'http://localhost',
      )

      expect(url.pathname).toBe(`/api/cms/${endpoint}`)
      expect((await GET(new Request(url))).status).toBe(200)
    },
  )
})
