'use client'

import clsx from 'clsx'
import { format } from 'date-fns'
import { useRouter, usePathname } from 'next/navigation'
import { useState } from 'react'

import styles from './index.module.css'

import { getAboutHistoryInfo } from '~/apis/fetch/about-history'
import { LayoutInner } from '~/components/ui/layouts/LayoutInner'
import { LayoutSection } from '~/components/ui/layouts/LayoutSection'
import { ReplaceNewLineText } from '~/components/ui/typographies/ReplaceNewLineText'
import { SectionLead } from '~/components/ui/typographies/SectionLead'
import { SectionTitle } from '~/components/ui/typographies/SectionTitle'
import { useAnimelm, type AnimelmElement } from '~/hooks/use-animelm'
import { useScopedI18n } from '~/locales/client'
import { useCurrentLocale } from '~/locales/client'
import type { Tag as ApiResponseTagCmsTag } from '~/types/apis/fetch/tag-cms'
import type { Tag as ApiResponseTagDesignTag } from '~/types/apis/fetch/tag-design'
import type { Tag as ApiResponseTagOtherTag } from '~/types/apis/fetch/tag-other'
import type { Tag as ApiResponseTagPositionTag } from '~/types/apis/fetch/tag-position'
import type { Tag as ApiResponseTagProgramTag } from '~/types/apis/fetch/tag-program'

export type HistoryItem = {
  title: string
  tags: string[][]
  startedAt: string | Date
  endedAt: string | Date
}

export type HistoryProps = {
  defaultYearId: string
  years: {
    id: string
    value: string
    label: string
  }[]
  defaultItems: HistoryItem[]
  responseTagPosition: ApiResponseTagPositionTag[]
  responseTagProgram: ApiResponseTagProgramTag[]
  responseTagCms: ApiResponseTagCmsTag[]
  responseTagDesign: ApiResponseTagDesignTag[]
  responseTagOther: ApiResponseTagOtherTag[]
}

