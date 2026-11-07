'use client'

import { motion } from 'framer-motion'

type RadarVariant = 'before' | 'after'

const DATA: Record<RadarVariant, { label: string; value: number }[]> = {
  before: [
    { label: 'Foco', value: 3.2 },
    { label: 'Energia', value: 3.8 },
    { label: 'Disciplina', value: 3 },
    { label: 'Produção', value: 3.6 },
    { label: 'Motivação', value: 3.4 },
  ],
  after: [
    { label: 'Foco', value: 8.4 },
    { label: 'Energia', value: 8.2 },
    { label: 'Disciplina', value: 7.8 },
    { label: 'Produção', value: 8 },
    { label: 'Motivação', value: 8.1 },
  ],
}

const STYLE = {
  before: {
    stroke: 'rgb(239, 68, 68)',
    gradientFrom: { color: 'rgb(239, 68, 68)', opacity: 0.3 },
    gradientTo: { color: 'rgb(220, 38, 38)', opacity: 0.1 },
    strokeWidth: 2,
    blur: 3,
    dot: 4,
  },
  after: {
    stroke: 'rgb(0, 255, 136)',
    gradientFrom: { color: 'rgb(0, 255, 136)', opacity: 0.5 },
    gradientTo: { color: 'rgb(0, 255, 136)', opacity: 0.15 },
    strokeWidth: 3,
    blur: 4,
    dot: 5,
  },
}

const CENTER = 120
const RADIUS = 80

function LandingRadarChart({ variant }: { variant: RadarVariant }) {
  const data = DATA[variant]
  const style = STYLE[variant]
  const step = (2 * Math.PI) / data.length

  const point = (index: number, value: number) => {
    const angle = step * index - Math.PI / 2
    const r = (value / 10) * RADIUS
    return { x: CENTER + r * Math.cos(angle), y: CENTER + r * Math.sin(angle) }
  }

  const points = data.map((d, i) => point(i, d.value))
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z'

  return (
    <div className="w-full aspect-square max-w-[200px] mx-auto">
      <svg viewBox="0 0 240 240" className="w-full h-full text-white" aria-hidden="true">
        <defs>
          <filter id={`glow-${variant}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={style.blur} result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id={`areaGrad-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={style.gradientFrom.color} stopOpacity={style.gradientFrom.opacity} />
            <stop offset="100%" stopColor={style.gradientTo.color} stopOpacity={style.gradientTo.opacity} />
          </linearGradient>
        </defs>

        {[0.25, 0.5, 0.75, 1].map((scale, i) => (
          <circle
            key={scale}
            cx={CENTER}
            cy={CENTER}
            r={RADIUS * scale}
            fill="none"
            stroke="currentColor"
            strokeOpacity={0.15}
            strokeWidth={1}
            strokeDasharray={i < 3 ? '3 3' : '0'}
          />
        ))}

        {data.map((d, i) => {
          const end = point(i, 10)
          return (
            <line
              key={d.label}
              x1={CENTER}
              y1={CENTER}
              x2={end.x}
              y2={end.y}
              stroke="currentColor"
              strokeOpacity={0.1}
              strokeWidth={1}
            />
          )
        })}

        <motion.path
          d={path}
          fill={`url(#areaGrad-${variant})`}
          stroke={style.stroke}
          strokeWidth={style.strokeWidth}
          filter={`url(#glow-${variant})`}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          style={{ transformOrigin: 'center' }}
        />

        {points.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={style.dot}
            fill={style.stroke}
            filter={`url(#glow-${variant})`}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + 0.1 * i }}
          />
        ))}

        {data.map((d, i) => {
          const labelPoint = point(i, 12.5)
          return (
            <text
              key={d.label}
              x={labelPoint.x}
              y={labelPoint.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-muted-foreground text-[10px] font-medium"
            >
              {d.label}
            </text>
          )
        })}
      </svg>
    </div>
  )
}

export function BeforeRadarChart() {
  return <LandingRadarChart variant="before" />
}

export function AfterRadarChart() {
  return <LandingRadarChart variant="after" />
}
