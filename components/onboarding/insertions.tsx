'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Lock } from 'lucide-react'
import { CountUp, Highlight, HandUnderline } from '@/components/funnel/fx'
import { TurnChart } from '@/components/funnel/turn-chart'
import { type Derived, QUESTIONS } from '@/lib/funnel'

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay },
})

/* 1 — dias inteiros por ano no celular */
export function InsertionPhoneDays({ f }: { f: Derived }) {
  const total = 365
  return (
    <div className="flex-1 flex flex-col justify-center text-center gap-5">
      <motion.p {...fade(0)} className="text-sm text-muted-foreground">
        <span className="font-bold text-foreground">{f.hoursLabel} por dia</span> no celular dá…
      </motion.p>
      <motion.div {...fade(0.1)}>
        <CountUp to={f.daysPerYear} duration={2} delay={0.3} className="text-[84px] font-bold leading-none text-destructive" />
        <p className="text-lg font-bold mt-1">dias inteiros por ano</p>
        <p className="text-sm text-muted-foreground mt-1">{monthsText(f.daysPerYear)}</p>
      </motion.div>

      {/* 1 ano = 365 quadradinhos; os dias perdidos acendem em vermelho */}
      <div className="grid grid-cols-[repeat(25,minmax(0,1fr))] gap-[3px] mx-auto w-full max-w-[320px]" aria-hidden="true">
        {Array.from({ length: total }).map((_, i) => (
          <motion.span
            key={i}
            className="aspect-square rounded-[2px]"
            initial={{ backgroundColor: '#1a1d21' }}
            animate={{ backgroundColor: i < f.daysPerYear ? '#ff2d39' : '#1a1d21' }}
            transition={{ delay: 0.3 + (i < f.daysPerYear ? (i / f.daysPerYear) * 1.9 : 0), duration: 0.15 }}
          />
        ))}
      </div>
      <p className="text-[11px] text-muted-foreground -mt-2">1 quadradinho = 1 dia do seu ano</p>

      <motion.p {...fade(2.4)} className="text-xl font-bold leading-snug text-balance">
        Você não tem falta de tempo. Seu tempo está indo pro <Highlight delay={2.8}>lugar errado</Highlight>.
      </motion.p>
    </div>
  )
}

/* 2 — existe um padrão */
export function InsertionPattern({ f }: { f: Derived }) {
  return (
    <div className="flex-1 flex flex-col justify-center text-center gap-6">
      <motion.h2 {...fade(0)} className="text-3xl font-bold leading-tight">
        Isso não é preguiça…
      </motion.h2>

      <motion.svg {...fade(0.3)} viewBox="0 0 300 70" className="w-full max-w-[300px] mx-auto" aria-hidden="true">
        <motion.path
          d="M5 55 Q30 5 55 55 Q80 5 105 55 Q130 5 155 55 Q180 5 205 55 Q230 5 255 55 Q275 25 295 38"
          fill="none"
          stroke="#ff2d39"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6, delay: 0.5, ease: 'easeInOut' }}
        />
        {[30, 80, 130, 180, 230].map((x, i) => (
          <motion.circle
            key={x}
            cx={x}
            cy={30}
            r={3.5}
            fill="#ff2d39"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 + i * 0.3 }}
          />
        ))}
      </motion.svg>

      <motion.p {...fade(1.4)} className="text-xl font-semibold leading-snug text-balance">
        Existe um <Highlight delay={1.9}>padrão</Highlight> se repetindo na sua vida, e ele <HandUnderline delay={2.2}>tem nome</HandUnderline>.
      </motion.p>

      <motion.div
        {...fade(2.4)}
        className="mx-auto w-full max-w-[300px] rounded-2xl border border-primary/30 bg-primary/5 p-4 flex items-center gap-3 text-left"
      >
        <div className="w-11 h-11 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
          <Lock className="w-5 h-5 text-primary" />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-[0.16em] text-primary font-bold">Seu bloqueio</p>
          <p className="font-bold text-lg blur-[6px] select-none" aria-hidden="true">
            {f.block.name}
          </p>
          <p className="text-[11px] text-muted-foreground">Revelado no seu diagnóstico</p>
        </div>
      </motion.div>
    </div>
  )
}

