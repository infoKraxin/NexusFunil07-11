'use client'

import { motion } from 'framer-motion'
import type { RadarPoint } from '@/lib/diagnosis'

type DiagnosisRadarProps = {
  data: RadarPoint[]
  maxValue?: number
  type?: 'current' | 'potential'
}

const CENTER = 150
const RADIUS = 110

export function DiagnosisRadar({ data, maxValue = 10, type = 'current' }: DiagnosisRadarProps) {
  const step = (2 * Math.PI) / data.length
  const isPotential = type === 'potential'

  const point = (index: number, value: number) => {
    const angle = step * index - Math.PI / 2
    const r = (value / maxValue) * RADIUS
    return { x: CENTER + r * Math.cos(angle), y: CENTER + r * Math.sin(angle) }
  }

  const points = data.map((d, i) => point(i, d.value))
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z'
  const areaColor = isPotential ? 'rgb(0, 255, 136)' : 'rgb(0, 200, 100)'
  const lineColor = isPotential ? 'rgb(0, 255, 136)' : 'rgb(0, 180, 100)'

  return (
    <svg
      viewBox="0 0 300 300"
      className="w-full max-w-[280px] mx-auto"
      role="img"
      aria-label={data.map((d) => `${d.label} ${d.value.toFixed(1)}`).join(', ')}
    >
      <defs>
        <linearGradient id={`areaGrad-${type}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={areaColor} stopOpacity={isPotential ? 0.45 : 0.22} />
          <stop offset="100%" stopColor={areaColor} stopOpacity={isPotential ? 0.12 : 0.06} />
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
          strokeOpacity={0.1}
          strokeWidth={1}
          strokeDasharray={i < 3 ? '4 4' : '0'}
        />
      ))}

      {data.map((d, i) => {
        const end = point(i, maxValue)
        return (
          <line
            key={d.key}
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
        fill={`url(#areaGrad-${type})`}
        stroke={lineColor}
        strokeWidth={isPotential ? 3 : 2}
        strokeLinejoin="round"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{ transformOrigin: 'center' }}
      />

      {points.map((p, i) => (
        <motion.circle
          key={data[i].key}
          cx={p.x}
          cy={p.y}
          r={isPotential ? 5 : 4}
          fill={lineColor}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4 + 0.1 * i }}
        />
      ))}

      {data.map((d, i) => {
        const labelPoint = point(i, maxValue + 2.5)
        return (
          <text
            key={d.key}
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
  )
}
