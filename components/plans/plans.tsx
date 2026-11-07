'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Check, ChevronDown, Flame, Headphones, ShieldCheck } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { useTrackOnce } from '@/components/funnel/fx'
import { CAKTO_URLS, getCheckoutUrl } from '@/lib/checkout'
import { type Derived, formatPactDate } from '@/lib/funnel'
import { track } from '@/lib/track'
import { useFunnel } from '@/lib/use-funnel'
import { withUtms } from '@/lib/utm'
import { cn } from '@/lib/utils'
import { ExitOfferModal } from './exit-offer-modal'
import { FAQ, formatPrice, type Plan, PLANS, TESTIMONIALS } from './plans-data'
import { useCheckoutRedirect } from './use-checkout-redirect'

export function Plans() {
  const f = useFunnel()
  if (!f.ready) return <div className="min-h-[100dvh] bg-background" />
  return <PlansView f={f} />
}

function useExitIntent(onExitIntent: () => void, disabled: boolean) {
  useEffect(() => {
    if (disabled) return
    const handlePopState = () => {
      onExitIntent()
      window.history.pushState(null, '', window.location.href)
    }
    window.history.pushState(null, '', window.location.href)
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [onExitIntent, disabled])
}

function PlansView({ f }: { f: Derived }) {
  const [selected, setSelected] = useState<Plan>(PLANS[1])
  const [exitOpen, setExitOpen] = useState(false)
  const [exitShown, setExitShown] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const { redirecting, startRedirect } = useCheckoutRedirect()
  useTrackOnce('plans_view', { block: f.code })

  const showExit = useCallback(() => {
    setExitOpen(true)
    setExitShown(true)
    track('exit_offer_view')
  }, [])
  useExitIntent(showExit, exitShown)

  const pact = f.pactAt ? formatPactDate(f.pactAt) : null
  const checkoutHref = withUtms(getCheckoutUrl(selected.id, false))

  const choose = (p: Plan) => {
    setSelected(p)
    track('plan_select', { plan: p.id })
  }

  return (
    <main id="main-content" className="min-h-[100dvh] bg-background text-foreground overflow-x-hidden pb-36">
      <ExitOfferModal
        open={exitOpen}
        redirecting={redirecting}
        onClose={() => setExitOpen(false)}
        acceptHref={withUtms(CAKTO_URLS.backredirect)}
        onAccept={(e) => {
          track('exit_offer_checkout')
          startRedirect(e)
        }}
        blockName={f.block.withArticle}
      />

      <div className="max-w-md mx-auto px-5">
        {/* 1. Topo */}
        <section className="pt-5 text-center">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/25 text-[11px] font-bold text-primary">
            <Check className="w-3 h-3" /> Pacto selado{pact ? ` · ${pact.short}` : ''}
          </span>
          <h1 className="mt-3 text-[26px] font-black leading-tight text-balance">
            Escolha como você vai cumprir seu pacto.
          </h1>
          <div className="mt-4 flex items-stretch gap-2 text-left">
            <div className="flex-1 rounded-xl border border-border bg-card px-3 py-2.5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Hoje</p>
              <p className="text-[13px] font-semibold leading-snug">
                {f.block.emoji} {f.block.name}
              </p>
            </div>
            <div className="flex items-center">
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                className="text-primary neon-glow"
              >
                <ArrowRight className="w-5 h-5" />
              </motion.span>
            </div>
            <div className="flex-1 rounded-xl border border-primary/40 bg-primary/10 px-3 py-2.5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-primary">Dia 90</p>
              <p className="text-[13px] font-semibold leading-snug">{f.mirror}</p>
            </div>
          </div>
        </section>

        {/* 2. Planos */}
        <section className="mt-6 flex flex-col gap-3" role="radiogroup" aria-label="Planos">
          {PLANS.map((p) => {
            const isSel = p.id === selected.id
            return (
              <button
                key={p.id}
                type="button"
                role="radio"
                aria-checked={isSel}
                onClick={() => choose(p)}
                className={cn(
                  'relative w-full text-left rounded-2xl border p-4 transition-colors',
                  isSel
                    ? 'border-primary bg-primary/[0.07] ring-1 ring-primary/50 shadow-[0_10px_40px_-18px_var(--primary)]'
                    : 'border-border bg-card',
                )}
              >
                {p.badge && (
                  <span
                    className={cn(
                      'absolute -top-2.5 right-4 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide',
                      p.id === 'focuz' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground border border-border',
                    )}
                  >
                    {p.badge}
                  </span>
                )}
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      'w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0',
                      isSel ? 'border-primary' : 'border-muted-foreground/40',
                    )}
                  >
                    {isSel && <span className="w-2.5 h-2.5 rounded-full bg-primary" />}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[17px] leading-tight">{p.name}</p>
                    <p className="text-[13px] text-muted-foreground leading-snug">
                      {p.phrase.replace('{block}', f.block.withArticle)}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[11px] text-muted-foreground leading-none">R$</p>
                    <p className={cn('text-2xl font-black leading-none', isSel && 'text-primary')}>{formatPrice(p.price)}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">pagamento único</p>
                  </div>
                </div>
                <AnimatePresence initial={false}>
                  {isSel && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden pl-8"
                    >
                      {p.benefits.map((b) => (
                        <li key={b} className="flex items-center gap-2 text-[14px] pt-2">
                          <Check className="w-4 h-4 text-primary shrink-0" />
                          {b}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </button>
            )
          })}
        </section>

        {/* 3. Garantia */}
        <section className="mt-6 flex items-center gap-4 rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-transparent p-4">
          <ShieldCheck className="w-14 h-14 text-primary shrink-0 neon-glow" strokeWidth={1.6} />
          <p className="text-[15px] font-semibold leading-snug">
            7 dias pra testar. <span className="text-muted-foreground font-normal">Não gostou, devolvemos tudo.</span>
          </p>
        </section>

        {/* 4. Prova social */}
        <section className="mt-6 flex flex-col gap-2.5">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="flex gap-3 rounded-2xl border border-border bg-card p-3.5">
              <Image src={t.image} alt={t.name} width={40} height={40} className="w-10 h-10 rounded-full object-cover shrink-0" />
              <div className="min-w-0">
                <blockquote className="text-[14px] leading-snug">“{t.text}”</blockquote>
                <figcaption className="mt-1 flex items-center gap-2 text-[12px] text-muted-foreground">
                  {t.name}
                  <span className="inline-flex items-center gap-0.5 text-orange-400 font-bold">
                    <Flame className="w-3 h-3 fill-orange-400" /> {t.streak} dias
                  </span>
                </figcaption>
              </div>
            </figure>
          ))}
        </section>

        {/* 5. FAQ */}
        <section className="mt-6 flex flex-col gap-2">
          {FAQ.map((item, i) => {
            const open = openFaq === i
            return (
              <div key={item.question} className="rounded-xl border border-border overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaq(open ? null : i)}
                  aria-expanded={open}
                  className="w-full flex items-center justify-between px-4 py-3.5 text-left"
                >
                  <span className="font-semibold text-[14px]">{item.question}</span>
                  <ChevronDown className={cn('w-4 h-4 text-muted-foreground transition-transform', open && 'rotate-180')} />
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden px-4 pb-3.5 text-[14px] text-muted-foreground"
                    >
                      {item.answer}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
          <a
            href="https://wa.me/5521965450784?text=Ol%C3%A1!%20Tenho%20Duvidas%20sobre%20o%20NexusApp"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 py-3 text-sm text-primary font-medium flex items-center justify-center gap-2"
          >
            <Headphones className="w-4 h-4" /> Tem dúvida? Fala com a gente
          </a>
        </section>
      </div>

      {/* 6. Botão fixo */}
      <div className="fixed bottom-0 inset-x-0 z-40 px-5 pt-6 pb-[max(1rem,env(safe-area-inset-bottom))] bg-gradient-to-t from-background via-background/95 to-transparent">
        <div className="max-w-md mx-auto">
          {/* onClickCapture (não onClick): o pixel da UTMify chama element.onclick em vez de navegar após o InitiateCheckout. */}
          <a
            href={checkoutHref}
            onClickCapture={(e) => {
              track('checkout', { plan: selected.id, price: selected.price })
              startRedirect(e)
            }}
            aria-disabled={redirecting}
            aria-busy={redirecting}
            className={cn(
              'relative overflow-hidden w-full h-14 rounded-xl bg-primary text-primary-foreground font-bold text-[17px] flex items-center justify-center gap-2 shadow-[0_10px_36px_-10px_var(--primary)]',
              redirecting && 'pointer-events-none opacity-60',
            )}
          >
            {redirecting && (
              <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" aria-hidden="true" />
            )}
            <span className="relative z-10">Cumprir meu pacto com o {selected.name} →</span>
            <span className="cta-shine" aria-hidden="true" />
          </a>
          <p className="text-center text-[11px] text-muted-foreground mt-2">
            R$ {formatPrice(selected.price)} · pagamento único · acesso vitalício
          </p>
        </div>
      </div>
    </main>
  )
}
