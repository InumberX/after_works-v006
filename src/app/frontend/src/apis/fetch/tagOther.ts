import { API_URL } from '@/config/env'
import {
  ApiResponseTagOther,
  ApiResponseTagOtherTag,
} from '@/types/apis/fetch/tagOther'

export type ResponseGetTagOtherInfos = ApiResponseTagOtherTag[]

export const getTagOtherInfos = async (): Promise<ResponseGetTagOtherInfos> => {
  const result: ResponseGetTagOtherInfos = []

  const response = await fetch(`${API_URL}/tags/other`, {
    cache: 'no-store',
  })

  if (!response.ok) {
    return result
  }

  const value = await response
    .json()
    .then((data: ApiResponseTagOther) => data)
    .catch(() => undefined)

  if (!value || value.list.length === 0) {
    return result
  }

  const { list } = value

  const target = list[0]

  Object.keys(target.tags).forEach((key) => {
    const tag = target.tags[key]

    result.push(tag)
  })

  return result
}
