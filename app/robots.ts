import type { MetadataRoute } from 'next'
import { isIndexable, SITE_URL } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  if (!isIndexable()) return { rules: { userAgent: '*', disallow: '/' } }
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/onboarding/', '/api/'] },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
