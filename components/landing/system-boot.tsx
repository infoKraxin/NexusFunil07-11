'use client'

import { useEffect, useRef, useState } from 'react'
import { useBackgroundMusic } from '@/components/nexus/background-music-provider'
import { useBootAudio } from './use-boot-audio'

type BootPhase = 'idle' | 'loading' | 'alert' | 'found' | 'welcome' | 'secondChance' | 'awakening' | 'complete'

const BOOT_LOGS = ['CHECKING_BIOMETRICS...', 'SYNCING_WITH_DATABASE...', 'ESTABLISHING_SECURE_CONNECTION...', '']

const FOUND_LINE_1 = 'Jogador encontrado.'
const FOUND_LINE_2 = 'Nível atual: Iniciado.'
const FOUND_LINE_3 = 'Compatibilidade: '

const GREEN_GLOW = 'rgba(34, 197, 94'

const HEX_PATTERN = `
  linear-gradient(30deg, transparent 12%, ${GREEN_GLOW}, 0.15) 12.5%, ${GREEN_GLOW}, 0.15) 13%, transparent 13.5%),
  linear-gradient(150deg, transparent 12%, ${GREEN_GLOW}, 0.15) 12.5%, ${GREEN_GLOW}, 0.15) 13%, transparent 13.5%),
  linear-gradient(30deg, transparent 37%, ${GREEN_GLOW}, 0.15) 37.5%, ${GREEN_GLOW}, 0.15) 38%, transparent 38.5%),
  linear-gradient(150deg, transparent 37%, ${GREEN_GLOW}, 0.15) 37.5%, ${GREEN_GLOW}, 0.15) 38%, transparent 38.5%)
`

type SystemBootProps = {
  onComplete: () => void
}

