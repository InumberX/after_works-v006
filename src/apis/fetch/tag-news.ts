import { apiClient } from '~/apis/fetch/api-client'
import type { TagNews, Tag } from '~/types/apis/fetch/tag-news'

export type ResponseGetTagNews = Tag[]

export const getTagNews = async (): Promise<ResponseGetTagNews> => {
  const result: ResponseGetTagNews = []

  const response = await apiClient<TagNews>('/tags/news')

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
