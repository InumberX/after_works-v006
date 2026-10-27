import { isKurocoNotFound } from '~/apis/fetch/kuroco-not-found'
import { API_URL } from '~/config/env'
import type { Blogs, List, PageInfo } from '~/types/apis/fetch/blogs'

/**
 * 一覧の取得結果。`null` は Kuroco が `not_found` を返した（範囲外のページなど）、
 * `undefined` はそれ以外の理由で取得できなかったことを表す。
 */
export type ResponseGetBlogsList =
  | {
      list: List[]
      pageInfo: PageInfo
    }
  | null
  | undefined

export const getBlogsList = async ({
  cnt = 12,
  page = 1,
  orderQuery = 'inst_ymdhi=DESC',
}: {
  cnt?: number
  page?: number
  orderQuery?: string
}): Promise<ResponseGetBlogsList> => {
  const param = [
    `cnt=${cnt}`,
    `pageID=${page}`,
    `order_query=${orderQuery}`,
  ].join('&')
  const response = await fetch(`${API_URL}/blogs?${param}`, {
    cache: 'no-store',
  })

  const body: unknown = await response.json().catch(() => undefined)

  // 範囲外のページなど、Kuroco が `not_found` を返したときは他のエラーと区別する
  if (isKurocoNotFound(body)) {
    return null
  }

  if (!response.ok || !body) {
    return undefined
  }

  const value = body as Blogs

  const { list, pageInfo } = value

  return list && pageInfo
    ? {
        list,
        pageInfo,
      }
    : undefined
}
