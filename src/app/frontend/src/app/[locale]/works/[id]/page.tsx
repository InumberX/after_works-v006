import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NextPageProps } from '@/types/next'
import { AppHead } from '@/components/common/AppHead'
import { Index } from './_components'
import { SITE_URL } from '@/config/env'
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
import { getScopedI18n } from '@/locales/server'

export const generateMetadata = async ({
  params,
}: NextPageProps): Promise<Metadata> => {
  const id = params?.id

  if (!id) {
    notFound()
  }

  const scopedT = await getScopedI18n('worksDetail')

  const responseWorksDetailInfo = await getWorksDetailInfo({
    id: String(id),
  })

  if (!responseWorksDetailInfo) {
    notFound()
  }

  return AppHead({
    title: `${responseWorksDetailInfo.subject} - ${scopedT('title')}}`,
    description:
      responseWorksDetailInfo.description ??
      scopedT('description', {
        title: responseWorksDetailInfo.subject,
      }),
    canonical: `${SITE_URL}${routes.worksDetail.url({
      id: String(id),
    })}`,
    ogImage: responseWorksDetailInfo.main_visual.url,
  })
}

const WorksDetailPage = async ({ params }: NextPageProps) => {
  const id = params?.id

  if (!id) {
    notFound()
  }

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
        tagPosition.push({
          id: String(target.tag_id),
          name: target.ext_col_01 !== '' ? target.ext_col_01 : target.tag_nm,
        })
        break
      }
    }

    for (let j = 0, jLength = tagProgramInfos.length; j < jLength; j = j + 1) {
      const target = tagProgramInfos[j]

      if (tag.tag_id === target.tag_id) {
        tagProgram.push({
          id: String(target.tag_id),
          name: target.ext_col_01 !== '' ? target.ext_col_01 : target.tag_nm,
        })
        break
      }
    }

    for (let j = 0, jLength = tagDesignInfos.length; j < jLength; j = j + 1) {
      const target = tagDesignInfos[j]

      if (tag.tag_id === target.tag_id) {
        tagDesign.push({
          id: String(target.tag_id),
          name: target.ext_col_01 !== '' ? target.ext_col_01 : target.tag_nm,
        })
        break
      }
    }

    for (let j = 0, jLength = tagCmsInfos.length; j < jLength; j = j + 1) {
      const target = tagCmsInfos[j]

      if (tag.tag_id === target.tag_id) {
        tagCms.push({
          id: String(target.tag_id),
          name: target.ext_col_01 !== '' ? target.ext_col_01 : target.tag_nm,
        })
        break
      }
    }

    for (let j = 0, jLength = tagOtherInfos.length; j < jLength; j = j + 1) {
      const target = tagOtherInfos[j]

      if (tag.tag_id === target.tag_id) {
        tagOther.push({
          id: String(target.tag_id),
          name: target.ext_col_01 !== '' ? target.ext_col_01 : target.tag_nm,
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
    title: responseWorksDetailInfo.subject,
    body: responseWorksDetailInfo.contents,
    dateTitle: scopedT('dateTitle'),
    startedAt: responseWorksDetailInfo.started_at,
    endedAt: responseWorksDetailInfo.ended_at,
    url: responseWorksDetailInfo.url,
    bottomLink: {
      url: routes.works.url({}),
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
    <Index latestArticleInfos={latestWorksInfos} articleInfo={articleInfo} />
  )
}

export default WorksDetailPage