export function SystemBoot({ onComplete }: SystemBootProps) {
  const { startMusic } = useBackgroundMusic()
  const { unlock, playVoice, stopVoices, playTone } = useBootAudio()

  const [phase, setPhase] = useState<BootPhase>('idle')
  const [progress, setProgress] = useState(0)
  const [logs, setLogs] = useState<string[]>([])
  const [line1, setLine1] = useState('')
  const [line2, setLine2] = useState('')
  const [line3, setLine3] = useState('')
  const [compatibility, setCompatibility] = useState(0)
  const [fadingOut, setFadingOut] = useState(false)
  const finishTimerRef = useRef<number | null>(null)

  const isSkippable = phase !== 'idle' && phase !== 'complete'

  const finish = (delay: number) => {
    setFadingOut(true)
    finishTimerRef.current = window.setTimeout(() => {
      setPhase('complete')
      onComplete()
    }, delay)
  }

  const handleStart = async () => {
    await unlock()
    setPhase('loading')
    startMusic()
  }

  const handleSkip = () => {
    if (!isSkippable || fadingOut) return
    stopVoices()
    finish(300)
  }

  useEffect(() => {
    return () => {
      if (finishTimerRef.current) window.clearTimeout(finishTimerRef.current)
    }
  }, [])

  useEffect(() => {
    if (phase !== 'loading') return
    let logIndex = 0
    let value = 0
    let alertTimer: number | undefined

    const logInterval = window.setInterval(() => {
      if (logIndex < BOOT_LOGS.length) {
        const next = BOOT_LOGS[logIndex]
        setLogs((prev) => [...prev, next].slice(-5))
        playTone('click')
        logIndex++
      }
    }, 1000)

    const progressInterval = window.setInterval(() => {
      value += 1
      setProgress(value)
      if (value >= 100) {
        window.clearInterval(progressInterval)
        window.clearInterval(logInterval)
        alertTimer = window.setTimeout(() => {
          setPhase('alert')
          playTone('alert')
        }, 800)
      }
    }, 40)

    return () => {
      window.clearInterval(logInterval)
      window.clearInterval(progressInterval)
      if (alertTimer) window.clearTimeout(alertTimer)
    }
  }, [phase, playTone])

  useEffect(() => {
    if (phase !== 'alert') return
    const timer = window.setTimeout(() => {
      setPhase('found')
      playTone('transition')
    }, 2000)
    return () => window.clearTimeout(timer)
  }, [phase, playTone])

  useEffect(() => {
    if (phase !== 'found') return
    let cancelled = false
    const intervals: number[] = []
    const timers: number[] = []

    const typeLine = (text: string, setter: (value: string) => void) =>
      new Promise<void>((resolve) => {
        let index = 0
        setter('')
        const id = window.setInterval(() => {
          if (cancelled) return window.clearInterval(id)
          if (index < text.length) {
            index++
            setter(text.slice(0, index))
            playTone('click')
          } else {
            window.clearInterval(id)
            timers.push(window.setTimeout(resolve, 300))
          }
        }, 40)
        intervals.push(id)
      })

    setCompatibility(0)
    ;(async () => {
      await typeLine(FOUND_LINE_1, setLine1)
      if (cancelled) return
      await typeLine(FOUND_LINE_2, setLine2)
      if (cancelled) return
      await typeLine(FOUND_LINE_3, setLine3)
      if (cancelled) return

      let value = 0
      const counter = window.setInterval(() => {
        if (value <= 99.2) {
          setCompatibility(Math.min(value, 99.2))
          value += 1.5
        } else {
          window.clearInterval(counter)
        }
      }, 20)
      intervals.push(counter)
      timers.push(window.setTimeout(() => setPhase('welcome'), 1820))
    })()

    return () => {
      cancelled = true
      intervals.forEach((id) => window.clearInterval(id))
      timers.forEach((id) => window.clearTimeout(id))
    }
  }, [phase, playTone])

  useEffect(() => {
    if (phase === 'welcome') {
      playVoice('welcome')
      const timer = window.setTimeout(() => setPhase('secondChance'), 3000)
      return () => window.clearTimeout(timer)
    }
    if (phase === 'secondChance') {
      playVoice('secondChance')
      const timer = window.setTimeout(() => setPhase('awakening'), 3000)
      return () => window.clearTimeout(timer)
    }
    if (phase === 'awakening') {
      playVoice('awakening')
      const timer = window.setTimeout(() => finish(1000), 3000)
      return () => window.clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, playVoice])

  return (
    <div
      className={`fixed inset-0 bg-black overflow-hidden transition-opacity duration-1000 ${isSkippable ? 'cursor-pointer' : ''} ${fadingOut ? 'opacity-0' : 'opacity-100'}`}
      style={{ zIndex: 9999 }}
      onClick={isSkippable ? handleSkip : undefined}
      role={isSkippable ? 'button' : undefined}
      aria-label={isSkippable ? 'Clique para pular a inicialização' : undefined}
    >
      <div className="absolute inset-0 opacity-20" aria-hidden="true">
        <div className="absolute inset-0" style={{ backgroundImage: HEX_PATTERN, backgroundSize: '70px 120px' }} />
      </div>

      <div className="absolute inset-0 overflow-hidden opacity-30" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={`h-${i}`}
            className="absolute h-px w-full"
            style={{
              top: `${20 + 20 * i}%`,
              background: `linear-gradient(90deg, ${GREEN_GLOW}, 0) 0%, ${GREEN_GLOW}, 0.8) 50%, ${GREEN_GLOW}, 0) 100%)`,
              boxShadow: `0 0 8px ${GREEN_GLOW}, 0.8)`,
              animation: `slide-right ${8 + 2 * i}s linear infinite`,
              animationDelay: `${1.5 * i}s`,
            }}
          />
        ))}
        {[0, 1, 2, 3].map((i) => (
          <div
            key={`v-${i}`}
            className="absolute w-px h-full"
            style={{
              left: `${15 + 25 * i}%`,
              background: `linear-gradient(180deg, ${GREEN_GLOW}, 0) 0%, ${GREEN_GLOW}, 0.6) 50%, ${GREEN_GLOW}, 0) 100%)`,
              boxShadow: `0 0 8px ${GREEN_GLOW}, 0.6)`,
              animation: `slide-down ${10 + 2 * i}s linear infinite`,
              animationDelay: `${2 * i}s`,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute w-full h-px bg-gradient-to-r from-transparent via-green-400/30 to-transparent"
          style={{ animation: 'scanline 8s linear infinite', boxShadow: `0 0 20px ${GREEN_GLOW}, 0.5)` }}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/30 to-black/80" aria-hidden="true" />

      <div
        className="relative h-full flex items-center justify-center p-6"
        style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
      >
        {phase === 'idle' && (
          <div id="main-content" tabIndex={-1} className="text-center flex flex-col gap-16 animate-zoom-in-visible">
            <div className="flex justify-center">
              <div className="relative w-32 h-32">
                <div
                  className="absolute inset-0 rounded-full border-2 border-green-400 animate-pulse-slow"
                  style={{ boxShadow: `0 0 40px ${GREEN_GLOW}, 1), inset 0 0 30px ${GREEN_GLOW}, 0.5)` }}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h1
                className="text-2xl font-mono text-green-400 tracking-[0.3em]"
                style={{ textShadow: `0 0 20px ${GREEN_GLOW}, 0.8)` }}
              >
                INICIAR SISTEMA
              </h1>
              <p className="text-xs text-green-400/70 tracking-wide">(Toque Para Conectar)</p>
            </div>
            <button
              type="button"
              onClick={handleStart}
              className="absolute inset-0 cursor-pointer opacity-0"
              aria-label="Iniciar Sistema"
            />
            <p className="text-green-400/60 text-xs tracking-wide flex items-center justify-center gap-2">
              PARA UMA MELHOR EXPERIÊNCIA, AUMENTE O VOLUME.
            </p>
          </div>
        )}

        {phase === 'loading' && (
          <div className="w-full max-w-3xl px-8">
            <div className="relative mb-12">
              <div className="font-mono text-sm text-green-400 flex flex-col gap-2">
                {logs.map((log, i) => (
                  <div
                    key={`${log}-${i}`}
                    className="animate-fade-in"
                    style={{ textShadow: `0 0 20px ${GREEN_GLOW}, 1), 0 0 30px ${GREEN_GLOW}, 0.5)` }}
                  >
                    {'>'} {log}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center font-mono">
                <span
                  className="text-green-400 tracking-[0.2em] text-sm"
                  style={{ textShadow: `0 0 15px ${GREEN_GLOW}, 1)` }}
                >
                  CARREGANDO SISTEMA
                </span>
                <span
                  className="text-green-400 text-2xl font-bold tabular-nums"
                  style={{ textShadow: `0 0 20px ${GREEN_GLOW}, 1)` }}
                >
                  {progress}%
                </span>
              </div>
              <div className="relative">
                <div className="w-full h-2.5 bg-black border border-green-400/50 relative overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-400 via-green-300 to-green-400 transition-all duration-200 relative"
                    style={{
                      width: `${progress}%`,
                      boxShadow: `0 0 30px ${GREEN_GLOW}, 1), 0 0 60px ${GREEN_GLOW}, 0.8), inset 0 0 15px ${GREEN_GLOW}, 0.8)`,
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
                  </div>
                </div>
                <div
                  className="absolute -inset-y-2 left-0 bg-green-400/30 blur-md transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {phase === 'alert' && (
          <div className="text-center flex flex-col items-center gap-4 animate-fade-in">
            <div className="flex justify-center">
              <div
                className="w-20 h-20 border-2 border-red-500 flex items-center justify-center"
                style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)', boxShadow: '0 0 20px rgba(239, 68, 68, 0.6)' }}
              >
                <span className="text-red-500 text-4xl font-bold mb-4">!</span>
              </div>
            </div>
            <div className="border-2 border-red-500 px-8 py-3" style={{ boxShadow: '0 0 20px rgba(239, 68, 68, 0.4)' }}>
              <h1 className="text-xl font-mono text-red-500 tracking-[0.2em]">[ ALERTA DO SISTEMA ]</h1>
            </div>
          </div>
        )}

        {phase === 'found' && (
          <div className="font-mono text-base text-green-400 flex flex-col gap-3">
            <div style={{ textShadow: `0 0 15px ${GREEN_GLOW}, 0.7)` }}>
              {line1}
              {line1.length > 0 && line1.length < FOUND_LINE_1.length && <span className="animate-pulse">_</span>}
            </div>
            {line2.length > 0 && (
              <div style={{ textShadow: `0 0 15px ${GREEN_GLOW}, 0.7)` }}>
                {line2}
                {line2.length < FOUND_LINE_2.length && <span className="animate-pulse">_</span>}
              </div>
            )}
            {line3.length > 0 && (
              <div className="flex items-center gap-2">
                <span style={{ textShadow: `0 0 15px ${GREEN_GLOW}, 0.7)` }}>{line3}</span>
                {line3.length < FOUND_LINE_3.length && <span className="animate-pulse">_</span>}
                {line3.length >= FOUND_LINE_3.length && compatibility > 0 && (
                  <>
                    <span
                      className="text-2xl font-bold tabular-nums"
                      style={{ textShadow: `0 0 25px ${GREEN_GLOW}, 1)` }}
                    >
                      {compatibility.toFixed(1)}%
                    </span>
                    <span className="animate-pulse">_</span>
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {phase === 'welcome' && (
          <div className="text-center animate-fade-in px-4">
            <h1
              className="text-2xl sm:text-3xl md:text-5xl font-mono font-bold text-green-400"
              style={{ textShadow: `0 0 30px ${GREEN_GLOW}, 0.8), 0 0 60px ${GREEN_GLOW}, 0.5)` }}
            >
              Bem-vindo, Jogador.
            </h1>
          </div>
        )}

        {phase === 'secondChance' && (
          <div className="text-center animate-fade-in px-4">
            <h1
              className="glitch-text text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-mono font-semibold text-white tracking-wide"
              data-text="SEGUNDA CHANCE CONCEDIDA."
              style={{
                textShadow:
                  '0 0 20px rgba(255, 255, 255, 0.6), 0 0 40px rgba(255, 255, 255, 0.4), 1px 1px 0 rgba(0, 255, 255, 0.4), -1px -1px 0 rgba(255, 0, 255, 0.4)',
              }}
            >
              SEGUNDA CHANCE CONCEDIDA.
            </h1>
          </div>
        )}

        {phase === 'awakening' && (
          <div className="text-center flex flex-col gap-6 animate-fade-in">
            <div
              className="h-px w-full max-w-2xl mx-auto bg-gradient-to-r from-transparent via-green-400 to-transparent"
              style={{ boxShadow: `0 0 10px ${GREEN_GLOW}, 0.6)` }}
            />
            <h1
              className="text-3xl md:text-5xl font-mono font-bold tracking-[0.3em] text-green-400"
              style={{ textShadow: `0 0 25px ${GREEN_GLOW}, 0.8), 0 0 50px ${GREEN_GLOW}, 0.5)` }}
            >
              O DESPERTAR FOI LIBERADO
            </h1>
            <div
              className="h-px w-full max-w-2xl mx-auto bg-gradient-to-r from-transparent via-green-400 to-transparent"
              style={{ boxShadow: `0 0 10px ${GREEN_GLOW}, 0.6)` }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
