import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Index } from './_components'

import { getBlogsInfos } from '@/apis/fetch/blogs'
import { getBlogsDetailInfo } from '@/apis/fetch/blogsDetail'
import { getTagCmsInfos } from '@/apis/fetch/tagCms'
import { getTagDesignInfos } from '@/apis/fetch/tagDesign'
import { getTagNewsInfos } from '@/apis/fetch/tagNews'
import { getTagOtherInfos } from '@/apis/fetch/tagOther'
import { getTagPositionInfos } from '@/apis/fetch/tagPosition'
import { getTagProgramInfos } from '@/apis/fetch/tagProgram'
import { AppHead } from '@/components/common/AppHead'
import { BaseArticleInfo } from '@/components/ui/articles/BaseArticle'
import { LatestArticleCardProps } from '@/components/ui/cards/LatestArticleCard'
import { BaseTagProps } from '@/components/ui/tags/BaseTag'
import { routes } from '@/config/routes'
import { getScopedI18n, getCurrentLocale } from '@/locales/server'
import { NextPageProps } from '@/types/next'

export const generateMetadata = async ({
  params,
}: NextPageProps): Promise<Metadata> => {
  const currentParams = await params
  const id = currentParams?.id

  if (!id) {
    notFound()
  }

  const locale = await getCurrentLocale()
  const scopedT = await getScopedI18n('blogsDetail')

  const responseBlogsDetailInfo = await getBlogsDetailInfo({
    id: String(id),
  })

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

  const locale = await getCurrentLocale()
  const scopedT = await getScopedI18n('blogsDetail')

  const tagNewsInfos = await getTagNewsInfos()
  const tagPositionInfos = await getTagPositionInfos()
  const tagProgramInfos = await getTagProgramInfos()
  const tagDesignInfos = await getTagDesignInfos()
  const tagCmsInfos = await getTagCmsInfos()
  const tagOtherInfos = await getTagOtherInfos()

  const responseBlogsDetailInfo = await getBlogsDetailInfo({
    id: String(id),
  })

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

    for (let j = 0, jLength = tagNewsInfos.length; j < jLength; j = j + 1) {
      const target = tagNewsInfos[j]

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

    for (let j = 0, jLength = tagPositionInfos.length; j < jLength; j = j + 1) {
      const target = tagPositionInfos[j]

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

    for (let j = 0, jLength = tagProgramInfos.length; j < jLength; j = j + 1) {
      const target = tagProgramInfos[j]

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

    for (let j = 0, jLength = tagDesignInfos.length; j < jLength; j = j + 1) {
      const target = tagDesignInfos[j]

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

    for (let j = 0, jLength = tagCmsInfos.length; j < jLength; j = j + 1) {
      const target = tagCmsInfos[j]

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

    for (let j = 0, jLength = tagOtherInfos.length; j < jLength; j = j + 1) {
      const target = tagOtherInfos[j]

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

  const responseLatestBlogsInfos = await getBlogsInfos({
    cnt: 5,
  })

  const latestBlogsInfos: LatestArticleCardProps[] = responseLatestBlogsInfos
    ? responseLatestBlogsInfos.list.map((info) => {
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

  return (
    <Index latestArticleInfos={latestBlogsInfos} articleInfo={articleInfo} />
  )
}

export default BlogsDetailPage
