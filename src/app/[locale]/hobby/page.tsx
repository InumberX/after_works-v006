import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

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
import { parsePositiveInteger } from '~/utils/parse-positive-integer'

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
  const currentSearchParams = await searchParams

  // `?page=` は正の整数だけを受け付け、それ以外（`0`・`-1`・`01`・`abc` など）は
  // Kuroco に何も問い合わせずに 404 にする
  const page =
    currentSearchParams?.page === undefined
      ? 1
      : parsePositiveInteger(currentSearchParams.page)

  if (page === undefined) {
    notFound()
  }

  const [locale, responseTagPosition, responseHobby, responseLatestHobby] =
    await Promise.all([
      getCurrentLocale(),
      getTagPosition(),
      getHobbyList({
        page,
      }),
      getHobbyList({
        cnt: 5,
      }),
    ])

  // 最後のページより後ろは 404 にする。範囲外の pageID には Kuroco が `not_found` を
  // 返す。1 ページ目は記事が 0 件でも表示するので、`not_found` でも 404 にしない
  // （API の URL の設定ミスなどで一覧そのものが 404 になるのを防ぐため）
  if (page > 1 && responseHobby === null) {
    notFound()
  }

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
      defaultPage={page}
      defaultTotalPage={responseHobby ? responseHobby.pageInfo.totalPageCnt : 0}
      defaultArticles={defaultHobby}
      latestArticles={latestHobby}
      responseTagPosition={responseTagPosition}
    />
  )
}

export default HobbyPage
