import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Index } from './_components'

import { getTagCms } from '~/apis/fetch/tag-cms'
import { getTagDesign } from '~/apis/fetch/tag-design'
import { getTagOther } from '~/apis/fetch/tag-other'
import { getTagPosition } from '~/apis/fetch/tag-position'
import { getTagProgram } from '~/apis/fetch/tag-program'
import { getWorksList } from '~/apis/fetch/works'
import { getWorksDetailInfo } from '~/apis/fetch/works-detail'
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

  const [scopedT, resultWorksDetailInfo] = await Promise.all([
    getScopedI18n('worksDetail'),
    getWorksDetailInfo({
      lang: locale,
      id: String(id),
    }),
  ])

  // 記事が見つからなければ 404、取得に失敗したとき（Kuroco の障害など）は 500 にする
  if (!resultWorksDetailInfo.success) {
    if (resultWorksDetailInfo.code === API_ERROR_CODE.NOT_FOUND) {
      notFound()
    }

    throw new Error(
      `Failed to fetch the works detail: ${resultWorksDetailInfo.message}`,
    )
  }

  const responseWorksDetailInfo = resultWorksDetailInfo.data

  const title = responseWorksDetailInfo.subject

  const description = responseWorksDetailInfo.description

  return AppHead({
    title: `${title} - ${scopedT('title')}`,
    description:
      description ??
      scopedT('description', {
        title,
      }),
    canonical: routes.worksDetail.url({
      isFullPath: true,
      locale,
      id: String(id),
    }),
    ogImage: responseWorksDetailInfo.main_visual.url,
  })
}

const WorksDetailPage = async ({ params }: NextPageProps) => {
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
    resultWorksDetailInfo,
    responseLatestWorks,
  ] = await Promise.all([
    getScopedI18n('worksDetail'),
    getTagPosition({ lang: locale }),
    getTagProgram({ lang: locale }),
    getTagDesign({ lang: locale }),
    getTagCms({ lang: locale }),
    getTagOther({ lang: locale }),
    getWorksDetailInfo({
      lang: locale,
      id: String(id),
    }),
    getWorksList({
      lang: locale,
      cnt: 5,
    }),
  ])

  // 記事が見つからなければ 404、取得に失敗したとき（Kuroco の障害など）は 500 にする
  if (!resultWorksDetailInfo.success) {
    if (resultWorksDetailInfo.code === API_ERROR_CODE.NOT_FOUND) {
      notFound()
    }

    throw new Error(
      `Failed to fetch the works detail: ${resultWorksDetailInfo.message}`,
    )
  }

  const responseWorksDetailInfo = resultWorksDetailInfo.data

  const tagPosition: BaseTagProps[] = []
  const tagProgram: BaseTagProps[] = []
  const tagDesign: BaseTagProps[] = []
  const tagCms: BaseTagProps[] = []
  const tagOther: BaseTagProps[] = []

  for (
    let i = 0, iLength = responseWorksDetailInfo.tags.length;
    i < iLength;
    i = i + 1
  ) {
    const tag = responseWorksDetailInfo.tags[i]

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
    id: String(responseWorksDetailInfo.topics_id),
    ...(responseWorksDetailInfo.main_visual && {
      mainVisual: {
        src: responseWorksDetailInfo.main_visual.url,
        alt: responseWorksDetailInfo.main_visual.desc,
      },
    }),
    title: responseWorksDetailInfo.subject,
    body: responseWorksDetailInfo.contents,
    dateTitle: scopedT('dateTitle'),
    startedAt: responseWorksDetailInfo.started_at,
    endedAt: responseWorksDetailInfo.ended_at,
    url: responseWorksDetailInfo.url,
    bottomLink: {
      url: routes.works.url({
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

  const latestWorks: LatestArticleCardProps[] = responseLatestWorks.success
    ? responseLatestWorks.data.list.map((info) => {
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
          title: info.subject,
          titleTag: 'h3',
        }
      })
    : []

  return <Index latestArticles={latestWorks} articleInfo={articleInfo} />
}

export default WorksDetailPage
