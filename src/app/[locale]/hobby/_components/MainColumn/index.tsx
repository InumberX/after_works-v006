'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import styles from './index.module.css'

import { getHobbyList } from '~/apis/fetch/hobby'
import { type WorkCardProps } from '~/components/ui/cards/WorkCard'
import { WorkCardList } from '~/components/ui/lists/WorkCardList'
import { BasePagination } from '~/components/ui/paginations/BasePagination'
import { type BaseTagProps } from '~/components/ui/tags/BaseTag'
import { routes } from '~/config/routes'
import { useCurrentLocale } from '~/locales/client'
import { type Tag as ApiResponseTagPositionTag } from '~/types/apis/fetch/tag-position'
import { actSmoothScroll } from '~/utils/act-smooth-scroll'

type Props = {
  defaultArticles: WorkCardProps[]
  defaultPage: number
  defaultTotalPage: number
  responseTagPosition: ApiResponseTagPositionTag[]
}

export const MainColumn = ({
  defaultArticles,
  defaultPage,
  defaultTotalPage,
  responseTagPosition,
}: Props) => {
  const locale = useCurrentLocale()
  const router = useRouter()
  const [isSending, setIsSending] = useState(false)
  const [articles, setArticles] = useState(defaultArticles)
  const [currentPage, setCurrentPage] = useState(defaultPage)
  const [totalPage, setTotalPage] = useState(defaultTotalPage)
  const handleChangePage = async (newPage: number) => {
    if (isSending || newPage === currentPage) {
      return
    }

    setIsSending(true)

    const responseHobby = await getHobbyList({
      page: newPage,
    })

    const items: WorkCardProps[] = responseHobby
      ? responseHobby.list.map((info) => {
          const tagPosition: BaseTagProps[] = []

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

                tagPosition.push({
                  id: String(target.tag_id),
                  name,
                })
                break
              }
            }
          }

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
            tags: tagPosition,
          }
        })
      : []

    setArticles(items)
    setCurrentPage(newPage)
    setTotalPage(responseHobby ? responseHobby.pageInfo.totalPageCnt : 0)

    router.push(
      `${routes.hobby.url({
        locale,
      })}?page=${newPage}`,
      {
        scroll: false,
      },
    )

    setTimeout(() => {
      actSmoothScroll('#main-column-container')

      setIsSending(false)
    }, 10)
  }

  return (
    <div className={styles.MainColumn}>
      <div id='main-column-container' className={styles.MainColumn__container}>
        <WorkCardList items={articles} />
        <BasePagination
          className={styles.MainColumn__pagination}
          currentPage={currentPage}
          totalPage={totalPage}
          onChangePage={handleChangePage}
        />
      </div>
    </div>
  )
}
