import type { MetadataRoute } from 'next'
import { GUIDES } from '@/lib/guides'
import { SITE_URL } from '@/lib/site'

// Páginas que devem aparecer no Google. Quiz, diagnóstico e planos ficam de fora (personalizados).
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/guias`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    ...GUIDES.map((g) => ({ url: `${SITE_URL}/guias/${g.slug}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 })),
  ]
}
