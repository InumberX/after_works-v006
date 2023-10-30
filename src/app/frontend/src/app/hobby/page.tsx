import { Metadata } from 'next'
import { NextPageProps } from '@/types/next'
import { AppHead } from '@/components/common/AppHead'
import { Index } from './_components'
import { SITE_URL } from '@/config/env'
import { routes } from '@/config/routes'
import { getHobbyInfos } from '@/apis/fetch/hobby'
import { ArticleCardProps } from '@/components/ui/cards/ArticleCard'
import { getTagPositionInfos } from '@/apis/fetch/tagPosition'
import { BaseTagProps } from '@/components/ui/tags/BaseTag'
import { LatestArticleCardProps } from '@/components/ui/cards/LatestArticleCard'

export const generateMetadata = (): Metadata => {
  return AppHead({
    title: '趣味',
    description:
      '東京都在住のフロントエンドエンジニア：N/NE（ナイン）のポートフォリオ用Webサイトです。このページでは、私の趣味および学習のために制作したものをご紹介します。',
    canonical: `${SITE_URL}${routes.hobby.url({})}`,
  })
}

const HobbyPage = async ({ searchParams }: NextPageProps) => {
  const tagPositionInfos = await getTagPositionInfos()

  const responseHobbyInfos = await getHobbyInfos({
    ...(searchParams &&
      searchParams.page && {
        page: parseInt(searchParams.page, 10),
      }),
  })

  const defaultHobbyInfos: ArticleCardProps[] = responseHobbyInfos
    ? responseHobbyInfos.list.map((info) => {
        const tagPosition: BaseTagProps[] = []

        for (let i = 0, iLength = info.tags.length; i < iLength; i = i + 1) {
          const tag = info.tags[i]

          for (
            let j = 0, jLength = tagPositionInfos.length;
            j < jLength;
            j = j + 1
          ) {
            const target = tagPositionInfos[j]

            if (tag.tag_id === target.tag_id) {
              tagPosition.push({
                id: String(target.tag_id),
                name:
                  target.ext_col_01 !== '' ? target.ext_col_01 : target.tag_nm,
              })
              break
            }
          }
        }

        return {
          url: routes.hobbyDetail.url({
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
          tags: tagPosition,
        }
      })
    : []

  const responseLatestHobbyInfos = await getHobbyInfos({
    cnt: 5,
  })

  const latestHobbyInfos: LatestArticleCardProps[] = responseLatestHobbyInfos
    ? responseLatestHobbyInfos.list.map((info) => {
        return {
          url: routes.hobbyDetail.url({
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
    <Index
      defaultPage={
        searchParams && searchParams.page ? parseInt(searchParams.page, 10) : 1
      }
      defaultTotalPage={
        responseHobbyInfos ? responseHobbyInfos.pageInfo.totalPageCnt : 0
      }
      defaultArticleInfos={defaultHobbyInfos}
      latestArticleInfos={latestHobbyInfos}
      tagPositionInfos={tagPositionInfos}
    />
  )
}

export default HobbyPage
