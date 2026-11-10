// Endereço oficial do NEXUS. Todo canonical, sitemap e Open Graph aponta pra cá,
// mesmo quando o código roda em outro domínio (app., testes na Vercel).
export const SITE_URL = 'https://www.zxnexus.com.br'
export const SITE_NAME = 'NEXUS'

export const SEO_TITLE = 'NEXUS: app de hábitos gamificado no estilo Solo Leveling'
export const SEO_DESCRIPTION =
  'Transforme sua rotina num jogo: missões diárias, XP, níveis e ranking, no estilo Solo Leveling. Descubra em 2 minutos o que te trava e receba seu plano.'

/**
 * Só o projeto que serve o domínio oficial entra no Google.
 * Na Vercel, VERCEL_PROJECT_PRODUCTION_URL é o domínio de produção do projeto:
 * aqui (teste) é nexusfunil07-11.vercel.app → fora do Google; no projeto do zxnexus → indexa.
 */
export function isIndexable() {
  if (process.env.SEO_INDEXABLE === 'true') return true
  if (process.env.SEO_INDEXABLE === 'false') return false
  return (process.env.VERCEL_PROJECT_PRODUCTION_URL ?? '').endsWith('zxnexus.com.br') && process.env.VERCEL_ENV === 'production'
}
