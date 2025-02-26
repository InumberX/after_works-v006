import { Metadata } from 'next'
import { AppHead } from '@/components/common/AppHead'
import { Index } from './_components'
import { routes } from '@/config/routes'
import { NextPageProps } from '@/types/next'
import { getAboutInfo } from '@/apis/fetch/about'
import { getCategoryAboutHistoryInfos } from '@/apis/fetch/categoryAboutHistory'
import { getAboutHistoryInfo } from '@/apis/fetch/aboutHistory'
import { getTagPositionInfos } from '@/apis/fetch/tagPosition'
import { getTagProgramInfos } from '@/apis/fetch/tagProgram'
import { getTagCmsInfos } from '@/apis/fetch/tagCms'
import { getTagDesignInfos } from '@/apis/fetch/tagDesign'
import { getTagOtherInfos } from '@/apis/fetch/tagOther'
import { getScopedI18n, getCurrentLocale } from '@/locales/server'

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getCurrentLocale()
  const scopedT = await getScopedI18n('about')

  return AppHead({
    title: scopedT('title'),
    description: scopedT('description'),
    canonical: routes.about.url({
      isFullPath: true,
      locale,
    }),
  })
}

const HomePage = async ({ searchParams }: NextPageProps) => {
  const locale = await getCurrentLocale()
  const aboutInfo = await getAboutInfo({})

  const certifications = aboutInfo
    ? aboutInfo.certifications.map((info) => {
        return {
          name:
            locale === 'en'
              ? info.certification_name_en
              : info.certification_name,
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

              tagPosition.push(name)
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

              tagSkill.push(name)
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

              tagSkill.push(name)
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

              tagSkill.push(name)
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

              tagSkill.push(name)
              break
            }
          }
        }

        const tags = []

        if (tagPosition.length > 0) {
          tags.push(tagPosition)
        }

        if (tagSkill.length > 0) {
          tags.push(tagSkill)
        }

        return {
          title: locale === 'en' ? info.subject_en : info.subject,
          startedAt: info.started_at,
          endedAt: info.ended_at,
          tags,
        }
      })
    : []

  return (
    <Index
      leadInfo={{
        lead: aboutInfo
          ? locale === 'en'
            ? aboutInfo.lead_en
            : aboutInfo.lead
          : '',
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
