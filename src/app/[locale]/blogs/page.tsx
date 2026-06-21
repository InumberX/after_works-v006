import { Metadata } from 'next'

import { Index } from './_components'

import { getBlogsList } from '~/apis/fetch/blogs'
import { getTagNews } from '~/apis/fetch/tag-news'
import { AppHead } from '~/components/common/AppHead'
import { LatestArticleCardProps } from '~/components/ui/cards/LatestArticleCard'
import { WorkCardProps } from '~/components/ui/cards/WorkCard'
import { BaseTagProps } from '~/components/ui/tags/BaseTag'
import { routes } from '~/config/routes'
import { getScopedI18n, getCurrentLocale } from '~/locales/server'
import { NextPageProps } from '~/types/next'

export const generateMetadata = async (): Promise<Metadata> => {
  const [locale, scopedT] = await Promise.all([
    getCurrentLocale(),
    getScopedI18n('blogs'),
  ])

  return AppHead({
    title: scopedT('title'),
    description: scopedT('description'),
    canonical: routes.blogs.url({
      isFullPath: true,
      locale,
    }),
  })
}

const BlogsPage = async ({ searchParams }: NextPageProps) => {
  const [locale, responseTagNews, currentSearchParams] = await Promise.all([
    getCurrentLocale(),
    getTagNews(),
    searchParams,
  ])

  const [responseBlogs, responseLatestBlogs] = await Promise.all([
    getBlogsList({
      ...(currentSearchParams &&
        currentSearchParams.page && {
          page: parseInt(currentSearchParams.page as string, 10),
        }),
    }),
    getBlogsList({
      cnt: 5,
    }),
  ])

  const defaultBlogs: WorkCardProps[] = responseBlogs
    ? responseBlogs.list.map((info) => {
        const tagPosition: BaseTagProps[] = []

        for (let i = 0, iLength = info.tags.length; i < iLength; i = i + 1) {
          const tag = info.tags[i]

          for (
            let j = 0, jLength = responseTagNews.length;
            j < jLength;
            j = j + 1
          ) {
            const target = responseTagNews[j]

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

  const latestBlogs: LatestArticleCardProps[] = responseLatestBlogs
    ? responseLatestBlogs.list.map((info) => {
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
          titleTag: 'h3',
        }
      })
    : []

  return (
    <Index
      defaultPage={
        currentSearchParams && currentSearchParams.page
          ? parseInt(currentSearchParams.page as string, 10)
          : 1
      }
      defaultTotalPage={responseBlogs ? responseBlogs.pageInfo.totalPageCnt : 0}
      defaultArticles={defaultBlogs}
      latestArticles={latestBlogs}
      responseTagNews={responseTagNews}
    />
  )
}

export default BlogsPage
