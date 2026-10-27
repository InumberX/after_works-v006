import { API_URL } from '~/config/env'
import type { BlogsDetail, Details } from '~/types/apis/fetch/blogs-detail'
import { parsePositiveInteger } from '~/utils/parse-positive-integer'

export type ResponseGetBlogsDetailInfo = Details | undefined

export const getBlogsDetailInfo = async ({
  id,
}: {
  id: string
}): Promise<ResponseGetBlogsDetailInfo> => {
  // 詳細ページの id は topics_id（正の整数）だけ。それ以外は Kuroco に問い合わせずに
  // 見つからない扱いにする。そのまま URL に入れると、`x?cnt=-1` のようなクエリや
  // `..%2F` で同じ API の別のエンドポイントに届いてしまうため。
  if (parsePositiveInteger(id) === undefined) {
    return undefined
  }

  const response = await fetch(`${API_URL}/blogs/${id}`, {
    cache: 'no-store',
  })

  if (!response.ok) {
    return undefined
  }

  const value = await response
    .json()
    .then((data: BlogsDetail) => data)
    .catch(() => undefined)

  if (!value) {
    return undefined
  }

  const { details } = value

  return details || undefined
}
