'use client'

import { motion } from 'framer-motion'
import {
  Compass,
  Crosshair,
  Dumbbell,
  Flame,
  Footprints,
  GraduationCap,
  type LucideIcon,
  Sun,
  TrendingUp,
} from 'lucide-react'
import type { BlockCode } from '@/lib/funnel'
import { cn } from '@/lib/utils'

const EMBLEM_ICON: Record<BlockCode, LucideIcon> = { R: Flame, D: Crosshair, P: Footprints, A: Compass }

/** Emblema neon do protocolo, girando devagar como item desbloqueado. */
export function ProtocolEmblem({ code, size = 112 }: { code: BlockCode; size?: number }) {
  const Icon = EMBLEM_ICON[code]
  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
      <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl" aria-hidden="true" />
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute inset-0 neon-glow"
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        aria-hidden="true"
      >
        <polygon points="50,4 90,27 90,73 50,96 10,73 10,27" fill="none" stroke="#36f555" strokeWidth="2.5" />
        <polygon
          points="50,14 81,32 81,68 50,86 19,68 19,32"
          fill="#36f555"
          fillOpacity="0.08"
          stroke="#36f555"
          strokeOpacity="0.5"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
      </motion.svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <Icon className="text-primary neon-glow" style={{ width: size * 0.36, height: size * 0.36 }} strokeWidth={2.2} />
      </div>
    </div>
  )
}

const FUTURE_ICON: Record<string, LucideIcon> = {
  corpo: Dumbbell,
  estudos: GraduationCap,
  dinheiro: TrendingUp,
  mente: Sun,
}

/** "Você no futuro" — ilustração pequena conforme a área escolhida (P9). */
export function FutureYou({ area, className }: { area: string; className?: string }) {
  const Icon = FUTURE_ICON[area] ?? Sun
  return (
    <div
      className={cn(
        'w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-[0_0_28px_-4px_var(--primary)]',
        className,
      )}
    >
      <Icon className="w-7 h-7 text-primary-foreground" strokeWidth={2.4} />
    </div>
  )
}

export function Confetti({ delay = 0 }: { delay?: number }) {
  const pieces = Array.from({ length: 14 })
  const colors = ['#36f555', '#ffd60a', '#ffffff', '#00b6be']
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {pieces.map((_, i) => {
        const angle = (i / pieces.length) * Math.PI * 2
        const dist = 34 + (i % 3) * 12
        return (
          <motion.span
            key={i}
            className="absolute left-1/2 top-1/2 w-1.5 h-2.5 rounded-[1px]"
            style={{ backgroundColor: colors[i % colors.length] }}
            initial={{ x: 0, y: 0, opacity: 0, rotate: 0 }}
            animate={{
              x: Math.cos(angle) * dist,
              y: Math.sin(angle) * dist + 18,
              opacity: [0, 1, 1, 0],
              rotate: 200 + i * 30,
            }}
            transition={{ delay, duration: 1.4, ease: 'easeOut' }}
          />
        )
      })}
    </div>
  )
}

/** Print pequeno do app (mock) em moldura de celular. */
export function MiniPhone({ area, time }: { area: string; time: string }) {
  const missions: Record<string, string[]> = {
    corpo: ['Treino de 15 min', 'Beber 2L de água', 'Dormir antes das 23h'],
    estudos: ['1 bloco de estudo', 'Revisar anotações', 'Celular fora do quarto'],
    dinheiro: ['Anotar gastos do dia', 'Zero compra por impulso', 'Ler 10 páginas'],
    mente: ['5 min sem tela', 'Escrever 3 linhas', 'Caminhada curta'],
  }
  const list = missions[area] ?? missions.mente
  return (
    <div className="w-[112px] shrink-0 rounded-[20px] border-[3px] border-zinc-700 bg-black p-1.5 shadow-[0_10px_30px_-12px_var(--primary)]">
      <div className="mx-auto mb-1.5 h-1 w-8 rounded-full bg-zinc-700" />
      <div className="rounded-xl bg-card px-2 py-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[8px] font-bold text-primary">DIA 1</span>
          <span className="text-[8px] text-muted-foreground">🔥 1</span>
        </div>
        <div className="mt-1.5 h-1 rounded-full bg-secondary overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: '0%' }}
            whileInView={{ width: '66%' }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 1 }}
          />
        </div>
        <p className="text-[7px] text-muted-foreground mt-1">{time} · 120 XP</p>
        <ul className="mt-2 flex flex-col gap-1.5">
          {list.map((m, i) => (
            <li key={m} className="flex items-center gap-1">
              <motion.span
                className="w-2.5 h-2.5 rounded-[3px] border border-primary shrink-0"
                initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
                whileInView={{ backgroundColor: i < 2 ? '#36f555' : 'rgba(0,0,0,0)' }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 + i * 0.4 }}
              />
              <span className="text-[7.5px] leading-tight">{m}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
