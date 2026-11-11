// Endereço oficial do NEXUS. Todo canonical, sitemap e Open Graph aponta pra cá,
// mesmo quando o código roda em outro domínio (app., testes na Vercel).
export const SITE_URL = 'https://www.zxnexus.com.br'
export const SITE_NAME = 'NEXUS'

export const SEO_TITLE = 'NEXUS: app de hábitos gamificado no estilo Solo Leveling'
export const SEO_DESCRIPTION =
  'Transforme sua rotina num jogo: missões diárias, XP, níveis e ranking, no estilo Solo Leveling. Descubra em 2 minutos o que te trava e receba seu plano.'

/**
 * O site entra no Google. Os endereços *.vercel.app do mesmo projeto ficam de fora
 * pelo cabeçalho X-Robots-Tag em next.config.mjs (evita conteúdo duplicado).
 */
export function isIndexable() {
  return true
}
