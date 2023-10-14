import { API_URL } from '@/config/env'
import {
  ApiResponseTagProgram,
  ApiResponseTagProgramTag,
} from '@/types/apis/fetch/tagProgram'

export type ResponseGetTagProgramInfos = ApiResponseTagProgramTag[]

export const getTagProgramInfos =
  async (): Promise<ResponseGetTagProgramInfos> => {
    const result: ResponseGetTagProgramInfos = []

    const response = await fetch(`${API_URL}/tags/program`, {
      cache: 'no-store',
    })

    if (!response.ok) {
      return result
    }

    const value = await response
      .json()
      .then((data: ApiResponseTagProgram) => data)
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
