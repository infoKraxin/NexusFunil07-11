'use client'

import { motion } from 'framer-motion'
import { Activity, type LucideIcon, Ruler, Sparkles, Weight } from 'lucide-react'

const SLIDER_CLASS =
  'w-full h-1.5 appearance-none rounded-full bg-secondary cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-[0_2px_8px_-2px_var(--primary)] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-background [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-background'

export type BmiInfo = { label: string; color: string; bg: string }

export function getBmiInfo(bmi: number): BmiInfo {
  if (bmi < 18.5) return { label: 'Abaixo do peso', color: 'text-yellow-400', bg: 'bg-yellow-400' }
  if (bmi < 25) return { label: 'Peso ideal', color: 'text-primary', bg: 'bg-primary' }
  if (bmi < 30) return { label: 'Sobrepeso', color: 'text-orange-400', bg: 'bg-orange-400' }
  return { label: 'Obesidade', color: 'text-red-400', bg: 'bg-red-400' }
}

function bmiMarkerPercent(bmi: number) {
  return Math.max(0, Math.min(100, ((bmi - 15) / 25) * 100))
}

function bmiInsight(bmi: number) {
  if (bmi < 18.5)
    return 'Voce esta abaixo do peso ideal. O NEXUS vai criar um plano com foco em nutricao e ganho de massa saudavel.'
  if (bmi < 25) return 'Voce esta no peso ideal! O NEXUS vai ajudar a manter seus resultados e otimizar sua performance.'
  if (bmi < 30) return 'O NEXUS vai criar um plano de habitos, nutricao e exercicios para atingir seu peso ideal.'
  return 'Sua saude e prioridade. O NEXUS vai criar um plano gradual e sustentavel para voce.'
}

type MetricSliderProps = {
  id: string
  label: string
  icon: LucideIcon
  unit: string
  min: number
  max: number
  value: number
  onChange: (value: number) => void
}

function MetricSlider({ id, label, icon: Icon, unit, min, max, value, onChange }: MetricSliderProps) {
  return (
    <div className="rounded-2xl border border-border bg-secondary/30 p-3">
      <label htmlFor={id} className="block text-[10px] font-semibold text-muted-foreground mb-2 tracking-wider">
        {label}
      </label>
      <div className="flex items-center gap-3">
        <Icon className="w-4 h-4 text-primary flex-shrink-0" aria-hidden="true" />
        <div className="flex-1">
          <input
            id={id}
            type="range"
            min={min}
            max={max}
            step={1}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className={SLIDER_CLASS}
          />
        </div>
        <div className="min-w-[64px] text-right">
          <span className="text-xl font-bold tabular-nums">{value}</span>
          <span className="text-xs text-muted-foreground ml-0.5">{unit}</span>
        </div>
      </div>
    </div>
  )
}

type BodyMetricsStepProps = {
  height: number
  weight: number
  bmi: number
  onHeightChange: (value: number) => void
  onWeightChange: (value: number) => void
  onSkip: () => void
}

export function BodyMetricsStep({ height, weight, bmi, onHeightChange, onWeightChange, onSkip }: BodyMetricsStepProps) {
  const info = getBmiInfo(bmi)
  const marker = `calc(${bmiMarkerPercent(bmi)}% - 6px)`

  return (
    <div className="flex-1 min-h-0 flex flex-col justify-center gap-2.5">
      <MetricSlider
        id="height"
        label="ALTURA"
        icon={Ruler}
        unit="cm"
        min={140}
        max={210}
        value={height}
        onChange={onHeightChange}
      />
      <MetricSlider
        id="weight"
        label="PESO"
        icon={Weight}
        unit="kg"
        min={40}
        max={150}
        value={weight}
        onChange={onWeightChange}
      />

      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-3">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-semibold flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-primary" />
            Seu IMC
          </h3>
          <div className="flex items-center gap-2">
            <motion.span
              key={bmi.toFixed(1)}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`text-2xl font-bold tabular-nums leading-none ${info.color}`}
            >
              {bmi.toFixed(1)}
            </motion.span>
            <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${info.bg} text-black`}>{info.label}</div>
          </div>
        </div>
        <div className="relative h-2 rounded-full overflow-hidden mb-1" aria-hidden="true">
          <div className="absolute inset-0 flex">
            <div className="flex-[3.5] bg-yellow-400/60 rounded-l-full" />
            <div className="flex-[6.5] bg-primary/60" />
            <div className="flex-[5] bg-orange-400/60" />
            <div className="flex-[10] bg-red-400/60 rounded-r-full" />
          </div>
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white border-2 border-background shadow-sm"
            style={{ left: marker }}
            animate={{ left: marker }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          />
        </div>
        <div className="flex justify-between text-[9px] text-muted-foreground">
          <span>Abaixo</span>
          <span>Ideal</span>
          <span>Sobre</span>
          <span>Obeso</span>
        </div>
      </div>

      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-2.5 flex items-start gap-2.5">
        <Sparkles className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-[10px] font-semibold text-primary mb-0.5">Analise NEXUS IA</p>
          <p className="text-[11px] text-muted-foreground leading-snug">{bmiInsight(bmi)}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={onSkip}
        className="w-full text-center text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        Prefiro nao informar
      </button>
    </div>
  )
}
