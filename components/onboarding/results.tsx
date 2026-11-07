'use client'

import { motion, useInView } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'
import { CountUp, HandUnderline, Highlight, Stamp, StickyCta, useTrackOnce } from '@/components/funnel/fx'
import { TurnChart } from '@/components/funnel/turn-chart'
import { NexusLogo } from '@/components/nexus/nexus-logo'
import type { Derived } from '@/lib/funnel'
import { track } from '@/lib/track'
import { useFunnel } from '@/lib/use-funnel'

export function Results() {
  const f = useFunnel()
  if (!f.ready) return <div className="min-h-[100dvh] bg-background" />
  return <ResultsView f={f} />
}

function ResultsView({ f }: { f: Derived }) {
  const router = useRouter()
  const { block } = f
  useTrackOnce('diagnosis_view', { block: f.code })

  const chartRef = useRef<HTMLDivElement>(null)
  const chartInView = useInView(chartRef, { once: true, margin: '-60px' })

  const [causeBefore, causeAfter] = block.cause.split(block.causeUnderline)

  return (
    <div className="min-h-[100dvh] bg-background relative overflow-x-hidden">
      <div className="absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-destructive/10 to-transparent pointer-events-none" />
      <header className="p-4 flex justify-center relative">
        <NexusLogo size="sm" />
      </header>

      <main id="main-content" className="max-w-md mx-auto px-5 pb-36 relative flex flex-col gap-10">
        {/* 1. Carimbo */}
        <section className="text-center pt-2">
          <Stamp tone="red" delay={0.15}>
            Seu bloqueio
          </Stamp>
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, type: 'spring', stiffness: 260, damping: 14 }}
            className="mt-6 text-6xl"
            aria-hidden="true"
          >
            <motion.span
              className="inline-block"
              animate={{ y: [0, -6, 0], rotate: [0, -4, 4, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: 1.2 }}
            >
              {block.emoji}
            </motion.span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            className="mt-3 text-[34px] font-black leading-none tracking-tight"
          >
            {block.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-3 text-lg text-muted-foreground text-balance"
          >
            {block.impact}
          </motion.p>
        </section>

        {/* 2. Isso explica por que… */}
        <section>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="text-sm font-bold uppercase tracking-[0.14em] text-muted-foreground mb-3"
          >
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
                  className="flex items-start gap-3 rounded-xl bg-card border border-border px-4 py-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-[15px] leading-snug">
                    {parts.length > 1 ? (
                      <>
                        {parts[0]}
                        <Highlight color="yellow" delay={1.5 + i * 0.45 + 0.4}>
                          {f.feeling}
                        </Highlight>
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
        <section className="rounded-2xl border border-destructive/30 bg-destructive/5 p-5 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-destructive">O custo</p>
          <div className="mt-2">
            <CountUp to={f.daysPerYear} duration={1.8} className="text-7xl font-black text-destructive leading-none" />
            <span className="text-2xl font-black text-destructive"> dias</span>
          </div>
          <p className="text-muted-foreground mt-1">inteiros no celular, por ano</p>

          {f.lost.length > 0 && (
            <>
              <p className="text-sm mt-5 mb-2.5">E o que isso já te custou:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {f.lost.map((l, i) => (
                  <span key={l} className="relative px-3 py-1.5 rounded-full bg-secondary border border-border text-sm">
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
            </>
          )}
        </section>

        {/* 4. A causa */}
        <section className="text-center">
          <p className="text-2xl font-bold leading-snug text-balance">
            {causeBefore}
            <HandUnderline>{block.causeUnderline}</HandUnderline>
            {causeAfter}
          </p>
        </section>

        {/* 5. A virada */}
        <section ref={chartRef} className="rounded-2xl border border-border bg-card p-4 min-h-[260px]">
          <p className="text-sm font-bold mb-1">Onde você está × onde pode chegar</p>
          {chartInView && <TurnChart code={f.code} balloon={f.mirror} delay={0.1} />}
        </section>
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
