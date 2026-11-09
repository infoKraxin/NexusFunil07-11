'use client'

import { motion } from 'framer-motion'
import { Check, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatPrice, type Plan, PLAN_STYLES, PLANS } from './plans-data'

type PlanCarouselProps = {
  selected: Plan
  onSelect: (plan: Plan) => void
  onUnlock: (plan: Plan) => void
  blockWithArticle?: string
}

function cardPosition(planIndex: number, selectedIndex: number) {
  const offset = planIndex - selectedIndex
  if (offset === 0) return { x: '0%', scale: 1, zIndex: 30 }
  const wrapsLeft = selectedIndex === 0 && planIndex === PLANS.length - 1
  const wrapsRight = selectedIndex === PLANS.length - 1 && planIndex === 0
  if (offset === -1 || wrapsLeft) return { x: '-65%', scale: 0.85, zIndex: 10 }
  if (offset === 1 || wrapsRight) return { x: '65%', scale: 0.85, zIndex: 10 }
  return { x: offset < 0 ? '-65%' : '65%', scale: 0.85, zIndex: 10 }
}

export function PlanTabs({ selected, onSelect }: Pick<PlanCarouselProps, 'selected' | 'onSelect'>) {
  return (
    <div className="flex justify-center gap-2 px-4 mb-6" role="tablist" aria-label="Planos">
      {PLANS.map((plan) => (
        <button
          key={plan.id}
          type="button"
          role="tab"
          aria-selected={selected.id === plan.id}
          onClick={() => onSelect(plan)}
          className={cn(
            'px-4 py-2 rounded-full text-sm font-medium transition-all',
            selected.id === plan.id
              ? `${PLAN_STYLES[plan.id].bg} text-black`
              : 'bg-white/10 text-white/60 hover:bg-white/20',
          )}
        >
          {plan.shortName}
        </button>
      ))}
    </div>
  )
}

export function PlanCarousel({ selected, onSelect, onUnlock, blockWithArticle = 'o seu bloqueio' }: PlanCarouselProps) {
  const selectedIndex = PLANS.findIndex((p) => p.id === selected.id)

  const step = (direction: 1 | -1) => {
    const next = (selectedIndex + direction + PLANS.length) % PLANS.length
    onSelect(PLANS[next])
  }

  return (
    <>
      <div className="relative flex-1 flex items-center justify-center px-4 overflow-x-clip">
        <div className="relative h-[620px] w-full flex items-start justify-center mb-4 mt-8">
          {PLANS.map((plan, index) => {
            const position = cardPosition(index, selectedIndex)
            const isActive = plan.id === selected.id
            const style = PLAN_STYLES[plan.id]
            const Icon = plan.icon
            return (
              <motion.div
                key={plan.id}
                initial={false}
                animate={{ x: position.x, scale: position.scale, zIndex: position.zIndex, opacity: 1 }}
                transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
                onClick={() => onSelect(plan)}
                className="absolute w-[300px] cursor-pointer will-change-transform"
              >
                <div
                  className={cn(
                    'relative rounded-3xl p-5 border-2 bg-[#0a0a0a] transition-colors duration-200',
                    style.border,
                    isActive && 'shadow-lg',
                  )}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                      <div className="bg-primary text-black text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1 whitespace-nowrap">
                        <Sparkles className="w-3 h-3" />
                        FEITO PRO SEU BLOQUEIO
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-3 mb-4 mt-2">
                    <div className={cn('w-12 h-12 rounded-2xl flex items-center justify-center', style.bg)}>
                      <Icon className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{plan.name}</h3>
                      <p className={cn('text-xs', style.text)}>{plan.highlight}</p>
                    </div>
                  </div>
                  <p className="text-white/60 text-sm mb-4">{plan.tagline.replace('{block}', blockWithArticle)}</p>

                  <div className="grid grid-cols-3 gap-3 mb-5">
                    {[
                      { label: 'Velocidade', value: plan.evolutionSpeed },
                      { label: 'Resultados', value: plan.resultsSpeed },
                      { label: 'Suporte', value: plan.supportLevel },
                    ].map((meter) => (
                      <div key={meter.label} className="text-center">
                        <div className="text-[10px] text-white/50 mb-1">{meter.label}</div>
                        <div className="flex gap-1 justify-center" aria-label={`${meter.label}: ${meter.value} de 3`}>
                          {[1, 2, 3].map((level) => (
                            <div
                              key={level}
                              className={cn('w-2 h-5 rounded-sm', level <= meter.value ? style.bg : 'bg-white/20')}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <ul className="flex flex-col gap-2 mb-5">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <Check className={cn('w-4 h-4 flex-shrink-0', style.text)} />
                        <span className="text-white/80">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="text-center mb-4">
                    <div className="text-white/40 text-xs mb-0.5">
                      Depois do lançamento: <span className="line-through">R${formatPrice(plan.fullPrice)}</span>
                    </div>
                    <div className={cn('text-4xl font-bold', style.text)}>R${formatPrice(plan.basePrice)}</div>
                    <div className="text-white/40 text-xs">pagamento único · acesso vitalício</div>
                  </div>

                  {isActive && (
                    <motion.button
                      type="button"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={(e) => {
                        e.stopPropagation()
                        onUnlock(plan)
                      }}
                      className={cn(
                        'w-full py-3 rounded-xl font-semibold text-black hover:opacity-90 transition-opacity',
                        style.bg,
                      )}
                    >
                      Cumprir meu pacto
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      <div className="flex justify-center items-center gap-4 py-4 my-6">
        <button
          type="button"
          onClick={() => step(-1)}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          aria-label="Plano anterior"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <div className="flex gap-3">
          {PLANS.map((plan) => (
            <button
              key={plan.id}
              type="button"
              onClick={() => onSelect(plan)}
              aria-label={`Ver ${plan.name}`}
              className={cn(
                'transition-all duration-300 rounded-full',
                selected.id === plan.id ? `w-8 h-3 ${PLAN_STYLES[plan.id].bg}` : 'w-3 h-3 bg-white/20',
              )}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => step(1)}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          aria-label="Próximo plano"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>
    </>
  )
}
