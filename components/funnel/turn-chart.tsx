'use client'

import { motion } from 'framer-motion'
import type { BlockCode } from '@/lib/funnel'

// "Hoje" muda conforme o bloqueio; "Dia 90" é sempre a mesma subida.
const TODAY: Record<BlockCode | 'base', { d: string; dash?: string }> = {
  // serrilhada: sobe, cai, sobe, cai
  R: { d: 'M10 140 L45 105 L60 140 L95 102 L110 140 L145 100 L160 140 L195 104 L210 140' },
  // picotada
  D: { d: 'M10 128 C 50 120, 90 136, 130 124 S 190 132, 210 126', dash: '3 9' },
  // parada no zero
  P: { d: 'M10 140 L210 140' },
  // sem rumo
  A: { d: 'M10 120 C 40 95, 60 150, 90 125 S 140 100, 160 135 S 200 115, 210 128' },
  base: { d: 'M10 132 C 60 128, 120 136, 210 130' },
}

const FUTURE = 'M10 140 C 90 138, 170 120, 230 80 S 290 28, 306 22'

export function TurnChart({ code, balloon, delay = 0.2 }: { code?: BlockCode; balloon: string; delay?: number }) {
  const today = TODAY[code ?? 'base']
  return (
    <div className="relative w-full pt-12">
      <svg viewBox="0 0 320 170" className="w-full h-auto overflow-visible" aria-hidden="true">
        <defs>
          <linearGradient id="futureFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#36f555" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#36f555" stopOpacity="0" />
          </linearGradient>
          {today.dash && (
            <mask id="todayDash" maskUnits="userSpaceOnUse">
              <path d={today.d} fill="none" stroke="#fff" strokeWidth="6" strokeDasharray={today.dash} />
            </mask>
          )}
        </defs>
        {[40, 80, 120].map((y) => (
          <line key={y} x1="0" x2="320" y1={y} y2={y} stroke="#ffffff" strokeOpacity="0.05" />
        ))}
        <line x1="0" x2="320" y1="150" y2="150" stroke="#ffffff" strokeOpacity="0.15" />

        {/* hoje */}
        <motion.path
          d={today.d}
          fill="none"
          stroke="#8a8f98"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          mask={today.dash ? 'url(#todayDash)' : undefined}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, delay, ease: 'easeInOut' }}
        />

        {/* área sob a curva futura */}
        <motion.path
          d={`${FUTURE} L306 150 L10 150 Z`}
          fill="url(#futureFill)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: delay + 1.6 }}
        />
        <motion.path
          d={FUTURE}
          fill="none"
          stroke="#36f555"
          strokeWidth="4"
          strokeLinecap="round"
          className="neon-glow"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.3, delay: delay + 1, ease: 'easeInOut' }}
        />
        <motion.circle
          cx="306"
          cy="22"
          r="6"
          fill="#36f555"
          className="neon-glow"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: delay + 2.2, type: 'spring', stiffness: 400 }}
        />

        <text x="10" y="166" fill="#8a8f98" fontSize="11" fontWeight="600">
          Hoje
        </text>
        <text x="306" y="166" fill="#36f555" fontSize="11" fontWeight="700" textAnchor="end">
          Dia 90
        </text>
      </svg>

      <motion.div
        initial={{ opacity: 0, y: 8, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: delay + 2.3, type: 'spring', stiffness: 300, damping: 20 }}
        className="absolute right-0 top-0 max-w-[70%] rounded-xl rounded-br-sm bg-primary text-primary-foreground text-[12px] font-bold leading-snug px-3 py-2 shadow-[0_8px_24px_-8px_var(--primary)]"
      >
        {balloon}
      </motion.div>
    </div>
  )
}
