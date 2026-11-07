'use client'

// Camada única de tracking do funil (substitui o funnel_events que parou em 28/09).
// Transporte: POST (sendBeacon) para NEXT_PUBLIC_FUNNEL_TRACK_URL.
//  - No repo de produção, apontar para a rota que grava em `funnel_events` no Supabase.
// Tráfego de teste: abrir qualquer página com ?teste=1 marca o navegador e bloqueia o envio
// (?teste=0 desmarca). Em dev, os eventos só vão pro console.

export type FunnelEvent =
  | 'quiz_start'
  | 'question_answer'
  | 'insertion_view'
  | 'quiz_complete'
  | 'analyzing_view'
  | 'diagnosis_view'
  | 'diagnosis_cta'
  | 'solution_view'
  | 'solution_cta'
  | 'pact_view'
  | 'pact_start'
  | 'pact_abort'
  | 'pact_sealed'
  | 'plans_view'
  | 'plan_select'
  | 'checkout'
  | 'exit_offer_view'
  | 'exit_offer_checkout'

const SESSION_KEY = 'nexus_funnel_session'
const TEST_KEY = 'nexus_test_traffic'
const ENDPOINT = process.env.NEXT_PUBLIC_FUNNEL_TRACK_URL

function sessionId() {
  try {
    let id = sessionStorage.getItem(SESSION_KEY)
    if (!id) {
      id = typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : String(Date.now())
      sessionStorage.setItem(SESSION_KEY, id)
    }
    return id
  } catch {
    return 'no-session'
  }
}

function isTestTraffic() {
  try {
    const flag = new URLSearchParams(window.location.search).get('teste')
    if (flag === '1') localStorage.setItem(TEST_KEY, '1')
    if (flag === '0') localStorage.removeItem(TEST_KEY)
    return localStorage.getItem(TEST_KEY) === '1'
  } catch {
    return false
  }
}

function utms() {
  try {
    return JSON.parse(sessionStorage.getItem('nexus_utms') || '{}')
  } catch {
    return {}
  }
}

export function track(event: FunnelEvent, props: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return
  const payload = {
    event,
    session_id: sessionId(),
    path: window.location.pathname,
    host: window.location.host,
    props,
    utms: utms(),
    is_test: isTestTraffic(),
    ts: new Date().toISOString(),
  }
  if (process.env.NODE_ENV !== 'production') console.info('[funnel]', event, props)
  if (!ENDPOINT || payload.is_test) return
  try {
    const body = JSON.stringify(payload)
    if (!navigator.sendBeacon?.(ENDPOINT, new Blob([body], { type: 'application/json' }))) {
      fetch(ENDPOINT, { method: 'POST', body, keepalive: true, headers: { 'Content-Type': 'application/json' } })
    }
  } catch {}
}
