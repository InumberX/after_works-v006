import { getBlogsList } from '~/apis/fetch/blogs'
import { getHobbyList } from '~/apis/fetch/hobby'
import { getWorksList } from '~/apis/fetch/works'
import type { Locale } from '~/consts/locale'
import type { ApiResult } from '~/types/apis/fetch/api-client'

/** サイトマップと RSS が読む、記事の項目 */
export type ArticleItem = {
  topics_id: number
  subject: string
  ymd: Date
  update_ymdhi: Date
}

type GetList = (params: {
  lang: Locale
  cnt: number
}) => Promise<
  ApiResult<{ list: ArticleItem[]; pageInfo: { totalCnt: number } }>
>

/** 一覧の全件。件数を取ってから、その件数で取り直す。失敗したときは空 */
const getAll = async (
  getList: GetList,
  lang: Locale,
): Promise<ArticleItem[]> => {
  const count = await getList({ lang, cnt: 1 })

  if (!count.success) {
    return []
  }

  const all = await getList({ lang, cnt: count.data.pageInfo.totalCnt })

  return all.success ? all.data.list : []
}

/**
 * ブログ・実績・趣味の全件を、`lang` の言語で取得する。その言語の版が無い記事は
 * 入らない（その言語の詳細ページは 404 になるため）。
 */
export const getAllArticles = async (
  lang: Locale,
): Promise<{
  blogs: ArticleItem[]
  works: ArticleItem[]
  hobby: ArticleItem[]
}> => {
  const [blogs, works, hobby] = await Promise.all([
    getAll(getBlogsList, lang),
    getAll(getWorksList, lang),
    getAll(getHobbyList, lang),
  ])

  return { blogs, works, hobby }
}
