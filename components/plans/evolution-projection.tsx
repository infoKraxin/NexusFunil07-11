'use client'

import { motion } from 'framer-motion'
import { Sparkles, TrendingUp } from 'lucide-react'

const SYSTEM_STATS = [
  { value: '12', label: 'Missões', sublabel: 'personalizadas' },
  { value: '8', label: 'Hábitos', sublabel: 'configurados' },
  { value: '3', label: 'Protocolos', sublabel: 'de evolução' },
]

const CURVE = 'M 0 85 C 30 82 60 75 90 68 C 120 61 150 50 180 38 C 210 26 240 18 270 12 L 300 8'

type EvolutionProjectionProps = {
  avgCurrent: number
  avgPotential: number
  improvement: number
}

export function EvolutionProjection({ avgCurrent, avgPotential, improvement }: EvolutionProjectionProps) {
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
            <p className="text-sm font-semibold text-white">Seu sistema foi criado</p>
            <p className="text-[11px] text-white/40">Baseado nas suas respostas</p>
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
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-sm font-semibold text-white">Sua Evolução</p>
            <p className="text-[11px] text-white/40">Projeção para 30 dias</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-white/20" />
              <span className="text-[10px] text-white/30">Atual</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-[10px] text-white/40">Projetado</span>
            </div>
          </div>
        </div>

        <div className="relative h-32">
          <svg
            className="w-full h-full"
            viewBox="0 0 300 100"
            preserveAspectRatio="none"
            role="img"
            aria-label={`Projeção de ${avgCurrent.toFixed(1)} para ${avgPotential.toFixed(1)} em 30 dias`}
          >
            <line x1="0" y1="25" x2="300" y2="25" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            <line x1="0" y1="50" x2="300" y2="50" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            <line x1="0" y1="75" x2="300" y2="75" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            <defs>
              <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgb(0,255,136)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="rgb(0,255,136)" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
                <stop offset="30%" stopColor="rgb(0,255,136)" />
                <stop offset="100%" stopColor="rgb(0,255,136)" />
              </linearGradient>
            </defs>
            <path d={`${CURVE} L 300 100 L 0 100 Z`} fill="url(#areaGradient)" />
            <path d={CURVE} fill="none" stroke="url(#lineGradient)" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="0" cy="85" r="4" fill="#1a1a1a" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
            <circle cx="300" cy="8" r="5" fill="#0a0a0a" stroke="rgb(0,255,136)" strokeWidth="2.5" />
          </svg>
          <div className="absolute left-1 top-[80%] -translate-y-1/2">
            <div className="px-1.5 py-0.5 rounded bg-white/10 text-[9px] text-white/50 font-medium">
              {avgCurrent.toFixed(1)}
            </div>
          </div>
          <div className="absolute right-1 top-[20%] -translate-y-1/2">
            <div className="px-2 py-1 rounded-lg bg-primary/20 border border-primary/30 text-xs text-primary font-bold">
              {avgPotential.toFixed(1)}
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-3 px-1">
          <span className="text-[10px] text-white/40">Hoje</span>
          <span className="text-[10px] text-white/30">Semana 2</span>
          <span className="text-[10px] text-white/40">Dia 30</span>
        </div>

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
            <p className="text-xs text-white/50">e comprometimento</p>
          </div>
        </div>
      </div>
      <p className="text-center text-xs text-white/40 mt-4">
        Ative seu acesso para desbloquear seu sistema personalizado
      </p>
    </motion.div>
  )
}
