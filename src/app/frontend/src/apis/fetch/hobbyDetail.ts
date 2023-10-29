import { API_URL } from '@/config/env'
import {
  ApiResponseHobbyDetail,
  ApiResponseHobbyDetailData,
} from '@/types/apis/fetch/hobbyDetail'

export type ResponseGetHobbyDetailInfo = ApiResponseHobbyDetailData | undefined

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
    .then((data: ApiResponseHobbyDetail) => data)
    .catch(() => undefined)

  if (!value) {
    return undefined
  }

  const { details } = value

  return details || undefined
}
