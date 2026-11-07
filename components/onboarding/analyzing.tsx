'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useTrackOnce } from '@/components/funnel/fx'
import { useFunnel } from '@/lib/use-funnel'
import { cn } from '@/lib/utils'

const TOTAL = 7600
const PHASES = ['Respostas', 'Padrões', 'Bloqueio', 'Plano']
const PHASE_TEXT = ['Lendo suas respostas…', 'Cruzando os padrões…', 'Identificando seu bloqueio…', 'Montando seu plano…']

// Etiquetas que "pulam" ao redor do personagem enquanto o sistema lê as respostas
const TAG_POS = [
  'left-0 top-[18%]',
  'right-0 top-[34%]',
  'left-0 top-[52%]',
  'right-0 top-[66%]',
  'left-2 top-[80%]',
  'right-2 top-[10%]',
]

export function Analyzing() {
  const router = useRouter()
  const f = useFunnel()
  const [elapsed, setElapsed] = useState(0)
  useTrackOnce('analyzing_view')

  const tags = [
    `${f.hoursLabel}/dia no celular`,
    f.giveUp,
    `Deita ${f.feeling}`,
    `Foco: ${f.areaLower}`,
    `${f.time} por dia`,
    f.mechanism.chip,
  ]

  useEffect(() => {
    const start = Date.now()
    const tick = setInterval(() => setElapsed(Date.now() - start), 40)
    const go = setTimeout(() => router.push('/onboarding/results'), TOTAL + 900)
    return () => {
      clearInterval(tick)
      clearTimeout(go)
    }
  }, [router])

  const progress = Math.min(100, (elapsed / TOTAL) * 100)
  const phase = Math.min(PHASES.length - 1, Math.floor((progress / 100) * PHASES.length))
  const done = progress >= 100
  const tagStep = TOTAL / (tags.length + 1)
  const visibleTags = tags.map((_, i) => elapsed > (i + 0.4) * tagStep && elapsed < (i + 3.2) * tagStep && !done)

  return (
    <main
      id="main-content"
      className="min-h-[100dvh] bg-background flex flex-col items-center justify-center relative overflow-hidden px-6 py-8"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        Sistema Nexus · Análise
      </p>

      {/* Scanner */}
      <div className="relative mt-6 w-full max-w-[340px] h-[300px]">
        <div className="absolute left-1/2 top-10 h-40 w-40 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />

        <div className="absolute inset-x-12 inset-y-0 overflow-hidden [mask-image:linear-gradient(to_bottom,black_75%,transparent)]">
          <Image
            src="/images/personagem-fraco-busto.webp"
            alt=""
            width={341}
            height={594}
            priority
            className={cn(
              'mx-auto h-[330px] w-auto max-w-none transition-[filter] duration-700',
              done ? 'grayscale-0' : 'grayscale-[60%] brightness-90',
            )}
          />
          {/* linha de varredura */}
          {!done && (
            <motion.div
              className="absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-primary/25 to-transparent"
              animate={{ top: ['-10%', '90%', '-10%'] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="absolute inset-x-0 top-1/2 h-px bg-primary shadow-[0_0_12px_2px_rgb(54_245_85_/_0.8)]" />
            </motion.div>
          )}
        </div>

        {/* cantoneiras de mira */}
        {['left-10 top-0 border-l-2 border-t-2', 'right-10 top-0 border-r-2 border-t-2', 'left-10 bottom-6 border-l-2 border-b-2', 'right-10 bottom-6 border-r-2 border-b-2'].map((c) => (
          <motion.span
            key={c}
            className={cn('absolute w-6 h-6 rounded-[3px]', c, done ? 'border-primary' : 'border-primary/50')}
            animate={done ? { scale: [1, 1.25, 1] } : {}}
            transition={{ duration: 0.4 }}
          />
        ))}

        {/* respostas lidas */}
        <AnimatePresence>
          {tags.map(
            (t, i) =>
              visibleTags[i] && (
                <motion.span
                  key={t}
                  initial={{ opacity: 0, scale: 0.8, y: 6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className={cn(
                    'absolute max-w-[46%] px-2.5 py-1 rounded-md border border-primary/40 bg-background/85 backdrop-blur-sm text-[11px] font-medium leading-tight text-foreground shadow-[0_4px_18px_-8px_rgb(54_245_85_/_0.8)]',
                    TAG_POS[i],
                  )}
                >
                  <span className="text-primary mr-1">✓</span>
                  {t}
                </motion.span>
              ),
          )}
        </AnimatePresence>

        {/* resultado encontrado */}
        <AnimatePresence>
          {done && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="absolute inset-x-6 bottom-0 rounded-xl border border-primary/50 bg-background/90 backdrop-blur px-4 py-2.5 text-center shadow-[0_10px_40px_-14px_var(--primary)]"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">Bloqueio identificado</p>
              <p className="font-bold blur-[5px] select-none" aria-hidden="true">
                {f.block.name}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progresso */}
      <div className="w-full max-w-[340px] mt-6">
        <div className="flex items-end justify-between">
          <div className="h-6 overflow-hidden" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.p
                key={done ? 'done' : phase}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-[15px] font-semibold"
              >
                {done ? 'Pronto. Abrindo seu diagnóstico…' : PHASE_TEXT[phase]}
              </motion.p>
            </AnimatePresence>
          </div>
          <span className="text-2xl font-bold text-primary tabular-nums leading-none">{Math.round(progress)}%</span>
        </div>

        <div className="mt-3 grid grid-cols-4 gap-1.5">
          {PHASES.map((p, i) => {
            const segStart = (i / PHASES.length) * 100
            const fill = Math.max(0, Math.min(100, ((progress - segStart) / (100 / PHASES.length)) * 100))
            return (
              <div key={p}>
                <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full shadow-[0_0_8px_var(--primary)]"
                    style={{ width: `${fill}%` }}
                  />
                </div>
                <p
                  className={cn(
                    'mt-1.5 text-[10px] font-mono uppercase tracking-wider',
                    fill >= 100 ? 'text-primary' : fill > 0 ? 'text-foreground' : 'text-muted-foreground/60',
                  )}
                >
                  {p}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}
