import { MetadataRoute } from 'next'
import { SITE_URL } from '@/config/env'

const robots = (): MetadataRoute.Robots => {
  return {
    rules: [
      {
        userAgent: '*',
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}

export default robots
