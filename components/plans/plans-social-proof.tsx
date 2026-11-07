'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Check, ChevronRight, Flame, Headphones, Quote, Star } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { FAQ, PLAN_TESTIMONIALS } from './plans-data'

function FiveStars({ size = 'w-3 h-3' }: { size?: string }) {
  return (
    <div className="flex items-center gap-0.5" aria-label="5 de 5 estrelas">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`${size} fill-primary text-primary`} aria-hidden="true" />
      ))}
    </div>
  )
}

export function PlansTestimonials() {
  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="px-4 pb-6"
      >
        <h2 className="text-sm font-semibold text-white/60 text-center mb-4 tracking-wider">
          QUEM JÁ CUMPRIU O PACTO
        </h2>
        <div className="flex flex-col gap-3">
          {PLAN_TESTIMONIALS.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + 0.08 * i }}
              className="rounded-2xl p-4 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 relative overflow-hidden"
            >
              <div className="flex items-start gap-3 mb-2.5">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-primary/30 flex-shrink-0">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-white truncate">{testimonial.name}</p>
                  <p className="text-[11px] text-white/50 truncate">{testimonial.role}</p>
                </div>
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 flex-shrink-0">
                  <Flame className="w-3 h-3 fill-orange-500 text-orange-500" />
                  <span className="text-[11px] font-bold text-orange-500">{testimonial.streak}</span>
                </div>
              </div>
              <div className="relative mb-2.5">
                <Quote className="absolute -left-0.5 -top-0.5 w-4 h-4 text-primary/25" aria-hidden="true" />
                <p className="text-[13px] text-white/60 pl-5 leading-relaxed">{testimonial.text}</p>
              </div>
              <div className="flex items-center justify-between">
                <FiveStars />
                <span className="text-[11px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
                  {testimonial.improvement}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <div className="px-4 pb-4">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center flex flex-col gap-2">
          <p className="text-sm text-white/80 font-medium">
            <span className="text-primary font-bold">20.000+ pessoas</span> já fizeram esse pacto
          </p>
          <p className="text-xs text-white/50">Agora é a sua vez de cumprir o seu.</p>
        </div>
      </div>
    </>
  )
}

export function PlansFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="px-4 pb-6"
      >
        <h2 className="text-sm font-semibold text-white/60 text-center mb-4 tracking-wider">DÚVIDAS FREQUENTES</h2>
        <div className="flex flex-col gap-2">
          {FAQ.map((item, i) => {
            const isOpen = openIndex === i
            return (
              <div key={item.question} className="border border-white/10 rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="font-medium text-sm">{item.question}</span>
                  <ChevronRight
                    className={`w-4 h-4 text-white/40 transition-transform ${isOpen ? 'rotate-90' : ''}`}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="px-4 pb-4 text-sm text-white/60">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </motion.section>

      <div className="px-4 pb-4">
        <a
          href="https://wa.me/5521965450784?text=Ol%C3%A1!%20Tenho%20Duvidas%20sobre%20o%20NexusApp"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 rounded-xl border border-primary/50 text-primary font-medium flex items-center justify-center gap-2 hover:bg-primary/10 transition-colors"
        >
          <Headphones className="w-5 h-5" />
          Tem dúvida? Fala com a gente
        </a>
      </div>
    </>
  )
}

const GUARANTEE_POINTS = [
  'Reembolso integral, sem letra miúda',
  'Sem formulário e sem justificativa',
  'Pedido direto no WhatsApp do suporte',
]

export function GuaranteeSeal() {
  return (
    <div className="px-4 pb-8">
      <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-primary/5 p-6 text-center">
        <div className="flex justify-center mb-4">
          <Image
            src="/images/selo-garantia-7-dias.png"
            alt="Selo dourado de Garantia de 7 dias"
            width={176}
            height={176}
            sizes="176px"
            className="w-40 h-40 sm:w-44 sm:h-44 object-contain drop-shadow-xl"
          />
        </div>
        <h3 className="text-lg font-bold text-white mb-2 text-balance">Não gostou? Devolvemos tudo.</h3>
        <p className="text-xs text-white/50 leading-relaxed max-w-xs mx-auto mb-5 text-pretty">
          Você tem 7 dias de acesso completo pra testar o sistema inteiro. Se não for pra você, devolvemos cada centavo.
        </p>
        <ul className="flex flex-col gap-2.5 max-w-[260px] mx-auto text-left">
          {GUARANTEE_POINTS.map((point) => (
            <li key={point} className="flex items-center gap-2.5">
              <Check className="w-3.5 h-3.5 text-primary shrink-0" />
              <span className="text-[11px] text-white/60 leading-snug">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export { FiveStars }
