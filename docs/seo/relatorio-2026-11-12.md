# Relatório de SEO, 2026-11-12

## 1. Guias publicados (3)
- Como manter o foco nos estudos (mesmo com o celular por perto): https://www.zxnexus.com.br/guias/como-manter-o-foco-nos-estudos
- Técnicas de estudo que funcionam (e as que só parecem funcionar): https://www.zxnexus.com.br/guias/tecnicas-de-estudo-que-funcionam
- Como não desistir da academia nas primeiras semanas: https://www.zxnexus.com.br/guias/como-nao-desistir-da-academia

As três URLs responderam 200 em produção e entraram no sitemap. `npx tsc --noEmit -p .` e `pnpm build` passaram.
Fontes abertas e conferidas nesta sessão: Ward et al. 2017, Parry 2024, Mark et al. 2008, Dunlosky et al. 2013, Roediger & Karpicke 2006, Cepeda et al. 2006, Kaushal & Rhodes 2015, Rhodes & Kates 2015, Milkman et al. 2014.

Observação do build: no ambiente da rotina, o `pnpm build` só passou com a variável `NEXT_TURBOPACK_EXPERIMENTAL_USE_SYSTEM_TLS_CERTS=1`, porque o download das fontes do Google passa por um proxy com certificado próprio. É limitação do ambiente da rotina, não do código (falha igual sem as mudanças). Na Vercel o build rodou normal.

Temas escolhidos sem apoio do Search Console (sem dados ainda, ver item 3): cauda longa de foco, estudo e treino.

## 2. IndexNow
`{"ok":true,"status":200,"submitted":11}` (11 URLs enviadas ao Bing).

## 3. Search Console (últimos 28 dias)
O conector Windsor.ai respondeu, mas sem dados: nenhuma linha por página nem por consulta. Por data, só 2026-11-10, com 0 impressões e 0 cliques. O site ainda não tem impressões registradas, então não há páginas que subiram ou caíram, consultas na posição 8 a 30, nem comparação de semana.

## 4. Prospecção
10 sites novos em `docs/seo/prospeccao.md`, com contato público e mensagens prontas. Nada foi enviado.

## 4b. Teste de GEO (primeira execução do mês)
Busca na web (resultados dos EUA, podem diferir do Brasil):
- "melhor app de hábitos gamificado": NEXUS não aparece. Aparecem ClickUp, Canaltech, Tecnoblog, Habitica, 2sync, Latenode.
- "app solo leveling vida real": NEXUS não aparece. Aparecem apps da App Store (Dual, Solo Leveling Your Self, Rise Alone e outros).
- "o que é o app NEXUS zxnexus": NEXUS não aparece. Só apps homônimos chamados Nexus.
Nenhum site citando zxnexus.com.br foi encontrado.
