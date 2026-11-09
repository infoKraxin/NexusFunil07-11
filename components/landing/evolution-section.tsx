'use client'

import { motion } from 'framer-motion'
import { ArrowRight, TrendingDown, TrendingUp, Zap } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { AfterRadarChart, BeforeRadarChart } from '@/components/nexus/landing-radar-chart'
import { nexusButtonVariants } from '@/components/nexus/nexus-button'
import { cn } from '@/lib/utils'

const BEFORE_POINTS = ['Procrastinação constante', 'Falta de motivação diária', 'Objetivos não alcançados']
const AFTER_POINTS = ['Foco máximo diariamente', 'Motivação inabalável', 'Metas superadas consistentemente']

const inView = { once: true, margin: '-50px' } as const

export function EvolutionSection() {
  return (
    <section className="py-24 px-6 overflow-hidden relative">
      <div className="absolute inset-0 opacity-30" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[80px]" />
      </div>
      <div className="max-w-7xl mx-auto relative">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.4 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Transformação Real</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Sua Evolução em <span className="text-primary">66 Dias</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Um estudo da University College London mostrou que um hábito leva, em média, 66 dias pra virar automático. É essa virada que o Nexus acompanha.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-8 lg:gap-16 items-center justify-items-center max-w-6xl mx-auto">
          <motion.div
            className="relative w-full max-w-md"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={inView}
            transition={{ duration: 0.5 }}
          >
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-background to-secondary/30 border border-border/50 p-8 px-0">
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none z-10" />
              <div className="relative h-[400px] md:h-[500px] mb-8 flex items-end justify-center">
                <div className="relative w-[300px] h-full">
                  <Image
                    src="/images/personagem-fraco.png"
                    alt="Você antes do Nexus - personagem fraco"
                    fill
                    className="object-contain object-bottom"
                    sizes="(max-width: 768px) 300px, 400px"
                    quality={90}
                  />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] md:w-[240px] opacity-90">
                  <BeforeRadarChart />
                </div>
              </div>
              <div className="text-center relative z-20">
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-destructive/20 border border-destructive/30">
                  <TrendingDown className="w-5 h-5 text-destructive" />
                  <span className="font-semibold text-lg">Você antes do Nexus</span>
                </div>
                <div className="mt-4 flex flex-col gap-2">
                  <div className="text-4xl font-bold text-destructive">3.4</div>
                  <p className="text-sm text-muted-foreground">Performance Média</p>
                </div>
              </div>
            </div>
            <motion.div
              className="mt-6 flex flex-col gap-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={inView}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              {BEFORE_POINTS.map((point) => (
                <div key={point} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-destructive/50" />
                  <span>{point}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="relative w-full max-w-md"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={inView}
            transition={{ duration: 0.5 }}
          >
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-background to-primary/5 border border-primary/30 p-8 shadow-[0_0_50px_rgba(0,255,136,0.15)] px-0">
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none z-10" />
              <div className="relative h-[400px] md:h-[500px] mb-8 flex items-end justify-center">
                <div className="relative w-[300px] h-full">
                  <Image
                    src="/images/personagem-forte.png"
                    alt="Você depois do Nexus - personagem forte"
                    fill
                    className="object-contain object-bottom"
                    sizes="(max-width: 768px) 300px, 400px"
                    quality={90}
                  />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] md:w-[240px] opacity-90">
                  <AfterRadarChart />
                </div>
              </div>
              <div className="text-center relative z-20">
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/20 border border-primary/30 shadow-[0_0_20px_rgba(0,255,136,0.15)]">
                  <Zap className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-lg">Você depois do Nexus</span>
                </div>
                <div className="mt-4 flex flex-col gap-2">
                  <div className="text-4xl font-bold text-primary drop-shadow-[0_0_10px_rgba(0,255,136,0.5)]">8.1</div>
                  <p className="text-sm text-muted-foreground">Performance Média</p>
                </div>
              </div>
            </div>
            <motion.div
              className="mt-6 flex flex-col gap-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={inView}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              {AFTER_POINTS.map((point) => (
                <div key={point} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(0,255,136,0.6)]" />
                  <span>{point}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <Link
            href="/onboarding/quiz"
            className={cn(
              nexusButtonVariants({ size: 'lg' }),
              'bg-primary text-primary-foreground hover:bg-primary/90 gap-2 text-lg px-12 shadow-[0_0_30px_rgba(0,255,136,0.3)] hover:shadow-[0_0_40px_rgba(0,255,136,0.5)] transition-all',
            )}
          >
            Iniciar Minha Transformação
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
