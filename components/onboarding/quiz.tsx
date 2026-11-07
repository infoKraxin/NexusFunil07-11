'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Check, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { NexusButton } from '@/components/nexus/nexus-button'
import { NexusLogo } from '@/components/nexus/nexus-logo'
import { type FunnelAnswers, type QuestionStep, STEPS, writeFunnel } from '@/lib/funnel'
import { track } from '@/lib/track'
import { useFunnel } from '@/lib/use-funnel'
import { cn } from '@/lib/utils'
import { InsertionPattern, InsertionPhoneDays, InsertionProjection, InsertionWhyBefore } from './insertions'

const ANALYZING_ROUTE = '/onboarding/analyzing'
const TOTAL_QUESTIONS = 12
const AUTO_ADVANCE_MS = 320

export function Quiz() {
  const router = useRouter()
  const f = useFunnel()
  const [stepIndex, setStepIndex] = useState(0)
  const [selected, setSelected] = useState<string[]>([])
  const advancing = useRef(false)

  const step = STEPS[stepIndex]
  const lastQuestionNumber = STEPS.slice(0, stepIndex + 1).reduce(
    (n, s) => (s.kind === 'question' ? s.number : n),
    0,
  )
  const progress = (lastQuestionNumber / TOTAL_QUESTIONS) * 100
  const isLastStep = stepIndex === STEPS.length - 1

  useEffect(() => {
    writeFunnel(() => ({ answers: {} }))
    track('quiz_start')
  }, [])

  useEffect(() => {
    if (step.kind === 'insertion') track('insertion_view', { insertion: step.id })
    window.scrollTo(0, 0)
  }, [step])

  const restoreSelection = (index: number) => {
    const s = STEPS[index]
    if (s.kind !== 'question') return setSelected([])
    const prev = f.state.answers[s.key]
    setSelected(prev ? (Array.isArray(prev) ? prev : [prev]) : [])
  }

  const goTo = (index: number) => {
    advancing.current = false
    setStepIndex(index)
    restoreSelection(index)
  }

  const next = () => {
    if (isLastStep) {
      track('quiz_complete')
      router.push(ANALYZING_ROUTE)
      return
    }
    goTo(stepIndex + 1)
  }

  const save = (q: QuestionStep, values: string[]) => {
    const value = q.multiple ? values : values[0]
    writeFunnel((s) => ({ ...s, answers: { ...s.answers, [q.key]: value } as FunnelAnswers }))
    track('question_answer', { question: q.number, answer: value })
  }

  const pickSingle = (q: QuestionStep, value: string) => {
    if (advancing.current) return
    advancing.current = true
    setSelected([value])
    save(q, [value])
    setTimeout(next, AUTO_ADVANCE_MS)
  }

  const toggleMultiple = (q: QuestionStep, value: string) => {
    setSelected((prev) => {
      if (q.exclusive && value === q.exclusive) return prev.includes(value) ? [] : [value]
      const base = prev.filter((v) => v !== q.exclusive)
      return base.includes(value) ? base.filter((v) => v !== value) : [...base, value]
    })
  }

  const continueMultiple = (q: QuestionStep) => {
    save(q, selected)
    next()
  }

  const showButton = step.kind === 'insertion' || step.multiple

  return (
    <div className="min-h-[100dvh] bg-background flex flex-col relative">
      <header className="flex items-center justify-between px-4 pt-3 pb-1 shrink-0">
        <button
          type="button"
          onClick={() => stepIndex > 0 && goTo(stepIndex - 1)}
          disabled={stepIndex === 0}
          className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-secondary disabled:opacity-30 transition-colors"
          aria-label="Voltar"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex flex-col items-center gap-1">
          <NexusLogo size="sm" />
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="w-3 h-3 text-primary" />
            <span className="text-[10px] font-medium text-primary">Criando seu plano personalizado</span>
          </div>
        </div>
        <div className="w-9" />
      </header>

      <div className="px-5 pt-2 pb-3 shrink-0">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
          <span>{step.kind === 'question' ? `Pergunta ${step.number} de ${TOTAL_QUESTIONS}` : 'Seu resultado parcial'}</span>
          <span className="font-semibold text-primary">{Math.round(progress)}%</span>
        </div>
        <div
          className="h-1.5 bg-secondary rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <motion.div
            className="h-full bg-primary rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.35 }}
          />
        </div>
      </div>

      <main id="main-content" className={cn('flex-1 px-5 flex flex-col', showButton ? 'pb-36' : 'pb-8')}>
        <AnimatePresence mode="wait">
          <motion.div
            key={stepIndex}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.22 }}
            className="flex-1 flex flex-col max-w-md w-full mx-auto"
          >
            {step.kind === 'question' ? (
              <QuestionView
                q={step}
                selected={selected}
                onPick={(v) => (step.multiple ? toggleMultiple(step, v) : pickSingle(step, v))}
              />
            ) : step.id === 1 ? (
              <InsertionPhoneDays f={f} />
            ) : step.id === 2 ? (
              <InsertionPattern f={f} />
            ) : step.id === 3 ? (
              <InsertionProjection f={f} />
            ) : (
              <InsertionWhyBefore f={f} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {showButton && (
        <div className="fixed bottom-0 inset-x-0 px-5 pt-6 pb-[max(1.25rem,env(safe-area-inset-bottom))] bg-gradient-to-t from-background via-background to-transparent z-30">
          <div className="max-w-md mx-auto">
            <NexusButton
              onClick={() => (step.kind === 'question' ? continueMultiple(step) : next())}
              disabled={step.kind === 'question' && selected.length === 0}
              className="w-full h-13 py-3.5 text-base font-semibold bg-primary hover:bg-primary/90 gap-2 disabled:opacity-50 shadow-[0_8px_30px_-12px_var(--primary)]"
            >
              {isLastStep ? 'Ver meu diagnóstico' : 'Continuar'}
              <ChevronRight className="w-5 h-5" />
            </NexusButton>
          </div>
        </div>
      )}
    </div>
  )
}

