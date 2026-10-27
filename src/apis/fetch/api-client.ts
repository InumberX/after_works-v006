// CMS（Kuroco）の API を呼ぶ共通の関数。sugidama の app/data/api-client.ts と同じ形。
// 例外を投げずに必ず結果を返すので、失敗が何を意味するかは呼び出し側が決める。
import { API_URL } from '~/config/env'
import { API_ERROR_CODE, HTTP_STATUS } from '~/consts/api'
import type { ApiError, ApiResult } from '~/types/apis/fetch/api-client'

/** 見つからないときの結果。API に問い合わせる前に、見つからないと分かったときに使う */
export const createNotFoundError = (): ApiError => ({
  success: false,
  status: HTTP_STATUS.NOT_FOUND,
  code: API_ERROR_CODE.NOT_FOUND,
  message: 'Not Found',
})

/** 想定した形でない応答の結果 */
export const createUnexpectedResponseError = (): ApiError => ({
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
