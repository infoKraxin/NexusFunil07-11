'use client'

import { motion } from 'framer-motion'
import { ChevronRight, Flame, Sparkles, Target, TrendingUp } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { NexusLogo } from '@/components/nexus/nexus-logo'
import {
  averageOf,
  challengeLabels,
  computeDiagnosis,
  DEFAULT_QUIZ_DATA,
  focusLabels,
  improvementPercent,
  projectRadar,
} from '@/lib/diagnosis'
import { useQuizData } from '@/lib/use-quiz-data'
import { cn } from '@/lib/utils'
import { DiagnosisRadar } from './diagnosis-radar'

const PERIODS = [30, 60, 90] as const

export function Results() {
  const router = useRouter()
  const quiz = useQuizData() ?? DEFAULT_QUIZ_DATA
  const [period, setPeriod] = useState<(typeof PERIODS)[number]>(30)

  const diagnosis = useMemo(() => computeDiagnosis(quiz), [quiz])
  const current = diagnosis.radar
  const projected = projectRadar(current, period)
  const projectedAverage = averageOf(projected)
  const improvement = improvementPercent(current, projected)
  const challenge = challengeLabels[quiz.challenge] || quiz.challenge
  const focus = focusLabels[quiz.focus] || quiz.focus

  const summary = [
    { icon: TrendingUp, label: 'Melhoria', value: `+${improvement}%`, color: 'text-primary' },
    { icon: Target, label: 'Áreas', value: `${Math.max(quiz.goals.length, 1)}/6`, color: 'text-blue-400' },
    { icon: Flame, label: 'Plano', value: `${period}d`, color: 'text-orange-400' },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none"
        aria-hidden="true"
      />
      <header className="p-4 flex items-center justify-center relative z-10">
        <NexusLogo size="sm" />
      </header>

      <main id="main-content" className="flex-1 px-5 py-2 overflow-y-auto pb-32 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary mb-3">
            <Sparkles className="w-3 h-3" />
            Análise Completa
          </div>
          <h1 className="text-2xl font-bold mb-1 text-balance">Sua Transformação</h1>
          <p className="text-muted-foreground text-sm text-pretty">
            Seu maior desafio é <span className="text-primary font-medium">{challenge}</span> e seu foco principal é{' '}
            <span className="text-primary font-medium">{focus}</span>. Veja o que o NEXUS pode fazer por você:
          </p>
        </motion.div>

        <div className="flex gap-2 mb-6 p-1 bg-secondary/20 rounded-xl" role="tablist" aria-label="Período do plano">
          {PERIODS.map((p) => (
            <button
              key={p}
              type="button"
              role="tab"
              aria-selected={period === p}
              onClick={() => setPeriod(p)}
              className={cn(
                'flex-1 py-2.5 rounded-lg font-medium text-sm transition-all relative',
                period === p ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {period === p && (
                <motion.div
                  layoutId="periodBg"
                  className="absolute inset-0 bg-primary rounded-lg shadow-lg shadow-primary/25"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                />
              )}
              <span className="relative z-10">{p} dias</span>
            </button>
          ))}
        </div>

        <motion.div
          key={`current-${period}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-5 mb-4 bg-gradient-to-br from-secondary/30 to-secondary/10 border border-border/30"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-primary/50 animate-pulse" />
            <span className="text-sm font-semibold text-muted-foreground">Você Hoje</span>
          </div>
          <DiagnosisRadar data={current} type="current" />
          <div className="text-center mt-3 pt-3 border-t border-border/30">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground/60 mb-0.5">Score total</p>
            <span className="text-3xl font-bold text-muted-foreground">{diagnosis.avgCurrent.toFixed(1)}</span>
            <span className="text-sm text-muted-foreground/60 ml-1">/ 10</span>
          </div>
        </motion.div>

        <motion.div
          key={`potential-${period}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl p-5 mb-4 bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/30"
        >
          <div className="flex items-center justify-center gap-2 mb-2 relative">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-semibold text-primary">Você em {period} dias</span>
          </div>
          <DiagnosisRadar data={projected} type="potential" />
          <div className="text-center mt-3 pt-3 border-t border-primary/20 relative">
            <p className="text-[11px] uppercase tracking-wider text-primary/70 mb-0.5">Score total</p>
            <span className="text-4xl font-bold text-primary">{projectedAverage.toFixed(1)}</span>
            <span className="text-sm text-primary/60 ml-1">/ 10</span>
          </div>
        </motion.div>

        <p className="text-center text-sm font-semibold mb-3 text-balance">A maior evolução, é agora</p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-3"
        >
          {summary.map((item) => (
            <div key={item.label} className="rounded-xl p-4 text-center bg-secondary/20 border border-border/30">
              <item.icon className={cn('w-5 h-5 mx-auto mb-2', item.color)} />
              <p className={cn('text-xl font-bold', item.color)}>{item.value}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{item.label}</p>
            </div>
          ))}
        </motion.div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-background via-background to-transparent z-50">
        <motion.button
          type="button"
          onClick={() => router.push('/onboarding/solution')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group w-full h-14 text-base sm:text-lg whitespace-nowrap bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl shadow-xl shadow-primary/30 relative overflow-hidden flex items-center justify-center gap-2"
        >
          <span className="relative z-10 flex items-center gap-2">
            Me comprometo com minha evolução
            <ChevronRight className="w-5 h-5" />
          </span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.7 }}
          />
        </motion.button>
      </div>
    </div>
  )
}
