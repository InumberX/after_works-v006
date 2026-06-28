import type { MetadataRoute } from 'next'

import { getBlogsList } from '~/apis/fetch/blogs'
import { getHobbyList } from '~/apis/fetch/hobby'
import { getWorksList } from '~/apis/fetch/works'
import { LASTMOD } from '~/config/env'
import { routes } from '~/config/routes'

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

      sitemapEntries.push({
        url: routes.blogsDetail.url({
          isFullPath: true,
          locale: 'ja',
          id: String(info.topics_id),
        }),
        lastModified: info.update_ymdhi,
        priority: 0.5,
      })

      sitemapEntries.push({
        url: routes.blogsDetail.url({
          isFullPath: true,
          locale: 'en',
          id: String(info.topics_id),
        }),
        lastModified: info.update_ymdhi,
        priority: 0.5,
      })
    }
  }

  if (responseWorks && responseWorks.list.length > 0) {
    for (
      let i = 0, iLength = responseWorks.list.length;
      i < iLength;
      i = i + 1
    ) {
      const info = responseWorks.list[i]

      sitemapEntries.push({
        url: routes.worksDetail.url({
          isFullPath: true,
          locale: 'ja',
          id: String(info.topics_id),
        }),
        lastModified: info.update_ymdhi,
        priority: 0.5,
      })

      sitemapEntries.push({
        url: routes.worksDetail.url({
          isFullPath: true,
          locale: 'en',
          id: String(info.topics_id),
        }),
        lastModified: info.update_ymdhi,
        priority: 0.5,
      })
    }
  }

  if (responseHobby && responseHobby.list.length > 0) {
    for (
      let i = 0, iLength = responseHobby.list.length;
      i < iLength;
      i = i + 1
    ) {
      const info = responseHobby.list[i]

      sitemapEntries.push({
        url: routes.hobbyDetail.url({
          isFullPath: true,
          locale: 'ja',
          id: String(info.topics_id),
        }),
        lastModified: info.update_ymdhi,
        priority: 0.5,
      })

      sitemapEntries.push({
        url: routes.hobbyDetail.url({
          isFullPath: true,
          locale: 'en',
          id: String(info.topics_id),
        }),
        lastModified: info.update_ymdhi,
        priority: 0.5,
      })
    }
  }

  return sitemapEntries
}

export default sitemap
