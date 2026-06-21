import type { Metadata } from 'next'

import { Index } from './_components'

import { getHobbyList } from '~/apis/fetch/hobby'
import { getTagPosition } from '~/apis/fetch/tag-position'
import { AppHead } from '~/components/common/AppHead'
import type { LatestArticleCardProps } from '~/components/ui/cards/LatestArticleCard'
import type { WorkCardProps } from '~/components/ui/cards/WorkCard'
import type { BaseTagProps } from '~/components/ui/tags/BaseTag'
import { routes } from '~/config/routes'
import { getScopedI18n, getCurrentLocale } from '~/locales/server'
import type { NextPageProps } from '~/types/next'

export const generateMetadata = async (): Promise<Metadata> => {
  const [locale, scopedT] = await Promise.all([
    getCurrentLocale(),
    getScopedI18n('hobby'),
  ])

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
  const [locale, responseTagPosition, currentSearchParams] = await Promise.all([
    getCurrentLocale(),
    getTagPosition(),
    searchParams,
  ])

  const [responseHobby, responseLatestHobby] = await Promise.all([
    getHobbyList({
      ...(currentSearchParams &&
        currentSearchParams.page && {
          page: parseInt(currentSearchParams.page as string, 10),
        }),
    }),
    getHobbyList({
      cnt: 5,
    }),
  ])

  const defaultHobby: WorkCardProps[] = responseHobby
    ? responseHobby.list.map((info) => {
        const tagPosition: BaseTagProps[] = []

        for (let i = 0, iLength = info.tags.length; i < iLength; i = i + 1) {
          const tag = info.tags[i]

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

  const latestHobby: LatestArticleCardProps[] = responseLatestHobby
    ? responseLatestHobby.list.map((info) => {
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
          titleTag: 'h3',
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
      defaultTotalPage={responseHobby ? responseHobby.pageInfo.totalPageCnt : 0}
      defaultArticles={defaultHobby}
      latestArticles={latestHobby}
      responseTagPosition={responseTagPosition}
    />
  )
}

export default HobbyPage
