import { Metadata } from 'next'
import { AppHead } from '~/components/common/AppHead'
import { Index } from './_components'
import { SITE_URL } from '~/config/env'
import { routes } from '~/config/routes'
import { NextPageProps } from '~/types/nextJs'
import { getAboutInfo } from '~/apis/fetch/about'
import { getCategoryAboutHistoryInfos } from '~/apis/fetch/categoryAboutHistory'
import { getAboutHistoryInfo } from '~/apis/fetch/aboutHistory'
import { getTagPositionInfos } from '~/apis/fetch/tagPosition'
import { getTagProgramInfos } from '~/apis/fetch/tagProgram'
import { getTagCmsInfos } from '~/apis/fetch/tagCms'
import { getTagDesignInfos } from '~/apis/fetch/tagDesign'
import { getTagOtherInfos } from '~/apis/fetch/tagOther'

export const generateMetadata = (): Metadata => {
  return AppHead({
    title: '経歴',
    description:
      '東京都在住のフロントエンドエンジニア：N/NE（ナイン）のポートフォリオ用Webサイトです。このページでは、私のプロフィールやこれまでの経験、担当業務等をご紹介します。',
    canonical: `${SITE_URL}${routes.about.url({})}`,
  })
}

const HomePage = async ({ searchParams }: NextPageProps) => {
  const aboutInfo = await getAboutInfo({})

  const certifications = aboutInfo
    ? aboutInfo.certifications.map((info) => {
        return {
          name: info.certification_name,
          url: info.certification_url,
        }
      })
    : []

  const skills = aboutInfo ? aboutInfo.skills : []

  const categoryAboutHistoryInfos = await getCategoryAboutHistoryInfos({})

  const years = categoryAboutHistoryInfos
    ? categoryAboutHistoryInfos.list
        .filter((info) => {
          return info.ext_col_01 !== ''
        })
        .map((info) => {
          return {
            id: info.topics_category_id,
            value: info.ext_col_01,
            label: info.ext_col_01,
          }
        })
    : []

  let defaultYearId = ''

  if (searchParams && searchParams.year && years.length > 0) {
    for (let i = 0, iLength = years.length; i < iLength; i = i + 1) {
      const year = years[i]

      if (year.value === searchParams.year) {
        defaultYearId = year.id
        break
      }
    }
  } else if (years.length > 0) {
    defaultYearId = years[0].id
  }

  const tagPositionInfos = await getTagPositionInfos()

  const tagProgramInfos = await getTagProgramInfos()

  const tagCmsInfos = await getTagCmsInfos()

  const tagDesignInfos = await getTagDesignInfos()

  const tagOtherInfos = await getTagOtherInfos()

  const defaultAboutHistoryInfo = await getAboutHistoryInfo({
    categoryId: defaultYearId,
  })

  const defaultAboutHistoryItems = defaultAboutHistoryInfo
    ? defaultAboutHistoryInfo.map((info) => {
        const tagPosition: string[] = []
        const tagSkill: string[] = []

        for (let i = 0, iLength = info.tags.length; i < iLength; i = i + 1) {
          const tag = info.tags[i]

          for (
            let j = 0, jLength = tagPositionInfos.length;
            j < jLength;
            j = j + 1
          ) {
            const target = tagPositionInfos[j]

            if (tag.tag_id === target.tag_id) {
              tagPosition.push(
                target.ext_col_01 !== '' ? target.ext_col_01 : target.tag_nm,
              )
              break
            }
          }

          for (
            let j = 0, jLength = tagProgramInfos.length;
            j < jLength;
            j = j + 1
          ) {
            const target = tagProgramInfos[j]

            if (tag.tag_id === target.tag_id) {
              tagSkill.push(
                target.ext_col_01 !== '' ? target.ext_col_01 : target.tag_nm,
              )
              break
            }
          }

          for (
            let j = 0, jLength = tagCmsInfos.length;
            j < jLength;
            j = j + 1
          ) {
            const target = tagCmsInfos[j]

            if (tag.tag_id === target.tag_id) {
              tagSkill.push(
                target.ext_col_01 !== '' ? target.ext_col_01 : target.tag_nm,
              )
              break
            }
          }

          for (
            let j = 0, jLength = tagDesignInfos.length;
            j < jLength;
            j = j + 1
          ) {
            const target = tagDesignInfos[j]

            if (tag.tag_id === target.tag_id) {
              tagSkill.push(
                target.ext_col_01 !== '' ? target.ext_col_01 : target.tag_nm,
              )
              break
            }
          }

          for (
            let j = 0, jLength = tagOtherInfos.length;
            j < jLength;
            j = j + 1
          ) {
            const target = tagOtherInfos[j]

            if (tag.tag_id === target.tag_id) {
              tagSkill.push(
                target.ext_col_01 !== '' ? target.ext_col_01 : target.tag_nm,
              )
              break
            }
          }
        }

        const tags = []

        tagPosition.length > 0 && tags.push(tagPosition)
        tagSkill.length > 0 && tags.push(tagSkill)

        return {
          title: info.subject,
          startedAt: info.started_at,
          endedAt: info.ended_at,
          tags,
        }
      })
    : []

  return (
    <Index
      leadInfo={{
        lead: aboutInfo && aboutInfo.lead ? aboutInfo.lead : '',
      }}
      profileInfo={{
        certifications,
        skills,
      }}
      historyInfo={{
        defaultYearId,
        years,
        defaultItems: defaultAboutHistoryItems,
        tagPositionInfos,
        tagProgramInfos,
        tagCmsInfos,
        tagDesignInfos,
        tagOtherInfos,
      }}
    />
  )
}

export default HomePage
