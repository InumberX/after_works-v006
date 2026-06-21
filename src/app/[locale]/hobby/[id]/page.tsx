import { type Metadata } from 'next'
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
import { type BaseArticleInfo } from '~/components/ui/articles/BaseArticle'
import { type LatestArticleCardProps } from '~/components/ui/cards/LatestArticleCard'
import { type BaseTagProps } from '~/components/ui/tags/BaseTag'
import { routes } from '~/config/routes'
import { getScopedI18n, getCurrentLocale } from '~/locales/server'
import { type NextPageProps } from '~/types/next'

export const generateMetadata = async ({
  params,
}: NextPageProps): Promise<Metadata> => {
  const currentParams = await params
  const id = currentParams?.id

  if (!id) {
    notFound()
  }

  const [locale, scopedT, responseHobbyDetailInfo] = await Promise.all([
    getCurrentLocale(),
    getScopedI18n('hobbyDetail'),
    getHobbyDetailInfo({
      id: String(id),
    }),
  ])

  if (!responseHobbyDetailInfo) {
    notFound()
  }

  const title =
    locale === 'en'
      ? responseHobbyDetailInfo.subject_en
      : responseHobbyDetailInfo.subject

  const description =
    locale === 'en'
      ? responseHobbyDetailInfo.description_en
      : responseHobbyDetailInfo.description

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

  if (!id) {
    notFound()
  }

  const [
    locale,
    scopedT,
    responseTagPosition,
    responseTagProgram,
    responseTagDesign,
    responseTagCms,
    responseTagOther,
    responseHobbyDetailInfo,
    responseLatestHobby,
  ] = await Promise.all([
    getCurrentLocale(),
    getScopedI18n('hobbyDetail'),
    getTagPosition(),
    getTagProgram(),
    getTagDesign(),
    getTagCms(),
    getTagOther(),
    getHobbyDetailInfo({
      id: String(id),
    }),
    getHobbyList({
      cnt: 5,
    }),
  ])

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
            name = target.ext_col_02 !== '' ? target.ext_col_02 : target.tag_nm
            break
          default:
            name = target.ext_col_01 !== '' ? target.ext_col_01 : target.tag_nm
            break
        }

        tagPosition.push({
          id: String(target.tag_id),
          name,
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
        let name = ''

        switch (locale) {
          case 'en':
            name = target.ext_col_02 !== '' ? target.ext_col_02 : target.tag_nm
            break
          default:
            name = target.ext_col_01 !== '' ? target.ext_col_01 : target.tag_nm
            break
        }

        tagProgram.push({
          id: String(target.tag_id),
          name,
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
        let name = ''

        switch (locale) {
          case 'en':
            name = target.ext_col_02 !== '' ? target.ext_col_02 : target.tag_nm
            break
          default:
            name = target.ext_col_01 !== '' ? target.ext_col_01 : target.tag_nm
            break
        }

        tagDesign.push({
          id: String(target.tag_id),
          name,
        })
        break
      }
    }

    for (let j = 0, jLength = responseTagCms.length; j < jLength; j = j + 1) {
      const target = responseTagCms[j]

      if (tag.tag_id === target.tag_id) {
        let name = ''

        switch (locale) {
          case 'en':
            name = target.ext_col_02 !== '' ? target.ext_col_02 : target.tag_nm
            break
          default:
            name = target.ext_col_01 !== '' ? target.ext_col_01 : target.tag_nm
            break
        }

        tagCms.push({
          id: String(target.tag_id),
          name,
        })
        break
      }
    }

    for (let j = 0, jLength = responseTagOther.length; j < jLength; j = j + 1) {
      const target = responseTagOther[j]

      if (tag.tag_id === target.tag_id) {
        let name = ''

        switch (locale) {
          case 'en':
            name = target.ext_col_02 !== '' ? target.ext_col_02 : target.tag_nm
            break
          default:
            name = target.ext_col_01 !== '' ? target.ext_col_01 : target.tag_nm
            break
        }

        tagOther.push({
          id: String(target.tag_id),
          name,
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
    title:
      locale === 'en'
        ? responseHobbyDetailInfo.subject_en
        : responseHobbyDetailInfo.subject,
    body:
      locale === 'en'
        ? responseHobbyDetailInfo.contents_en
        : responseHobbyDetailInfo.contents,
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

  return <Index latestArticles={latestHobby} articleInfo={articleInfo} />
}

export default HobbyDetailPage
