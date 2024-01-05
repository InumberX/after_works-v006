import { MetadataRoute } from 'next'
import { LASTMOD } from '@/config/env'
import { routes } from '@/config/routes'
import { getBlogsInfos } from '@/apis/fetch/blogs'
import { getWorksInfos } from '@/apis/fetch/works'
import { getHobbyInfos } from '@/apis/fetch/hobby'

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const sitemapInfos: MetadataRoute.Sitemap = [
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

      sitemapInfos.push({
        url: routes.blogsDetail.url({
          isFullPath: true,
          locale: 'ja',
          id: String(info.topics_id),
        }),
        lastModified: info.update_ymdhi,
        priority: 0.5,
      })

      sitemapInfos.push({
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

  if (responseWorksInfos && responseWorksInfos.list.length > 0) {
    for (
      let i = 0, iLength = responseWorksInfos.list.length;
      i < iLength;
      i = i + 1
    ) {
      const info = responseWorksInfos.list[i]

      sitemapInfos.push({
        url: routes.worksDetail.url({
          isFullPath: true,
          locale: 'ja',
          id: String(info.topics_id),
        }),
        lastModified: info.update_ymdhi,
        priority: 0.5,
      })

      sitemapInfos.push({
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

  if (responseHobbyInfos && responseHobbyInfos.list.length > 0) {
    for (
      let i = 0, iLength = responseHobbyInfos.list.length;
      i < iLength;
      i = i + 1
    ) {
      const info = responseHobbyInfos.list[i]

      sitemapInfos.push({
        url: routes.hobbyDetail.url({
          isFullPath: true,
          locale: 'ja',
          id: String(info.topics_id),
        }),
        lastModified: info.update_ymdhi,
        priority: 0.5,
      })

      sitemapInfos.push({
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

  return sitemapInfos
}

export default sitemap
