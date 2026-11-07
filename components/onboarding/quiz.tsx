'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { NexusButton } from '@/components/nexus/nexus-button'
import { NexusLogo } from '@/components/nexus/nexus-logo'
import { BODY_METRICS_STORAGE_KEY, QUIZ_STORAGE_KEY, type QuizAnswer } from '@/lib/diagnosis'
import { BodyMetricsStep } from './body-metrics-step'
import { FocusOptions, MultipleOptions, ScaleOptions, SingleOptions } from './quiz-options'
import { QUIZ_QUESTIONS } from './quiz-questions'

const ANALYZING_ROUTE = '/onboarding/analyzing'

export function Quiz() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswer[]>([])
  const [selected, setSelected] = useState<string[]>([])
  const [height, setHeight] = useState(170)
  const [weight, setWeight] = useState(70)

  const question = QUIZ_QUESTIONS[step]
  const progress = ((step + 1) / QUIZ_QUESTIONS.length) * 100
  const bmi = height <= 0 || weight <= 0 ? 0 : weight / (height / 100) ** 2
  const canContinue = question.type === 'body' || selected.length > 0
  const isLast = step === QUIZ_QUESTIONS.length - 1

  const saveAnswers = (next: QuizAnswer[]) => {
    setAnswers(next)
    localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(next))
  }

  const selectSingle = (value: string) => setSelected([value])

  const toggleMultiple = (value: string) =>
    setSelected((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]))

  const goBack = () => {
    if (step === 0) return
    const previous = answers.find((a) => a.questionId === QUIZ_QUESTIONS[step - 1].id)
    setStep((s) => s - 1)
    if (previous) {
      setSelected(previous.answer.includes(',') ? previous.answer.split(',') : [String(previous.answer)])
    }
  }

  const skipBodyMetrics = () => {
    localStorage.setItem(BODY_METRICS_STORAGE_KEY, JSON.stringify({ skipped: true }))
    saveAnswers([...answers.filter((a) => a.questionId !== 8), { questionId: 8, answer: 'skipped' }])
    router.push(ANALYZING_ROUTE)
  }

  const handleNext = () => {
    if (question.type === 'body') {
      const roundedBmi = parseFloat(bmi.toFixed(1))
      localStorage.setItem(BODY_METRICS_STORAGE_KEY, JSON.stringify({ height, weight, bmi: roundedBmi }))
      saveAnswers([
        ...answers.filter((a) => a.questionId !== question.id),
        { questionId: question.id, answer: `${height}cm,${weight}kg,${bmi.toFixed(1)}` },
      ])
      router.push(ANALYZING_ROUTE)
      return
    }

    const answer: QuizAnswer = {
      questionId: question.id,
      answer: question.type === 'multiple' ? selected.join(',') : selected[0],
    }
    saveAnswers([...answers.filter((a) => a.questionId !== question.id), answer])

    if (!isLast) {
      setStep((s) => s + 1)
      setSelected([])
    } else {
      router.push(ANALYZING_ROUTE)
    }
  }

  return (
    <div className="h-[100dvh] bg-background flex flex-col overflow-hidden relative">
      <header className="flex items-center justify-between px-4 pt-3 pb-1 shrink-0 relative z-10">
        <button
          type="button"
          onClick={goBack}
          disabled={step === 0}
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
          <span>
            Pergunta {step + 1} de {QUIZ_QUESTIONS.length}
          </span>
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
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <main id="main-content" className="flex-1 min-h-0 px-5 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25 }}
            className="flex-1 min-h-0 flex flex-col"
          >
            <h2 className="text-xl font-bold leading-tight text-balance text-center">{question.question}</h2>
            {question.subtitle && (
              <p className="text-sm text-muted-foreground mt-1 mb-3 leading-snug text-pretty text-center">
                {question.subtitle}
              </p>
            )}

            {question.type === 'single' && question.options && (
              <SingleOptions options={question.options} selected={selected} onSelect={selectSingle} />
            )}
            {question.type === 'multiple' && question.options && (
              <MultipleOptions options={question.options} selected={selected} onSelect={toggleMultiple} />
            )}
            {question.type === 'focus' && question.options && (
              <FocusOptions options={question.options} selected={selected} onSelect={selectSingle} />
            )}
            {question.type === 'scale' && question.options && (
              <ScaleOptions options={question.options} selected={selected} onSelect={selectSingle} />
            )}
            {question.type === 'body' && (
              <BodyMetricsStep
                height={height}
                weight={weight}
                bmi={bmi}
                onHeightChange={setHeight}
                onWeightChange={setWeight}
                onSkip={skipBodyMetrics}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <div className="px-5 pt-3 pb-5 shrink-0">
        <NexusButton
          onClick={handleNext}
          disabled={!canContinue}
          className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 gap-2 disabled:opacity-50 shadow-[0_8px_30px_-12px_var(--primary)]"
        >
          {/* NBSP: UTMify's pixel treats any button containing "proximo passo" as a checkout and would fire InitiateCheckout on every quiz step. */}
          {isLast ? 'Analisar meu perfil' : 'Proximo\u00A0passo'}
          <ChevronRight className="w-5 h-5" />
        </NexusButton>
      </div>
    </div>
  )
}
