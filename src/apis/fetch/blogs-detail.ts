import { API_URL } from '~/config/env'
import type { BlogsDetail, Details } from '~/types/apis/fetch/blogs-detail'
import { hasApiErrorCode } from '~/utils/has-api-error-code'
import { parsePositiveInteger } from '~/utils/parse-positive-integer'

/**
 * 詳細の取得結果。`null` は記事が見つからない（Kuroco が `not_found` を返した、
 * または id が topics_id の形でない）、`undefined` はそれ以外の理由で取得できなかった
 * ことを表す。
 */
export type ResponseGetBlogsDetailInfo = Details | null | undefined

export const getBlogsDetailInfo = async ({
  id,
}: {
  id: string
}): Promise<ResponseGetBlogsDetailInfo> => {
  // 詳細ページの id は topics_id（正の整数）だけ。それ以外は Kuroco に問い合わせずに
  // 見つからない扱いにする。そのまま URL に入れると、`x?cnt=-1` のようなクエリや
  // `..%2F` で同じ API の別のエンドポイントに届いてしまうため。
  if (parsePositiveInteger(id) === undefined) {
    return null
  }

  const response = await fetch(`${API_URL}/blogs/${id}`, {
    cache: 'no-store',
  })

  const body: unknown = await response.json().catch(() => undefined)

  // 存在しない記事には Kuroco が `not_found` を返す。他のエラーと区別する
  if (hasApiErrorCode(body, 'not_found')) {
    return null
  }

  if (!response.ok || !body) {
    return undefined
  }

  const { details } = body as BlogsDetail

  return details || undefined
}
