'use client'

import { motion } from 'framer-motion'
import { Check, Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { CountUp, HandUnderline, Highlight, StickyCta, useTrackOnce } from '@/components/funnel/fx'
import { NexusLogo } from '@/components/nexus/nexus-logo'
import type { Derived } from '@/lib/funnel'
import { track } from '@/lib/track'
import { useFunnel } from '@/lib/use-funnel'
import { averageOf, projectRadar } from '@/lib/diagnosis'
import { cn } from '@/lib/utils'
import { DiagnosisRadar } from './diagnosis-radar'

export function Results() {
  const f = useFunnel()
  if (!f.ready) return <div className="min-h-[100dvh] bg-background" />
  return <ResultsView f={f} />
}

const CARD = 'rounded-2xl bg-gradient-to-br from-secondary/30 to-secondary/10 border border-border/40'
const LABEL = 'font-mono text-[11px] uppercase tracking-[0.18em] text-primary'

function ResultsView({ f }: { f: Derived }) {
  const router = useRouter()
  const { block } = f
  const BlockIcon = block.icon
  useTrackOnce('diagnosis_view', { block: f.code })

  const [causeBefore, causeAfter] = block.cause.split(block.causeUnderline)

  return (
    <div className="min-h-[100dvh] bg-background relative overflow-x-hidden">
      <div
        className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-primary/10 via-primary/[0.03] to-transparent pointer-events-none"
        aria-hidden="true"
      />
      <header className="p-4 flex justify-center relative">
        <NexusLogo size="sm" />
      </header>

      <main id="main-content" className="max-w-md mx-auto px-5 pb-36 relative flex flex-col gap-8">
        {/* 1. Bloqueio revelado */}
        <section className="text-center">
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary"
          >
            <Sparkles className="w-3 h-3" />
            Análise completa
          </motion.div>

          {/* "carimbo": o ícone cai e assenta */}
          <motion.div
            initial={{ scale: 2.4, opacity: 0, rotate: -14 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 380, damping: 16 }}
            className="relative mx-auto mt-6 w-20 h-20"
          >
            <div className="absolute inset-0 rounded-2xl bg-primary blur-xl opacity-40" aria-hidden="true" />
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, delay: 1.2 }}
              className="relative w-20 h-20 rounded-2xl bg-primary flex items-center justify-center shadow-[0_8px_32px_-8px_var(--primary)]"
            >
              <BlockIcon className="w-10 h-10 text-primary-foreground" strokeWidth={2.2} />
            </motion.div>
          </motion.div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className={`${LABEL} mt-5`}>
            Seu bloqueio
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-1.5 text-[32px] font-bold leading-none tracking-tight"
          >
            {block.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-3 text-[17px] text-muted-foreground text-balance"
          >
            {block.impact}
          </motion.p>
        </section>

        {/* 2. Isso explica por que… */}
        <section>
          <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }} className={`${LABEL} mb-3`}>
            Isso explica por que…
          </motion.h2>
          <ul className="flex flex-col gap-2.5">
            {block.checks.map((c, i) => {
              const parts = c.split('{feeling}')
              return (
                <motion.li
                  key={c}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5 + i * 0.45 }}
                  className={`${CARD} flex items-center gap-3 p-3`}
                >
                  <span className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-primary" />
                  </span>
                  <span className="text-sm leading-snug">
                    {parts.length > 1 ? (
                      <>
                        {parts[0]}
                        <Highlight delay={1.5 + i * 0.45 + 0.4}>{f.feeling}</Highlight>
                        {parts[1]}
                      </>
                    ) : (
                      c
                    )}
                  </span>
                </motion.li>
              )
            })}
          </ul>
        </section>

        {/* 3. O custo */}
        <section className={`${CARD} p-5 text-center`}>
          <p className={LABEL}>O custo</p>
          <div className="mt-3">
            <CountUp to={f.daysPerYear} duration={1.8} className="text-6xl font-bold text-destructive leading-none" />
            <span className="text-xl font-bold text-destructive"> dias</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1.5">inteiros no celular, por ano</p>

          {f.lost.length > 0 && (
            <div className="mt-5 pt-4 border-t border-border/40">
              <p className="text-xs text-muted-foreground mb-2.5">E o que isso já te custou</p>
              <div className="flex flex-wrap justify-center gap-2">
                {f.lost.map((l, i) => (
                  <span key={l} className="relative px-3 py-1.5 rounded-full bg-secondary/60 border border-border text-xs">
                    {l}
                    <motion.span
                      className="absolute left-2 right-2 top-1/2 h-[2px] bg-destructive origin-left"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8 + i * 0.35, duration: 0.3 }}
                    />
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* 4. A causa */}
        <section className="text-center px-2">
          <p className="text-[22px] font-bold leading-snug text-balance">
            {causeBefore}
            <span className="text-primary">
              <HandUnderline>{block.causeUnderline}</HandUnderline>
            </span>
            {causeAfter}
          </p>
        </section>

        {/* 5. A virada — gráficos aranha */}
        <RadarTurn f={f} />
      </main>

      <StickyCta
        onClick={() => {
          track('diagnosis_cta', { block: f.code })
          router.push('/onboarding/solution')
        }}
      >
        Ver como sair disso →
      </StickyCta>
    </div>
  )
}

