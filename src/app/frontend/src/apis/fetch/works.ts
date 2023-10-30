import { API_URL } from '@/config/env'
import {
  ApiResponseWorks,
  ApiResponseWorksData,
  ApiResponseWorksPageInfo,
} from '@/types/apis/fetch/works'

export type ResponseGetWorksInfos =
  | {
      list: ApiResponseWorksData[]
      pageInfo: ApiResponseWorksPageInfo
    }
  | undefined

export const getWorksInfos = async ({
  cnt,
  page,
}: {
  cnt?: number
  page?: number
}): Promise<ResponseGetWorksInfos> => {
  const param = [`cnt=${cnt ?? 12}`, `pageID=${page ?? 1}`].join('&')
  const response = await fetch(`${API_URL}/works?${param}`, {
    cache: 'no-store',
  })

  if (!response.ok) {
    return undefined
  }

  const value = await response
    .json()
    .then((data: ApiResponseWorks) => data)
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
