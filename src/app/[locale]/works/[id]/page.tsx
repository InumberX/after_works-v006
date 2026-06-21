import { type Metadata } from 'next'
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

  const [locale, scopedT, responseWorksDetailInfo] = await Promise.all([
    getCurrentLocale(),
    getScopedI18n('worksDetail'),
    getWorksDetailInfo({
      id: String(id),
    }),
  ])

  if (!responseWorksDetailInfo) {
    notFound()
  }

  const title =
    locale === 'en'
      ? responseWorksDetailInfo.subject_en
      : responseWorksDetailInfo.subject

  const description =
    locale === 'en'
      ? responseWorksDetailInfo.description_en
      : responseWorksDetailInfo.description

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
    responseWorksDetailInfo,
    responseLatestWorks,
  ] = await Promise.all([
    getCurrentLocale(),
    getScopedI18n('worksDetail'),
    getTagPosition(),
    getTagProgram(),
    getTagDesign(),
    getTagCms(),
    getTagOther(),
    getWorksDetailInfo({
      id: String(id),
    }),
    getWorksList({
      cnt: 5,
    }),
  ])

  if (!responseWorksDetailInfo) {
    notFound()
  }

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
    id: String(responseWorksDetailInfo.topics_id),
    ...(responseWorksDetailInfo.main_visual && {
      mainVisual: {
        src: responseWorksDetailInfo.main_visual.url,
        alt: responseWorksDetailInfo.main_visual.desc,
      },
    }),
    title:
      locale === 'en'
        ? responseWorksDetailInfo.subject_en
        : responseWorksDetailInfo.subject,
    body:
      locale === 'en'
        ? responseWorksDetailInfo.contents_en
        : responseWorksDetailInfo.contents,
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

  const latestWorks: LatestArticleCardProps[] = responseLatestWorks
    ? responseLatestWorks.list.map((info) => {
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
          titleTag: 'h3',
        }
      })
    : []

  return <Index latestArticles={latestWorks} articleInfo={articleInfo} />
}

export default WorksDetailPage
