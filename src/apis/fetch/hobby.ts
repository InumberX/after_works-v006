import { API_URL } from '~/config/env'
import type { Hobby, List, PageInfo } from '~/types/apis/fetch/hobby'
import { isKurocoNotFound } from '~/utils/is-kuroco-not-found'

/**
 * 一覧の取得結果。`null` は Kuroco が `not_found` を返した（範囲外のページなど）、
 * `undefined` はそれ以外の理由で取得できなかったことを表す。
 */
export type ResponseGetHobbyList =
  | {
      list: List[]
      pageInfo: PageInfo
    }
  | null
  | undefined

export const getHobbyList = async ({
  cnt = 12,
  page = 1,
  orderQuery = 'inst_ymdhi=DESC',
}: {
  cnt?: number
  page?: number
  orderQuery?: string
}): Promise<ResponseGetHobbyList> => {
  const param = [
    `cnt=${cnt}`,
    `pageID=${page}`,
    `order_query=${orderQuery}`,
  ].join('&')
  const response = await fetch(`${API_URL}/hobby?${param}`, {
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

  const value = body as Hobby

  const { list, pageInfo } = value

  return list && pageInfo
    ? {
        list,
        pageInfo,
      }
    : undefined
}
