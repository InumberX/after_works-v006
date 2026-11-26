import type { MetadataRoute } from 'next'

import { getAllArticles } from '~/apis/fetch/all-articles'
import { LASTMOD } from '~/config/env'
import { routes } from '~/config/routes'
import { LOCALES } from '~/consts/locale'

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const sitemapEntries: MetadataRoute.Sitemap = [
    {
      url: routes.home.url({
        isFullPath: true,
        locale: 'ja',
      }),
      lastModified: LASTMOD,
      priority: 1,
    },
    {
      url: routes.home.url({
        isFullPath: true,
        locale: 'en',
      }),
      lastModified: LASTMOD,
      priority: 1,
    },
    {
      url: routes.blogs.url({
        isFullPath: true,
        locale: 'ja',
      }),
      lastModified: LASTMOD,
      priority: 0.5,
    },
    {
      url: routes.blogs.url({
        isFullPath: true,
        locale: 'en',
      }),
      lastModified: LASTMOD,
      priority: 0.5,
    },
    {
      url: routes.about.url({
        isFullPath: true,
        locale: 'ja',
      }),
      lastModified: LASTMOD,
      priority: 0.5,
    },
    {
      url: routes.about.url({
        isFullPath: true,
        locale: 'en',
      }),
      lastModified: LASTMOD,
      priority: 0.5,
    },
    {
      url: routes.works.url({
        isFullPath: true,
        locale: 'ja',
      }),
      lastModified: LASTMOD,
      priority: 0.5,
    },
    {
      url: routes.works.url({
        isFullPath: true,
        locale: 'en',
      }),
      lastModified: LASTMOD,
      priority: 0.5,
    },
    {
      url: routes.hobby.url({
        isFullPath: true,
        locale: 'ja',
      }),
      lastModified: LASTMOD,
      priority: 0.5,
    },
    {
      url: routes.hobby.url({
        isFullPath: true,
        locale: 'en',
      }),
      lastModified: LASTMOD,
      priority: 0.5,
    },
    {
      url: routes.contact.url({
        isFullPath: true,
        locale: 'ja',
      }),
      lastModified: LASTMOD,
      priority: 0.5,
    },
    {
      url: routes.contact.url({
        isFullPath: true,
        locale: 'en',
      }),
      lastModified: LASTMOD,
      priority: 0.5,
    },
  ]

  // 詳細ページは言語ごとに一覧を取得し、その言語の版がある記事だけを載せる
  const articles = await Promise.all(
    LOCALES.map(async (locale) => ({
      locale,
      ...(await getAllArticles(locale)),
    })),
  )

  for (const { locale, blogs, works, hobby } of articles) {
    const details = [
      { route: routes.blogsDetail, list: blogs },
      { route: routes.worksDetail, list: works },
      { route: routes.hobbyDetail, list: hobby },
    ]

    for (const { route, list } of details) {
      for (const info of list) {
        sitemapEntries.push({
          url: route.url({
            isFullPath: true,
            locale,
            id: String(info.topics_id),
          }),
          lastModified: info.update_ymdhi,
          priority: 0.5,
        })
      }
    }
  }

  return sitemapEntries
}

export default sitemap
