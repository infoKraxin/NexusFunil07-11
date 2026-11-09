'use client'

import { useEffect, useState } from 'react'
import { PURCHASE_NAMES, PURCHASE_PLANS, PURCHASE_TIMES } from './plans-data'

const pick = <T,>(items: T[]) => items[Math.floor(Math.random() * items.length)]

export function useCountdown(seconds: number) {
  const [remaining, setRemaining] = useState(seconds)

  useEffect(() => {
    const interval = setInterval(() => setRemaining((s) => (s <= 1 ? 0 : s - 1)), 1000)
    return () => clearInterval(interval)
  }, [])

  const minutes = String(Math.floor(remaining / 60)).padStart(2, '0')
  const secs = String(remaining % 60).padStart(2, '0')
  return `${minutes}:${secs}`
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
