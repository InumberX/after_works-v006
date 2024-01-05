import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NextPageProps } from '@/types/next'
import { AppHead } from '@/components/common/AppHead'
import { Index } from './_components'
import { routes } from '@/config/routes'
import { getHobbyInfos } from '@/apis/fetch/hobby'
import { getHobbyDetailInfo } from '@/apis/fetch/hobbyDetail'
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
  const id = params?.id

  if (!id) {
    notFound()
  }

  const scopedT = await getScopedI18n('hobbyDetail')

  const responseHobbyDetailInfo = await getHobbyDetailInfo({
    id: String(id),
  })

  if (!responseHobbyDetailInfo) {
    notFound()
  }

  return AppHead({
    title: `${responseHobbyDetailInfo.subject} - ${scopedT('title')}`,
    description:
      responseHobbyDetailInfo.description ??
      scopedT('description', {
        title: responseHobbyDetailInfo.subject,
      }),
    canonical: routes.hobbyDetail.url({
      isFullPath: true,
      locale: getCurrentLocale(),
      id: String(id),
    }),
    ogImage: responseHobbyDetailInfo.main_visual.url,
  })
}

const HobbyDetailPage = async ({ params }: NextPageProps) => {
  const id = params?.id

  if (!id) {
    notFound()
  }

  const scopedT = await getScopedI18n('hobbyDetail')

  const tagPositionInfos = await getTagPositionInfos()
  const tagProgramInfos = await getTagProgramInfos()
  const tagDesignInfos = await getTagDesignInfos()
  const tagCmsInfos = await getTagCmsInfos()
  const tagOtherInfos = await getTagOtherInfos()

  const responseHobbyDetailInfo = await getHobbyDetailInfo({
    id: String(id),
  })

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
        locale: getCurrentLocale(),
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

  const responseLatestHobbyInfos = await getHobbyInfos({
    cnt: 5,
  })

  const latestHobbyInfos: LatestArticleCardProps[] = responseLatestHobbyInfos
    ? responseLatestHobbyInfos.list.map((info) => {
        return {
          url: routes.hobbyDetail.url({
            locale: getCurrentLocale(),
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
    <Index latestArticleInfos={latestHobbyInfos} articleInfo={articleInfo} />
  )
}

export default HobbyDetailPage
