'use client'

import { useSyncExternalStore } from 'react'
import { BODY_METRICS_STORAGE_KEY, getQuizData, QUIZ_STORAGE_KEY, type QuizData } from './diagnosis'

let cache: { key: string; data: QuizData | null } | null = null

function getSnapshot() {
  const key = `${localStorage.getItem(QUIZ_STORAGE_KEY)}|${localStorage.getItem(BODY_METRICS_STORAGE_KEY)}`
  if (!cache || cache.key !== key) cache = { key, data: getQuizData() }
  return cache.data
}

function subscribe(onChange: () => void) {
  window.addEventListener('storage', onChange)
  return () => window.removeEventListener('storage', onChange)
}

export function useQuizData() {
  return useSyncExternalStore(subscribe, getSnapshot, () => null)
}
