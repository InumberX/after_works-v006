import { API_URL } from '@/config/env'
import {
  ApiResponseHobby,
  ApiResponseHobbyData,
  ApiResponseHobbyPageInfo,
} from '@/types/apis/fetch/hobby'

export type ResponseGetHobbyInfos =
  | {
      list: ApiResponseHobbyData[]
      pageInfo: ApiResponseHobbyPageInfo
    }
  | undefined

export const getHobbyInfos = async ({
  cnt = 12,
  page = 1,
  orderQuery = 'inst_ymdhi=DESC',
}: {
  cnt?: number
  page?: number
  orderQuery?: string
}): Promise<ResponseGetHobbyInfos> => {
  const param = [
    `cnt=${cnt}`,
    `pageID=${page}`,
    `order_query=${orderQuery}`,
  ].join('&')
  const response = await fetch(`${API_URL}/hobby?${param}`, {
    cache: 'no-store',
  })

  if (!response.ok) {
    return undefined
  }

  const value = await response
    .json()
    .then((data: ApiResponseHobby) => data)
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
