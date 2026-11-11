import type { MetadataRoute } from 'next'
import { isIndexable, SITE_URL } from '@/lib/site'

const PRIVATE = ['/onboarding/', '/api/']
const AI_BOTS = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'bingbot']

export default function robots(): MetadataRoute.Robots {
  if (!isIndexable()) return { rules: { userAgent: '*', disallow: '/' } }
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: PRIVATE },
      // Robôs de IA liberados de forma explícita (ChatGPT, Claude, Perplexity, Gemini, Copilot)
      { userAgent: AI_BOTS, allow: '/', disallow: PRIVATE },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
