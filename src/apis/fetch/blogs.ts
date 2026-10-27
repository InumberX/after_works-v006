import {
  apiClient,
  unexpectedResponseError,
  type ApiResult,
} from '~/apis/fetch/api-client'
import type { Blogs, List, PageInfo } from '~/types/apis/fetch/blogs'

/**
 * 一覧の取得結果。範囲外のページでは Kuroco が 404 を返すので、`code` が
 * `not_found` になる（`~/consts/api` の `API_ERROR_CODE`）。
 */
export type ResponseGetBlogsList = ApiResult<{
  list: List[]
  pageInfo: PageInfo
}>

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
  const result = await apiClient<Blogs>(`/blogs?${param}`)

  if (!result.success) {
    return result
  }

  const { list, pageInfo } = result.data

  return list && pageInfo
    ? { success: true, data: { list, pageInfo } }
    : unexpectedResponseError()
}
