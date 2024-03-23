import { API_URL } from '@/config/env'
import {
  ApiResponseCategoryAboutHistory,
  ApiResponseCategoryAboutHistoryData,
  ApiResponseCategoryAboutHistoryPageInfo,
} from '@/types/apis/fetch/categoryAboutHistory'

export type ResponseGetCategoryAboutHistory =
  | {
      list: ApiResponseCategoryAboutHistoryData[]
      pageInfo: ApiResponseCategoryAboutHistoryPageInfo
    }
  | undefined

export const getCategoryAboutHistoryInfos = async ({
  cnt = 0,
  page = 1,
}: {
  cnt?: number
  page?: number
}): Promise<ResponseGetCategoryAboutHistory> => {
  const param = [`cnt=${cnt}`, `pageID=${page}`].join('&')
  const response = await fetch(`${API_URL}/categories/about-history?${param}`, {
    cache: 'no-store',
  })

  if (!response.ok) {
    return undefined
  }

  const value = await response
    .json()
    .then((data: ApiResponseCategoryAboutHistory) => data)
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
