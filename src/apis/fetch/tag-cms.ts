import { apiClient } from '~/apis/fetch/api-client'
import type { TagCMS, Tag } from '~/types/apis/fetch/tag-cms'

export type ResponseGetTagCms = Tag[]

export const getTagCms = async (): Promise<ResponseGetTagCms> => {
  const result: ResponseGetTagCms = []

  const response = await apiClient<TagCMS>('/tags/cms')

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
