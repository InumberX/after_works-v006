// ブラウザからの CMS（Kuroco）の API の呼び出しを中継する。サーバーで apiClient() を
// 呼ぶので、Workers のキャッシュが効き、同じ一覧を何度開いても Kuroco への問い合わせは
// 5 分に 1 回で済む。受け付けるのは API_PROXY_ENDPOINTS のエンドポイントだけ。
import { apiClient } from '~/apis/fetch/api-client'
import { API_ERROR_CODE, API_PROXY_ENDPOINTS, HTTP_STATUS } from '~/consts/api'
import type { ApiParams } from '~/types/apis/fetch/api-client'

export const dynamic = 'force-dynamic'

const isProxyEndpoint = (
  endpoint: string,
): endpoint is (typeof API_PROXY_ENDPOINTS)[number] =>
  (API_PROXY_ENDPOINTS as readonly string[]).includes(endpoint)

/** クエリを `apiClient()` のパラメータに戻す。同じ名前が続くものは配列にする */
const toApiParams = (searchParams: URLSearchParams): ApiParams => {
  const values = new Map<string, string[]>()

  for (const [name, value] of searchParams) {
    values.set(name, [...(values.get(name) ?? []), value])
  }

  return Object.fromEntries(
    [...values].map(([name, list]) => [
      name,
      list.length === 1 ? list[0] : list,
    ]),
  )
}

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) => {
  const endpoint = `/${(await params).path.join('/')}`

  if (!isProxyEndpoint(endpoint)) {
    return new Response(null, { status: HTTP_STATUS.NOT_FOUND })
  }

  const result = await apiClient<unknown>(
    endpoint,
    toApiParams(new URL(request.url).searchParams),
  )

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
