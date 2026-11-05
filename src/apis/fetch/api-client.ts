// CMS（Kuroco）の API を呼ぶ共通の関数。sugidama の app/data/api-client.ts と同じ形。
// 例外を投げずに必ず結果を返すので、失敗が何を意味するかは呼び出し側が決める。
import { API_URL, CACHE_BUSTER, SITE_URL } from '~/config/env'
import {
  API_CACHE_MAX_AGE_SECONDS,
  API_CACHE_PATH,
  API_ERROR_CODE,
  HTTP_STATUS,
} from '~/consts/api'
import type {
  ApiError,
  ApiParams,
  ApiResult,
} from '~/types/apis/fetch/api-client'

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

/**
 * 実際に API へ問い合わせる URL。`API_URL` の下の `endpoint` に、`params` を書いた順に
 * クエリとして付ける。`endpoint` に値を入れるときは、呼び出し側でエンコードしておく。
 */
export const toApiUrl = (endpoint: string, params: ApiParams = {}): URL => {
  const url = new URL(`${API_URL}${endpoint}`)

  for (const [name, value] of Object.entries(params)) {
    if (value === undefined) {
      continue
    }

    for (const item of [value].flat()) {
      url.searchParams.append(name, String(item))
    }
  }

  return url
}

/**
 * `apiUrl` の応答を保存するキャッシュのキー。API の URL のパスとクエリを、サイトの
 * オリジンと `CACHE_BUSTER` の下にそのまま置く。実際に問い合わせる URL から作るので、
 * API に渡したパラメータは必ずキーにも入る。オリジンでステージングと本番が、
 * `CACHE_BUSTER` でデプロイごとに分かれる。キャッシュの中の名前で、この URL に
 * アクセスすることはない。
 */
export const toCacheUrl = (apiUrl: URL): string =>
  `${new URL(SITE_URL).origin}${API_CACHE_PATH}/${CACHE_BUSTER}${apiUrl.pathname}${apiUrl.search}`

type ApiCache = Pick<Cache, 'match' | 'put'>

/**
 * リクエストを処理しているデータセンターの Workers のキャッシュ（Cache API）。
 * Workers の外（テスト、`next dev`）にはないので、そこでは毎回 API に問い合わせる。
 */
const getApiCache = (): ApiCache | undefined =>
  (globalThis as { caches?: { default?: ApiCache } }).caches?.default

/** 保存してある応答。ないとき、読めないときは `undefined` */
const readCache = async (
  cache: ApiCache,
  key: string,
): Promise<{ data: unknown } | undefined> => {
  try {
    const response = await cache.match(key)

    if (!response) {
      return undefined
    }

    return { data: JSON.parse(await response.text()) }
  } catch {
    return undefined
  }
}

/** 成功した応答の本文を保存する。保存に失敗しても、次の呼び出しが API に問い合わせるだけ */
const writeCache = async (
  cache: ApiCache,
  key: string,
  body: string,
): Promise<void> => {
  const response = new Response(body, {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': `max-age=${API_CACHE_MAX_AGE_SECONDS}`,
    },
  })

  await cache.put(key, response).catch(() => {})
}

/**
 * `API_URL` の下の `endpoint` を `params` 付きで GET し、JSON の本文を返す。成功した
 * 応答は Workers のキャッシュに `API_CACHE_MAX_AGE_SECONDS` 秒保存し、その間は
 * そこから返す。エラーは保存しないので、API が直ればすぐ元に戻る。
 */
export const apiClient = async <T>(
  endpoint: string,
  params?: ApiParams,
): Promise<ApiResult<T>> => {
  const apiUrl = toApiUrl(endpoint, params)
  const cache = getApiCache()
  const cacheUrl = toCacheUrl(apiUrl)

  if (cache) {
    const cached = await readCache(cache, cacheUrl)

    if (cached) {
      return { success: true, data: cached.data as T }
    }
  }

  let response: Response

  try {
    // Next.js の fetch のキャッシュは使わない。キャッシュは上の Workers のキャッシュだけ
    response = await fetch(apiUrl, { cache: 'no-store' })
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

  let body: string
  let data: T

  try {
    body = await response.text()
    data = JSON.parse(body) as T
  } catch {
    return {
      success: false,
      status: null,
      code: API_ERROR_CODE.FAILED,
      message: 'JSON parse error',
    }
  }

  if (cache) {
    await writeCache(cache, cacheUrl, body)
  }

  return { success: true, data }
}
