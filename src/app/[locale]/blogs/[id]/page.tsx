import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Index } from './_components'

import { getBlogsList } from '~/apis/fetch/blogs'
import { getBlogsDetailInfo } from '~/apis/fetch/blogs-detail'
import { getTagCms } from '~/apis/fetch/tag-cms'
import { getTagDesign } from '~/apis/fetch/tag-design'
import { getTagNews } from '~/apis/fetch/tag-news'
import { getTagOther } from '~/apis/fetch/tag-other'
import { getTagPosition } from '~/apis/fetch/tag-position'
import { getTagProgram } from '~/apis/fetch/tag-program'
import { AppHead } from '~/components/common/AppHead'
import type { BaseArticleInfo } from '~/components/ui/articles/BaseArticle'
import type { LatestArticleCardProps } from '~/components/ui/cards/LatestArticleCard'
import type { BaseTagProps } from '~/components/ui/tags/BaseTag'
import { routes } from '~/config/routes'
import { API_ERROR_CODE } from '~/consts/api'
import { getScopedI18n, getCurrentLocale } from '~/locales/server'
import type { NextPageProps } from '~/types/next'
import { parsePositiveInteger } from '~/utils/parse-positive-integer'
import { toTagName } from '~/utils/to-tag-name'

export const generateMetadata = async ({
  params,
}: NextPageProps): Promise<Metadata> => {
  const currentParams = await params
  const id = currentParams?.id

  // id は topics_id（正の整数）だけ。それ以外は Kuroco に何も問い合わせずに 404 にする
  if (!id || parsePositiveInteger(id) === undefined) {
    notFound()
  }

  const locale = await getCurrentLocale()

  const [scopedT, resultBlogsDetailInfo] = await Promise.all([
    getScopedI18n('blogsDetail'),
    getBlogsDetailInfo({
      lang: locale,
      id: String(id),
    }),
  ])

  // 記事が見つからなければ 404、取得に失敗したとき（Kuroco の障害など）は 500 にする
  if (!resultBlogsDetailInfo.success) {
    if (resultBlogsDetailInfo.code === API_ERROR_CODE.NOT_FOUND) {
      notFound()
    }

    throw new Error(
      `Failed to fetch the blogs detail: ${resultBlogsDetailInfo.message}`,
    )
  }

  const responseBlogsDetailInfo = resultBlogsDetailInfo.data

  const title = responseBlogsDetailInfo.subject

  const description = responseBlogsDetailInfo.description

  return AppHead({
    title: `${title} - ${scopedT('title')}`,
    description:
      description ??
      scopedT('description', {
        title,
      }),
    canonical: routes.blogsDetail.url({
      isFullPath: true,
      locale,
      id: String(id),
    }),
    ogImage: responseBlogsDetailInfo.main_visual.url,
  })
}

