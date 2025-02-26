import { Metadata } from 'next'
import { NextPageProps } from '@/types/next'
import { AppHead } from '@/components/common/AppHead'
import { Index } from './_components'
import { routes } from '@/config/routes'
import { getHobbyInfos } from '@/apis/fetch/hobby'
import { ArticleCardProps } from '@/components/ui/cards/ArticleCard'
import { getTagPositionInfos } from '@/apis/fetch/tagPosition'
import { BaseTagProps } from '@/components/ui/tags/BaseTag'
import { LatestArticleCardProps } from '@/components/ui/cards/LatestArticleCard'
import { getScopedI18n, getCurrentLocale } from '@/locales/server'

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getCurrentLocale()
  const scopedT = await getScopedI18n('hobby')

  return AppHead({
    title: scopedT('title'),
    description: scopedT('description'),
    canonical: routes.hobby.url({
      isFullPath: true,
      locale,
    }),
  })
}

const HobbyPage = async ({ searchParams }: NextPageProps) => {
  const locale = await getCurrentLocale()
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
          url: routes.hobbyDetail.url({
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

  const responseLatestHobbyInfos = await getHobbyInfos({
    cnt: 5,
  })

  const latestHobbyInfos: LatestArticleCardProps[] = responseLatestHobbyInfos
    ? responseLatestHobbyInfos.list.map((info) => {
        return {
          url: routes.hobbyDetail.url({
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
