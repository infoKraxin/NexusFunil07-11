'use client'

import { motion, useInView } from 'framer-motion'
import { ChevronDown, Sparkles, X } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { CountUp, HandUnderline, Highlight, StickyCta, useTrackOnce } from '@/components/funnel/fx'
import { NexusLogo } from '@/components/nexus/nexus-logo'
import { averageOf, projectRadar } from '@/lib/diagnosis'
import type { Derived } from '@/lib/funnel'
import { track } from '@/lib/track'
import { useFunnel } from '@/lib/use-funnel'
import { cn } from '@/lib/utils'
import { DiagnosisRadar } from './diagnosis-radar'

export function Results() {
  const f = useFunnel()
  if (!f.ready) return <div className="min-h-[100dvh] bg-background" />
  return <ResultsView f={f} />
}

const LABEL = 'font-mono text-[11px] uppercase tracking-[0.18em] text-primary'

function ResultsView({ f }: { f: Derived }) {
  const router = useRouter()
  const { block } = f
  useTrackOnce('diagnosis_view', { block: f.code })

  // O botão fixo guia a leitura: primeiro "rola", no fim "avança".
  const endRef = useRef<HTMLDivElement>(null)
  const reachedEnd = useInView(endRef, { amount: 0.15 })
  const [causeBefore, causeAfter] = block.cause.split(block.causeUnderline)

  const scrollNext = () => {
    window.scrollBy({ top: window.innerHeight * 0.75, behavior: 'smooth' })
  }

  return (
    <div className="min-h-[100dvh] bg-background relative overflow-x-hidden">
      <header className="pt-4 flex justify-center relative">
        <NexusLogo size="sm" />
      </header>

      <main id="main-content" className="max-w-md mx-auto px-5 pb-40 relative">
        {/* 1. Hero — cabe na primeira tela e deixa a próxima seção "espiando" */}
        <section className="relative text-center pt-3">
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary"
          >
            <Sparkles className="w-3 h-3" />
            Seu diagnóstico está pronto
          </motion.div>

          <div className="relative mx-auto mt-4 h-[250px] w-full max-w-[320px]">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="absolute inset-0 flex justify-center overflow-hidden [mask-image:linear-gradient(to_bottom,black_70%,transparent)]"
            >
              <Image
                src="/images/personagem-fraco-busto.webp"
                alt=""
                width={341}
                height={594}
                priority
                className="h-[300px] w-auto max-w-none"
              />
            </motion.div>
            {/* ícone do bloqueio "carimbado" */}
            <motion.div
              initial={{ scale: 2.4, opacity: 0, rotate: -14 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ delay: 0.6, type: 'spring', stiffness: 380, damping: 16 }}
              className="absolute right-0 top-0 w-24 h-24"
            >
              <Image
                src={`/images/icon-${f.code}.webp`}
                alt=""
                width={160}
                height={160}
                priority
                className="w-full h-full object-contain mix-blend-screen"
              />
            </motion.div>
          </div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className={`${LABEL} -mt-3 relative`}>
            Seu bloqueio é
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-1.5 text-[32px] font-bold leading-none tracking-tight"
          >
            {block.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="mt-2.5 text-[17px] text-muted-foreground text-balance leading-snug"
          >
            {block.impact}
          </motion.p>

          <motion.button
            type="button"
            onClick={scrollNext}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="mt-5 mx-auto flex flex-col items-center gap-0.5 text-xs text-muted-foreground"
          >
            Role pra ver o que isso significa
            <motion.span animate={{ y: [0, 5, 0] }} transition={{ duration: 1.3, repeat: Infinity }}>
              <ChevronDown className="w-5 h-5 text-primary" />
            </motion.span>
          </motion.button>
        </section>

        {/* 2. Isso explica por que… */}
        <section className="mt-8">
          <h2 className="text-xl font-bold leading-tight">
            Isso explica <span className="text-primary">muita coisa</span>
          </h2>
          <ul className="mt-4 flex flex-col gap-3.5">
            {block.checks.map((c, i) => {
              const parts = c.split('{feeling}')
              return (
                <motion.li
                  key={c}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.25 }}
                  className="flex items-start gap-3"
                >
                  <span className="mt-0.5 w-6 h-6 rounded-full bg-primary/15 border border-primary/30 text-primary text-[11px] font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-[15px] leading-snug">
                    {parts.length > 1 ? (
                      <>
                        {parts[0]}
                        <Highlight delay={0.5}>{f.feeling}</Highlight>
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
        <section className="mt-10 text-center">
          <p className={LABEL}>O preço que você paga hoje</p>
          <div className="mt-3 flex items-baseline justify-center gap-1.5">
            <CountUp to={f.daysPerYear} duration={1.8} className="text-6xl font-bold text-destructive leading-none" />
            <span className="text-xl font-bold text-destructive">dias por ano</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1.5">inteiros no celular. E ainda tem o que ficou pra trás:</p>
          {f.lost.length > 0 && (
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {f.lost.map((l, i) => (
                <motion.span
                  key={l}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.2 }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-destructive/10 border border-destructive/25 text-xs text-foreground/90"
                >
                  <X className="w-3 h-3 text-destructive" />
                  {l}
                </motion.span>
              ))}
            </div>
          )}
        </section>

        {/* 4. A causa */}
        <section className="mt-10 rounded-2xl bg-gradient-to-br from-secondary/40 to-secondary/10 border border-border/40 px-5 py-6 text-center">
          <p className="text-sm text-muted-foreground">A boa notícia:</p>
          <p className="mt-2 text-[21px] font-bold leading-snug text-balance">
            {causeBefore}
            <span className="text-primary">
              <HandUnderline>{block.causeUnderline}</HandUnderline>
            </span>
            {causeAfter}
          </p>
          <p className="mt-3 text-sm text-muted-foreground text-balance">E isso tem conserto: dá pra treinar, um dia de cada vez.</p>
        </section>

        {/* 5. A virada — gráficos aranha */}
        <div ref={endRef} className="mt-10">
          <RadarTurn f={f} />
        </div>
      </main>

      <StickyCta
        onClick={() => {
          if (!reachedEnd) return scrollNext()
          track('diagnosis_cta', { block: f.code })
          router.push('/onboarding/solution')
        }}
      >
        {reachedEnd ? 'Ver como sair disso →' : 'Continuar lendo ↓'}
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
      <h2 className="text-xl font-bold leading-tight text-center text-balance">
        Onde você está e onde <span className="text-primary">pode chegar</span>
      </h2>

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

      <div className="rounded-2xl p-5 bg-gradient-to-br from-secondary/30 to-secondary/10 border border-border/40">
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
        className="relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/30"
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
