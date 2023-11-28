import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NextPageProps } from '@/types/next'
import { AppHead } from '@/components/common/AppHead'
import { Index } from './_components'
import { SITE_URL } from '@/config/env'
import { routes } from '@/config/routes'
import { getBlogsInfos } from '@/apis/fetch/blogs'
import { getBlogsDetailInfo } from '@/apis/fetch/blogsDetail'
import { LatestArticleCardProps } from '@/components/ui/cards/LatestArticleCard'
import { BaseArticleInfo } from '@/components/ui/articles/BaseArticle'
import { getTagNewsInfos } from '@/apis/fetch/tagNews'
import { getTagPositionInfos } from '@/apis/fetch/tagPosition'
import { getTagProgramInfos } from '@/apis/fetch/tagProgram'
import { getTagDesignInfos } from '@/apis/fetch/tagDesign'
import { getTagCmsInfos } from '@/apis/fetch/tagCms'
import { getTagOtherInfos } from '@/apis/fetch/tagOther'
import { BaseTagProps } from '@/components/ui/tags/BaseTag'
import { getScopedI18n } from '@/locales/server'

export const generateMetadata = async ({
  params,
}: NextPageProps): Promise<Metadata> => {
  const id = params?.id

  if (!id) {
    notFound()
  }

  const scopedT = await getScopedI18n('blogsDetail')

  const responseBlogsDetailInfo = await getBlogsDetailInfo({
    id: String(id),
  })

  if (!responseBlogsDetailInfo) {
    notFound()
  }

  return AppHead({
    title: `${responseBlogsDetailInfo.subject} - ${scopedT('title')}`,
    description:
      responseBlogsDetailInfo.description ??
      scopedT('description', {
        title: responseBlogsDetailInfo.subject,
      }),
    canonical: `${SITE_URL}${routes.blogsDetail.url({
      id: String(id),
    })}`,
    ogImage: responseBlogsDetailInfo.main_visual.url,
  })
}

const BlogsDetailPage = async ({ params }: NextPageProps) => {
  const id = params?.id

  if (!id) {
    notFound()
  }

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
        tagNews.push({
          id: String(target.tag_id),
          name: target.ext_col_01 !== '' ? target.ext_col_01 : target.tag_nm,
        })
        break
      }
    }

    for (let j = 0, jLength = tagPositionInfos.length; j < jLength; j = j + 1) {
      const target = tagPositionInfos[j]

      if (tag.tag_id === target.tag_id) {
        tagPosition.push({
          id: String(target.tag_id),
          name: target.ext_col_01 !== '' ? target.ext_col_01 : target.tag_nm,
        })
        break
      }
    }

    for (let j = 0, jLength = tagProgramInfos.length; j < jLength; j = j + 1) {
      const target = tagProgramInfos[j]

      if (tag.tag_id === target.tag_id) {
        tagProgram.push({
          id: String(target.tag_id),
          name: target.ext_col_01 !== '' ? target.ext_col_01 : target.tag_nm,
        })
        break
      }
    }

    for (let j = 0, jLength = tagDesignInfos.length; j < jLength; j = j + 1) {
      const target = tagDesignInfos[j]

      if (tag.tag_id === target.tag_id) {
        tagDesign.push({
          id: String(target.tag_id),
          name: target.ext_col_01 !== '' ? target.ext_col_01 : target.tag_nm,
        })
        break
      }
    }

    for (let j = 0, jLength = tagCmsInfos.length; j < jLength; j = j + 1) {
      const target = tagCmsInfos[j]

      if (tag.tag_id === target.tag_id) {
        tagCms.push({
          id: String(target.tag_id),
          name: target.ext_col_01 !== '' ? target.ext_col_01 : target.tag_nm,
        })
        break
      }
    }

    for (let j = 0, jLength = tagOtherInfos.length; j < jLength; j = j + 1) {
      const target = tagOtherInfos[j]

      if (tag.tag_id === target.tag_id) {
        tagOther.push({
          id: String(target.tag_id),
          name: target.ext_col_01 !== '' ? target.ext_col_01 : target.tag_nm,
        })
        break
      }
    }
  }

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
      url: routes.blogs.url({}),
      text: scopedT('bottomLinkText'),
    },
    tags: [
      {
        items: [
          ...tagNews,
          ...tagPosition,
          ...tagProgram,
          ...tagDesign,
          ...tagCms,
          ...tagOther,
        ],
      },
    ],
  }

  const responseLatestBlogsInfos = await getBlogsInfos({
    cnt: 5,
  })

  const latestBlogsInfos: LatestArticleCardProps[] = responseLatestBlogsInfos
    ? responseLatestBlogsInfos.list.map((info) => {
        return {
          url: routes.blogsDetail.url({
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
        }
      })
    : []

  return (
    <Index latestArticleInfos={latestBlogsInfos} articleInfo={articleInfo} />
  )
}

export default BlogsDetailPage
