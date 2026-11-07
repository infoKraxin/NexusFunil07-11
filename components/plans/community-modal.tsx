'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Check, Crown, Flame, Shield, Sparkles, Users, X } from 'lucide-react'
import type { MouseEventHandler } from 'react'
import { cn } from '@/lib/utils'
import { formatPrice, type Plan, PLAN_STYLES } from './plans-data'

const COMMUNITY_PERKS = [
  { icon: Users, label: 'Comunidade exclusiva com acesso vitalício' },
  { icon: Flame, label: 'Desafios e conteúdos novos toda semana' },
  { icon: Crown, label: 'Mentorias coletivas ao vivo' },
]

const COMMUNITY_ADDON = 10

type CommunityModalProps = {
  plan: Plan | null
  open: boolean
  processing: boolean
  onClose: () => void
  checkoutHref: (withCommunity: boolean) => string
  onCheckoutStart: MouseEventHandler<HTMLAnchorElement>
}

export function CommunityModal({
  plan,
  open,
  processing,
  onClose,
  checkoutHref,
  onCheckoutStart,
}: CommunityModalProps) {
  const style = plan ? PLAN_STYLES[plan.id] : PLAN_STYLES.focuz
  const PlanIcon = plan?.icon

  return (
    <AnimatePresence>
      {open && plan && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/95"
          onClick={() => !processing && onClose()}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="community-modal-title"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[360px]"
          >
            <div className={cn('absolute -inset-[1px] rounded-2xl opacity-50 pointer-events-none', style.ring)} />
            <div className="relative bg-gradient-to-b from-[#111] to-[#0a0a0a] rounded-2xl border border-white/[0.08]">
              <button
                type="button"
                onClick={() => !processing && onClose()}
                disabled={processing}
                className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-50"
                aria-label="Fechar"
              >
                <X className="w-4 h-4 text-white/60" />
              </button>
              <div className="relative p-4 flex flex-col gap-3">
                <div className="text-center flex flex-col gap-1">
                  <div className="flex justify-center">
                    <div className={cn('w-10 h-10 rounded-full flex items-center justify-center', style.bg)}>
                      {PlanIcon && <PlanIcon className="w-5 h-5 text-black" />}
                    </div>
                  </div>
                  <h3 id="community-modal-title" className="text-lg font-bold text-white">
                    Excelente Escolha!
                  </h3>
                  <p className="text-xs text-white/60">
                    Você vai cumprir o pacto com o <span className={cn('font-bold', style.text)}>NEXUS {plan.shortName}</span>
                  </p>
                </div>

                <div className={cn('relative p-3 rounded-xl bg-gradient-to-br border', style.gradient, style.border)}>
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className={cn('w-3.5 h-3.5', style.text)} />
                    <p className="text-xs font-bold text-white">Cumpra o pacto acompanhado</p>
                  </div>
                  <p className="text-white/70 text-[11px] leading-relaxed mb-2">
                    Gente no mesmo caminho te puxando de volta nos dias em que dá vontade de largar.</p>
                  <div className="flex flex-col gap-1.5">
                    {COMMUNITY_PERKS.map((perk) => (
                      <div key={perk.label} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className={cn('w-5 h-5 rounded flex items-center justify-center flex-shrink-0', style.bg)}
                          >
                            <perk.icon className="w-2.5 h-2.5 text-black" />
                          </div>
                          <p className="text-[11px] text-white">{perk.label}</p>
                        </div>
                        <Check className={cn('w-3.5 h-3.5', style.text)} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-white/5 border border-white/10 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/60">NEXUS {plan.shortName}</span>
                    <span className="text-white">R$ {formatPrice(plan.basePrice)}</span>
                  </div>
                  <div className="flex items-center justify-between pb-1.5 border-b border-white/10 text-xs">
                    <span className="text-white/60 flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      Comunidade + Discord
                    </span>
                    <span className={cn('font-semibold', style.text)}>+ R$ 10,00</span>
                  </div>
                  <div className="flex items-center justify-between pt-0.5">
                    <span className="text-sm font-bold text-white">Total</span>
                    <span className={cn('text-xl font-bold', style.text)}>
                      R$ {formatPrice(plan.basePrice + COMMUNITY_ADDON)}
                    </span>
                  </div>
                  <p className="text-[9px] text-white/40 text-center">pagamento único, acesso vitalício</p>
                </div>

                <div className="flex flex-col gap-2">
                  {/* onClickCapture, not onClick: React's onClick sets element.onclick, which UTMify's pixel calls instead of navigating after InitiateCheckout. */}
                  {/* Keep the label constant while processing: the pixel reads textContent after this re-render. */}
                  <a
                    href={checkoutHref(true)}
                    onClickCapture={onCheckoutStart}
                    aria-disabled={processing}
                    aria-busy={processing}
                    className={cn(
                      'relative block w-full py-3 rounded-xl font-bold text-sm text-black hover:opacity-90 transition-opacity',
                      style.bg,
                      processing && 'pointer-events-none opacity-50',
                    )}
                  >
                    <span className="flex items-center justify-center gap-2">
                      {processing ? (
                        <span
                          className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"
                          aria-hidden="true"
                        />
                      ) : (
                        <Sparkles className="w-4 h-4" aria-hidden="true" />
                      )}
                      ADICIONAR COMUNIDADE NEXUS
                    </span>
                  </a>
                  <a
                    href={checkoutHref(false)}
                    onClickCapture={onCheckoutStart}
                    aria-disabled={processing}
                    className={cn(
                      'block w-full text-center text-white/50 text-[11px] hover:text-white/70 transition-colors',
                      processing && 'pointer-events-none opacity-50',
                    )}
                  >
                    Continuar SEM COMUNIDADE (R$ {formatPrice(plan.basePrice)})
                  </a>
                </div>

                <div className="flex items-center justify-center gap-1.5 text-white/40 text-[9px]">
                  <Shield className="w-3 h-3" />
                  <span>Pagamento único, acesso vitalício</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
