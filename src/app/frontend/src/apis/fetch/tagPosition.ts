import { API_URL } from '@/config/env'
import { TagPosition, Tag } from '@/types/apis/fetch/tagPosition'

export type ResponseGetTagPositionInfos = Tag[]

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
      .then((data: TagPosition) => data)
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
