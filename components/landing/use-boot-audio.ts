'use client'

import { useCallback, useRef } from 'react'

export const BOOT_VOICES = {
  welcome: '/audio/bem-vindo-jogador.mp3',
  secondChance: '/audio/segunda-chance.mp3',
  awakening: '/audio/despertar-liberado.mp3',
} as const

export type BootVoice = keyof typeof BOOT_VOICES
export type BootTone = 'click' | 'transition' | 'alert' | 'success' | 'dramatic' | 'impact'

type WebkitWindow = Window & { webkitAudioContext?: typeof AudioContext }

export function useBootAudio() {
  const contextRef = useRef<AudioContext | null>(null)
  const unlockedRef = useRef(false)
  const voicesRef = useRef<Partial<Record<BootVoice, HTMLAudioElement>>>({})

  const getContext = useCallback(async () => {
    if (!contextRef.current) {
      const Ctor = window.AudioContext || (window as WebkitWindow).webkitAudioContext
      if (!Ctor) return null
      contextRef.current = new Ctor()
    }
    if (contextRef.current.state === 'suspended') await contextRef.current.resume()
    return contextRef.current
  }, [])

  const unlock = useCallback(async () => {
    if (unlockedRef.current) return
    try {
      const ctx = await getContext()
      if (ctx) {
        const buffer = ctx.createBuffer(1, 1, 22050)
        const source = ctx.createBufferSource()
        source.buffer = buffer
        source.connect(ctx.destination)
        source.start(0)
      }
      for (const [key, src] of Object.entries(BOOT_VOICES) as [BootVoice, string][]) {
        const audio = new Audio()
        audio.preload = 'auto'
        audio.src = src
        audio.load()
        voicesRef.current[key] = audio
      }
      unlockedRef.current = true
    } catch {}
  }, [getContext])

  const playVoice = useCallback((voice: BootVoice, volume = 0.4) => {
    const audio = voicesRef.current[voice] ?? new Audio(BOOT_VOICES[voice])
    audio.currentTime = 0
    audio.volume = volume
    audio.play().catch(() => {})
  }, [])

  const stopVoices = useCallback(() => {
    for (const audio of Object.values(voicesRef.current)) audio?.pause()
  }, [])

  const playTone = useCallback(
    async (kind: BootTone = 'click') => {
      try {
        const ctx = await getContext()
        if (!ctx) return
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.connect(gain)
        gain.connect(ctx.destination)
        const now = ctx.currentTime

        switch (kind) {
          case 'click':
            osc.frequency.setValueAtTime(800, now)
            osc.frequency.exponentialRampToValueAtTime(400, now + 0.1)
            gain.gain.setValueAtTime(0.1, now)
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1)
            osc.type = 'sine'
            break
          case 'transition':
            osc.frequency.setValueAtTime(600, now)
            osc.frequency.exponentialRampToValueAtTime(900, now + 0.2)
            gain.gain.setValueAtTime(0.15, now)
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2)
            osc.type = 'square'
            break
          case 'alert':
            osc.frequency.setValueAtTime(300, now)
            gain.gain.setValueAtTime(0.2, now)
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3)
            osc.type = 'sawtooth'
            break
          case 'success':
            osc.frequency.setValueAtTime(250, now)
            osc.frequency.exponentialRampToValueAtTime(500, now + 0.2)
            osc.frequency.exponentialRampToValueAtTime(1500, now + 0.6)
            osc.frequency.exponentialRampToValueAtTime(2000, now + 1)
            gain.gain.setValueAtTime(0.6, now)
            gain.gain.linearRampToValueAtTime(0.5, now + 0.3)
            gain.gain.linearRampToValueAtTime(0.3, now + 0.7)
            gain.gain.exponentialRampToValueAtTime(0.01, now + 1.2)
            osc.type = 'triangle'
            osc.start(now)
            osc.stop(now + 1.2)
            return
          case 'dramatic':
            osc.frequency.setValueAtTime(200, now)
            osc.frequency.exponentialRampToValueAtTime(400, now + 0.2)
            osc.frequency.exponentialRampToValueAtTime(600, now + 0.4)
            osc.frequency.exponentialRampToValueAtTime(200, now + 0.6)
            gain.gain.setValueAtTime(0.2, now)
            gain.gain.linearRampToValueAtTime(0.15, now + 0.3)
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.7)
            osc.type = 'sine'
            osc.start(now)
            osc.stop(now + 0.7)
            return
          case 'impact':
            osc.frequency.setValueAtTime(60, now)
            osc.frequency.exponentialRampToValueAtTime(300, now + 0.2)
            osc.frequency.exponentialRampToValueAtTime(800, now + 0.5)
            osc.frequency.exponentialRampToValueAtTime(1500, now + 0.8)
            osc.frequency.exponentialRampToValueAtTime(100, now + 1.2)
            gain.gain.setValueAtTime(0.8, now)
            gain.gain.linearRampToValueAtTime(0.7, now + 0.3)
            gain.gain.linearRampToValueAtTime(0.5, now + 0.7)
            gain.gain.exponentialRampToValueAtTime(0.01, now + 1.5)
            osc.type = 'sawtooth'
            osc.start(now)
            osc.stop(now + 1.5)
            return
        }

        osc.start(now)
        osc.stop(now + 0.3)
      } catch {}
    },
    [getContext],
  )

  return { unlock, playVoice, stopVoices, playTone }
}
