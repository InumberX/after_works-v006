import { API_URL } from '~/config/env'
import { TagOther, Tag } from '~/types/apis/fetch/tag-other'

export type ResponseGetTagOther = Tag[]

export const getTagOther = async (): Promise<ResponseGetTagOther> => {
  const result: ResponseGetTagOther = []

  const response = await fetch(`${API_URL}/tags/other`, {
    cache: 'no-store',
  })

  if (!response.ok) {
    return result
  }

  const value = await response
    .json()
    .then((data: TagOther) => data)
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
