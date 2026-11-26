import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Index } from './_components'

import { getHobbyList } from '~/apis/fetch/hobby'
import { getHobbyDetailInfo } from '~/apis/fetch/hobby-detail'
import { getTagCms } from '~/apis/fetch/tag-cms'
import { getTagDesign } from '~/apis/fetch/tag-design'
import { getTagOther } from '~/apis/fetch/tag-other'
import { getTagPosition } from '~/apis/fetch/tag-position'
import { getTagProgram } from '~/apis/fetch/tag-program'
import { AppHead } from '~/components/common/AppHead'
import type { BaseArticleInfo } from '~/components/ui/articles/BaseArticle'
import type { LatestArticleCardProps } from '~/components/ui/cards/LatestArticleCard'
import type { BaseTagProps } from '~/components/ui/tags/BaseTag'
import { routes } from '~/config/routes'
import { API_ERROR_CODE } from '~/consts/api'
import { getScopedI18n, getCurrentLocale } from '~/locales/server'
import type { NextPageProps } from '~/types/next'
import { parsePositiveInteger } from '~/utils/parse-positive-integer'
import { toTagName } from '~/utils/to-tag-name'

export const generateMetadata = async ({
  params,
}: NextPageProps): Promise<Metadata> => {
  const currentParams = await params
  const id = currentParams?.id

  // id は topics_id（正の整数）だけ。それ以外は Kuroco に何も問い合わせずに 404 にする
  if (!id || parsePositiveInteger(id) === undefined) {
    notFound()
  }

  const locale = await getCurrentLocale()

  const [scopedT, resultHobbyDetailInfo] = await Promise.all([
    getScopedI18n('hobbyDetail'),
    getHobbyDetailInfo({
      lang: locale,
      id: String(id),
    }),
  ])

  // 記事が見つからなければ 404、取得に失敗したとき（Kuroco の障害など）は 500 にする
  if (!resultHobbyDetailInfo.success) {
    if (resultHobbyDetailInfo.code === API_ERROR_CODE.NOT_FOUND) {
      notFound()
    }

    throw new Error(
      `Failed to fetch the hobby detail: ${resultHobbyDetailInfo.message}`,
    )
  }

  const responseHobbyDetailInfo = resultHobbyDetailInfo.data

  const title = responseHobbyDetailInfo.subject

  const description = responseHobbyDetailInfo.description

  return AppHead({
    title: `${title} - ${scopedT('title')}`,
    description:
      description ??
      scopedT('description', {
        title,
      }),
    canonical: routes.hobbyDetail.url({
      isFullPath: true,
      locale,
      id: String(id),
    }),
    ogImage: responseHobbyDetailInfo.main_visual.url,
  })
}

const HobbyDetailPage = async ({ params }: NextPageProps) => {
  const currentParams = await params
  const id = currentParams?.id

  // id は topics_id（正の整数）だけ。それ以外は Kuroco に何も問い合わせずに 404 にする
  if (!id || parsePositiveInteger(id) === undefined) {
    notFound()
  }

  const locale = await getCurrentLocale()

  const [
    scopedT,
    responseTagPosition,
    responseTagProgram,
    responseTagDesign,
    responseTagCms,
    responseTagOther,
    resultHobbyDetailInfo,
    responseLatestHobby,
  ] = await Promise.all([
    getScopedI18n('hobbyDetail'),
    getTagPosition({ lang: locale }),
    getTagProgram({ lang: locale }),
    getTagDesign({ lang: locale }),
    getTagCms({ lang: locale }),
    getTagOther({ lang: locale }),
    getHobbyDetailInfo({
      lang: locale,
      id: String(id),
    }),
    getHobbyList({
      lang: locale,
      cnt: 5,
    }),
  ])

  // 記事が見つからなければ 404、取得に失敗したとき（Kuroco の障害など）は 500 にする
  if (!resultHobbyDetailInfo.success) {
    if (resultHobbyDetailInfo.code === API_ERROR_CODE.NOT_FOUND) {
      notFound()
    }

    throw new Error(
      `Failed to fetch the hobby detail: ${resultHobbyDetailInfo.message}`,
    )
  }

  const responseHobbyDetailInfo = resultHobbyDetailInfo.data

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

    for (
      let j = 0, jLength = responseTagPosition.length;
      j < jLength;
      j = j + 1
    ) {
      const target = responseTagPosition[j]

      if (tag.tag_id === target.tag_id) {
        tagPosition.push({
          id: String(target.tag_id),
          name: toTagName(target),
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
        tagProgram.push({
          id: String(target.tag_id),
          name: toTagName(target),
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
        tagDesign.push({
          id: String(target.tag_id),
          name: toTagName(target),
        })
        break
      }
    }

    for (let j = 0, jLength = responseTagCms.length; j < jLength; j = j + 1) {
      const target = responseTagCms[j]

      if (tag.tag_id === target.tag_id) {
        tagCms.push({
          id: String(target.tag_id),
          name: toTagName(target),
        })
        break
      }
    }

    for (let j = 0, jLength = responseTagOther.length; j < jLength; j = j + 1) {
      const target = responseTagOther[j]

      if (tag.tag_id === target.tag_id) {
        tagOther.push({
          id: String(target.tag_id),
          name: toTagName(target),
        })
        break
      }
    }
  }

  const positionTags = [...tagPosition]
  const technologyTags = [...tagProgram, ...tagDesign, ...tagCms, ...tagOther]

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
    dateTitle: scopedT('dateTitle'),
    startedAt: responseHobbyDetailInfo.started_at,
    endedAt: responseHobbyDetailInfo.ended_at,
    url: responseHobbyDetailInfo.url,
    bottomLink: {
      url: routes.hobby.url({
        locale,
      }),
      text: scopedT('bottomLinkText'),
    },
    tags: [
      ...(positionTags.length > 0
        ? [
            {
              title: scopedT('tags.position.title'),
              items: [...positionTags],
            },
          ]
        : []),
      ...(technologyTags.length > 0
        ? [
            {
              title: scopedT('tags.technology.title'),
              items: [...technologyTags],
            },
          ]
        : []),
    ],
  }

  const latestHobby: LatestArticleCardProps[] = responseLatestHobby.success
    ? responseLatestHobby.data.list.map((info) => {
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
          title: info.subject,
          titleTag: 'h3',
        }
      })
    : []

  return <Index latestArticles={latestHobby} articleInfo={articleInfo} />
}

export default HobbyDetailPage
