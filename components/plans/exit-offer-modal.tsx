'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Check, Crown, Gift, Shield, X } from 'lucide-react'
import type { MouseEventHandler } from 'react'

const PERKS = ['Tudo do Focuz, ilimitado', 'Uma IA que te cobra todo dia', 'Um plano que se ajusta ao seu ritmo', 'Suporte humano prioritário']

type ExitOfferModalProps = {
  open: boolean
  redirecting: boolean
  onClose: () => void
  acceptHref: string
  onAccept: MouseEventHandler<HTMLAnchorElement>
  blockName: string
}

export function ExitOfferModal({ open, redirecting, onClose, acceptHref, onAccept, blockName }: ExitOfferModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="exit-offer-title"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-gradient-to-b from-zinc-900 to-black border border-red-500/50 rounded-3xl p-6 shadow-2xl shadow-red-500/20"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              aria-label="Fechar"
            >
              <X className="w-5 h-5 text-zinc-400" />
            </button>
            <div className="flex justify-center mb-4">
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }}
                className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-500/40"
              >
                <Gift className="w-8 h-8 text-white" />
              </motion.div>
            </div>
            <h2 id="exit-offer-title" className="text-2xl font-bold text-center text-white mb-2">
              Espera. Seu pacto ainda vale.
            </h2>
            <p className="text-zinc-400 text-center text-sm mb-6 text-balance">
              Não deixa {blockName} ganhar de novo. Leva o plano mais completo por menos que o Focuz.
            </p>

            <div className="bg-gradient-to-br from-red-500/20 to-red-600/10 border border-red-500/30 rounded-2xl p-5 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Crown className="w-8 h-8 text-red-400" />
                  <div>
                    <p className="text-white font-bold">NEXUS Intensive</p>
                    <p className="text-xs text-zinc-400">O plano mais completo</p>
                  </div>
                </div>
                <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">-40%</div>
              </div>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-zinc-500 line-through text-lg">R$39,90</span>
                <span className="text-4xl font-bold text-red-400">R$24</span>
                <span className="text-zinc-400 text-sm">pagamento único</span>
              </div>
              <ul className="flex flex-col gap-2 mb-4">
                {PERKS.map((perk) => (
                  <li key={perk} className="flex items-center gap-2 text-sm text-zinc-300">
                    <Check className="w-4 h-4 text-red-400" />
                    {perk}
                  </li>
                ))}
              </ul>
            </div>

            {/* onClickCapture, not onClick: React's onClick sets element.onclick, which UTMify's pixel calls instead of navigating after InitiateCheckout. */}
            {/* Keep the label constant while redirecting: the pixel reads textContent after this re-render. */}
            <a
              href={acceptHref}
              onClickCapture={onAccept}
              aria-disabled={redirecting}
              aria-busy={redirecting}
              className={`flex items-center justify-center gap-2 w-full px-4 py-4 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-center text-white font-bold text-lg shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all mb-3 ${redirecting ? 'pointer-events-none opacity-50' : ''}`}
            >
              {redirecting && (
                <span
                  className="w-4 h-4 shrink-0 border-2 border-white/30 border-t-white rounded-full animate-spin"
                  aria-hidden="true"
                />
              )}
              Quero o Intensive por R$24
            </a>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 text-zinc-500 text-sm hover:text-zinc-300 transition-colors"
            >
              Não, vou deixar pra depois
            </button>
            <p className="text-center text-xs text-zinc-500 mt-4">
              <Shield className="w-3 h-3 inline mr-1" />
              7 dias de garantia. Não gostou, devolvemos tudo.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
