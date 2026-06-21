import { type Metadata } from 'next'
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
import { type BaseArticleInfo } from '~/components/ui/articles/BaseArticle'
import { type LatestArticleCardProps } from '~/components/ui/cards/LatestArticleCard'
import { type BaseTagProps } from '~/components/ui/tags/BaseTag'
import { routes } from '~/config/routes'
import { getScopedI18n, getCurrentLocale } from '~/locales/server'
import { type NextPageProps } from '~/types/next'

export const generateMetadata = async ({
  params,
}: NextPageProps): Promise<Metadata> => {
  const currentParams = await params
  const id = currentParams?.id

  if (!id) {
    notFound()
  }

  const [locale, scopedT, responseBlogsDetailInfo] = await Promise.all([
    getCurrentLocale(),
    getScopedI18n('blogsDetail'),
    getBlogsDetailInfo({
      id: String(id),
    }),
  ])

  if (!responseBlogsDetailInfo) {
    notFound()
  }

  const title =
    locale === 'en'
      ? responseBlogsDetailInfo.subject_en
      : responseBlogsDetailInfo.subject

  const description =
    locale === 'en'
      ? responseBlogsDetailInfo.description_en
      : responseBlogsDetailInfo.description

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

  if (!id) {
    notFound()
  }

  const [
    locale,
    scopedT,
    responseTagNews,
    responseTagPosition,
    responseTagProgram,
    responseTagDesign,
    responseTagCms,
    responseTagOther,
    responseBlogsDetailInfo,
    responseLatestBlogs,
  ] = await Promise.all([
    getCurrentLocale(),
    getScopedI18n('blogsDetail'),
    getTagNews(),
    getTagPosition(),
    getTagProgram(),
    getTagDesign(),
    getTagCms(),
    getTagOther(),
    getBlogsDetailInfo({
      id: String(id),
    }),
    getBlogsList({
      cnt: 5,
    }),
  ])

  if (!responseBlogsDetailInfo) {
    notFound()
  }

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
        let name = ''

        switch (locale) {
          case 'en':
            name = target.ext_col_02 !== '' ? target.ext_col_02 : target.tag_nm
            break
          default:
            name = target.ext_col_01 !== '' ? target.ext_col_01 : target.tag_nm
            break
        }

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
        let name = ''

        switch (locale) {
          case 'en':
            name = target.ext_col_02 !== '' ? target.ext_col_02 : target.tag_nm
            break
          default:
            name = target.ext_col_01 !== '' ? target.ext_col_01 : target.tag_nm
            break
        }

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
        let name = ''

        switch (locale) {
          case 'en':
            name = target.ext_col_02 !== '' ? target.ext_col_02 : target.tag_nm
            break
          default:
            name = target.ext_col_01 !== '' ? target.ext_col_01 : target.tag_nm
            break
        }

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
        let name = ''

        switch (locale) {
          case 'en':
            name = target.ext_col_02 !== '' ? target.ext_col_02 : target.tag_nm
            break
          default:
            name = target.ext_col_01 !== '' ? target.ext_col_01 : target.tag_nm
            break
        }

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
        let name = ''

        switch (locale) {
          case 'en':
            name = target.ext_col_02 !== '' ? target.ext_col_02 : target.tag_nm
            break
          default:
            name = target.ext_col_01 !== '' ? target.ext_col_01 : target.tag_nm
            break
        }

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
        let name = ''

        switch (locale) {
          case 'en':
            name = target.ext_col_02 !== '' ? target.ext_col_02 : target.tag_nm
            break
          default:
            name = target.ext_col_01 !== '' ? target.ext_col_01 : target.tag_nm
            break
        }

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
    title:
      locale === 'en'
        ? responseBlogsDetailInfo.subject_en
        : responseBlogsDetailInfo.subject,
    body:
      locale === 'en'
        ? responseBlogsDetailInfo.contents_en
        : responseBlogsDetailInfo.contents,
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

  const latestBlogs: LatestArticleCardProps[] = responseLatestBlogs
    ? responseLatestBlogs.list.map((info) => {
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
          title: locale === 'en' ? info.subject_en : info.subject,
          titleTag: 'h3',
        }
      })
    : []

  return <Index latestArticles={latestBlogs} articleInfo={articleInfo} />
}

export default BlogsDetailPage
