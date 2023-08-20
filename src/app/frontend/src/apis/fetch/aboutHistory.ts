import { API_URL } from '~/config/env'
import {
  ApiResponseAboutHistory,
  ApiResponseAboutHistoryData,
} from '~/types/apis/fetch/aboutHistory'

export type ResponseGetAboutHistoryInfo =
  | ApiResponseAboutHistoryData[]
  | undefined

export const getAboutHistoryInfo = async ({
  categoryId,
  cnt,
  page,
}: {
  categoryId: string
  cnt?: number
  page?: number
}): Promise<ResponseGetAboutHistoryInfo> => {
  const param = [
    `category_parent_id[]=${categoryId}`,
    `cnt=${cnt || 0}`,
    `pageID=${page || 1}`,
  ].join('&')
  const response = await fetch(`${API_URL}/about-history?${param}`, {
    cache: 'no-store',
  })

  if (!response.ok) {
    return undefined
  }

  const value = await response
    .json()
    .then((data: ApiResponseAboutHistory) => data)
    .catch(() => undefined)

  if (!value || value.length === 0) {
    return undefined
  }

  const { list } = value[0]

  return list.length > 0 ? list : undefined
}
