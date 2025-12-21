'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import styles from './index.module.css'

import { getBlogsInfos } from '@/apis/fetch/blogs'
import { ArticleCardProps } from '@/components/ui/cards/ArticleCard'
import { ArticleCardList } from '@/components/ui/lists/ArticleCardList'
import { BasePagination } from '@/components/ui/pagination/BasePagination'
import { BaseTagProps } from '@/components/ui/tags/BaseTag'
import { routes } from '@/config/routes'
import { useCurrentLocale } from '@/locales/client'
import { Tag as ApiResponseTagNewsTag } from '@/types/apis/fetch/tagNews'
import { actSmoothScroll } from '@/utils/actSmoothScroll'

type Props = {
  defaultArticleInfos: ArticleCardProps[]
  defaultPage: number
  defaultTotalPage: number
  tagNewsInfos: ApiResponseTagNewsTag[]
}

export const MainColumn = ({
  defaultArticleInfos,
  defaultPage,
  defaultTotalPage,
  tagNewsInfos,
}: Props) => {
  const locale = useCurrentLocale()
  const router = useRouter()
  const [isSending, setIsSending] = useState(false)
  const [articleInfos, setArticleInfos] = useState(defaultArticleInfos)
  const [currentPage, setCurrentPage] = useState(defaultPage)
  const [totalPage, setTotalPage] = useState(defaultTotalPage)
  const handleChangePage = async (newPage: number) => {
    if (isSending || newPage === currentPage) {
      return
    }

    setIsSending(true)

    const responseBlogInfos = await getBlogsInfos({
      page: newPage,
    })

    const infos: ArticleCardProps[] = responseBlogInfos
      ? responseBlogInfos.list.map((info) => {
          const tagPosition: BaseTagProps[] = []

          for (let i = 0, iLength = info.tags.length; i < iLength; i = i + 1) {
            const tag = info.tags[i]

            for (
              let j = 0, jLength = tagNewsInfos.length;
              j < jLength;
              j = j + 1
            ) {
              const target = tagNewsInfos[j]

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
            url: routes.blogsDetail.url({
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
            publishedAt: info.ymd,
            title: locale === 'en' ? info.subject_en : info.subject,
            tags: tagPosition,
          }
        })
      : []

    setArticleInfos(infos)
    setCurrentPage(newPage)
    setTotalPage(
      responseBlogInfos ? responseBlogInfos.pageInfo.totalPageCnt : 0,
    )

    router.push(
      `${routes.blogs.url({
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
        <ArticleCardList infos={articleInfos} />
        <BasePagination
          className={styles.MainColumn__pagination}
          currentPage={currentPage}
          totalPage={totalPage}
          handleChangePage={handleChangePage}
        />
      </div>
    </div>
  )
}
