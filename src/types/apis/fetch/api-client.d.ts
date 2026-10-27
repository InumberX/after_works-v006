import type { ApiErrorCode } from '~/consts/api'

/** API の取得結果（`~/apis/fetch/api-client` の `apiClient`）。sugidama と同じ形 */
export type ApiSuccess<T> = { success: true; data: T }

export type ApiError = {
  success: false
  /** API のエラーのステータス。応答がない、JSON でない、想定した形でないときは `null` */
  status: number | null
  /** 失敗の理由。Kuroco が 404 を返したときは `not_found`、それ以外は `failed` */
  code: ApiErrorCode
  message: string
}

export type ApiResult<T> = ApiSuccess<T> | ApiError
