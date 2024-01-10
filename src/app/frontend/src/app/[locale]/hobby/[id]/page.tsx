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

  const locale = getCurrentLocale()
  const scopedT = await getScopedI18n('hobbyDetail')

  const responseHobbyDetailInfo = await getHobbyDetailInfo({
    id: String(id),
  })

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
  const id = params?.id

  if (!id) {
    notFound()
  }

  const locale = getCurrentLocale()
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
    <Index latestArticleInfos={latestHobbyInfos} articleInfo={articleInfo} />
  )
}

export default HobbyDetailPage
