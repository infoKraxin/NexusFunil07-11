'use client'

import { motion, useAnimationControls } from 'framer-motion'
import { Check, Flame, Sparkles, Target, Timer } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Confetti, FutureYou, MiniPhone, ProtocolEmblem } from '@/components/funnel/art'
import { Marked, StickyCta, useTrackOnce } from '@/components/funnel/fx'
import { NexusLogo } from '@/components/nexus/nexus-logo'
import type { Derived } from '@/lib/funnel'
import { track } from '@/lib/track'
import { useFunnel } from '@/lib/use-funnel'

export function Solution() {
  const f = useFunnel()
  if (!f.ready) return <div className="min-h-[100dvh] bg-background" />
  return <SolutionView f={f} />
}

const CHIP_DELAY = 0.9

function SolutionView({ f }: { f: Derived }) {
  const router = useRouter()
  const { block } = f
  const pulse = useAnimationControls()
  useTrackOnce('solution_view', { block: f.code })

  useEffect(() => {
    const t = setTimeout(() => {
      pulse.start({
        scale: [1, 1.03, 1],
        boxShadow: [
          '0 0 0 0 rgba(54,245,85,0)',
          '0 0 0 6px rgba(54,245,85,0.25)',
          '0 0 0 0 rgba(54,245,85,0)',
        ],
        transition: { duration: 0.6 },
      })
    }, (CHIP_DELAY + 0.75) * 1000)
    return () => clearTimeout(t)
  }, [pulse])

  const [headBefore, headAfter] = block.headline.split('{time} por dia')
  const chips = [
    { icon: Target, label: f.area },
    { icon: Timer, label: f.time },
    { icon: Flame, label: f.mechanism.chip },
  ]
  const lines = [...block.lines, f.mechanism.card]
  const timeline = [
    { when: 'Semana 1', text: f.fill(block.timeline[0]) },
    { when: 'Mês 1', text: f.fill(block.timeline[1]) },
    { when: 'Dia 90', text: f.mirror },
  ]

  return (
    <div className="min-h-[100dvh] bg-background relative overflow-x-hidden">
      <header className="p-4 flex justify-center">
        <NexusLogo size="sm" />
      </header>

      <main id="main-content" className="max-w-md mx-auto px-5 pb-40 flex flex-col gap-8">
        {/* 1. Card do protocolo */}
        <motion.section
          animate={pulse}
          className="relative rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/15 to-primary/5 p-5 pt-6 text-center"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary">
            <Sparkles className="w-3 h-3" />
            Seu plano está pronto
          </span>
          <motion.div
            initial={{ opacity: 0, scale: 0.4, rotate: -30 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.15 }}
            className="mt-4"
          >
            <ProtocolEmblem code={f.code} size={104} />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-4 text-[26px] font-bold leading-none tracking-tight"
          >
            {block.protocol}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="mt-2.5 text-[17px] leading-snug text-balance"
          >
            {headBefore}
            <span className="font-bold text-primary">{f.time} por dia</span>
            {headAfter}
          </motion.p>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {chips.map((c, i) => (
              <motion.span
                key={c.label}
                initial={{ opacity: 0, y: 70, x: (i - 1) * 60, scale: 0.6 }}
                animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                transition={{ delay: CHIP_DELAY + i * 0.12, type: 'spring', stiffness: 300, damping: 20 }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/80 border border-primary/30 text-xs font-semibold"
              >
                <c.icon className="w-3.5 h-3.5 text-primary" />
                {c.label}
              </motion.span>
            ))}
          </div>
        </motion.section>

        {/* 2. Como funciona */}
        <section>
          <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary mb-3">Como funciona</h2>
          <div className="flex items-center gap-4">
            <ul className="flex-1 flex flex-col gap-3.5">
              {lines.map((l, i) => (
                <motion.li
                  key={l}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 * i }}
                  className="flex gap-2.5 text-sm leading-snug"
                >
                  <span className="w-5 h-5 mt-px rounded-md bg-primary flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-primary-foreground" strokeWidth={3} />
                  </span>
                  <span>
                    <Marked text={l} delay={0.4 + 0.2 * i} />
                  </span>
                </motion.li>
              ))}
            </ul>
            <MiniPhone area={f.areaKey} time={f.time} />
          </div>
        </section>

        {/* 3. Linha do tempo */}
        <div className="flex flex-col items-center -mb-4">
          <div className="relative h-[220px] w-full flex justify-center overflow-hidden [mask-image:linear-gradient(to_bottom,black_70%,transparent)]">
            <Image
              src="/images/personagem-forte-busto.webp"
              alt=""
              width={542}
              height={642}
              className="h-[260px] w-auto max-w-none -ml-12"
            />
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary -mt-2">Você no dia 90</p>
          <p className="font-bold text-lg leading-tight">Seus próximos 90 dias</p>
        </div>
        <section className="rounded-2xl bg-gradient-to-br from-secondary/30 to-secondary/10 border border-border/40 p-4 pt-5 pb-5">
          <div className="relative">
            <div className="absolute left-[16%] right-[16%] top-[7px] h-[2px] bg-secondary" />
            <motion.div
              className="absolute left-[16%] top-[7px] h-[2px] bg-primary origin-left"
              style={{ right: '16%' }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, delay: 0.2, ease: 'easeInOut' }}
            />
            <ol className="relative grid grid-cols-3 gap-2">
              {timeline.map((t, i) => (
                <li key={t.when} className="flex flex-col items-center text-center">
                  <motion.span
                    className="w-4 h-4 rounded-full border-2 border-primary bg-background"
                    initial={{ backgroundColor: '#020202' }}
                    whileInView={{ backgroundColor: '#36f555', boxShadow: '0 0 14px #36f555' }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.75 }}
                  />
                  <span className="mt-2 text-[11px] font-bold uppercase tracking-wide text-primary">{t.when}</span>
                  {i < 2 ? (
                    <span className="mt-1 text-[12px] leading-snug text-muted-foreground">{t.text}</span>
                  ) : (
                    <div className="relative mt-2 flex flex-col items-center">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1.8, type: 'spring', stiffness: 260 }}
                      >
                        <FutureYou area={f.areaKey} />
                      </motion.div>
                      <InViewConfetti />
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 2.1 }}
            className="mt-4 mx-auto w-fit max-w-full rounded-xl bg-primary text-primary-foreground text-[13px] font-bold px-3 py-2 text-center"
          >
            Dia 90: {f.mirrorLower}
          </motion.p>
        </section>
      </main>

      <StickyCta
        onClick={() => {
          track('solution_cta', { block: f.code })
          router.push('/onboarding/pact')
        }}
        note="Seu primeiro dia já está montado. Começa hoje."
      >
        {block.cta} →
      </StickyCta>
    </div>
  )
}

function InViewConfetti() {
  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <Confetti delay={1.9} />
    </motion.div>
  )
}
