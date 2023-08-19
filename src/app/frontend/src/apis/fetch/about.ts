import { API_URL } from '~/config/env'
import {
  ApiResponseAbout,
  ApiResponseAboutData,
} from '~/types/apis/fetch/about'

export type ResponseGetAboutInfo = ApiResponseAboutData | undefined

export const getAboutInfo = async (): Promise<ResponseGetAboutInfo> => {
  const response = await fetch(`${API_URL}/about`, {
    cache: 'no-cache',
  })

  if (!response.ok) {
    return undefined
  }

  const value = await response
    .json()
    .then((data: ApiResponseAbout) => data)
    .catch(() => undefined)

  if (!value || value.length === 0) {
    return undefined
  }

  const { list } = value[0]

  return list.length > 0 ? list[0] : undefined
}
