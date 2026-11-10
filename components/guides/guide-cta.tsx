import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export const quizHref = (slug: string) => `/onboarding/quiz?utm_source=seo&utm_medium=organic&utm_campaign=${slug}`

export function GuideCtaInline({ slug, text }: { slug: string; text: string }) {
  return (
    <Link
      href={quizHref(slug)}
      className="my-10 flex items-center gap-4 rounded-2xl border border-primary/30 bg-primary/[0.06] p-5 transition hover:border-primary/60"
    >
      <p className="flex-1 text-[15px] font-medium leading-snug text-white/90">{text}</p>
      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <ArrowRight className="h-5 w-5" />
      </span>
    </Link>
  )
}

export function GuideCtaFinal({ slug }: { slug: string }) {
  return (
    <section className="relative mt-14 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] px-6 pt-8 text-center">
      <div className="pointer-events-none absolute left-1/2 top-24 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" aria-hidden="true" />
      <p className="relative font-mono text-[11px] uppercase tracking-[0.18em] text-primary">Diagnóstico grátis</p>
      <h2 className="relative mt-3 text-2xl font-bold text-balance">Descubra o que te impede de evoluir</h2>
      <p className="relative mx-auto mt-3 max-w-sm text-sm text-white/60 text-balance">
        12 perguntas, 2 minutos. Você recebe seu bloqueio principal e um plano de 90 dias montado pra ele.
      </p>
      <Link
        href={quizHref(slug)}
        className="relative mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-bold text-primary-foreground transition hover:bg-primary/90"
      >
        Descobrir o que me trava <ArrowRight className="h-4 w-4" />
      </Link>
      <div className="relative mx-auto mt-6 h-[220px] w-[220px]">
        <Image
          src="/images/personagem-forte-torso.webp"
          alt="Personagem do NEXUS depois da evolução"
          fill
          sizes="220px"
          className="object-contain object-bottom"
        />
      </div>
    </section>
  )
}
