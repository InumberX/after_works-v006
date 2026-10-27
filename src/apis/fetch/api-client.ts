// CMS（Kuroco）の API を呼ぶ共通の関数。sugidama の app/data/api-client.ts と同じ形。
// 例外を投げずに必ず結果を返すので、失敗が何を意味するかは呼び出し側が決める。
import { API_URL } from '~/config/env'
import { API_ERROR_CODE, HTTP_STATUS, type ApiErrorCode } from '~/consts/api'

type ApiSuccess<T> = { success: true; data: T }

export type ApiError = {
  success: false
  /** API のエラーのステータス。応答がない、JSON でない、想定した形でないときは `null` */
  status: number | null
  /** 失敗の理由。Kuroco が 404 を返したときは `not_found`、それ以外は `failed` */
  code: ApiErrorCode
  message: string
}

export type ApiResult<T> = ApiSuccess<T> | ApiError

/** 見つからないときの結果。API に問い合わせる前に、見つからないと分かったときに使う */
export const notFoundError = (): ApiError => ({
  success: false,
  status: HTTP_STATUS.NOT_FOUND,
  code: API_ERROR_CODE.NOT_FOUND,
  message: 'Not Found',
})

/** 想定した形でない応答の結果 */
export const unexpectedResponseError = (): ApiError => ({
  success: false,
  status: null,
  code: API_ERROR_CODE.FAILED,
  message: 'Unexpected response',
})

const getErrorMessage = (error: unknown): string =>
  error instanceof Error
    ? error.message
    : typeof error === 'string'
      ? error
      : 'unexpected error'

/** `${API_URL}${path}` を GET し、JSON の本文を返す。キャッシュはしない */
export const apiClient = async <T>(path: string): Promise<ApiResult<T>> => {
  let response: Response

  try {
    response = await fetch(`${API_URL}${path}`, { cache: 'no-store' })
  } catch (error) {
    return {
      success: false,
      status: null,
      code: API_ERROR_CODE.FAILED,
      message: getErrorMessage(error),
    }
  }

  if (!response.ok) {
    // エラーの本文は読まないので、接続を解放する
    await response.body?.cancel().catch(() => {})

    return {
      success: false,
      status: response.status,
      code:
        response.status === HTTP_STATUS.NOT_FOUND
          ? API_ERROR_CODE.NOT_FOUND
          : API_ERROR_CODE.FAILED,
      message: response.statusText || `API error ${response.status}`,
    }
  }

  try {
    return { success: true, data: (await response.json()) as T }
  } catch {
    return {
      success: false,
      status: null,
      code: API_ERROR_CODE.FAILED,
      message: 'JSON parse error',
    }
  }
}