/* 3 — projeção até o dia 90 */
export function InsertionProjection({ f }: { f: Derived }) {
  return (
    <div className="flex-1 flex flex-col justify-center gap-6">
      <motion.div {...fade(0)} className="rounded-2xl bg-gradient-to-br from-secondary/30 to-secondary/10 border border-border/40 p-4">
        <TurnChart balloon={f.mirror} delay={0.2} />
      </motion.div>
      <motion.p {...fade(0.6)} className="text-xl font-semibold leading-snug text-center text-balance">
        Começando por <span className="text-primary font-bold">{f.areaLower}</span>, em 90 dias você pode ser{' '}
        <span className="font-bold">{f.mirrorLower}</span>.
      </motion.p>
      <motion.p {...fade(2.6)} className="text-center text-muted-foreground text-[15px] text-balance">
        Não precisa mudar tudo de uma vez. Só começar pelo <Highlight delay={3}>lugar certo</Highlight>.
      </motion.p>
    </div>
  )
}

/* 4 — por que não funcionou e o que vai ser diferente */
export function InsertionWhyBefore({ f }: { f: Derived }) {
  const tried = f.answers.q10.filter((v) => v !== 'nada')
  return (
    <div className="flex-1 flex flex-col justify-center gap-5 text-center">
      {f.triedNothing ? (
        <motion.p {...fade(0)} className="text-xl font-semibold leading-snug text-balance">
          Você ainda não tentou nada, e isso é bom: vai <Highlight delay={0.6}>começar do jeito certo</Highlight>.
        </motion.p>
      ) : (
        <>
          <div className="flex flex-wrap justify-center gap-2">
            {tried.map((v, i) => (
              <motion.span
                key={v}
                {...fade(0.1 * i)}
                className="relative px-3 py-1.5 rounded-full border border-border bg-secondary text-sm text-muted-foreground"
              >
                <ChipLabel value={v} />
                <motion.span
                  className="absolute left-2 right-2 top-1/2 h-[2px] bg-destructive origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5 + 0.25 * i, duration: 0.3 }}
                />
              </motion.span>
            ))}
          </div>
          <motion.p {...fade(0.6)} className="text-xl font-semibold leading-snug text-balance">
            {f.triedPlural ? 'Não funcionaram' : 'Não funcionou'} porque {f.triedPlural ? 'dependiam' : 'dependia'} só da sua{' '}
            <HandUnderline delay={1.2}>força de vontade</HandUnderline>.
          </motion.p>
        </>
      )}

      <motion.div {...fade(1.4)} className="flex justify-center">
        <ArrowDown className="w-6 h-6 text-primary animate-bounce" />
      </motion.div>

      <motion.div
        {...fade(1.6)}
        className="rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/15 to-primary/5 p-5 shadow-[0_10px_40px_-18px_var(--primary)]"
      >
        <p className="text-[10px] uppercase tracking-[0.16em] text-primary font-bold mb-2">O seu plano vai ser diferente</p>
        <p className="text-lg font-bold leading-snug text-balance">
          {capitalize(f.mechanism.short)}, em <span className="text-primary">{f.time} por dia</span>.
        </p>
      </motion.div>
    </div>
  )
}

function ChipLabel({ value }: { value: string }) {
  const o = QUESTIONS.find((q) => q.key === 'q10')?.options.find((x) => x.value === value)
  if (!o) return null
  const Icon = o.icon
  return (
    <span className="inline-flex items-center gap-1.5">
      <Icon className="w-3.5 h-3.5" />
      {o.label}
    </span>
  )
}
const capitalize = (s: string) => s[0].toUpperCase() + s.slice(1)

function monthsText(days: number) {
  const m = Math.floor(days / 30)
  if (m < 1) return 'Quase um mês do seu ano olhando pra uma tela.'
  return `Mais de ${m} ${m === 1 ? 'mês' : 'meses'} do seu ano olhando pra uma tela.`
}
