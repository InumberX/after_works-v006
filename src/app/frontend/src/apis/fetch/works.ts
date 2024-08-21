import { API_URL } from '@/config/env'
import { Works, List, PageInfo } from '@/types/apis/fetch/works'

export type ResponseGetWorksInfos =
  | {
      list: List[]
      pageInfo: PageInfo
    }
  | undefined

export const getWorksInfos = async ({
  cnt = 12,
  page = 1,
  orderQuery = 'inst_ymdhi=DESC',
}: {
  cnt?: number
  page?: number
  orderQuery?: string
}): Promise<ResponseGetWorksInfos> => {
  const param = [
    `cnt=${cnt}`,
    `pageID=${page}`,
    `order_query=${orderQuery}`,
  ].join('&')
  const response = await fetch(`${API_URL}/works?${param}`, {
    cache: 'no-store',
  })

  if (!response.ok) {
    return undefined
  }

  const value = await response
    .json()
    .then((data: Works) => data)
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
