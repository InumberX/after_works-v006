import { API_URL } from '@/config/env'
import { WorksDetail, Details } from '@/types/apis/fetch/worksDetail'

export type ResponseGetWorksDetailInfo = Details | undefined

export const getWorksDetailInfo = async ({
  id,
}: {
  id: string
}): Promise<ResponseGetWorksDetailInfo> => {
  const response = await fetch(`${API_URL}/works/${id}`, {
    cache: 'no-store',
  })

  if (!response.ok) {
    return undefined
  }

  const value = await response
    .json()
    .then((data: WorksDetail) => data)
    .catch(() => undefined)

  if (!value) {
    return undefined
  }

  const { details } = value

  return details || undefined
}