function QuestionView({
  q,
  selected,
  onPick,
}: {
  q: QuestionStep
  selected: string[]
  onPick: (value: string) => void
}) {
  const grid = q.layout === 'grid'
  return (
    <>
      <h2 className="text-xl font-bold leading-tight text-balance text-center mt-4">{q.title}</h2>
      <p className="text-sm text-muted-foreground mt-1 text-center text-pretty leading-snug">{q.subtitle}</p>

      <div className="mt-6 pb-4" role={q.multiple ? 'group' : 'radiogroup'}>
        <div className={cn(grid ? 'grid grid-cols-2 gap-2.5' : 'flex flex-col gap-2.5')}>
          {q.options.map((o) => {
            const isSel = selected.includes(o.value)
            const Icon = o.icon
            return (
              <button
                key={o.value}
                type="button"
                role={q.multiple ? 'checkbox' : 'radio'}
                aria-checked={isSel}
                onClick={() => onPick(o.value)}
                className={cn(
                  'w-full rounded-2xl border transition-all text-left',
                  grid ? 'p-3 flex flex-col gap-1.5' : 'p-3 flex items-center gap-3',
                  isSel ? SELECTED : IDLE,
                )}
              >
                <div
                  className={cn(
                    'rounded-xl flex items-center justify-center shrink-0 transition-colors',
                    grid ? 'w-9 h-9 rounded-lg' : 'w-10 h-10',
                    isSel ? 'bg-primary text-primary-foreground' : 'bg-secondary',
                  )}
                >
                  <Icon className={grid ? 'w-4 h-4' : 'w-5 h-5'} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm leading-tight">{o.label}</p>
                  {o.desc && (
                    <p className={cn('text-xs text-muted-foreground leading-tight mt-0.5', grid && 'text-[11px]')}>{o.desc}</p>
                  )}
                </div>
                {!grid &&
                  (q.multiple ? (
                    <div
                      className={cn(
                        'w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors',
                        isSel ? 'bg-primary border-primary' : 'border-muted-foreground/40',
                      )}
                    >
                      {isSel && <Check className="w-3.5 h-3.5 text-primary-foreground" />}
                    </div>
                  ) : (
                    <ChevronRight
                      className={cn('w-4 h-4 shrink-0 transition-colors', isSel ? 'text-primary' : 'text-muted-foreground/40')}
                    />
                  ))}
              </button>
            )
          })}
        </div>
      </div>
    </>
  )
}

const SELECTED = 'border-primary bg-primary/10 ring-1 ring-primary/40 shadow-[0_6px_24px_-12px_var(--primary)]'
const IDLE = 'border-border hover:border-primary/50'
