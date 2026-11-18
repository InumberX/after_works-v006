import { apiClient } from '~/apis/fetch/api-client'
import type { TagDesign, Tag } from '~/types/apis/fetch/tag-design'

export type ResponseGetTagDesign = Tag[]

export const getTagDesign = async (): Promise<ResponseGetTagDesign> => {
  const result: ResponseGetTagDesign = []

  const response = await apiClient<TagDesign>('/tags/design')

  if (!response.success) {
    return result
  }

  const value = response.data

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
