import {
  apiClient,
  createNotFoundError,
  createUnexpectedResponseError,
} from '~/apis/fetch/api-client'
import type { ApiResult } from '~/types/apis/fetch/api-client'
import type { BlogsDetail, Details } from '~/types/apis/fetch/blogs-detail'
import { parsePositiveInteger } from '~/utils/parse-positive-integer'

/**
 * 詳細の取得結果。存在しない記事では Kuroco が 404 を返すので、`code` が
 * `not_found` になる（`~/consts/api` の `API_ERROR_CODE`）。
 */
export type ResponseGetBlogsDetailInfo = ApiResult<Details>

export const getBlogsDetailInfo = async ({
  id,
}: {
  id: string
}): Promise<ResponseGetBlogsDetailInfo> => {
  // 詳細ページの id は topics_id（正の整数）だけ。それ以外は Kuroco に問い合わせずに
  // 見つからない扱いにする。そのまま URL に入れると、`x?cnt=-1` のようなクエリや
  // `..%2F` で同じ API の別のエンドポイントに届いてしまうため。
  if (parsePositiveInteger(id) === undefined) {
    return createNotFoundError()
  }

  const result = await apiClient<BlogsDetail>(`/blogs/${id}`)

  if (!result.success) {
    return result
  }

  const { details } = result.data

  return details
    ? { success: true, data: details }
    : createUnexpectedResponseError()
}
