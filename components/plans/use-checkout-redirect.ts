'use client'

import { type MouseEvent, useCallback, useEffect, useRef, useState } from 'react'

// UTMify's pixel holds checkout clicks until InitiateCheckout is sent; if that request hangs, the buyer must still reach Cakto.
const FALLBACK_REDIRECT_MS = 3500

export function useCheckoutRedirect() {
  const [redirecting, setRedirecting] = useState(false)
  const fallbackTimer = useRef<number | undefined>(undefined)

  useEffect(() => {
    const cancelFallback = () => window.clearTimeout(fallbackTimer.current)
    const unlockAfterBackNavigation = (event: PageTransitionEvent) => {
      if (event.persisted) setRedirecting(false)
    }
    window.addEventListener('pagehide', cancelFallback)
    window.addEventListener('pageshow', unlockAfterBackNavigation)
    return () => {
      cancelFallback()
      window.removeEventListener('pagehide', cancelFallback)
      window.removeEventListener('pageshow', unlockAfterBackNavigation)
    }
  }, [])

  const startRedirect = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
    const opensElsewhere = event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
    if (opensElsewhere) return

    const link = event.currentTarget
    setRedirecting(true)
    window.clearTimeout(fallbackTimer.current)
    fallbackTimer.current = window.setTimeout(() => {
      window.location.href = link.href
    }, FALLBACK_REDIRECT_MS)
  }, [])

  return { redirecting, startRedirect }
}
