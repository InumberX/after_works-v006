import { API_URL } from '@/config/env'
import {
  ApiResponseBlogs,
  ApiResponseBlogsData,
  ApiResponseBlogsPageInfo,
} from '@/types/apis/fetch/blogs'

export type ResponseGetBlogsInfos =
  | {
      list: ApiResponseBlogsData[]
      pageInfo: ApiResponseBlogsPageInfo
    }
  | undefined

export const getBlogsInfos = async ({
  cnt = 12,
  page = 1,
  orderQuery = 'inst_ymdhi=DESC',
}: {
  cnt?: number
  page?: number
  orderQuery?: string
}): Promise<ResponseGetBlogsInfos> => {
  const param = [
    `cnt=${cnt}`,
    `pageID=${page}`,
    `order_query=${orderQuery}`,
  ].join('&')
  const response = await fetch(`${API_URL}/blogs?${param}`, {
    cache: 'no-store',
  })

  if (!response.ok) {
    return undefined
  }

  const value = await response
    .json()
    .then((data: ApiResponseBlogs) => data)
    .catch(() => undefined)

  if (!value) {
    return undefined
  }

  const { list, pageInfo } = value

  return list && pageInfo
    ? {
        list,
        pageInfo,
      }
    : undefined
}
