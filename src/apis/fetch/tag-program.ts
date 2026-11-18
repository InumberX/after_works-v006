import { apiClient } from '~/apis/fetch/api-client'
import type { TagProgram, Tag } from '~/types/apis/fetch/tag-program'

export type ResponseGetTagProgram = Tag[]

export const getTagProgram = async (): Promise<ResponseGetTagProgram> => {
  const result: ResponseGetTagProgram = []

  const response = await apiClient<TagProgram>('/tags/program')

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
