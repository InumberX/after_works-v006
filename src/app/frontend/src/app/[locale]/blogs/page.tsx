import { Metadata } from 'next'
import { NextPageProps } from '@/types/next'
import { AppHead } from '@/components/common/AppHead'
import { Index } from './_components'
import { SITE_URL } from '@/config/env'
import { routes } from '@/config/routes'
import { getBlogsInfos } from '@/apis/fetch/blogs'
import { ArticleCardProps } from '@/components/ui/cards/ArticleCard'
import { getTagNewsInfos } from '@/apis/fetch/tagNews'
import { BaseTagProps } from '@/components/ui/tags/BaseTag'
import { LatestArticleCardProps } from '@/components/ui/cards/LatestArticleCard'
import { getScopedI18n } from '@/locales/server'

export const generateMetadata = async (): Promise<Metadata> => {
  const scopedT = await getScopedI18n('blogs')

  return AppHead({
    title: scopedT('title'),
    description: scopedT('description'),
    canonical: `${SITE_URL}${routes.blogs.url({})}`,
  })
}

const BlogsPage = async ({ searchParams }: NextPageProps) => {
  const tagNewsInfos = await getTagNewsInfos()

  const responseBlogsInfos = await getBlogsInfos({
    ...(searchParams &&
      searchParams.page && {
        page: parseInt(searchParams.page, 10),
      }),
  })

  const defaultBlogsInfos: ArticleCardProps[] = responseBlogsInfos
    ? responseBlogsInfos.list.map((info) => {
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
              tagPosition.push({
                id: String(target.tag_id),
                name:
                  target.ext_col_01 !== '' ? target.ext_col_01 : target.tag_nm,
              })
              break
            }
          }
        }

        return {
          url: routes.blogsDetail.url({
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
          tags: tagPosition,
        }
      })
    : []

  const responseLatestBlogsInfos = await getBlogsInfos({
    cnt: 5,
  })

  const latestBlogsInfos: LatestArticleCardProps[] = responseLatestBlogsInfos
    ? responseLatestBlogsInfos.list.map((info) => {
        return {
          url: routes.blogsDetail.url({
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
    <Index
      defaultPage={
        searchParams && searchParams.page ? parseInt(searchParams.page, 10) : 1
      }
      defaultTotalPage={
        responseBlogsInfos ? responseBlogsInfos.pageInfo.totalPageCnt : 0
      }
      defaultArticleInfos={defaultBlogsInfos}
      latestArticleInfos={latestBlogsInfos}
      tagNewsInfos={tagNewsInfos}
    />
  )
}

export default BlogsPage
