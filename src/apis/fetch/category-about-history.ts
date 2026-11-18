import { apiClient } from '~/apis/fetch/api-client'
import type {
  CategoryAboutHistory,
  List,
  PageInfo,
} from '~/types/apis/fetch/category-about-history'

export type ResponseGetCategoryAboutHistory =
  | {
      list: List[]
      pageInfo: PageInfo
    }
  | undefined

export const getCategoryAboutHistoryList = async ({
  cnt = 0,
  page = 1,
}: {
  cnt?: number
  page?: number
}): Promise<ResponseGetCategoryAboutHistory> => {
  const response = await apiClient<CategoryAboutHistory>(
    '/categories/about-history',
    { cnt, pageID: page },
  )

  if (!response.success) {
    return undefined
  }

  const value = response.data

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
