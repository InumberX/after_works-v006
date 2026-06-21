import { NextResponse } from 'next/server'

import { getBlogsList } from '~/apis/fetch/blogs'
import { getHobbyList } from '~/apis/fetch/hobby'
import { getWorksList } from '~/apis/fetch/works'
import { baseDescriptions } from '~/components/common/AppHead'
import { SITE_NAME, SITE_URL } from '~/config/env'
import { routes } from '~/config/routes'

export const GET = async () => {
  const response: string[] = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    '<channel>',
    `<title>${SITE_NAME}</title>`,
    `<link>${SITE_URL}</link>`,
    `<description>${baseDescriptions.ja}</description>`,
    '<language>ja-JP</language>',
  ]

  const responseBlogsTotalCount = await getBlogsList({
    cnt: 1,
  })

  const responseBlogs = responseBlogsTotalCount
    ? await getBlogsList({
        cnt: responseBlogsTotalCount.pageInfo.totalCnt,
      })
    : undefined

  const responseWorksTotalCount = await getWorksList({
    cnt: 1,
  })

  const responseWorks = responseWorksTotalCount
    ? await getWorksList({
        cnt: responseWorksTotalCount.pageInfo.totalCnt,
      })
    : undefined

  const responseHobbyTotalCount = await getHobbyList({
    cnt: 1,
  })

  const responseHobby = responseHobbyTotalCount
    ? await getHobbyList({
        cnt: responseHobbyTotalCount.pageInfo.totalCnt,
      })
    : undefined

  if (responseBlogs && responseBlogs.list.length > 0) {
    for (
      let i = 0, iLength = responseBlogs.list.length;
      i < iLength;
      i = i + 1
    ) {
      const info = responseBlogs.list[i]
      const url = {
        ja: routes.blogsDetail.url({
          isFullPath: true,
          locale: 'ja',
          id: String(info.topics_id),
        }),
        en: routes.blogsDetail.url({
          isFullPath: true,
          locale: 'en',
          id: String(info.topics_id),
        }),
      }

      response.push('<item>')
      response.push(`<title>${info.subject}</title>`)
      response.push(`<link>${url.ja}</link>`)
      response.push(`<guid>${url.ja}</guid>`)
      response.push(
        `<description>ブログ「${info.subject}」についての記事です。</description>`,
      )
      response.push(`<pubDate>${new Date(info.ymd).toUTCString()}</pubDate>`)
      response.push('</item>')

      response.push('<item>')
      response.push(`<title>${info.subject_en}</title>`)
      response.push(`<link>${url.en}</link>`)
      response.push(`<guid>${url.en}</guid>`)
      response.push(
        `<description>This is an article about the blog '${info.subject_en}'.</description>`,
      )
      response.push(`<pubDate>${new Date(info.ymd).toUTCString()}</pubDate>`)
      response.push('</item>')
    }
  }

  if (responseWorks && responseWorks.list.length > 0) {
    for (
      let i = 0, iLength = responseWorks.list.length;
      i < iLength;
      i = i + 1
    ) {
      const info = responseWorks.list[i]
      const url = {
        ja: routes.worksDetail.url({
          isFullPath: true,
          locale: 'ja',
          id: String(info.topics_id),
        }),
        en: routes.worksDetail.url({
          isFullPath: true,
          locale: 'en',
          id: String(info.topics_id),
        }),
      }

      response.push('<item>')
      response.push(`<title>${info.subject}</title>`)
      response.push(`<link>${url.ja}</link>`)
      response.push(`<guid>${url.ja}</guid>`)
      response.push(
        `<description>実績「${info.subject}」についての記事です。</description>`,
      )
      response.push(`<pubDate>${new Date(info.ymd).toUTCString()}</pubDate>`)
      response.push('</item>')

      response.push('<item>')
      response.push(`<title>${info.subject_en}</title>`)
      response.push(`<link>${url.en}</link>`)
      response.push(`<guid>${url.en}</guid>`)
      response.push(
        `<description>This is an article about the achievement '${info.subject_en}'.</description>`,
      )
      response.push(`<pubDate>${new Date(info.ymd).toUTCString()}</pubDate>`)
      response.push('</item>')
    }
  }

  if (responseHobby && responseHobby.list.length > 0) {
    for (
      let i = 0, iLength = responseHobby.list.length;
      i < iLength;
      i = i + 1
    ) {
      const info = responseHobby.list[i]
      const url = {
        ja: routes.hobbyDetail.url({
          isFullPath: true,
          locale: 'ja',
          id: String(info.topics_id),
        }),
        en: routes.hobbyDetail.url({
          isFullPath: true,
          locale: 'en',
          id: String(info.topics_id),
        }),
      }

      response.push('<item>')
      response.push(`<title>${info.subject}</title>`)
      response.push(`<link>${url.ja}</link>`)
      response.push(`<guid>${url.ja}</guid>`)
      response.push(
        `<description>趣味「${info.subject}」についての記事です。</description>`,
      )
      response.push(`<pubDate>${new Date(info.ymd).toUTCString()}</pubDate>`)
      response.push('</item>')

      response.push('<item>')
      response.push(`<title>${info.subject_en}</title>`)
      response.push(`<link>${url.en}</link>`)
      response.push(`<guid>${url.en}</guid>`)
      response.push(
        `<description>This is an article about the hobby '${info.subject_en}'.</description>`,
      )
      response.push(`<pubDate>${new Date(info.ymd).toUTCString()}</pubDate>`)
      response.push('</item>')
    }
  }

  response.push('</channel>')
  response.push('</rss>')

  return new NextResponse(response.join(''), {
    status: 200,
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  })
}
