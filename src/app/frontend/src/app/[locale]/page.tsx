import { Metadata } from 'next'
import { AppHead } from '@/components/common/AppHead'
import { Index } from './_components'
import { routes } from '@/config/routes'
import { getBlogsInfos } from '@/apis/fetch/blogs'
import { ArticleCardProps } from '@/components/ui/cards/ArticleCard'
import { getTagPositionInfos } from '@/apis/fetch/tagPosition'
import { BaseTagProps } from '@/components/ui/tags/BaseTag'

export const dynamic = 'force-dynamic'

export const generateMetadata = (): Metadata => {
  return AppHead({})
}

const HomePage = async () => {
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

  return <Index latestArticleInfos={latestBlogInfos} />
}

export default HomePage
