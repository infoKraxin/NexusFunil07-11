import { NextResponse } from 'next/server'
import { GUIDES } from '@/lib/guides'
import { SITE_URL } from '@/lib/site'

// IndexNow: avisa o Bing (e quem usa o índice dele, como a busca do ChatGPT) que as páginas mudaram.
// Chamar depois de publicar conteúdo novo: GET /api/indexnow?k=<chave>
// A chave é pública por definição do protocolo (fica em /<chave>.txt); o parâmetro só evita disparo acidental.
const KEY = '74f281caf410d7946503a4a193095ae0'

export async function GET(request: Request) {
  if (new URL(request.url).searchParams.get('k') !== KEY) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }
  const urlList = [`${SITE_URL}/`, `${SITE_URL}/guias`, ...GUIDES.map((g) => `${SITE_URL}/guias/${g.slug}`)]
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: new URL(SITE_URL).host, key: KEY, keyLocation: `${SITE_URL}/${KEY}.txt`, urlList }),
  })
  return NextResponse.json({ ok: res.ok, status: res.status, submitted: urlList.length })
}
