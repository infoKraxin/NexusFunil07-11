'use client'

import { useEffect, useState } from 'react'
import { PURCHASE_NAMES, PURCHASE_PLANS, PURCHASE_TIMES } from './plans-data'

const pick = <T,>(items: T[]) => items[Math.floor(Math.random() * items.length)]

const LAUNCH_KEY = 'nexus_launch_deadline'
const LAUNCH_WINDOW_MS = 30 * 60 * 60 * 1000 // 1d 6h

function nextDeadline() {
  let deadline = 0
  try {
    deadline = Number(localStorage.getItem(LAUNCH_KEY)) || 0
  } catch {}
  if (!deadline || deadline <= Date.now()) {
    deadline = Date.now() + LAUNCH_WINDOW_MS
    try {
      localStorage.setItem(LAUNCH_KEY, String(deadline))
    } catch {}
  }
  return deadline
}

/** Contagem do preço de lançamento: 30h; não reinicia ao recarregar, só quando chega a zero. */
export function useCountdown(_seconds?: number) {
  const [remaining, setRemaining] = useState(LAUNCH_WINDOW_MS)

  useEffect(() => {
    let deadline = nextDeadline()
    const tick = () => {
      let left = deadline - Date.now()
      if (left <= 0) {
        deadline = nextDeadline()
        left = deadline - Date.now()
      }
      setRemaining(left)
    }
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [])

  const total = Math.max(0, Math.floor(remaining / 1000))
  const d = Math.floor(total / 86400)
  const h = String(Math.floor((total % 86400) / 3600)).padStart(2, '0')
  const m = String(Math.floor((total % 3600) / 60)).padStart(2, '0')
  const sec = String(total % 60).padStart(2, '0')
  return d > 0 ? `${d}d ${h}h ${m}m ${sec}s` : `${h}h ${m}m ${sec}s`
}

export function useLiveViewers() {
  const [viewers, setViewers] = useState(0)

  useEffect(() => {
    setViewers(38 + Math.floor(15 * Math.random()))
    const interval = setInterval(
      () => setViewers((v) => Math.max(25, Math.min(65, v + (Math.random() > 0.5 ? 1 : -1)))),
      4000 + 3000 * Math.random(),
    )
    return () => clearInterval(interval)
  }, [])

  return viewers
}

export function usePurchaseToasts() {
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    let lastIndex = -1
    let interval: ReturnType<typeof setInterval> | undefined
    const hideTimers: ReturnType<typeof setTimeout>[] = []

    const show = () => {
      let index = Math.floor(Math.random() * PURCHASE_NAMES.length)
      while (index === lastIndex) index = Math.floor(Math.random() * PURCHASE_NAMES.length)
      lastIndex = index
      setMessage(`${PURCHASE_NAMES[index]} selou o pacto com o ${pick(PURCHASE_PLANS)} ${pick(PURCHASE_TIMES)}`)
      hideTimers.push(setTimeout(() => setMessage(null), 4000))
    }

    const start = setTimeout(() => {
      show()
      interval = setInterval(show, 15000 + 10000 * Math.random())
    }, 8000)

    return () => {
      clearTimeout(start)
      if (interval) clearInterval(interval)
      hideTimers.forEach(clearTimeout)
    }
  }, [])

  return message
}

export function useExitIntent(onExitIntent: () => void, disabled: boolean) {
  useEffect(() => {
    if (disabled) return
    const handlePopState = () => {
      onExitIntent()
      window.history.pushState(null, '', window.location.href)
    }
    window.history.pushState(null, '', window.location.href)
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [onExitIntent, disabled])
}
