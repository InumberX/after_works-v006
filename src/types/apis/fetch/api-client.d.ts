import type { ApiErrorCode } from '~/consts/api'

export type ApiSuccess<T> = { success: true; data: T }

export type ApiError = {
  success: false
  /** API のエラーのステータス。応答がない、JSON でない、想定した形でないときは `null` */
  status: number | null
  /** 失敗の理由。Kuroco が 404 を返したときは `not_found`、それ以外は `failed` */
  code: ApiErrorCode
  message: string
}

/** API の取得結果（`~/apis/fetch/api-client` の `apiClient`）。sugidama と同じ形 */
export type ApiResult<T> = ApiSuccess<T> | ApiError

/** クエリの値。配列は同じ名前で並べ（`tag_id=1&tag_id=2`）、`undefined` は送らない */
export type ApiParamValue =
  | string
  | number
  | readonly (string | number)[]
  | undefined

/** API に渡すクエリ。書いた順にクエリに並ぶ */
export type ApiParams = Record<string, ApiParamValue>
