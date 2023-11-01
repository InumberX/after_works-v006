import { NextResponse } from 'next/server'
import { SITE_NAME, SITE_URL } from '@/config/env'
import { routes } from '@/config/routes'
import { getBlogsInfos } from '@/apis/fetch/blogs'
import { getWorksInfos } from '@/apis/fetch/works'
import { getHobbyInfos } from '@/apis/fetch/hobby'
import { baseDescription } from '@/components/common/AppHead'

export const GET = async () => {
  const response: string[] = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    '<channel>',
    `<title>${SITE_NAME}</title>`,
    `<link>${SITE_URL}</link>`,
    `<description>${baseDescription}</description>`,
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

      response.push('<item>')
      response.push(`<title>${info.subject}</title>`)
      response.push(
        `<link>${SITE_URL}${routes.blogsDetail.url({
          id: String(info.topics_id),
        })}</link>`,
      )
      response.push(
        `<description>ブログ「${info.subject}」についての記事です。</description>`,
      )
      response.push(`<pubDate>${info.inst_ymdhi}</pubDate>`)
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

      response.push('<item>')
      response.push(`<title>${info.subject}</title>`)
      response.push(
        `<link>${SITE_URL}${routes.worksDetail.url({
          id: String(info.topics_id),
        })}</link>`,
      )
      response.push(
        `<description>実績「${info.subject}」についての記事です。</description>`,
      )
      response.push(`<pubDate>${info.inst_ymdhi}</pubDate>`)
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

      response.push('<item>')
      response.push(`<title>${info.subject}</title>`)
      response.push(
        `<link>${SITE_URL}${routes.hobbyDetail.url({
          id: String(info.topics_id),
        })}</link>`,
      )
      response.push(
        `<description>趣味「${info.subject}」についての記事です。</description>`,
      )
      response.push(`<pubDate>${info.inst_ymdhi}</pubDate>`)
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
