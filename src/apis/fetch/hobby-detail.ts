import {
  apiClient,
  notFoundError,
  unexpectedResponseError,
  type ApiResult,
} from '~/apis/fetch/api-client'
import type { HobbyDetail, Details } from '~/types/apis/fetch/hobby-detail'
import { parsePositiveInteger } from '~/utils/parse-positive-integer'

/**
 * 詳細の取得結果。存在しない記事では Kuroco が 404 を返すので、`code` が
 * `not_found` になる（`~/consts/api` の `API_ERROR_CODE`）。
 */
export type ResponseGetHobbyDetailInfo = ApiResult<Details>

export const getHobbyDetailInfo = async ({
  id,
}: {
  id: string
}): Promise<ResponseGetHobbyDetailInfo> => {
  // 詳細ページの id は topics_id（正の整数）だけ。それ以外は Kuroco に問い合わせずに
  // 見つからない扱いにする。そのまま URL に入れると、`x?cnt=-1` のようなクエリや
  // `..%2F` で同じ API の別のエンドポイントに届いてしまうため。
  if (parsePositiveInteger(id) === undefined) {
    return notFoundError()
  }

  const result = await apiClient<HobbyDetail>(`/hobby/${id}`)

  if (!result.success) {
    return result
  }

  const { details } = result.data

  return details ? { success: true, data: details } : unexpectedResponseError()
}
