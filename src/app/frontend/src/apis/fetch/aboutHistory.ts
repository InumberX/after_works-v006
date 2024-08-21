import { API_URL } from '@/config/env'
import { AboutHistory, List } from '@/types/apis/fetch/aboutHistory'

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
  const param = [
    `category_parent_id[]=${categoryId}`,
    `cnt=${cnt}`,
    `pageID=${page}`,
  ].join('&')
  const response = await fetch(`${API_URL}/about-history?${param}`, {
    cache: 'no-store',
  })

  if (!response.ok) {
    return undefined
  }

  const value = await response
    .json()
    .then((data: AboutHistory[]) => data)
    .catch(() => undefined)

  if (!value || value.length === 0) {
    return undefined
  }

  const { list } = value[0]

  return list.length > 0 ? list : undefined
}
