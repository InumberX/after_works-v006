import { API_URL } from '~/config/env'
import {
  ApiResponseBlogs,
  ApiResponseBlogsData,
  ApiResponseBlogsPageInfo,
} from '~/types/apis/fetch/blogs'

export type ResponseGetBlogsInfos =
  | {
      list: ApiResponseBlogsData[]
      pageInfo: ApiResponseBlogsPageInfo
    }
  | undefined

export const getBlogsInfos = async ({
  cnt,
  page,
}: {
  cnt?: number
  page?: number
}): Promise<ResponseGetBlogsInfos> => {
  const param = [`cnt=${cnt || 12}`, `pageID=${page || 1}`].join('&')
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
