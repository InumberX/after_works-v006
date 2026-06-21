import type { Metadata } from 'next'

import { Index } from './_components'

import { getAboutInfo } from '~/apis/fetch/about'
import { getAboutHistoryInfo } from '~/apis/fetch/about-history'
import { getCategoryAboutHistoryList } from '~/apis/fetch/category-about-history'
import { getTagCms } from '~/apis/fetch/tag-cms'
import { getTagDesign } from '~/apis/fetch/tag-design'
import { getTagOther } from '~/apis/fetch/tag-other'
import { getTagPosition } from '~/apis/fetch/tag-position'
import { getTagProgram } from '~/apis/fetch/tag-program'
import { AppHead } from '~/components/common/AppHead'
import { routes } from '~/config/routes'
import { getScopedI18n, getCurrentLocale } from '~/locales/server'
import type { NextPageProps } from '~/types/next'

export const generateMetadata = async (): Promise<Metadata> => {
  const [locale, scopedT] = await Promise.all([
    getCurrentLocale(),
    getScopedI18n('about'),
  ])

  return AppHead({
    title: scopedT('title'),
    description: scopedT('description'),
    canonical: routes.about.url({
      isFullPath: true,
      locale,
    }),
  })
}

const AboutPage = async ({ searchParams }: NextPageProps) => {
  const [
    locale,
    aboutInfo,
    currentSearchParams,
    responseTagPosition,
    responseTagProgram,
    responseTagCms,
    responseTagDesign,
    responseTagOther,
  ] = await Promise.all([
    getCurrentLocale(),
    getAboutInfo({}),
    searchParams,
    getTagPosition(),
    getTagProgram(),
    getTagCms(),
    getTagDesign(),
    getTagOther(),
  ])

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

  const categoryAboutHistory = await getCategoryAboutHistoryList({})

  const years = categoryAboutHistory
    ? categoryAboutHistory.list
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

  if (currentSearchParams && currentSearchParams.year && years.length > 0) {
    for (let i = 0, iLength = years.length; i < iLength; i = i + 1) {
      const year = years[i]

      if (year.value === currentSearchParams.year) {
        defaultYearId = year.id
        break
      }
    }
  } else if (years.length > 0) {
    defaultYearId = years[0].id
  }

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
            let j = 0, jLength = responseTagPosition.length;
            j < jLength;
            j = j + 1
          ) {
            const target = responseTagPosition[j]

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
            let j = 0, jLength = responseTagProgram.length;
            j < jLength;
            j = j + 1
          ) {
            const target = responseTagProgram[j]

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
            let j = 0, jLength = responseTagCms.length;
            j < jLength;
            j = j + 1
          ) {
            const target = responseTagCms[j]

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
            let j = 0, jLength = responseTagDesign.length;
            j < jLength;
            j = j + 1
          ) {
            const target = responseTagDesign[j]

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
            let j = 0, jLength = responseTagOther.length;
            j < jLength;
            j = j + 1
          ) {
            const target = responseTagOther[j]

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
      profileInfo={{
        lead: aboutInfo
          ? locale === 'en'
            ? aboutInfo.lead_en
            : aboutInfo.lead
          : '',
      }}
      historyInfo={{
        defaultYearId,
        years,
        defaultItems: defaultAboutHistoryItems,
        responseTagPosition,
        responseTagProgram,
        responseTagCms,
        responseTagDesign,
        responseTagOther,
      }}
      skillsInfo={{
        qualification: {
          items: certifications.map((info) => {
            return {
              text: info.name,
              url: info.url,
            }
          }),
        },
        skill: {
          items: skills.map((info) => {
            return {
              text: info,
            }
          }),
        },
      }}
    />
  )
}

export default AboutPage
