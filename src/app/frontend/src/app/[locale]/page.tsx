import { Metadata } from 'next'

import { Index } from './_components'

import { getBlogsInfos } from '@/apis/fetch/blogs'
import { getTagPositionInfos } from '@/apis/fetch/tagPosition'
import { AppHead } from '@/components/common/AppHead'
import { ArticleCardProps } from '@/components/ui/cards/ArticleCard'
import { BaseTagProps } from '@/components/ui/tags/BaseTag'
import { routes } from '@/config/routes'
import { getCurrentLocale } from '@/locales/server'

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
  const tagPositionInfos = await getTagPositionInfos()

  const responseLatestBlogInfos = await getBlogsInfos({
    cnt: 5,
  })

  const latestBlogInfos: ArticleCardProps[] = responseLatestBlogInfos
    ? responseLatestBlogInfos.list.map((info) => {
        const tagPosition: BaseTagProps[] = []

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

  return <Index latestArticleInfos={latestBlogInfos} />
}

export default HomePage
