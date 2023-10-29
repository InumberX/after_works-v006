import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NextPageProps } from '@/types/next'
import { AppHead } from '@/components/common/AppHead'
import { Index } from './_components'
import { SITE_URL } from '@/config/env'
import { routes } from '@/config/routes'
import { getHobbyInfos } from '@/apis/fetch/hobby'
import { getHobbyDetailInfo } from '@/apis/fetch/hobbyDetail'
import { LatestArticleCardProps } from '@/components/ui/cards/LatestArticleCard'
import { BaseArticleInfo } from '@/components/ui/articles/BaseArticle'
import { getTagPositionInfos } from '@/apis/fetch/tagPosition'
import { getTagProgramInfos } from '@/apis/fetch/tagProgram'
import { getTagDesignInfos } from '@/apis/fetch/tagDesign'
import { getTagCmsInfos } from '@/apis/fetch/tagCms'
import { getTagOtherInfos } from '@/apis/fetch/tagOther'
import { BaseTagProps } from '@/components/ui/tags/BaseTag'

export const generateMetadata = async ({
  params,
}: NextPageProps): Promise<Metadata> => {
  const id = params?.id

  if (!id) {
    notFound()
  }

  const responseHobbyDetailInfo = await getHobbyDetailInfo({
    id: String(id),
  })

  if (!responseHobbyDetailInfo) {
    notFound()
  }

  return AppHead({
    title: `${responseHobbyDetailInfo.subject} - 趣味`,
    description:
      responseHobbyDetailInfo.description ??
      `東京都在住のフロントエンドエンジニア：N/NE（ナイン）のポートフォリオ用Webサイトです。このページでは、${responseHobbyDetailInfo.subject}の記事を閲覧できます。`,
    canonical: `${SITE_URL}${routes.hobbyDetail.url({
      id: String(id),
    })}`,
  })
}

const HobbyDetailPage = async ({ params }: NextPageProps) => {
  const id = params?.id

  if (!id) {
    notFound()
  }

  const tagPositionInfos = await getTagPositionInfos()
  const tagProgramInfos = await getTagProgramInfos()
  const tagDesignInfos = await getTagDesignInfos()
  const tagCmsInfos = await getTagCmsInfos()
  const tagOtherInfos = await getTagOtherInfos()

  const responseHobbyDetailInfo = await getHobbyDetailInfo({
    id: String(id),
  })

  if (!responseHobbyDetailInfo) {
    notFound()
  }

  const tagPosition: BaseTagProps[] = []
  const tagProgram: BaseTagProps[] = []
  const tagDesign: BaseTagProps[] = []
  const tagCms: BaseTagProps[] = []
  const tagOther: BaseTagProps[] = []

  for (
    let i = 0, iLength = responseHobbyDetailInfo.tags.length;
    i < iLength;
    i = i + 1
  ) {
    const tag = responseHobbyDetailInfo.tags[i]

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
    id: String(responseHobbyDetailInfo.topics_id),
    ...(responseHobbyDetailInfo.main_visual && {
      mainVisual: {
        src: responseHobbyDetailInfo.main_visual.url,
        alt: responseHobbyDetailInfo.main_visual.desc,
      },
    }),
    title: responseHobbyDetailInfo.subject,
    body: responseHobbyDetailInfo.contents,
    dateTitle: '制作期間',
    startedAt: responseHobbyDetailInfo.started_at,
    endedAt: responseHobbyDetailInfo.ended_at,
    url: responseHobbyDetailInfo.url,
    bottomLink: {
      url: routes.hobby.url({}),
      text: '趣味一覧に戻る',
    },
    tags: [
      {
        title: '担当箇所',
        items: [...tagPosition],
      },
      {
        title: '使用技術',
        items: [...tagProgram, ...tagDesign, ...tagCms, ...tagOther],
      },
    ],
  }

  const responseLatestBlogInfos = await getHobbyInfos({
    cnt: 5,
  })

  const latestBlogInfos: LatestArticleCardProps[] = responseLatestBlogInfos
    ? responseLatestBlogInfos.list.map((info) => {
        return {
          url: routes.worksDetail.url({
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
    <Index latestArticleInfos={latestBlogInfos} articleInfo={articleInfo} />
  )
}

export default HobbyDetailPage
