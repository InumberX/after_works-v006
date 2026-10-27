import { API_URL } from '~/config/env'
import type { Works, List, PageInfo } from '~/types/apis/fetch/works'
import { hasKurocoErrorCode } from '~/utils/has-kuroco-error-code'

/**
 * 一覧の取得結果。`null` は Kuroco が `not_found` を返した（範囲外のページなど）、
 * `undefined` はそれ以外の理由で取得できなかったことを表す。
 */
export type ResponseGetWorksList =
  | {
      list: List[]
      pageInfo: PageInfo
    }
  | null
  | undefined

export const getWorksList = async ({
  cnt = 12,
  page = 1,
  orderQuery = 'inst_ymdhi=DESC',
}: {
  cnt?: number
  page?: number
  orderQuery?: string
}): Promise<ResponseGetWorksList> => {
  const param = [
    `cnt=${cnt}`,
    `pageID=${page}`,
    `order_query=${orderQuery}`,
  ].join('&')
  const response = await fetch(`${API_URL}/works?${param}`, {
    cache: 'no-store',
  })

  const body: unknown = await response.json().catch(() => undefined)

  // 範囲外のページなど、Kuroco が `not_found` を返したときは他のエラーと区別する
  if (hasKurocoErrorCode(body, 'not_found')) {
    return null
  }

  if (!response.ok || !body) {
    return undefined
  }

  const value = body as Works

  const { list, pageInfo } = value

  return list && pageInfo
    ? {
        list,
        pageInfo,
      }
    : undefined
}
