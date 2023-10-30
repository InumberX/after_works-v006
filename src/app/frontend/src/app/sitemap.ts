import { MetadataRoute } from 'next'
import { SITE_URL, LASTMOD } from '@/config/env'
import { routes } from '@/config/routes'
import { getBlogsInfos } from '@/apis/fetch/blogs'
import { getWorksInfos } from '@/apis/fetch/works'
import { getHobbyInfos } from '@/apis/fetch/hobby'

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const sitemapInfos: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}${routes.top.url({})}`,
      lastModified: LASTMOD,
      priority: 1,
    },
    {
      url: `${SITE_URL}${routes.blogs.url({})}`,
      lastModified: LASTMOD,
      priority: 0.5,
    },
    {
      url: `${SITE_URL}${routes.about.url({})}`,
      lastModified: LASTMOD,
      priority: 0.5,
    },
    {
      url: `${SITE_URL}${routes.works.url({})}`,
      lastModified: LASTMOD,
      priority: 0.5,
    },
    {
      url: `${SITE_URL}${routes.hobby.url({})}`,
      lastModified: LASTMOD,
      priority: 0.5,
    },
    {
      url: `${SITE_URL}${routes.contact.url({})}`,
      lastModified: LASTMOD,
      priority: 0.5,
    },
  ]

  const responseBlogsInfos = await getBlogsInfos({
    cnt: 0,
  })

  const responseWorksInfos = await getWorksInfos({
    cnt: 0,
  })

  const responseHobbyInfos = await getHobbyInfos({
    cnt: 0,
  })

  if (responseBlogsInfos && responseBlogsInfos.list.length > 0) {
    for (
      let i = 0, iLength = responseBlogsInfos.list.length;
      i < iLength;
      i = i + 1
    ) {
      const info = responseBlogsInfos.list[i]

      sitemapInfos.push({
        url: `${SITE_URL}${routes.blogsDetail.url({
          id: String(info.topics_id),
        })}`,
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
        url: `${SITE_URL}${routes.worksDetail.url({
          id: String(info.topics_id),
        })}`,
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
        url: `${SITE_URL}${routes.hobbyDetail.url({
          id: String(info.topics_id),
        })}`,
        lastModified: info.update_ymdhi,
        priority: 0.5,
      })
    }
  }

  return sitemapInfos
}

export default sitemap
