import { Metadata } from 'next'

import { Index } from './_components'

import { getBlogsList } from '~/apis/fetch/blogs'
import { getTagPosition } from '~/apis/fetch/tag-position'
import { getWorksList } from '~/apis/fetch/works'
import { AppHead } from '~/components/common/AppHead'
import { ArticleCardProps } from '~/components/ui/cards/ArticleCard'
import { WorkCardProps } from '~/components/ui/cards/WorkCard'
import { BaseTagProps } from '~/components/ui/tags/BaseTag'
import { routes } from '~/config/routes'
import { getCurrentLocale } from '~/locales/server'

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
  const [
    locale,
    responseTagPosition,
    responseLatestBlogs,
    responseLatestWorks,
  ] = await Promise.all([
    getCurrentLocale(),
    getTagPosition(),
    getBlogsList({
      cnt: 5,
    }),
    getWorksList({
      cnt: 4,
    }),
  ])

  const latestBlogs: ArticleCardProps[] = responseLatestBlogs
    ? responseLatestBlogs.list.map((info) => {
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
          title: locale === 'en' ? info.subject_en : info.subject,
          titleTag: 'h3',
          tags: tagPosition,
          isNotActiveAnimelm: true,
        }
      })
    : []

  const latestWorks: WorkCardProps[] = responseLatestWorks
    ? responseLatestWorks.list.map((info) => {
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
          title: locale === 'en' ? info.subject_en : info.subject,
          titleTag: 'h3',
          tags: tagPosition,
          isNotActiveAnimelm: true,
        }
      })
    : []

  return <Index latestBlogs={latestBlogs} latestWorks={latestWorks} />
}

export default HomePage
