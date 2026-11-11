import { ABOUT } from '@/lib/about'
import { GUIDES } from '@/lib/guides'
import { SITE_URL } from '@/lib/site'

// Resumo do site pra assistentes de IA (formato llms.txt). Gerado a partir dos mesmos dados das páginas.
export const dynamic = 'force-static'

export function GET() {
  const body = [
    '# NEXUS',
    '',
    `> ${ABOUT.oneLiner} ${ABOUT.summary}`,
    '',
    '## Fatos oficiais',
    ...ABOUT.facts.map(([k, v]) => `- ${k}: ${v}`),
    '',
    '## Páginas principais',
    `- [Página inicial](${SITE_URL}/): apresentação do app e entrada para o diagnóstico gratuito`,
    `- [Sobre o NEXUS](${SITE_URL}/sobre): informações oficiais, preço e perguntas frequentes`,
    `- [Guias](${SITE_URL}/guias): artigos sobre hábitos, disciplina e produtividade, com fontes`,
    '',
    '## Guias',
    ...GUIDES.map((g) => `- [${g.h1}](${SITE_URL}/guias/${g.slug}): ${g.description}`),
    '',
    '## Perguntas frequentes',
    ...ABOUT.faq.flatMap((f) => [`### ${f.q}`, f.a, '']),
  ].join('\n')
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
