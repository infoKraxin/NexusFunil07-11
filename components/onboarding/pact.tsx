'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Stamp, Tag, useTrackOnce } from '@/components/funnel/fx'
import { NexusLogo } from '@/components/nexus/nexus-logo'
import { type Derived, formatPactDate, writeFunnel } from '@/lib/funnel'
import { track } from '@/lib/track'
import { useFunnel } from '@/lib/use-funnel'

const HOLD_MS = 3000

export function Pact() {
  const f = useFunnel()
  if (!f.ready) return <div className="min-h-[100dvh] bg-background" />
  return <PactView f={f} />
}

function PactView({ f }: { f: Derived }) {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const [holding, setHolding] = useState(false)
  const [aborted, setAborted] = useState(false)
  const [sealedAt, setSealedAt] = useState<Date | null>(null)
  const raf = useRef<number | undefined>(undefined)
  const startedAt = useRef(0)
  const lastBuzz = useRef(0)
  useTrackOnce('pact_view', { block: f.code })

  const lines = [
    <>
      dedicar <b>{f.time} por dia</b> à minha evolução
    </>,
    <>{f.block.pactLine}</>,
    <>
      chegar ao dia 90 <b>{f.mirrorLower}</b>
    </>,
  ]

  const seal = useCallback(() => {
    const now = new Date()
    setSealedAt(now)
    setHolding(false)
    writeFunnel((s) => ({ ...s, pactAt: now.toISOString() }))
    track('pact_sealed', { block: f.code })
    try {
      navigator.vibrate?.([60, 40, 160])
    } catch {}
    setTimeout(() => router.push('/onboarding/plans'), 2600)
  }, [f.code, router])

  const loop = useCallback(() => {
    const elapsed = performance.now() - startedAt.current
    const p = Math.min(1, elapsed / HOLD_MS)
    setProgress(p)
    if (elapsed - lastBuzz.current > 420) {
      lastBuzz.current = elapsed
      try {
        navigator.vibrate?.(25 + Math.round(p * 50))
      } catch {}
    }
    if (p >= 1) return seal()
    raf.current = requestAnimationFrame(loop)
  }, [seal])

  const start = (e: React.PointerEvent) => {
    if (sealedAt) return
    e.preventDefault()
    ;(e.target as Element).setPointerCapture?.(e.pointerId)
    setAborted(false)
    setHolding(true)
    startedAt.current = performance.now()
    lastBuzz.current = -999
    track('pact_start')
    raf.current = requestAnimationFrame(loop)
  }

  const stop = () => {
    if (!holding || sealedAt) return
    if (raf.current) cancelAnimationFrame(raf.current)
    setHolding(false)
    if (progress < 1) {
      setAborted(true)
      setProgress(0)
      track('pact_abort', { progress: Math.round(progress * 100) })
    }
  }

  useEffect(() => () => raf.current !== undefined ? cancelAnimationFrame(raf.current) : undefined, [])

  const holdText =
    progress < 0.34 ? 'Segure firme…' : progress < 0.67 ? 'Isso é sério…' : 'Quase lá…'
  const sealed = sealedAt ? formatPactDate(sealedAt) : null

  return (
    <div className="min-h-[100dvh] bg-background relative overflow-hidden select-none">
      <header className="p-3 flex justify-center">
        <NexusLogo size="sm" />
      </header>

      <main id="main-content" className="max-w-md mx-auto px-5 pb-6 flex flex-col items-center text-center">
        <Tag>Último passo</Tag>
        <h1 className="mt-2.5 text-[24px] font-black leading-tight">Faça um pacto com você mesmo.</h1>
        <p className="mt-1 text-[15px] text-muted-foreground">Ninguém vai te cobrar isso. Só você.</p>

        {/* Contrato */}
        <motion.div
          initial={{ opacity: 0, y: 16, rotate: -1.5 }}
          animate={{ opacity: 1, y: 0, rotate: -1 }}
          transition={{ delay: 0.2 }}
          className="paper relative mt-4 w-full rounded-lg px-4 pt-3 pb-4 text-left shadow-[0_18px_40px_-16px_rgba(0,0,0,0.9)]"
        >
          <p className="font-hand text-[23px] leading-[28px]">Eu me comprometo a:</p>
          <ul className="font-hand text-[19.5px] leading-[28px]">
            {lines.map((l, i) => (
              <motion.li
                key={i}
                initial={{ clipPath: 'inset(0 100% 0 0)' }}
                animate={{ clipPath: 'inset(0 0% 0 0)' }}
                transition={{ delay: 0.7 + i * 1.1, duration: 1, ease: 'linear' }}
                className="pl-4 -indent-4"
              >
                • {l}
              </motion.li>
            ))}
          </ul>

          <AnimatePresence>
            {sealed && (
              <motion.div className="absolute right-3 bottom-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Stamp tone="red" className="bg-[#f6f1e4]/70 text-[13px] flex-col leading-tight py-1">
                  <span>Pacto selado</span>
                  <span className="text-[10px] tracking-normal font-bold">
                    {sealed.date} · {sealed.time}
                  </span>
                </Stamp>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Digital */}
        <div className="mt-5 flex flex-col items-center">
          <button
            type="button"
            aria-label="Segure para selar o pacto"
            onPointerDown={start}
            onPointerUp={stop}
            onPointerCancel={stop}
            onPointerLeave={stop}
            onContextMenu={(e) => e.preventDefault()}
            className="relative w-32 h-32 rounded-full touch-none [-webkit-touch-callout:none] outline-none"
          >
            <Fingerprint progress={sealedAt ? 1 : progress} active={holding} />
          </button>
          <p className="mt-3 h-6 font-bold text-[16px]" aria-live="polite">
            {sealedAt ? (
              <span className="text-primary">Agora escolha como você vai cumprir.</span>
            ) : holding ? (
              <span className="text-primary">{holdText}</span>
            ) : (
              'Segure para selar o pacto'
            )}
          </p>
          <p className="mt-1 h-5 text-sm text-destructive">
            {aborted && !holding && !sealedAt ? 'Segure até o fim. Igual vai ser no seu plano.' : ''}
          </p>
        </div>
      </main>

      {/* Flash ao selar */}
      <AnimatePresence>
        {sealedAt && (
          <motion.div
            className="fixed inset-0 bg-primary pointer-events-none z-50"
            initial={{ opacity: 0.55 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

// Arcos concêntricos que lembram uma digital
const RIDGES = [
  'M50 88 C 34 88 26 74 26 56 C 26 36 37 24 50 24 C 63 24 74 36 74 56',
  'M42 82 C 33 76 32 64 32 56 C 32 42 40 31 50 31 C 60 31 68 42 68 56 C 68 66 66 74 62 80',
  'M38 66 C 38 60 38 50 41 45 C 44 40 47 38 50 38 C 56 38 61 44 61 54 C 61 64 58 72 54 78',
  'M44 74 C 44 66 44 58 44 52 C 44 47 47 44 50 44 C 53 44 55 47 55 52 C 55 62 54 68 50 76',
  'M50 52 C 50 60 50 66 47 72',
  'M20 44 C 24 26 36 16 50 16 C 64 16 76 26 80 44',
  'M80 60 C 80 70 78 76 75 82',
  'M20 60 C 20 68 22 74 25 80',
]

function Fingerprint({ progress, active }: { progress: number; active: boolean }) {
  const r = 46
  const c = 2 * Math.PI * r
  const fillY = 100 - progress * 100
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible" aria-hidden="true">
      <defs>
        <clipPath id="fp-fill">
          <rect x="0" y={fillY} width="100" height="100" />
        </clipPath>
      </defs>
      {/* anel */}
      <circle cx="50" cy="50" r={r} fill="none" stroke="#1a1d21" strokeWidth="3" />
      <circle
        cx="50"
        cy="50"
        r={r}
        fill="none"
        stroke="#36f555"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - progress)}
        transform="rotate(-90 50 50)"
        className="neon-glow"
        style={{ transition: active ? 'none' : 'stroke-dashoffset 0.35s ease-out' }}
      />
      {/* digital apagada */}
      <g fill="none" stroke="#36f555" strokeOpacity="0.22" strokeWidth="2.6" strokeLinecap="round">
        {RIDGES.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      {/* digital acesa (de baixo pra cima) */}
      <g
        clipPath="url(#fp-fill)"
        fill="none"
        stroke="#36f555"
        strokeWidth="2.6"
        strokeLinecap="round"
        className="neon-glow"
        style={{ transition: active ? 'none' : 'all 0.35s' }}
      >
        {RIDGES.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      {!active && progress === 0 && (
        <circle cx="50" cy="50" r="46" fill="none" stroke="#36f555" strokeOpacity="0.5" strokeWidth="1">
          <animate attributeName="r" values="40;50;40" dur="2s" repeatCount="indefinite" />
          <animate attributeName="stroke-opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite" />
        </circle>
      )}
    </svg>
  )
}