const BlogsDetailPage = async ({ params }: NextPageProps) => {
  const currentParams = await params
  const id = currentParams?.id

  // id は topics_id（正の整数）だけ。それ以外は Kuroco に何も問い合わせずに 404 にする
  if (!id || parsePositiveInteger(id) === undefined) {
    notFound()
  }

  const locale = await getCurrentLocale()

  const [
    scopedT,
    responseTagNews,
    responseTagPosition,
    responseTagProgram,
    responseTagDesign,
    responseTagCms,
    responseTagOther,
    resultBlogsDetailInfo,
    responseLatestBlogs,
  ] = await Promise.all([
    getScopedI18n('blogsDetail'),
    getTagNews({ lang: locale }),
    getTagPosition({ lang: locale }),
    getTagProgram({ lang: locale }),
    getTagDesign({ lang: locale }),
    getTagCms({ lang: locale }),
    getTagOther({ lang: locale }),
    getBlogsDetailInfo({
      lang: locale,
      id: String(id),
    }),
    getBlogsList({
      lang: locale,
      cnt: 5,
    }),
  ])

  // 記事が見つからなければ 404、取得に失敗したとき（Kuroco の障害など）は 500 にする
  if (!resultBlogsDetailInfo.success) {
    if (resultBlogsDetailInfo.code === API_ERROR_CODE.NOT_FOUND) {
      notFound()
    }

    throw new Error(
      `Failed to fetch the blogs detail: ${resultBlogsDetailInfo.message}`,
    )
  }

  const responseBlogsDetailInfo = resultBlogsDetailInfo.data

  const tagNews: BaseTagProps[] = []
  const tagPosition: BaseTagProps[] = []
  const tagProgram: BaseTagProps[] = []
  const tagDesign: BaseTagProps[] = []
  const tagCms: BaseTagProps[] = []
  const tagOther: BaseTagProps[] = []

  for (
    let i = 0, iLength = responseBlogsDetailInfo.tags.length;
    i < iLength;
    i = i + 1
  ) {
    const tag = responseBlogsDetailInfo.tags[i]

    for (let j = 0, jLength = responseTagNews.length; j < jLength; j = j + 1) {
      const target = responseTagNews[j]

      if (tag.tag_id === target.tag_id) {
        const name = toTagName(target)

        tagNews.push({
          id: String(target.tag_id),
          name,
        })
        break
      }
    }

    for (
      let j = 0, jLength = responseTagPosition.length;
      j < jLength;
      j = j + 1
    ) {
      const target = responseTagPosition[j]

      if (tag.tag_id === target.tag_id) {
        const name = toTagName(target)

        tagPosition.push({
          id: String(target.tag_id),
          name,
        })
        break
      }
    }

    for (
      let j = 0, jLength = responseTagProgram.length;
      j < jLength;
      j = j + 1
    ) {
      const target = responseTagProgram[j]

      if (tag.tag_id === target.tag_id) {
        const name = toTagName(target)

        tagProgram.push({
          id: String(target.tag_id),
          name,
        })
        break
      }
    }

    for (
      let j = 0, jLength = responseTagDesign.length;
      j < jLength;
      j = j + 1
    ) {
      const target = responseTagDesign[j]

      if (tag.tag_id === target.tag_id) {
        const name = toTagName(target)

        tagDesign.push({
          id: String(target.tag_id),
          name,
        })
        break
      }
    }

    for (let j = 0, jLength = responseTagCms.length; j < jLength; j = j + 1) {
      const target = responseTagCms[j]

      if (tag.tag_id === target.tag_id) {
        const name = toTagName(target)

        tagCms.push({
          id: String(target.tag_id),
          name,
        })
        break
      }
    }

    for (let j = 0, jLength = responseTagOther.length; j < jLength; j = j + 1) {
      const target = responseTagOther[j]

      if (tag.tag_id === target.tag_id) {
        const name = toTagName(target)

        tagOther.push({
          id: String(target.tag_id),
          name,
        })
        break
      }
    }
  }

  const tags = [
    ...tagNews,
    ...tagPosition,
    ...tagProgram,
    ...tagDesign,
    ...tagCms,
    ...tagOther,
  ]

  const articleInfo: BaseArticleInfo = {
    id: String(responseBlogsDetailInfo.topics_id),
    ...(responseBlogsDetailInfo.main_visual && {
      mainVisual: {
        src: responseBlogsDetailInfo.main_visual.url,
        alt: responseBlogsDetailInfo.main_visual.desc,
      },
    }),
    title: responseBlogsDetailInfo.subject,
    body: responseBlogsDetailInfo.contents,
    dateTitle: scopedT('dateTitle'),
    startedAt: responseBlogsDetailInfo.ymd,
    bottomLink: {
      url: routes.blogs.url({
        locale,
      }),
      text: scopedT('bottomLinkText'),
    },
    tags:
      tags.length > 0
        ? [
            {
              items: tags,
            },
          ]
        : [],
  }

  const latestBlogs: LatestArticleCardProps[] = responseLatestBlogs.success
    ? responseLatestBlogs.data.list.map((info) => {
        return {
          url: routes.blogsDetail.url({
            locale,
            id: String(info.topics_id),
          }),
          ...(info.main_visual &&
            info.main_visual.url && {
              mainVisual: {
                src: info.main_visual.url,
                alt: info.main_visual.desc,
              },
            }),
          publishedAt: info.ymd,
          title: info.subject,
          titleTag: 'h3',
        }
      })
    : []

  return <Index latestArticles={latestBlogs} articleInfo={articleInfo} />
}

export default BlogsDetailPage
