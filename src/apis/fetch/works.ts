import {
  apiClient,
  unexpectedResponseError,
  type ApiResult,
} from '~/apis/fetch/api-client'
import type { Works, List, PageInfo } from '~/types/apis/fetch/works'

/**
 * 一覧の取得結果。範囲外のページでは Kuroco が 404 を返すので、`code` が
 * `not_found` になる（`~/consts/api` の `API_ERROR_CODE`）。
 */
export type ResponseGetWorksList = ApiResult<{
  list: List[]
  pageInfo: PageInfo
}>

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
  const result = await apiClient<Works>(`/works?${param}`)

  if (!result.success) {
    return result
  }

  const { list, pageInfo } = result.data

  return list && pageInfo
    ? { success: true, data: { list, pageInfo } }
    : unexpectedResponseError()
}
