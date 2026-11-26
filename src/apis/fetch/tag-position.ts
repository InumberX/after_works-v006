import { apiClient } from '~/apis/fetch/api-client'
import type { Locale } from '~/consts/locale'
import type { TagPosition, Tag } from '~/types/apis/fetch/tag-position'

export type ResponseGetTagPosition = Tag[]

/** タグの一覧。その言語の版が無いタグは入らない */
export const getTagPosition = async ({
  lang,
}: {
  lang: Locale
}): Promise<ResponseGetTagPosition> => {
  const result: ResponseGetTagPosition = []

  const response = await apiClient<TagPosition>('/tags/position', {
    _lang: lang,
  })

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
