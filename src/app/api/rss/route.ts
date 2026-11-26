import { NextResponse } from 'next/server'

import { getAllArticles } from '~/apis/fetch/all-articles'
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

  // 英語の項目は、英語で取得した一覧から作る。英語版の無い記事は英語の項目に入らない
  const [ja, en] = await Promise.all([
    getAllArticles('ja'),
    getAllArticles('en'),
  ])

  const feeds = [
    {
      route: routes.blogsDetail,
      ja: { list: ja.blogs, label: 'ブログ' },
      en: { list: en.blogs, label: 'blog' },
    },
    {
      route: routes.worksDetail,
      ja: { list: ja.works, label: '実績' },
      en: { list: en.works, label: 'achievement' },
    },
    {
      route: routes.hobbyDetail,
      ja: { list: ja.hobby, label: '趣味' },
      en: { list: en.hobby, label: 'hobby' },
    },
  ]

  // 種類ごとに、日本語の全件、英語の全件の順に並べる（記事ごとに日英を並べていたのをやめた）
  for (const feed of feeds) {
    for (const info of feed.ja.list) {
      const url = feed.route.url({
        isFullPath: true,
        locale: 'ja',
        id: String(info.topics_id),
      })

      response.push('<item>')
      response.push(`<title>${info.subject}</title>`)
      response.push(`<link>${url}</link>`)
      response.push(`<guid>${url}</guid>`)
      response.push(
        `<description>${feed.ja.label}「${info.subject}」についての記事です。</description>`,
      )
      response.push(`<pubDate>${new Date(info.ymd).toUTCString()}</pubDate>`)
      response.push('</item>')
    }

    for (const info of feed.en.list) {
      const url = feed.route.url({
        isFullPath: true,
        locale: 'en',
        id: String(info.topics_id),
      })

      response.push('<item>')
      response.push(`<title>${info.subject}</title>`)
      response.push(`<link>${url}</link>`)
      response.push(`<guid>${url}</guid>`)
      response.push(
        `<description>This is an article about the ${feed.en.label} '${info.subject}'.</description>`,
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
