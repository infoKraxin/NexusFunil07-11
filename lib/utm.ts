const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid'] as const
const STORAGE_KEY = 'nexus_utms'

type UtmParams = Partial<Record<(typeof UTM_KEYS)[number], string>>

export function captureUtmsFromUrl() {
  if (typeof window === 'undefined') return
  const params = new URLSearchParams(window.location.search)
  const found: UtmParams = {}
  for (const key of UTM_KEYS) {
    const value = params.get(key)
    if (value) found[key] = value
  }
  if (Object.keys(found).length > 0) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(found))
  }
}

export function getCurrentUtms(): UtmParams {
  if (typeof window === 'undefined') return {}
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY)
    return stored ? (JSON.parse(stored) as UtmParams) : {}
  } catch {
    return {}
  }
}

export function withUtms(url: string) {
  const utms = getCurrentUtms()
  if (Object.keys(utms).length === 0) return url
  try {
    const target = new URL(url, window.location.origin)
    for (const [key, value] of Object.entries(utms)) {
      if (value && !target.searchParams.has(key)) target.searchParams.set(key, value)
    }
    return target.origin === window.location.origin
      ? `${target.pathname}${target.search}${target.hash}`
      : target.toString()
  } catch {
    return url
  }
}
