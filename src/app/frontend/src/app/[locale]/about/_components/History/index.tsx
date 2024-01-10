'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import styles from './index.module.scss'
import clsx from 'clsx'
import { LayoutSection } from '@/components/ui/layouts/LayoutSection'
import { LayoutInner } from '@/components/ui/layouts/LayoutInner'
import { ApiResponseTagPositionTag } from '@/types/apis/fetch/tagPosition'
import { ApiResponseTagProgramTag } from '@/types/apis/fetch/tagProgram'
import { ApiResponseTagCmsTag } from '@/types/apis/fetch/tagCms'
import { ApiResponseTagDesignTag } from '@/types/apis/fetch/tagDesign'
import { ApiResponseTagOtherTag } from '@/types/apis/fetch/tagOther'
import { format } from 'date-fns'
import { getAboutHistoryInfo } from '@/apis/fetch/aboutHistory'
import { useCurrentLocale } from '@/locales/client'

export type HistoryItem = {
  title: string
  tags: string[][]
  startedAt: string
  endedAt: string
}

export type HistoryProps = {
  defaultYearId: string
  years: {
    id: string
    value: string
    label: string
  }[]
  defaultItems: HistoryItem[]
  tagPositionInfos: ApiResponseTagPositionTag[]
  tagProgramInfos: ApiResponseTagProgramTag[]
  tagCmsInfos: ApiResponseTagCmsTag[]
  tagDesignInfos: ApiResponseTagDesignTag[]
  tagOtherInfos: ApiResponseTagOtherTag[]
}

export const History = ({
  defaultYearId,
  years,
  defaultItems,
  tagPositionInfos,
  tagProgramInfos,
  tagCmsInfos,
  tagDesignInfos,
  tagOtherInfos,
}: HistoryProps) => {
  const locale = useCurrentLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [currentYearId, setCurrentYearId] = useState(defaultYearId)
  const [contentsItems, setContentsItems] = useState(defaultItems)
  const [isSending, setIsSending] = useState(false)
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

          tagPosition.length > 0 && tags.push(tagPosition)
          tagSkill.length > 0 && tags.push(tagSkill)

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
        <div className={styles.History__container}>
          <div className={styles.History__parallel}>
            <aside className={styles.History__side}>
              <div className={styles.HistoryYear}>
                <ul className={styles.HistoryYear__items}>
                  {years.map((info) => (
                    <li key={info.id} className={styles.HistoryYear__item}>
                      {info.id === currentYearId ? (
                        <h2
                          className={clsx(
                            styles.HistoryYear__title,
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
                        </h2>
                      ) : (
                        <div className={styles.HistoryYear__title}>
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
                        </div>
                      )}
                    </li>
                  ))}
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
                                    className={styles.HistoryContensDate__text}
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
                        )}

                        <div className={styles.HistoryContensTitle}>
                          <h3 className={styles.HistoryContensTitle__text}>
                            {info.title}
                          </h3>
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
