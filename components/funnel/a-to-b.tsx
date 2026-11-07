'use client'

import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useId, useRef, useState } from 'react'

// Do ponto A (hoje, personagem fraco) ao ponto B (dia 90, personagem forte).
// Curva única, gradiente cinza → verde, marcos no caminho e um ponto de luz que percorre a linha.

const W = 340
const H = 210
const A = { x: 44, y: 158 }
const B = { x: 296, y: 46 }
const PATH = `M${A.x} ${A.y} C 120 160, 160 138, 196 108 S 262 52, ${B.x} ${B.y}`

type Milestone = { at: number; label: string }

export function AToB({
  fromTitle = 'Hoje',
  fromSub,
  toTitle = 'Dia 90',
  toSub,
  fromValue,
  toValue,
  milestones = [
    { at: 0.38, label: 'Semana 1' },
    { at: 0.68, label: 'Mês 1' },
  ],
}: {
  fromTitle?: string
  fromSub?: string
  toTitle?: string
  toSub?: string
  fromValue?: string
  toValue?: string
  milestones?: Milestone[]
}) {
  const id = useId().replace(/:/g, '')
  const wrapRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const inView = useInView(wrapRef, { once: true, margin: '-40px' })
  const [points, setPoints] = useState<{ x: number; y: number }[]>([])
  const [dot, setDot] = useState<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const p = pathRef.current
    if (!p) return
    const len = p.getTotalLength()
    setPoints(milestones.map((m) => p.getPointAtLength(len * m.at)))
  }, [milestones])

  // ponto de luz percorrendo a curva (depois que ela é desenhada)
  useEffect(() => {
    if (!inView) return
    const p = pathRef.current
    if (!p) return
    const len = p.getTotalLength()
    let raf = 0
    let start = 0
    const DRAW = 1500
    const LOOP = 2600
    const tick = (t: number) => {
      if (!start) start = t
      const e = t - start - DRAW
      if (e > 0) {
        const k = (e % LOOP) / LOOP
        const pt = p.getPointAtLength(len * k)
        setDot({ x: pt.x, y: pt.y })
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView])

  return (
    <div ref={wrapRef} className="relative w-full" style={{ aspectRatio: `${W} / ${H + 40}` }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-x-0 top-0 w-full h-auto overflow-visible" aria-hidden="true">
        <defs>
          <linearGradient id={`stroke-${id}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#5b6169" />
            <stop offset="45%" stopColor="#36f555" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#36f555" />
          </linearGradient>
          <linearGradient id={`area-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#36f555" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#36f555" stopOpacity="0" />
          </linearGradient>
          <radialGradient id={`glow-${id}`}>
            <stop offset="0%" stopColor="#36f555" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#36f555" stopOpacity="0" />
          </radialGradient>
          <pattern id={`dots-${id}`} width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#ffffff" fillOpacity="0.06" />
          </pattern>
        </defs>

        <rect x="0" y="0" width={W} height={H} fill={`url(#dots-${id})`} />

        {/* área */}
        <motion.path
          d={`${PATH} L ${B.x} ${H} L ${A.x} ${H} Z`}
          fill={`url(#area-${id})`}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.1, duration: 0.8 }}
        />
        {/* trilha apagada */}
        <path d={PATH} fill="none" stroke="#ffffff" strokeOpacity="0.07" strokeWidth="10" strokeLinecap="round" />
        {/* linha principal */}
        <motion.path
          ref={pathRef}
          d={PATH}
          fill="none"
          stroke={`url(#stroke-${id})`}
          strokeWidth="4.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.5, ease: [0.65, 0, 0.35, 1] }}
          style={{ filter: 'drop-shadow(0 0 6px rgb(54 245 85 / 0.55))' }}
        />

        {/* marcos */}
        {points.map((pt, i) => (
          <motion.g
            key={milestones[i].label}
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.5 + milestones[i].at * 1.1, type: 'spring', stiffness: 400 }}
            style={{ transformOrigin: `${pt.x}px ${pt.y}px` }}
          >
            <circle cx={pt.x} cy={pt.y} r="6" fill="#020202" stroke="#36f555" strokeWidth="2.5" />
            <text x={i === points.length - 1 ? pt.x - 12 : pt.x} y={i === points.length - 1 ? pt.y - 12 : pt.y + 22} textAnchor={i === points.length - 1 ? "end" : "middle"} fontSize="10" fontWeight="700" fill="#9ca3af">
              {milestones[i].label}
            </text>
          </motion.g>
        ))}

        {/* ponto de luz */}
        {dot && (
          <>
            <circle cx={dot.x} cy={dot.y} r="14" fill={`url(#glow-${id})`} />
            <circle cx={dot.x} cy={dot.y} r="3.5" fill="#eaffee" />
          </>
        )}
      </svg>

      {/* Ponto A */}
      <Endpoint
        style={{ left: `${(A.x / W) * 100}%`, top: `${(A.y / (H + 40)) * 100}%` }}
        img="/images/personagem-fraco-busto.webp"
        dim
        show={inView}
        delay={0.1}
      />
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.3 }}
        className="absolute left-0 bottom-0 max-w-[48%] text-left"
      >
        <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-muted-foreground">
          {fromTitle}
          {fromValue && <span className="ml-1.5 text-foreground/80 font-bold tracking-normal">{fromValue}</span>}
        </p>
        {fromSub && <p className="text-[12px] leading-snug text-muted-foreground">{fromSub}</p>}
      </motion.div>

      {/* Ponto B */}
      <Endpoint
        style={{ left: `${(B.x / W) * 100}%`, top: `${(B.y / (H + 40)) * 100}%` }}
        img="/images/personagem-forte-busto.webp"
        show={inView}
        delay={1.45}
      />
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.7 }}
        className="absolute right-0 top-[38%] max-w-[52%] text-right"
      >
        <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-primary">
          {toTitle}
          {toValue && <span className="ml-1.5 font-bold tracking-normal">{toValue}</span>}
        </p>
        {toSub && <p className="text-[12px] leading-snug font-semibold text-foreground">{toSub}</p>}
      </motion.div>
    </div>
  )
}

function Endpoint({
  style,
  img,
  dim,
  show,
  delay,
}: {
  style: React.CSSProperties
  img: string
  dim?: boolean
  show: boolean
  delay: number
}) {
  return (
    <motion.div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={style}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={show ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay, type: 'spring', stiffness: 300, damping: 18 }}
    >
      <div
        className={
          dim
            ? 'w-12 h-12 rounded-full overflow-hidden border-2 border-zinc-600 bg-zinc-900 grayscale-[35%]'
            : 'w-14 h-14 rounded-full overflow-hidden border-2 border-primary bg-zinc-900 shadow-[0_0_24px_-2px_rgb(54_245_85_/_0.7)]'
        }
      >
        <Image src={img} alt="" width={112} height={112} className="w-full h-full object-cover object-top scale-125 origin-top" />
      </div>
    </motion.div>
  )
}
