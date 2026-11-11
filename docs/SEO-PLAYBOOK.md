# Playbook de SEO do NEXUS (rotina semanal)

Site: https://www.zxnexus.com.br — repo `infoKraxin/NexusFunil07-11`, branch `main`.
Push na `main` publica sozinho na Vercel (integração com o GitHub). Não precisa de CLI.

## 1. Publicar 3 guias novos
- Os guias ficam em `lib/guides.ts` (array `GUIDES`). Cada item novo vira a página `/guias/<slug>`,
  entra no sitemap e na página `/guias` automaticamente. Não mexa em mais nenhum arquivo.
- Escolha de tema: buscas específicas, de cauda longa e pouca concorrência, em português do Brasil,
  ligadas a hábitos, disciplina, procrastinação, foco, rotina, estudo, treino, gamificação e Solo Leveling.
  Prefira o que o Search Console mostrar com impressões e posição entre 8 e 30 (ver item 3).
  Nunca repita um tema que já existe em `GUIDES`.
- Formato: copie a estrutura dos guias existentes (seoTitle até ~60 caracteres, description até ~155,
  h1, lead, midCta, 4 a 5 seções, 2 a 3 perguntas no faq, sources, related com 2 slugs existentes, short).
- Regras de conteúdo (obrigatórias):
  - Só fatos com fonte verificada nesta sessão (abra a fonte; DOI ou página oficial). Sem número inventado.
  - Nada de promessa de resultado, nada de saúde/diagnóstico médico, nada de renda.
  - Não reproduzir trechos de obras (mangá, anime, livros). Solo Leveling: só descrever a ideia; "inspirado em", nunca "oficial".
  - Sobre o NEXUS, só o que é verdade: diagnóstico grátis de 2 minutos, missões diárias, XP, níveis, sequência,
    ranking, duelos, arena, módulos (treino, estudo, foco, finanças), pagamento único, garantia de 7 dias.
  - Tom direto, "você", sem travessão longo, sem emoji.
- Não tocar em scripts de rastreamento (pixel, Utmify), no funil (`/onboarding`), nos planos, nem no layout.
- Antes do push: `pnpm install` (se preciso), `npx tsc --noEmit -p .` e `pnpm build` têm que passar.
- Commit na `main` e push. Espere o deploy e confirme que cada URL nova responde 200 em produção.

## 2. Avisar o Bing (IndexNow)
Depois que as URLs novas estiverem no ar:
`GET https://www.zxnexus.com.br/api/indexnow?k=74f281caf410d7946503a4a193095ae0` → esperado `{"ok":true,...}`.

## 3. Relatório de posições
Conector Windsor.ai `searchconsole`, conta `https://www.zxnexus.com.br/`, últimos 28 dias:
impressões, cliques, CTR e posição por página e por consulta. Destacar: páginas que subiram ou caíram,
consultas na posição 8 a 30 (candidatas a novo guia ou a reforço), e o total da semana contra a anterior.
Se o conector não responder, diga isso no relatório e siga.

## 4. Prospecção de links (só levantar, nunca enviar)
Achar 10 sites novos por semana que possam citar o NEXUS: listas de "melhores apps de hábitos/produtividade",
blogs de produtividade e de anime, diretórios de apps. Para cada um: URL, por que serve, contato público
(página de contato ou e-mail publicado) e uma mensagem de abordagem pronta, curta, em nome do Jorge.
Guardar o histórico em `docs/seo/prospeccao.md` (não repetir sites já listados). Não enviar mensagem,
não preencher formulário, não criar conta, não comentar em lugar nenhum.

## 4b. Teste de GEO (só na primeira execução de cada mês)
Com busca na web, pesquisar "melhor app de hábitos gamificado", "app solo leveling vida real" e "o que é o app NEXUS zxnexus"
e registrar no relatório se o NEXUS (zxnexus.com.br) aparece nos resultados e em quais sites é citado.
Os fatos oficiais do app ficam em `lib/about.ts` (página /sobre e /llms.txt). Só altere se um fato mudar de verdade.

## 5. Entrega
Mensagem final curta em português: guias publicados (título + URL), resultado do IndexNow,
números da semana e a lista de prospecção. Registrar o resumo em `docs/seo/relatorio-AAAA-MM-DD.md`.
