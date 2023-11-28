import { Metadata } from 'next'
import { NextPageProps } from '@/types/next'
import { AppHead } from '@/components/common/AppHead'
import { Index } from './_components'
import { SITE_URL } from '@/config/env'
import { routes } from '@/config/routes'
import { getWorksInfos } from '@/apis/fetch/works'
import { ArticleCardProps } from '@/components/ui/cards/ArticleCard'
import { getTagPositionInfos } from '@/apis/fetch/tagPosition'
import { BaseTagProps } from '@/components/ui/tags/BaseTag'
import { LatestArticleCardProps } from '@/components/ui/cards/LatestArticleCard'
import { getScopedI18n } from '@/locales/server'

export const generateMetadata = async (): Promise<Metadata> => {
  const scopedT = await getScopedI18n('works')

  return AppHead({
    title: scopedT('title'),
    description: scopedT('description'),
    canonical: `${SITE_URL}${routes.works.url({})}`,
  })
}

const WorksPage = async ({ searchParams }: NextPageProps) => {
  const tagPositionInfos = await getTagPositionInfos()

  const responseWorksInfos = await getWorksInfos({
    ...(searchParams &&
      searchParams.page && {
        page: parseInt(searchParams.page, 10),
      }),
  })

  const defaultWorksInfos: ArticleCardProps[] = responseWorksInfos
    ? responseWorksInfos.list.map((info) => {
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
          tags: tagPosition,
        }
      })
    : []

  const responseLatestWorksInfos = await getWorksInfos({
    cnt: 5,
  })

  const latestWorksInfos: LatestArticleCardProps[] = responseLatestWorksInfos
    ? responseLatestWorksInfos.list.map((info) => {
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
    <Index
      defaultPage={
        searchParams && searchParams.page ? parseInt(searchParams.page, 10) : 1
      }
      defaultTotalPage={
        responseWorksInfos ? responseWorksInfos.pageInfo.totalPageCnt : 0
      }
      defaultArticleInfos={defaultWorksInfos}
      latestArticleInfos={latestWorksInfos}
      tagPositionInfos={tagPositionInfos}
    />
  )
}

export default WorksPage
