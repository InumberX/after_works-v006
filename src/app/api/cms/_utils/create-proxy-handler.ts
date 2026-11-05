// ブラウザからの CMS（Kuroco）の API の呼び出しを中継する Route Handler を作る。
// サーバーで apiClient() を呼ぶので Workers のキャッシュが効き、同じ一覧を何度開いても
// Kuroco への問い合わせは 5 分に 1 回で済む。
import { apiClient } from '~/apis/fetch/api-client'
import { API_ERROR_CODE, HTTP_STATUS } from '~/consts/api'
import type { ApiParams } from '~/types/apis/fetch/api-client'

/**
 * クエリを `apiClient()` のパラメータに戻す。同じ名前が続くものは配列にする。
 * `allowedParams` にない名前があれば `undefined` を返す。
 */
const toApiParams = (
  searchParams: URLSearchParams,
  allowedParams: readonly string[],
): ApiParams | undefined => {
  const values = new Map<string, string[]>()

  for (const [name, value] of searchParams) {
    if (!allowedParams.includes(name)) {
      return undefined
    }

    values.set(name, [...(values.get(name) ?? []), value])
  }

  return Object.fromEntries(
    [...values].map(([name, list]) => [
      name,
      list.length === 1 ? list[0] : list,
    ]),
  )
}

/**
 * `endpoint` を中継する `GET`。受け付けるクエリは `allowedParams` の名前だけで、
 * それ以外の名前があれば Kuroco に問い合わせずに 400 を返す。fetch の関数が
 * パラメータを増やしたら、ここにも足す。
 */
export const createProxyHandler =
  ({
    endpoint,
    allowedParams,
  }: {
    endpoint: string
    allowedParams: readonly string[]
  }) =>
  async (request: Request): Promise<Response> => {
    const params = toApiParams(new URL(request.url).searchParams, allowedParams)

    if (!params) {
      return new Response(null, { status: HTTP_STATUS.BAD_REQUEST })
    }

    const result = await apiClient<unknown>(endpoint, params)

    if (result.success) {
      return Response.json(result.data)
    }

    // Kuroco の 404（範囲外のページ）は 404 のまま返し、ブラウザ側でも not_found にする。
    // それ以外は API の詳細を伝えず 502 にする
    return new Response(null, {
      status:
        result.code === API_ERROR_CODE.NOT_FOUND
          ? HTTP_STATUS.NOT_FOUND
          : HTTP_STATUS.BAD_GATEWAY,
    })
  }
