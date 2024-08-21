import { API_URL } from '@/config/env'
import { BlogsDetail, Details } from '@/types/apis/fetch/blogsDetail'

export type ResponseGetBlogsDetailInfo = Details | undefined

export const getBlogsDetailInfo = async ({
  id,
}: {
  id: string
}): Promise<ResponseGetBlogsDetailInfo> => {
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
