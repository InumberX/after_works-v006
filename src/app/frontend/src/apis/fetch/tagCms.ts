import { API_URL } from '@/config/env'
import { TagCMS, Tag } from '@/types/apis/fetch/tagCms'

export type ResponseGetTagCmsInfos = Tag[]

export const getTagCmsInfos = async (): Promise<ResponseGetTagCmsInfos> => {
  const result: ResponseGetTagCmsInfos = []

  const response = await fetch(`${API_URL}/tags/cms`, {
    cache: 'no-store',
  })

  if (!response.ok) {
    return result
  }

  const value = await response
    .json()
    .then((data: TagCMS) => data)
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
