import { API_URL } from '@/config/env'
import {
  ApiResponseTagPosition,
  ApiResponseTagPositionTag,
} from '@/types/apis/fetch/tagPosition'

export type ResponseGetTagPositionInfos = ApiResponseTagPositionTag[]

export const getTagPositionInfos =
  async (): Promise<ResponseGetTagPositionInfos> => {
    const result: ResponseGetTagPositionInfos = []

    const response = await fetch(`${API_URL}/tags/position`, {
      cache: 'no-store',
    })

    if (!response.ok) {
      return result
    }

    const value = await response
      .json()
      .then((data: ApiResponseTagPosition) => data)
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
