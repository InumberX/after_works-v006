import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NextPageProps } from '@/types/next'
import { AppHead } from '@/components/common/AppHead'
import { Index } from './_components'
import { routes } from '@/config/routes'
import { getWorksInfos } from '@/apis/fetch/works'
import { getWorksDetailInfo } from '@/apis/fetch/worksDetail'
import { LatestArticleCardProps } from '@/components/ui/cards/LatestArticleCard'
import { BaseArticleInfo } from '@/components/ui/articles/BaseArticle'
import { getTagPositionInfos } from '@/apis/fetch/tagPosition'
import { getTagProgramInfos } from '@/apis/fetch/tagProgram'
import { getTagDesignInfos } from '@/apis/fetch/tagDesign'
import { getTagCmsInfos } from '@/apis/fetch/tagCms'
import { getTagOtherInfos } from '@/apis/fetch/tagOther'
import { BaseTagProps } from '@/components/ui/tags/BaseTag'
import { getScopedI18n, getCurrentLocale } from '@/locales/server'

export const generateMetadata = async ({
  params,
}: NextPageProps): Promise<Metadata> => {
  const currentParams = await params
  const id = currentParams?.id

  if (!id) {
    notFound()
  }

  const locale = await getCurrentLocale()
  const scopedT = await getScopedI18n('worksDetail')

  const responseWorksDetailInfo = await getWorksDetailInfo({
    id: String(id),
  })

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

  const locale = await getCurrentLocale()
  const scopedT = await getScopedI18n('worksDetail')

  const tagPositionInfos = await getTagPositionInfos()
  const tagProgramInfos = await getTagProgramInfos()
  const tagDesignInfos = await getTagDesignInfos()
  const tagCmsInfos = await getTagCmsInfos()
  const tagOtherInfos = await getTagOtherInfos()

  const responseWorksDetailInfo = await getWorksDetailInfo({
    id: String(id),
  })

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

    for (let j = 0, jLength = tagPositionInfos.length; j < jLength; j = j + 1) {
      const target = tagPositionInfos[j]

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

    for (let j = 0, jLength = tagProgramInfos.length; j < jLength; j = j + 1) {
      const target = tagProgramInfos[j]

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

    for (let j = 0, jLength = tagDesignInfos.length; j < jLength; j = j + 1) {
      const target = tagDesignInfos[j]

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

    for (let j = 0, jLength = tagCmsInfos.length; j < jLength; j = j + 1) {
      const target = tagCmsInfos[j]

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

    for (let j = 0, jLength = tagOtherInfos.length; j < jLength; j = j + 1) {
      const target = tagOtherInfos[j]

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
      {
        title: scopedT('tags.position.title'),
        items: [...tagPosition],
      },
      {
        title: scopedT('tags.technology.title'),
        items: [...tagProgram, ...tagDesign, ...tagCms, ...tagOther],
      },
    ],
  }

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
          titleTag: 'h3',
        }
      })
    : []

  return (
    <Index latestArticleInfos={latestWorksInfos} articleInfo={articleInfo} />
  )
}

export default WorksDetailPage
