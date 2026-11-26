import {
  apiClient,
  createUnexpectedResponseError,
} from '~/apis/fetch/api-client'
import type { Locale } from '~/consts/locale'
import type { ApiResult } from '~/types/apis/fetch/api-client'
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
  lang,
  cnt = 12,
  page = 1,
  orderQuery = 'inst_ymdhi=DESC',
}: {
  /** 取得する言語。その言語の版が無い記事は一覧に入らない */
  lang: Locale
  cnt?: number
  page?: number
  orderQuery?: string
}): Promise<ResponseGetWorksList> => {
  const result = await apiClient<Works>('/works', {
    _lang: lang,
    cnt,
    pageID: page,
    order_query: orderQuery,
  })

  if (!result.success) {
    return result
  }

  const { list, pageInfo } = result.data

  return list && pageInfo
    ? { success: true, data: { list, pageInfo } }
    : createUnexpectedResponseError()
}
