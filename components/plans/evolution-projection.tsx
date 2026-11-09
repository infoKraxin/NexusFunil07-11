'use client'

import { AToB } from '@/components/funnel/a-to-b'
import { motion } from 'framer-motion'
import { Sparkles, TrendingUp } from 'lucide-react'

const SYSTEM_STATS = [
  { value: '12', label: 'Missões', sublabel: 'personalizadas' },
  { value: '8', label: 'Hábitos', sublabel: 'configurados' },
  { value: '3', label: 'Protocolos', sublabel: 'de evolução' },
]


type EvolutionProjectionProps = {
  avgCurrent: number
  avgPotential: number
  improvement: number
  protocol?: string
}

export function EvolutionProjection({ avgCurrent, avgPotential, improvement, protocol = 'Seu plano' }: EvolutionProjectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="px-4 pb-8 mt-[-20px]"
    >
      <div className="flex items-center mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{protocol} montado</p>
            <p className="text-[11px] text-white/40">Com base nas suas 12 respostas</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {SYSTEM_STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 + 0.05 * i }}
            className="relative p-4 rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/[0.08] text-center overflow-hidden"
          >
            <p className="text-2xl font-bold text-white mb-0.5">{stat.value}</p>
            <p className="text-xs text-white/60">{stat.label}</p>
            <p className="text-[10px] text-white/30">{stat.sublabel}</p>
          </motion.div>
        ))}
      </div>

      <div className="p-5 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06]">
        <div className="mb-4">
          <p className="text-sm font-semibold text-white">Sua Evolução</p>
          <p className="text-[11px] text-white/40">Do ponto A ao ponto B em 30 dias</p>
        </div>
        <AToB
          fromValue={avgCurrent.toFixed(1)}
          fromSub="Score atual"
          toValue={avgPotential.toFixed(1)}
          toSub="Score projetado"
          endLabel="Dia 30"
          ticks={['Hoje', 'Semana 1', 'Semana 2']}
        />

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/[0.04]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-white/50">Melhoria projetada</p>
              <p className="text-lg font-bold text-primary">+{improvement}%</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-white/30">Baseado no seu perfil</p>
            <p className="text-xs text-white/50">e no seu pacto</p>
          </div>
        </div>
      </div>
      <p className="text-center text-xs text-white/40 mt-4">
        Seu pacto começa no momento em que você ativa o acesso
      </p>
    </motion.div>
  )
}
