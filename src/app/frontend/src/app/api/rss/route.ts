import { NextResponse } from 'next/server'
import { SITE_NAME, SITE_URL } from '@/config/env'
import { routes } from '@/config/routes'
import { getBlogsInfos } from '@/apis/fetch/blogs'
import { getWorksInfos } from '@/apis/fetch/works'
import { getHobbyInfos } from '@/apis/fetch/hobby'
import { baseDescriptions } from '@/components/common/AppHead'

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

  const responseBlogsTotalCnt = await getBlogsInfos({
    cnt: 1,
  })

  const responseBlogsInfos = responseBlogsTotalCnt
    ? await getBlogsInfos({
        cnt: responseBlogsTotalCnt.pageInfo.totalCnt,
      })
    : undefined

  const responseWorksTotalCnt = await getWorksInfos({
    cnt: 1,
  })

  const responseWorksInfos = responseWorksTotalCnt
    ? await getWorksInfos({
        cnt: responseWorksTotalCnt.pageInfo.totalCnt,
      })
    : undefined

  const responseHobbyTotalCnt = await getHobbyInfos({
    cnt: 1,
  })

  const responseHobbyInfos = responseHobbyTotalCnt
    ? await getHobbyInfos({
        cnt: responseHobbyTotalCnt.pageInfo.totalCnt,
      })
    : undefined

  if (responseBlogsInfos && responseBlogsInfos.list.length > 0) {
    for (
      let i = 0, iLength = responseBlogsInfos.list.length;
      i < iLength;
      i = i + 1
    ) {
      const info = responseBlogsInfos.list[i]
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
        `<description>This is an article about the blog '${info.subject}'.</description>`,
      )
      response.push(`<pubDate>${new Date(info.ymd).toUTCString()}</pubDate>`)
      response.push('</item>')
    }
  }

  if (responseWorksInfos && responseWorksInfos.list.length > 0) {
    for (
      let i = 0, iLength = responseWorksInfos.list.length;
      i < iLength;
      i = i + 1
    ) {
      const info = responseWorksInfos.list[i]
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
        `<description>This is an article about the achievement '${info.subject}'.</description>`,
      )
      response.push(`<pubDate>${new Date(info.ymd).toUTCString()}</pubDate>`)
      response.push('</item>')
    }
  }

  if (responseHobbyInfos && responseHobbyInfos.list.length > 0) {
    for (
      let i = 0, iLength = responseHobbyInfos.list.length;
      i < iLength;
      i = i + 1
    ) {
      const info = responseHobbyInfos.list[i]
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
        `<description>This is an article about the hobby '${info.subject}'.</description>`,
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
