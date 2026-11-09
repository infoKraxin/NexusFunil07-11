'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Check, Clock } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useMemo, useState } from 'react'
import { CAKTO_URLS, getCheckoutUrl } from '@/lib/checkout'
import { averageOf, improvementPercent, projectRadar } from '@/lib/diagnosis'
import { formatPactDate } from '@/lib/funnel'
import { useFunnel } from '@/lib/use-funnel'
import { withUtms } from '@/lib/utm'
import { useTrackOnce } from '@/components/funnel/fx'
import { CommunityModal } from './community-modal'
import { EvolutionProjection } from './evolution-projection'
import { ExitOfferModal } from './exit-offer-modal'
import { PlanCarousel, PlanTabs } from './plan-carousel'
import { type Plan, PLAN_TESTIMONIALS, PLANS } from './plans-data'
import { FiveStars, GuaranteeSeal, PlansFaq, PlansTestimonials } from './plans-social-proof'
import { useCheckoutRedirect } from './use-checkout-redirect'
import { useCountdown, useExitIntent, usePurchaseToasts } from './use-plans-urgency'

export function Plans() {
  const { radar, block, ready, pactAt, mirrorLower, code } = useFunnel()
  const pact = pactAt ? formatPactDate(pactAt) : null
  const [selectedPlan, setSelectedPlan] = useState<Plan>(PLANS[1])
  const [communityOpen, setCommunityOpen] = useState(false)
  const { redirecting, startRedirect } = useCheckoutRedirect()
  const [exitOfferOpen, setExitOfferOpen] = useState(false)
  const [exitOfferShown, setExitOfferShown] = useState(false)

  useTrackOnce('plans_view')
  const countdown = useCountdown(900)
  const toast = usePurchaseToasts()

  const projection = useMemo(() => {
    const projected = projectRadar(radar, 30)
    return {
      avgCurrent: averageOf(radar),
      avgPotential: averageOf(projected),
      improvement: improvementPercent(radar, projected),
    }
  }, [radar])

  const showExitOffer = useCallback(() => {
    setExitOfferOpen(true)
    setExitOfferShown(true)
  }, [])
  useExitIntent(showExitOffer, exitOfferShown)

  const checkoutHref = (withCommunity: boolean) => withUtms(getCheckoutUrl(selectedPlan.id, withCommunity))

  const handleUnlock = (plan: Plan) => {
    setSelectedPlan(plan)
    setCommunityOpen(true)
  }

  return (
    <main id="main-content" className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ExitOfferModal
        open={exitOfferOpen}
        redirecting={redirecting}
        onClose={() => setExitOfferOpen(false)}
        acceptHref={withUtms(CAKTO_URLS.backredirect)}
        onAccept={startRedirect}
      />

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-center gap-4 py-2 px-4 bg-destructive/10 border-b border-destructive/30"
      >
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-destructive" />
          <span className="text-xs font-bold text-destructive tabular-nums whitespace-nowrap">
            Preço de lançamento termina em {countdown}
          </span>
        </div>
      </motion.div>

      <div className="px-4 pt-5 pb-4 text-center">
        {ready && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/25 text-xs text-primary"
          >
            <Check className="w-3.5 h-3.5" />
            {pact ? `Pacto selado em ${pact.date} às ${pact.time}` : 'Seu pacto está esperando você'}
          </motion.div>
        )}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold mb-2 text-balance"
        >
          {ready ? `Seu ${block.protocol} está pronto.` : 'Seu plano está pronto.'} Agora é cumprir o pacto.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-white/60 text-sm"
        >
          Pague <span className="text-primary font-bold">uma vez</span>. Cumpra{' '}
          <span className="text-primary font-bold">todos os dias</span>.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-white/40 text-xs mt-1.5 italic"
        >
          {ready
            ? `Você prometeu chegar ao dia 90 ${mirrorLower}. Escolha como vai cumprir.`
            : 'Você já sabe o que está te travando. Agora falta cumprir o que prometeu.'}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-3 inline-flex items-center gap-2 rounded-full border border-destructive/40 bg-destructive/10 px-3.5 py-1.5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" aria-hidden="true" />
          <span className="text-xs font-semibold text-destructive">
            Preço de lançamento termina em <span className="tabular-nums">{countdown}</span>
          </span>
        </motion.div>
        <p className="mt-2 text-[11px] text-white/45 max-w-xs mx-auto text-balance">
          O NEXUS está em lançamento. Até o fim da contagem, você paga menos, e o acesso continua seu pra sempre.
        </p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="mt-3 flex items-center justify-center gap-2"
        >
          <div className="flex -space-x-2">
            {PLAN_TESTIMONIALS.map((t) => (
              <div key={t.name} className="w-7 h-7 rounded-full overflow-hidden border-2 border-background">
                <Image src={t.image} alt={t.name} width={28} height={28} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <FiveStars />
          <span className="text-[11px] text-white/50">20.000+ usuários</span>
        </motion.div>
      </div>

      <PlanTabs selected={selectedPlan} onSelect={setSelectedPlan} />
      <PlanCarousel selected={selectedPlan} onSelect={setSelectedPlan} onUnlock={handleUnlock} blockWithArticle={ready ? block.withArticle : 'o seu bloqueio'} />

      <EvolutionProjection {...projection} protocol={ready ? block.protocol : 'Seu plano'} />
      <PlansTestimonials />
      <PlansFaq />
      <GuaranteeSeal />

      <CommunityModal
        plan={selectedPlan}
        open={communityOpen}
        processing={redirecting}
        onClose={() => setCommunityOpen(false)}
        checkoutHref={checkoutHref}
        onCheckoutStart={startRedirect}
      />

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 left-4 right-4 md:left-auto md:right-6 md:max-w-xs z-50 pointer-events-none"
            role="status"
          >
            <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-white/10 border border-white/10">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 text-primary" />
              </div>
              <span className="text-xs text-white/80 truncate">{toast}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
