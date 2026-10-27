/** API の応答の HTTP ステータスのうち、アプリが扱うもの */
export const HTTP_STATUS = {
  /** 一覧の範囲外の pageID や、存在しない記事に Kuroco が返す */
  NOT_FOUND: 404,
} as const

/** API の取得に失敗したときの理由 */
export const API_ERROR_CODE = {
  /** 見つからない（範囲外のページ、存在しない記事、不正な id） */
  NOT_FOUND: 'not_found',
  /** それ以外（障害、応答がない、JSON でない、想定した形でない） */
  FAILED: 'failed',
} as const

export type ApiErrorCode = (typeof API_ERROR_CODE)[keyof typeof API_ERROR_CODE]
