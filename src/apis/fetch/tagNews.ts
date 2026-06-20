import { API_URL } from '~/config/env'
import { TagNews, Tag } from '~/types/apis/fetch/tagNews'

export type ResponseGetTagNews = Tag[]

export const getTagNews = async (): Promise<ResponseGetTagNews> => {
  const result: ResponseGetTagNews = []

  const response = await fetch(`${API_URL}/tags/news`, {
    cache: 'no-store',
  })

  if (!response.ok) {
    return result
  }

  const value = await response
    .json()
    .then((data: TagNews) => data)
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
