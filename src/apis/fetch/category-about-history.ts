import { apiClient } from '~/apis/fetch/api-client'
import type { Locale } from '~/consts/locale'
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
  lang,
  cnt = 0,
  page = 1,
}: {
  /** カテゴリに英語版が無いときは、`en` でも日本語版が返る */
  lang: Locale
  cnt?: number
  page?: number
}): Promise<ResponseGetCategoryAboutHistory> => {
  const response = await apiClient<CategoryAboutHistory>(
    '/categories/about-history',
    { _lang: lang, cnt, pageID: page },
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