export const History = ({
  defaultYearId,
  years,
  defaultItems,
  responseTagPosition,
  responseTagProgram,
  responseTagCms,
  responseTagDesign,
  responseTagOther,
}: HistoryProps) => {
  const locale = useCurrentLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [currentYearId, setCurrentYearId] = useState(defaultYearId)
  const [contentsItems, setContentsItems] = useState(defaultItems)
  const [isSending, setIsSending] = useState(false)
  const { targetRef } = useAnimelm<AnimelmElement>()
  const scopedT = useScopedI18n('about.history')
  const handleClickYear = async (id: string) => {
    if (isSending || currentYearId === id) {
      return
    }

    setIsSending(true)

    const aboutHistoryInfo = await getAboutHistoryInfo({
      categoryId: id,
    })

    const aboutHistoryItems = aboutHistoryInfo
      ? aboutHistoryInfo.map((info) => {
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
                      target.ext_col_02 !== ''
                        ? target.ext_col_02
                        : target.tag_nm
                    break
                  default:
                    name =
                      target.ext_col_01 !== ''
                        ? target.ext_col_01
                        : target.tag_nm
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
                      target.ext_col_02 !== ''
                        ? target.ext_col_02
                        : target.tag_nm
                    break
                  default:
                    name =
                      target.ext_col_01 !== ''
                        ? target.ext_col_01
                        : target.tag_nm
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
                      target.ext_col_02 !== ''
                        ? target.ext_col_02
                        : target.tag_nm
                    break
                  default:
                    name =
                      target.ext_col_01 !== ''
                        ? target.ext_col_01
                        : target.tag_nm
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
                      target.ext_col_02 !== ''
                        ? target.ext_col_02
                        : target.tag_nm
                    break
                  default:
                    name =
                      target.ext_col_01 !== ''
                        ? target.ext_col_01
                        : target.tag_nm
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
                      target.ext_col_02 !== ''
                        ? target.ext_col_02
                        : target.tag_nm
                    break
                  default:
                    name =
                      target.ext_col_01 !== ''
                        ? target.ext_col_01
                        : target.tag_nm
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

    setCurrentYearId(id)
    setContentsItems(aboutHistoryItems)

    let selectedYear

    for (let i = 0, iLength = years.length; i < iLength; i = i + 1) {
      const year = years[i]

      if (year.id === id) {
        selectedYear = year.value
        break
      }
    }

    router.push(`${pathname}?year=${selectedYear}`, {
      scroll: false,
    })

    setTimeout(() => {
      setIsSending(false)
    }, 100)
  }

  return (
    <LayoutSection className={styles.History}>
      <LayoutInner>
        <div
          className={clsx(styles.History__container, 'AnimelmBlurIn')}
          ref={targetRef}
        >
          <div className={styles.HistoryTitle}>
            <div className={styles.HistoryTitle__container}>
              <SectionTitle
                subTitle='HISTORY'
                title={<ReplaceNewLineText text={scopedT('title')} />}
              />
              <SectionLead
                lead={<ReplaceNewLineText text={scopedT('description')} />}
              />
            </div>
          </div>
          <div className={styles.History__parallel}>
            <aside className={styles.History__side}>
              <div className={styles.HistoryYear}>
                <ul className={styles.HistoryYear__items}>
                  {years.map((info) => {
                    const isCurrentYear = info.id === currentYearId
                    const Title = isCurrentYear ? 'h3' : 'div'

                    return (
                      <li key={info.id} className={styles.HistoryYear__item}>
                        <Title
                          className={clsx(
                            styles.HistoryYear__title,
                            isCurrentYear &&
                              styles['HistoryYear__title--active'],
                          )}
                        >
                          <button
                            type='button'
                            className={styles.HistoryYear__button}
                            onClick={async () => {
                              await handleClickYear(info.id)
                            }}
                          >
                            <time
                              className={styles.HistoryYear__text}
                              dateTime={info.value}
                            >
                              {info.label}
                            </time>
                          </button>
                        </Title>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </aside>

            <div className={styles.History__main}>
              <div className={styles.HistoryContens}>
                <ul className={styles.HistoryContens__items}>
                  {contentsItems.map((info, i) => (
                    <li key={i} className={styles.HistoryContens__item}>
                      <div className={styles.HistoryContens__contents}>
                        {(info.startedAt || info.endedAt) && (
                          <div className={styles.HistoryContensDate}>
                            <div
                              className={styles.HistoryContensDate__container}
                            >
                              {info.startedAt &&
                              info.endedAt &&
                              format(new Date(info.startedAt), 'yyyy-MM') ===
                                format(new Date(info.endedAt), 'yyyy-MM') ? (
                                <time
                                  className={styles.HistoryContensDate__text}
                                  dateTime={format(
                                    new Date(info.startedAt),
                                    'yyyy-MM',
                                  )}
                                >
                                  {format(
                                    new Date(info.startedAt),
                                    locale === 'en' ? 'MMMM' : 'M月',
                                  )}
                                </time>
                              ) : (
                                <>
                                  {info.startedAt && (
                                    <time
                                      className={
                                        styles.HistoryContensDate__text
                                      }
                                      dateTime={format(
                                        new Date(info.startedAt),
                                        'yyyy-MM',
                                      )}
                                    >
                                      {format(
                                        new Date(info.startedAt),
                                        locale === 'en' ? 'MMMM' : 'M月',
                                      )}
                                    </time>
                                  )}

                                  <span
                                    className={
                                      styles.HistoryContensDate__separator
                                    }
                                  >
                                    {locale === 'en' ? '-' : '〜'}
                                  </span>

                                  {info.endedAt && (
                                    <time
                                      className={
                                        styles.HistoryContensDate__text
                                      }
                                      dateTime={format(
                                        new Date(info.endedAt),
                                        'yyyy-MM',
                                      )}
                                    >
                                      {format(
                                        new Date(info.endedAt),
                                        locale === 'en' ? 'MMMM' : 'M月',
                                      )}
                                    </time>
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                        )}

                        <div className={styles.HistoryContensTitle}>
                          <h4 className={styles.HistoryContensTitle__text}>
                            {info.title}
                          </h4>
                        </div>

                        {info.tags.length > 0 && (
                          <div className={styles.HistoryContensTag}>
                            <ul className={styles.HistoryContensTag__items}>
                              {info.tags.map((tags, i) => (
                                <li
                                  key={i}
                                  className={styles.HistoryContensTag__item}
                                >
                                  <div className={styles.HistoryContensTagText}>
                                    <ul
                                      className={
                                        styles.HistoryContensTagText__items
                                      }
                                    >
                                      {tags.map((tag, j) => (
                                        <li
                                          key={j}
                                          className={
                                            styles.HistoryContensTagText__item
                                          }
                                        >
                                          {tag}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </LayoutInner>
    </LayoutSection>
  )
}
