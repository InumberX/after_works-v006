import { API_URL } from '@/config/env'
import { About, List } from '@/types/apis/fetch/about'

export type ResponseGetAboutInfo = List | undefined

export const getAboutInfo = async ({
  cnt = 1,
  page = 1,
}: {
  cnt?: number
  page?: number
}): Promise<ResponseGetAboutInfo> => {
  const param = [`cnt=${cnt}`, `pageID=${page}`].join('&')
  const response = await fetch(`${API_URL}/about?${param}`, {
    cache: 'no-store',
  })

  if (!response.ok) {
    return undefined
  }

  const value = await response
    .json()
    .then((data: About[]) => data)
    .catch(() => undefined)

  if (!value || value.length === 0) {
    return undefined
  }

  const { list } = value[0]

  return list.length > 0 ? list[0] : undefined
}
