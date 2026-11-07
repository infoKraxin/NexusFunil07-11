'use client'

import { useEffect } from 'react'

const CLICK_SRC = '/audio/click.wav'
const CLICK_VOLUME = 1
const POOL_SIZE = 4
const INTERACTIVE_SELECTOR = [
  'button:not(:disabled)',
  'a[href]',
  'summary',
  'label[for]',
  '[role="tab"]',
  '[role="button"]',
  '[role="link"]',
  '[role="menuitem"]',
  '[role="option"]',
  '[role="radio"]',
  '[role="checkbox"]',
  '[role="switch"]',
  'input[type="button"]',
  'input[type="submit"]',
  'input[type="checkbox"]',
  'input[type="radio"]',
  'select',
].join(', ')

// HTMLAudioElement instead of Web Audio: iOS mutes Web Audio when the ringer switch is off,
// which would silence the click while the background music keeps playing.
export function GlobalClickSound() {
  useEffect(() => {
    const pool = Array.from({ length: POOL_SIZE }, () => {
      const audio = new Audio(CLICK_SRC)
      audio.preload = 'auto'
      audio.volume = CLICK_VOLUME
      return audio
    })
    let nextIndex = 0

    const handleClick = (event: MouseEvent) => {
      if (!event.isTrusted) return
      const target = event.target
      if (!(target instanceof Element) || !target.closest(INTERACTIVE_SELECTOR)) return

      const audio = pool[nextIndex]
      nextIndex = (nextIndex + 1) % pool.length
      audio.currentTime = 0
      void audio.play().catch(() => {})
    }

    // Capture phase so the sound still plays when a component stops propagation.
    document.addEventListener('click', handleClick, { capture: true })
    return () => {
      document.removeEventListener('click', handleClick, { capture: true })
      pool.forEach((audio) => audio.pause())
    }
  }, [])

  return null
}
