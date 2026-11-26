// @vitest-environment node
import { afterEach, describe, expect, it, vi } from 'vitest'

import { getAllArticles } from '~/apis/fetch/all-articles'

const item = (topics_id: number) => ({
  topics_id,
  subject: `記事${topics_id}`,
  ymd: '2026-01-01',
  update_ymdhi: '2026-01-01T00:00:00+09:00',
})

describe('getAllArticles', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('件数を取ってから、その件数で全件を、言語を付けて取得する', async () => {
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockImplementation(async (input) => {
        const url = new URL(String(input))
        const cnt = url.searchParams.get('cnt')
        const list = cnt === '1' ? [item(1)] : [item(1), item(2)]

        return Response.json({ list, pageInfo: { totalCnt: 2 } })
      })

    const articles = await getAllArticles('en')

    expect(articles.blogs.map((info) => info.topics_id)).toEqual([1, 2])
    expect(articles.works).toHaveLength(2)
    expect(articles.hobby).toHaveLength(2)
    const queries = fetchMock.mock.calls.map(
      (call) => new URL(String(call[0])).searchParams,
    )
    expect(queries.map((query) => query.get('_lang'))).toEqual(
      Array(6).fill('en'),
    )
    expect(queries.map((query) => query.get('cnt')).sort()).toEqual([
      '1',
      '1',
      '1',
      '2',
      '2',
      '2',
    ])
  })

  it('取得に失敗した種類は空にする', async () => {
    vi.spyOn(globalThis, 'fetch').mockImplementation(
      async () => new Response(null, { status: 500 }),
    )

    await expect(getAllArticles('ja')).resolves.toEqual({
      blogs: [],
      works: [],
      hobby: [],
    })
  })
})
