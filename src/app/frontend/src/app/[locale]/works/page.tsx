import { Metadata } from 'next'
import { NextPageProps } from '@/types/next'
import { AppHead } from '@/components/common/AppHead'
import { Index } from './_components'
import { routes } from '@/config/routes'
import { getWorksInfos } from '@/apis/fetch/works'
import { ArticleCardProps } from '@/components/ui/cards/ArticleCard'
import { getTagPositionInfos } from '@/apis/fetch/tagPosition'
import { BaseTagProps } from '@/components/ui/tags/BaseTag'
import { LatestArticleCardProps } from '@/components/ui/cards/LatestArticleCard'
import { getScopedI18n, getCurrentLocale } from '@/locales/server'

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getCurrentLocale()
  const scopedT = await getScopedI18n('works')

  return AppHead({
    title: scopedT('title'),
    description: scopedT('description'),
    canonical: routes.works.url({
      isFullPath: true,
      locale,
    }),
  })
}

const WorksPage = async ({ searchParams }: NextPageProps) => {
  const locale = await getCurrentLocale()
  const tagPositionInfos = await getTagPositionInfos()
  const currentSearchParams = await searchParams

  const responseWorksInfos = await getWorksInfos({
    ...(currentSearchParams &&
      currentSearchParams.page && {
        page: parseInt(currentSearchParams.page as string, 10),
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
              let name = ''

              switch (locale) {
                case 'en':
                  name =
                    target.ext_col_02 !== '' ? target.ext_col_02 : target.tag_nm
                  break
                default:
                  name =
                    target.ext_col_01 !== '' ? target.ext_col_01 : target.tag_nm
                  break
              }

              tagPosition.push({
                id: String(target.tag_id),
                name,
              })
              break
            }
          }
        }

        return {
          url: routes.worksDetail.url({
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
          startedAt: info.started_at,
          endedAt: info.ended_at,
          title: locale === 'en' ? info.subject_en : info.subject,
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
          startedAt: info.started_at,
          endedAt: info.ended_at,
          title: locale === 'en' ? info.subject_en : info.subject,
        }
      })
    : []

  return (
    <Index
      defaultPage={
        currentSearchParams && currentSearchParams.page
          ? parseInt(currentSearchParams.page as string, 10)
          : 1
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
