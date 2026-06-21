import { API_URL } from '~/config/env'
import type { TagProgram, Tag } from '~/types/apis/fetch/tag-program'

export type ResponseGetTagProgram = Tag[]

export const getTagProgram = async (): Promise<ResponseGetTagProgram> => {
  const result: ResponseGetTagProgram = []

  const response = await fetch(`${API_URL}/tags/program`, {
    cache: 'no-store',
  })

  if (!response.ok) {
    return result
  }

  const value = await response
    .json()
    .then((data: TagProgram) => data)
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
