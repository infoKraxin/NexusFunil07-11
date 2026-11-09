'use client'

import { motion, useInView } from 'framer-motion'
import { useEffect, useId, useRef, useState } from 'react'

// Duas trajetórias a partir do mesmo ponto A:
//  - Sem o NEXUS: instável, sobe e desce, mas não sai do lugar.
//  - Com o NEXUS: sobe de forma consistente até o ponto B.

const W = 340
const H = 210
const A = { x: 22, y: 186 }
const B = { x: 318, y: 24 }
const WITHOUT = `M${A.x} ${A.y} C 46 179, 70 176, 96 172 S 132 168, 154 165 S 192 162, 216 157 S 254 154, 276 149 S 304 146, ${B.x} 140`
const WITH = `M${A.x} ${A.y} C 70 130, 112 84, 164 62 S 262 30, ${B.x} ${B.y}`

export function AToB({
  fromSub,
  toSub,
  endLabel = 'Dia 90',
  ticks = ['Hoje', 'Semana 1', 'Mês 1'],
  fromValue,
  toValue,
}: {
  fromSub?: string
  toSub?: string
  endLabel?: string
  ticks?: string[]
  fromValue?: string
  toValue?: string
}) {
  const id = useId().replace(/:/g, '')
  const wrapRef = useRef<HTMLDivElement>(null)
  const withRef = useRef<SVGPathElement>(null)
  const inView = useInView(wrapRef, { once: true, margin: '-40px' })
  const [dot, setDot] = useState<{ x: number; y: number } | null>(null)
  const [guide, setGuide] = useState<{ x: number; y: number } | null>(null)

  // ponto da linha verde na altura do penúltimo marco do eixo
  useEffect(() => {
    const p = withRef.current
    if (!p) return
    const n = ticks.length
    const targetX = A.x + ((B.x - A.x) * (n - 1)) / n
    const len = p.getTotalLength()
    let best = p.getPointAtLength(0)
    for (let l = 0; l <= len; l += 1) {
      const pt = p.getPointAtLength(l)
      if (Math.abs(pt.x - targetX) < Math.abs(best.x - targetX)) best = pt
    }
    setGuide({ x: best.x, y: best.y })
  }, [ticks.length])

  useEffect(() => {
    if (!inView) return
    const p = withRef.current
    if (!p) return
    const len = p.getTotalLength()
    let raf = 0
    let start = 0
    const DELAY = 2300
    const LOOP = 2400
    const tick = (t: number) => {
      if (!start) start = t
      const e = t - start - DELAY
      if (e > 0) {
        const pt = p.getPointAtLength(len * ((e % LOOP) / LOOP))
        setDot({ x: pt.x, y: pt.y })
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView])

  const allTicks = [...ticks, endLabel]

  return (
    <div ref={wrapRef} className="w-full">
      {/* legenda */}
      <div className="flex items-center gap-4 mb-3 text-[11px]">
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <span className="w-4 h-[3px] rounded-full bg-zinc-500" /> Sem o NEXUS
        </span>
        <span className="flex items-center gap-1.5 text-primary font-semibold">
          <span className="w-4 h-[3px] rounded-full bg-primary shadow-[0_0_6px_var(--primary)]" /> Com o NEXUS
        </span>
      </div>

      <div className="relative pt-14">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto overflow-visible" aria-hidden="true">
          <defs>
            <linearGradient id={`with-${id}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#36f555" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#36f555" />
            </linearGradient>
            <linearGradient id={`area-${id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#36f555" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#36f555" stopOpacity="0" />
            </linearGradient>
            <radialGradient id={`glow-${id}`}>
              <stop offset="0%" stopColor="#36f555" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#36f555" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* grade */}
          {[46, 92, 138].map((y) => (
            <line key={y} x1="0" x2={W} y1={y} y2={y} stroke="#fff" strokeOpacity="0.05" strokeDasharray="2 5" />
          ))}
          <line x1={A.x} x2={W} y1={A.y} y2={A.y} stroke="#fff" strokeOpacity="0.15" />
          {allTicks.map((t, i) => {
            const x = A.x + ((B.x - A.x) * i) / (allTicks.length - 1)
            const last = i === allTicks.length - 1
            return (
              <text
                key={t}
                x={x}
                y={A.y + 16}
                textAnchor={i === 0 ? 'start' : last ? 'end' : 'middle'}
                fontSize="10"
                fontWeight={last ? 700 : 500}
                fill={last ? '#36f555' : '#71767d'}
              >
                {t}
              </text>
            )
          })}

          {/* Sem o NEXUS */}
          <motion.path
            d={WITHOUT}
            fill="none"
            stroke="#6b7078"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ duration: 1.3, ease: 'easeInOut' }}
          />
          <motion.circle
            cx={B.x}
            cy={140}
            r="3.5"
            fill="#1a1c1f"
            stroke="#8a8f96"
            strokeWidth="1.5"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1.25 }}
          />

          {/* Com o NEXUS */}
          <motion.path
            d={`${WITH} L ${B.x} ${A.y} L ${A.x} ${A.y} Z`}
            fill={`url(#area-${id})`}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 2.1, duration: 0.6 }}
          />
          <motion.path
            ref={withRef}
            d={WITH}
            fill="none"
            stroke={`url(#with-${id})`}
            strokeWidth="4.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ delay: 1.0, duration: 1.3, ease: [0.65, 0, 0.35, 1] }}
            style={{ filter: 'drop-shadow(0 0 6px rgb(54 245 85 / 0.6))' }}
          />

          {guide && (
            <motion.g initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 2.1 }}>
              <line x1={guide.x} x2={guide.x} y1={guide.y} y2={A.y} stroke="#36f555" strokeOpacity="0.45" strokeDasharray="3 4" />
              <line x1={A.x} x2={guide.x} y1={guide.y} y2={guide.y} stroke="#36f555" strokeOpacity="0.3" strokeDasharray="3 4" />
              <circle cx={guide.x} cy={guide.y} r="4" fill="#36f555" />
            </motion.g>
          )}

          {dot && (
            <>
              <circle cx={dot.x} cy={dot.y} r="12" fill={`url(#glow-${id})`} />
              <circle cx={dot.x} cy={dot.y} r="3" fill="#eaffee" />
            </>
          )}

          {/* Ponto A */}
          <motion.g initial={{ opacity: 0, scale: 0 }} animate={inView ? { opacity: 1, scale: 1 } : {}} style={{ transformOrigin: `${A.x}px ${A.y}px` }}>
            <circle cx={A.x} cy={A.y} r="7" fill="#020202" stroke="#e5e7eb" strokeWidth="2.5" />
          </motion.g>

          {/* Ponto B */}
          <motion.g
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 2.25, type: 'spring', stiffness: 380, damping: 14 }}
            style={{ transformOrigin: `${B.x}px ${B.y}px` }}
          >
            <circle cx={B.x} cy={B.y} r="16" fill={`url(#glow-${id})`} />
            <circle cx={B.x} cy={B.y} r="7.5" fill="#36f555" stroke="#020202" strokeWidth="2.5" />
          </motion.g>
        </svg>

        {/* rótulo B */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 2.4 }}
          className="absolute right-0 top-0 max-w-[64%] rounded-xl rounded-br-sm bg-primary text-primary-foreground px-3 py-1.5 text-right shadow-[0_8px_24px_-8px_var(--primary)]"
        >
          <p className="text-[9px] font-mono uppercase tracking-[0.16em] opacity-70">
            Ponto B{toValue && <span className="ml-1.5 font-bold tracking-normal opacity-100">{toValue}</span>}
          </p>
          {toSub && <p className="text-[12px] font-bold leading-tight">{toSub}</p>}
        </motion.div>
      </div>

      {(fromSub || fromValue) && (
        <p className="mt-2 text-[11px] text-muted-foreground">
          <span className="font-mono uppercase tracking-[0.14em] text-foreground/80">Ponto A</span>
          {fromValue && <span className="ml-1.5 font-bold text-foreground/80">{fromValue}</span>}
          {fromSub && <span> · {fromSub}</span>}
        </p>
      )}
    </div>
  )
}
