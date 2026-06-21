import { API_URL } from '~/config/env'
import { TagDesign, Tag } from '~/types/apis/fetch/tag-design'

export type ResponseGetTagDesign = Tag[]

export const getTagDesign = async (): Promise<ResponseGetTagDesign> => {
  const result: ResponseGetTagDesign = []

  const response = await fetch(`${API_URL}/tags/design`, {
    cache: 'no-store',
  })

  if (!response.ok) {
    return result
  }

  const value = await response
    .json()
    .then((data: TagDesign) => data)
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
