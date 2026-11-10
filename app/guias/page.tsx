import type { Metadata } from 'next'
import Link from 'next/link'
import { GuideCtaFinal } from '@/components/guides/guide-cta'
import { LandingFooter } from '@/components/landing/final-cta-section'
import { LandingNav } from '@/components/landing/landing-nav'
import { GUIDES } from '@/lib/guides'

const title = 'Guias de hábitos, disciplina e produtividade'
const description =
  'Como criar hábitos, parar de procrastinar e ter disciplina, com base em estudos. E como levar o Sistema do Solo Leveling pra vida real.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/guias' },
  openGraph: { url: '/guias', title, description },
}

export default function GuidesIndex() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingNav />
      <main id="main-content" className="mx-auto max-w-2xl px-5 pb-20 pt-28">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h1>
        <p className="mt-4 text-white/65">{description}</p>
        <div className="mt-10 grid gap-4">
          {GUIDES.map((g) => (
            <Link
              key={g.slug}
              href={`/guias/${g.slug}`}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-primary/40"
            >
              <h2 className="text-lg font-semibold">{g.h1}</h2>
              <p className="mt-1.5 text-sm text-white/55">{g.description}</p>
            </Link>
          ))}
        </div>
        <GuideCtaFinal slug="guias" />
      </main>
      <LandingFooter />
    </div>
  )
}