const PERIODS = [30, 60, 90] as const

function RadarTurn({ f }: { f: Derived }) {
  const [period, setPeriod] = useState<(typeof PERIODS)[number]>(90)
  const current = f.radar
  const projected = projectRadar(current, period)
  return (
    <section className="flex flex-col gap-4">
      <div className="text-center">
        <p className={LABEL}>A virada</p>
        <p className="mt-1.5 text-sm text-muted-foreground">Onde você está hoje e onde pode chegar</p>
      </div>

      <div className="flex gap-2 p-1 bg-secondary/20 rounded-xl" role="tablist" aria-label="Período">
        {PERIODS.map((p) => (
          <button
            key={p}
            type="button"
            role="tab"
            aria-selected={period === p}
            onClick={() => setPeriod(p)}
            className={cn(
              'flex-1 py-2.5 rounded-lg font-medium text-sm transition-all relative',
              period === p ? 'text-primary-foreground' : 'text-muted-foreground',
            )}
          >
            {period === p && (
              <motion.div
                layoutId="radarPeriod"
                className="absolute inset-0 bg-primary rounded-lg shadow-lg shadow-primary/25"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
              />
            )}
            <span className="relative z-10">{p} dias</span>
          </button>
        ))}
      </div>

      <div className={`${CARD} p-5`}>
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="w-2.5 h-2.5 rounded-full bg-primary/50 animate-pulse" />
          <span className="text-sm font-semibold text-muted-foreground">Você hoje</span>
        </div>
        <DiagnosisRadar data={current} type="current" />
        <div className="text-center mt-3 pt-3 border-t border-border/30">
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground/60 mb-0.5">Score total</p>
          <span className="text-3xl font-bold text-muted-foreground">{averageOf(current).toFixed(1)}</span>
          <span className="text-sm text-muted-foreground/60 ml-1">/ 10</span>
        </div>
      </div>

      <motion.div
        key={period}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-5 bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/30"
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-primary animate-pulse" />
          <span className="text-sm font-semibold text-primary">Você em {period} dias</span>
        </div>
        <DiagnosisRadar data={projected} type="potential" />
        <div className="text-center mt-3 pt-3 border-t border-primary/20">
          <p className="text-[11px] uppercase tracking-wider text-primary/70 mb-0.5">Score total</p>
          <span className="text-4xl font-bold text-primary">{averageOf(projected).toFixed(1)}</span>
          <span className="text-sm text-primary/60 ml-1">/ 10</span>
        </div>
        <p className="mt-3 text-center text-xs text-muted-foreground text-balance">
          Rumo a: <span className="text-foreground font-medium">{f.mirrorLower}</span>
        </p>
      </motion.div>
    </section>
  )
}
