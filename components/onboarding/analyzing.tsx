'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Check, ListChecks, ScanSearch, Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useTrackOnce } from '@/components/funnel/fx'
import { NexusLogo } from '@/components/nexus/nexus-logo'
import { useFunnel } from '@/lib/use-funnel'

const STEP_MS = 2200
const STEPS = [
  { label: 'Analisando suas respostas…', icon: ScanSearch },
  { label: 'Identificando seu bloqueio…', icon: Sparkles },
  { label: 'Montando seu plano…', icon: ListChecks },
]
const TOTAL = STEP_MS * STEPS.length

export function Analyzing() {
  const router = useRouter()
  const f = useFunnel()
  const [stepIndex, setStepIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)
  useTrackOnce('analyzing_view')

  // Notas que provam que as respostas estão sendo lidas
  const notes = [
    `12 respostas · ${f.hoursLabel} de celular por dia`,
    null,
    `${f.time} por dia · ${f.area}`,
  ]

  useEffect(() => {
    const started = Date.now()
    const tick = setInterval(() => {
      const elapsed = Date.now() - started
      setProgress(Math.min(100, (elapsed / TOTAL) * 100))
      setStepIndex(Math.min(STEPS.length - 1, Math.floor(elapsed / STEP_MS)))
    }, 40)
    let go: ReturnType<typeof setTimeout> | undefined
    const finish = setTimeout(() => {
      setDone(true)
      go = setTimeout(() => router.push('/onboarding/results'), 700)
    }, TOTAL + 200)
    return () => {
      clearInterval(tick)
      clearTimeout(finish)
      if (go) clearTimeout(go)
    }
  }, [router])

  const current = STEPS[stepIndex]
  const Icon = current.icon

  return (
    <main
      id="main-content"
      className="min-h-[100dvh] bg-background flex flex-col items-center justify-center relative overflow-hidden px-6"
    >
      <div
        className="absolute -top-24 -left-24 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)', opacity: 0.16 }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)', opacity: 0.16 }}
        aria-hidden="true"
      />

      <NexusLogo size="md" />

      <div className="w-full max-w-sm mt-12 flex flex-col items-center">
        <div className="h-48 flex flex-col items-center justify-center text-center" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div
              key={stepIndex}
              initial={{ opacity: 0, y: 16, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.92 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center bg-primary shadow-[0_8px_32px_-8px_var(--primary)]">
                <Icon className="w-9 h-9 text-primary-foreground" />
              </div>
              <p className="text-lg font-bold">{current.label}</p>
              {f.ready && notes[stepIndex] && (
                <p className="text-sm text-primary font-semibold">{notes[stepIndex]}</p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <ul className="w-full flex flex-col gap-2 mb-6">
          {STEPS.map((s, i) => (
            <li key={s.label} className="flex items-center gap-2.5 text-sm">
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                  i < stepIndex || done ? 'bg-primary' : i === stepIndex ? 'border-2 border-primary' : 'border border-border'
                }`}
              >
                {(i < stepIndex || done) && <Check className="w-3 h-3 text-primary-foreground" />}
              </span>
              <span className={i <= stepIndex ? 'text-foreground' : 'text-muted-foreground'}>
                {s.label.replace('…', '')}
              </span>
            </li>
          ))}
        </ul>

        <div className="w-full h-2.5 bg-secondary/50 rounded-full overflow-hidden" role="progressbar" aria-valuenow={Math.round(progress)}>
          <div className="h-full bg-primary rounded-full" style={{ width: `${progress}%` }} />
        </div>
        <p className="w-full text-right text-sm font-bold text-primary tabular-nums mt-2">{Math.round(progress)}%</p>
      </div>
    </main>
  )
}
