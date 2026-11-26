import { apiClient } from '~/apis/fetch/api-client'
import type { Locale } from '~/consts/locale'
import type { About, List } from '~/types/apis/fetch/about'

export type ResponseGetAboutInfo = List | undefined

export const getAboutInfo = async ({
  lang,
  cnt = 1,
  page = 1,
}: {
  lang: Locale
  cnt?: number
  page?: number
}): Promise<ResponseGetAboutInfo> => {
  const response = await apiClient<About[]>('/about', {
    _lang: lang,
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

  return list.length > 0 ? list[0] : undefined
}
