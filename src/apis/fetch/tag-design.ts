import { apiClient } from '~/apis/fetch/api-client'
import type { Locale } from '~/consts/locale'
import type { TagDesign, Tag } from '~/types/apis/fetch/tag-design'

export type ResponseGetTagDesign = Tag[]

/** タグの一覧。その言語の版が無いタグは入らない */
export const getTagDesign = async ({
  lang,
}: {
  lang: Locale
}): Promise<ResponseGetTagDesign> => {
  const result: ResponseGetTagDesign = []

  const response = await apiClient<TagDesign>('/tags/design', { _lang: lang })

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
