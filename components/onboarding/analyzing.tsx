'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { BarChart3, Check, Sparkles, Target, TrendingUp } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { NexusLogo } from '@/components/nexus/nexus-logo'
import { useFunnel } from '@/lib/use-funnel'

const STEP_COUNT = 4
const TOTAL_DURATION = Math.max(2400 * STEP_COUNT, 9000)

export function Analyzing() {
  const router = useRouter()
  const f = useFunnel()
  const [stepIndex, setStepIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [complete, setComplete] = useState(false)

  const steps = useMemo(() => {
    if (!f.ready) return [
      { id: 1, label: 'Lendo suas respostas', note: null, icon: TrendingUp },
      { id: 2, label: 'Cruzando os padrões', note: null, icon: BarChart3 },
      { id: 3, label: 'Identificando seu bloqueio', note: null, icon: Target },
      { id: 4, label: 'Montando seu plano', note: null, icon: Sparkles },
    ]
    return [
      { id: 1, label: 'Lendo suas respostas', note: `${f.hoursLabel}/dia`, icon: TrendingUp },
      { id: 2, label: 'Cruzando os padrões', note: f.feeling[0].toUpperCase() + f.feeling.slice(1), icon: BarChart3 },
      { id: 3, label: 'Identificando seu bloqueio', note: f.area.split(' e ')[0], icon: Target },
      { id: 4, label: 'Montando seu plano', note: f.time.replace(' minutos', ' min') + '/dia', icon: Sparkles },
    ]
  }, [f.ready, f.hoursLabel, f.feeling, f.area, f.time])

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setStepIndex((i) => (i < STEP_COUNT - 1 ? i + 1 : i))
    }, TOTAL_DURATION / STEP_COUNT)
    const increment = 100 / (TOTAL_DURATION / 30)
    const progressInterval = setInterval(() => {
      setProgress((p) => Math.min(p + increment, 100))
    }, 30)
    let navigateTimer: ReturnType<typeof setTimeout> | undefined
    const doneTimer = setTimeout(() => {
      setComplete(true)
      navigateTimer = setTimeout(() => router.push('/onboarding/results'), 800)
    }, TOTAL_DURATION + 400)
    return () => {
      clearInterval(stepInterval)
      clearInterval(progressInterval)
      clearTimeout(doneTimer)
      if (navigateTimer) clearTimeout(navigateTimer)
    }
  }, [router])

  const current = steps[stepIndex]
  const CurrentIcon = current.icon
  const rounded = Math.round(progress)

  const counters = [
    { icon: TrendingUp, label: 'Missões', sublabel: 'personalizadas', value: Math.min(Math.floor(progress / 8), 12) },
    { icon: Target, label: 'Hábitos', sublabel: 'configurados', value: Math.min(Math.floor(progress / 12), 8) },
    { icon: Sparkles, label: 'Protocolos', sublabel: 'de evolução', value: Math.min(Math.floor(progress / 33), 3) },
  ]

  return (
    <main
      id="main-content"
      className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden px-6"
    >
      <div
        className="absolute -top-24 -left-24 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)', opacity: 0.18 }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)', opacity: 0.18 }}
        aria-hidden="true"
      />

      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mb-10 relative">
        <NexusLogo size="md" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-10 relative"
      >
        <h1 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
          <span className="text-primary">IA</span> Analisando Perfil
        </h1>
        <p className="text-muted-foreground text-sm text-pretty px-4">
          {f.ready
            ? `Lendo as suas 12 respostas e montando um plano só seu...`
            : 'Preparando sua jornada personalizada...'}
        </p>
      </motion.div>

      <div className="w-full max-w-sm mb-8 relative flex flex-col items-center">
        <div className="h-44 flex flex-col items-center justify-center text-center" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 16, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.92 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="flex flex-col items-center gap-4"
            >
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center bg-primary border-2 border-primary shadow-[0_8px_32px_-8px_var(--primary)]">
                <CurrentIcon className="w-9 h-9 text-primary-foreground" />
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <p className="text-base font-semibold text-foreground text-balance">{current.label}</p>
                {current.note && (
                  <p className="text-3xl font-bold text-primary tabular-nums leading-none">{current.note}</p>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-2 mt-4 mb-6" aria-hidden="true">
          {steps.map((s, i) => (
            <div
              key={s.id}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === stepIndex ? 'w-6 bg-primary' : i < stepIndex ? 'w-1.5 bg-primary/60' : 'w-1.5 bg-secondary'
              }`}
            />
          ))}
        </div>

        <div
          className="w-full relative h-2.5 bg-secondary/40 rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={rounded}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <motion.div
            className="absolute inset-y-0 left-0 bg-primary rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ ease: 'linear', duration: 0.03 }}
          />
        </div>
        <div className="w-full flex items-center justify-between mt-3">
          <span className="text-xs text-muted-foreground uppercase tracking-wide">Processando</span>
          <span className="text-sm font-bold text-primary tabular-nums">{rounded}%</span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-3 gap-3 w-full max-w-sm relative"
      >
        {counters.map((counter) => (
          <div key={counter.label} className="rounded-xl p-4 bg-secondary/20 border border-border/30 text-center">
            <counter.icon className="w-5 h-5 mx-auto mb-2 text-primary" />
            <p className="text-xl font-bold tabular-nums">{counter.value}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{counter.label}</p>
            <p className="text-[9px] text-muted-foreground/70">{counter.sublabel}</p>
          </div>
        ))}
      </motion.div>

      {complete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center bg-background/95"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="text-center"
          >
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
              <Check className="w-10 h-10 text-primary" />
            </div>
            <p className="text-xl font-bold text-primary">Completo!</p>
          </motion.div>
        </motion.div>
      )}
    </main>
  )
}
