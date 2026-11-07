'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Check, Lock } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useTrackOnce } from '@/components/funnel/fx'
import { NexusLogo } from '@/components/nexus/nexus-logo'
import { useFunnel } from '@/lib/use-funnel'
import { cn } from '@/lib/utils'

const ITEM_MS = 1050
const PHASES = ['Lendo suas respostas…', 'Cruzando os padrões…', 'Identificando seu bloqueio…', 'Montando seu plano…']

export function Analyzing() {
  const router = useRouter()
  const f = useFunnel()
  const [elapsed, setElapsed] = useState(0)
  useTrackOnce('analyzing_view')

  // As respostas da própria pessoa sendo "lidas" uma a uma
  const items = [
    `${f.hoursLabel} de celular por dia`,
    `Desiste ${f.giveUp}`,
    `Deita ${f.feeling} à noite`,
    `Quer começar por ${f.areaLower}`,
    `Tem ${f.time} por dia pra evoluir`,
    `Funciona melhor com ${f.mechanism.short}`,
  ]
  const total = ITEM_MS * (items.length + 1.6)
  const done = Math.min(items.length, Math.floor(elapsed / ITEM_MS))
  const progress = Math.min(100, (elapsed / total) * 100)
  const revealed = elapsed > ITEM_MS * (items.length + 0.4)
  const phase = PHASES[Math.min(PHASES.length - 1, Math.floor((progress / 100) * PHASES.length))]

  useEffect(() => {
    const start = Date.now()
    const tick = setInterval(() => setElapsed(Date.now() - start), 50)
    const go = setTimeout(() => router.push('/onboarding/results'), total + 500)
    return () => {
      clearInterval(tick)
      clearTimeout(go)
    }
  }, [router, total])

  const R = 54
  const C = 2 * Math.PI * R

  return (
    <main id="main-content" className="min-h-[100dvh] bg-background flex flex-col items-center relative overflow-hidden px-6 pt-10 pb-8">
      <div
        className="absolute top-0 inset-x-0 h-96 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top, rgb(54 245 85 / 0.16), transparent 70%)' }}
        aria-hidden="true"
      />

      {/* Anel de progresso com o logo */}
      <div className="relative w-40 h-40">
        <svg viewBox="0 0 120 120" className="absolute inset-0 -rotate-90" aria-hidden="true">
          <circle cx="60" cy="60" r={R} fill="none" stroke="#14171a" strokeWidth="5" />
          <circle
            cx="60"
            cy="60"
            r={R}
            fill="none"
            stroke="#36f555"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={C * (1 - progress / 100)}
            className="neon-glow"
          />
        </svg>
        <motion.div
          className="absolute inset-3 rounded-full border border-primary/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          style={{ borderTopColor: 'rgb(54 245 85 / 0.8)' }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <NexusLogo size="sm" />
          <span className="mt-1 text-2xl font-bold text-primary tabular-nums">{Math.round(progress)}%</span>
        </div>
      </div>

      <div className="h-8 mt-6" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.p
            key={phase}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="text-lg font-bold text-center"
          >
            {phase}
          </motion.p>
        </AnimatePresence>
      </div>
      <p className="text-sm text-muted-foreground text-center">Cada resposta sua vira uma peça do plano.</p>

      {/* Respostas sendo processadas */}
      <ul className="w-full max-w-sm mt-6 flex flex-col gap-2">
        {items.map((label, i) => {
          const isDone = i < done
          const isActive = i === done && !revealed
          return (
            <motion.li
              key={label}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: i <= done ? 1 : 0.35, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className={cn(
                'flex items-center gap-3 rounded-xl px-3.5 py-2.5 border transition-colors',
                isDone ? 'border-primary/25 bg-primary/[0.06]' : 'border-border/50 bg-secondary/20',
              )}
            >
              <span
                className={cn(
                  'w-5 h-5 rounded-full flex items-center justify-center shrink-0',
                  isDone ? 'bg-primary' : 'border border-border',
                )}
              >
                {isDone ? (
                  <Check className="w-3 h-3 text-primary-foreground" strokeWidth={3} />
                ) : isActive ? (
                  <span className="w-3 h-3 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                ) : null}
              </span>
              <span className={cn('text-sm', isDone ? 'text-foreground' : 'text-muted-foreground')}>{label}</span>
            </motion.li>
          )
        })}
      </ul>

      {/* Bloqueio "encontrado", ainda trancado */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="w-full max-w-sm mt-4 rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/15 to-primary/5 p-4 flex items-center gap-3 shadow-[0_10px_40px_-18px_var(--primary)]"
          >
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="min-w-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary">Bloqueio identificado</p>
              <p className="font-bold blur-[5px] select-none" aria-hidden="true">
                {f.block.name}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
