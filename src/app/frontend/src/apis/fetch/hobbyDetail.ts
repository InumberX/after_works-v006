import { API_URL } from '@/config/env'
import { HobbyDetail, Details } from '@/types/apis/fetch/hobbyDetail'

export type ResponseGetHobbyDetailInfo = Details | undefined

export const getHobbyDetailInfo = async ({
  id,
}: {
  id: string
}): Promise<ResponseGetHobbyDetailInfo> => {
  const response = await fetch(`${API_URL}/hobby/${id}`, {
    cache: 'no-store',
  })

  if (!response.ok) {
    return undefined
  }

  const value = await response
    .json()
    .then((data: HobbyDetail) => data)
    .catch(() => undefined)

  if (!value) {
    return undefined
  }

  const { details } = value

  return details || undefined
}
