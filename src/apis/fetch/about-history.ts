import { apiClient } from '~/apis/fetch/api-client'
import type { AboutHistory, List } from '~/types/apis/fetch/about-history'

export type ResponseGetAboutHistoryInfo = List[] | undefined

export const getAboutHistoryInfo = async ({
  categoryId,
  cnt = 0,
  page = 1,
}: {
  categoryId: string
  cnt?: number
  page?: number
}): Promise<ResponseGetAboutHistoryInfo> => {
  const response = await apiClient<AboutHistory[]>('/about-history', {
    'category_parent_id[]': categoryId,
    cnt,
    pageID: page,
  })

  if (!response.success) {
    return undefined
  }

  const value = response.data

  if (!value || value.length === 0) {
    return undefined
  }

  const { list } = value[0]

  return list.length > 0 ? list : undefined
}
