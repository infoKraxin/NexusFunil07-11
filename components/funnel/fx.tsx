'use client'

import { animate, motion, useInView, useMotionValue, useTransform } from 'framer-motion'
import { type ReactNode, useEffect, useRef } from 'react'
import { type FunnelEvent, track } from '@/lib/track'
import { cn } from '@/lib/utils'

/* Marca-texto que "passa" sobre a palavra */
export function Highlight({
  children,
  color = 'yellow',
  delay = 0,
  className,
}: {
  children: ReactNode
  color?: 'yellow' | 'neon'
  delay?: number
  className?: string
}) {
  return (
    <motion.span
      initial={{ backgroundSize: '0% 100%' }}
      animate={{ backgroundSize: '100% 100%' }}
      transition={{ duration: 0.55, delay, ease: 'easeOut' }}
      className={cn(
        'box-decoration-clone rounded-[3px] px-1 -mx-0.5 bg-no-repeat',
        color === 'yellow' ? 'marker-yellow text-black' : 'marker-neon text-black',
        className,
      )}
    >
      {children}
    </motion.span>
  )
}

/** Converte "texto ~destaque~ texto" em marca-texto. */
export function Marked({ text, color = 'neon', delay = 0 }: { text: string; color?: 'yellow' | 'neon'; delay?: number }) {
  const parts = text.split('~')
  return (
    <>
      {parts.map((p, i) =>
        i % 2 === 1 ? (
          <Highlight key={i} color={color} delay={delay}>
            {p}
          </Highlight>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  )
}

/* Sublinhado desenhado à mão */
export function HandUnderline({
  children,
  delay = 0.2,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <span ref={ref} className={cn('relative inline-block whitespace-nowrap', className)}>
      {children}
      <svg
        className="absolute left-0 -bottom-2 w-full h-3 overflow-visible"
        viewBox="0 0 200 12"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <motion.path
          d="M2 8 C 40 3, 80 11, 120 6 S 180 3, 198 7"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="3.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 0.8, delay, ease: 'easeInOut' }}
        />
      </svg>
    </span>
  )
}

/* Contador que sobe */
export function CountUp({
  to,
  duration = 1.6,
  delay = 0,
  className,
}: {
  to: number
  duration?: number
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const value = useMotionValue(0)
  const rounded = useTransform(value, (v) => Math.round(v).toLocaleString('pt-BR'))
  useEffect(() => {
    if (!inView) return
    const controls = animate(value, to, { duration, delay, ease: [0.16, 1, 0.3, 1] })
    return () => controls.stop()
  }, [inView, to, duration, delay, value])
  return (
    <motion.span ref={ref} className={cn('tabular-nums', className)}>
      {rounded}
    </motion.span>
  )
}

/* Carimbo que cai */
export function Stamp({
  children,
  delay = 0,
  className,
  tone = 'primary',
}: {
  children: ReactNode
  delay?: number
  className?: string
  tone?: 'primary' | 'red'
}) {
  return (
    <motion.div
      initial={{ scale: 2.6, opacity: 0, rotate: -18 }}
      animate={{ scale: 1, opacity: 1, rotate: -6 }}
      transition={{ delay, type: 'spring', stiffness: 420, damping: 18, mass: 0.8 }}
      className={cn(
        'inline-flex items-center justify-center px-4 py-1.5 border-[3px] rounded-md font-black uppercase tracking-[0.18em] text-sm',
        tone === 'primary'
          ? 'border-primary text-primary shadow-[0_0_24px_-6px_var(--primary)]'
          : 'border-destructive text-destructive shadow-[0_0_24px_-6px_var(--destructive)]',
        className,
      )}
    >
      {children}
    </motion.div>
  )
}

/* Etiqueta pequena tipo "SEU PLANO ESTÁ PRONTO" */
export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/25 text-[10px] font-bold tracking-[0.16em] uppercase text-primary',
        className,
      )}
    >
      {children}
    </span>
  )
}

export function useTrackOnce(event: FunnelEvent, props?: Record<string, unknown>, enabled = true) {
  const sent = useRef(false)
  useEffect(() => {
    if (!enabled || sent.current) return
    sent.current = true
    track(event, props)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled])
}

/* Botão principal fixo no rodapé */
export function StickyCta({
  children,
  onClick,
  note,
  disabled,
}: {
  children: ReactNode
  onClick?: () => void
  note?: ReactNode
  disabled?: boolean
}) {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 px-5 pt-6 pb-[max(1rem,env(safe-area-inset-bottom))] bg-gradient-to-t from-background via-background/95 to-transparent">
      <div className="max-w-md mx-auto">
        <motion.button
          type="button"
          onClick={onClick}
          disabled={disabled}
          whileTap={{ scale: 0.98 }}
          className="relative overflow-hidden w-full h-14 rounded-xl bg-primary text-primary-foreground font-bold text-[17px] flex items-center justify-center gap-2 shadow-[0_10px_36px_-10px_var(--primary)] disabled:opacity-50"
        >
          <span className="relative z-10">{children}</span>
          <span className="cta-shine" aria-hidden="true" />
        </motion.button>
        {note && <p className="text-center text-[11px] text-muted-foreground mt-2">{note}</p>}
      </div>
    </div>
  )
}
