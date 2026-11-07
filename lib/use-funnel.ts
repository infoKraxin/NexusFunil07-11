'use client'

import { useMemo, useSyncExternalStore } from 'react'
import { derive, type FunnelState, readFunnel, subscribeFunnel } from './funnel'

const EMPTY: FunnelState = { answers: {} }

export function useFunnelState() {
  return useSyncExternalStore(subscribeFunnel, readFunnel, () => EMPTY)
}

/** Estado derivado. `ready` = false no SSR / antes de ler o localStorage. */
export function useFunnel() {
  const state = useFunnelState()
  const ready = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )
  const derived = useMemo(() => derive(state), [state])
  return { ...derived, ready, state }
}
