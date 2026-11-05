import { apiClient } from '~/apis/fetch/api-client'
import type { About, List } from '~/types/apis/fetch/about'

export type ResponseGetAboutInfo = List | undefined

export const getAboutInfo = async ({
  cnt = 1,
  page = 1,
}: {
  cnt?: number
  page?: number
}): Promise<ResponseGetAboutInfo> => {
  const response = await apiClient<About[]>('/about', { cnt, pageID: page })

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
