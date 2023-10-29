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
  cnt,
  page,
}: {
  cnt?: number
  page?: number
}): Promise<ResponseGetHobbyInfos> => {
  const param = [`cnt=${cnt || 12}`, `pageID=${page || 1}`].join('&')
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
