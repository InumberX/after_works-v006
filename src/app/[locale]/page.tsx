import type { Metadata } from 'next'

import { Index } from './_components'

import { getBlogsList } from '~/apis/fetch/blogs'
import { getTagPosition } from '~/apis/fetch/tag-position'
import { getWorksList } from '~/apis/fetch/works'
import { AppHead } from '~/components/common/AppHead'
import type { ArticleCardProps } from '~/components/ui/cards/ArticleCard'
import type { WorkCardProps } from '~/components/ui/cards/WorkCard'
import type { BaseTagProps } from '~/components/ui/tags/BaseTag'
import { routes } from '~/config/routes'
import { getCurrentLocale } from '~/locales/server'
import { toTagName } from '~/utils/to-tag-name'

export const dynamic = 'force-dynamic'

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getCurrentLocale()

  return AppHead({
    canonical: routes.home.url({
      isFullPath: true,
      locale,
    }),
  })
}

const HomePage = async () => {
  const locale = await getCurrentLocale()

  const [responseTagPosition, responseLatestBlogs, responseLatestWorks] =
    await Promise.all([
      getTagPosition({ lang: locale }),
      getBlogsList({
        lang: locale,
        cnt: 5,
      }),
      getWorksList({
        lang: locale,
        cnt: 4,
      }),
    ])

  const latestBlogs: ArticleCardProps[] = responseLatestBlogs.success
    ? responseLatestBlogs.data.list.map((info) => {
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
              tagPosition.push({
                id: String(target.tag_id),
                name: toTagName(target),
              })
              break
            }
          }
        }

        return {
          url: routes.blogsDetail.url({
            isFullPath: true,
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
          title: info.subject,
          titleTag: 'h3',
          tags: tagPosition,
          isNotActiveAnimelm: true,
        }
      })
    : []

  const latestWorks: WorkCardProps[] = responseLatestWorks.success
    ? responseLatestWorks.data.list.map((info) => {
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
              tagPosition.push({
                id: String(target.tag_id),
                name: toTagName(target),
              })
              break
            }
          }
        }

        return {
          url: routes.worksDetail.url({
            isFullPath: true,
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
          title: info.subject,
          titleTag: 'h3',
          tags: tagPosition,
          isNotActiveAnimelm: true,
        }
      })
    : []

  return <Index latestBlogs={latestBlogs} latestWorks={latestWorks} />
}

export default HomePage
