/** API の応答の HTTP ステータスのうち、アプリが扱うもの */
export const HTTP_STATUS = {
  /** 一覧の範囲外の pageID や、存在しない記事に Kuroco が返す */
  NOT_FOUND: 404,
  /** 中継（`API_PROXY_PATH`）が API から使える応答を得られなかったときに返す */
  BAD_GATEWAY: 502,
} as const

/** API の取得に失敗したときの理由 */
export const API_ERROR_CODE = {
  /** 見つからない（範囲外のページ、存在しない記事、不正な id） */
  NOT_FOUND: 'not_found',
  /** それ以外（障害、応答がない、JSON でない、想定した形でない） */
  FAILED: 'failed',
} as const

export type ApiErrorCode = (typeof API_ERROR_CODE)[keyof typeof API_ERROR_CODE]

/** API の成功した応答を Workers のキャッシュに保存しておく秒数（5 分） */
export const API_CACHE_MAX_AGE_SECONDS = 300

/**
 * ブラウザからの API の呼び出しを中継する Route Handler のパス
 * （`src/app/api/cms/[...path]/route.ts`）。ブラウザは Kuroco に直接問い合わせず、
 * ここを通すので、サーバーの Workers のキャッシュが効く
 */
export const API_PROXY_PATH = '/api/cms'

/** 中継が受け付ける API のエンドポイント。ブラウザから呼ぶものだけ */
export const API_PROXY_ENDPOINTS = [
  '/blogs',
  '/works',
  '/hobby',
  '/about-history',
] as const
