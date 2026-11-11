import type { Metadata } from 'next'
import { GuideCtaFinal } from '@/components/guides/guide-cta'
import { LandingFooter } from '@/components/landing/final-cta-section'
import { LandingNav } from '@/components/landing/landing-nav'
import { ABOUT } from '@/lib/about'
import { SITE_NAME, SITE_URL } from '@/lib/site'

const title = 'Sobre o NEXUS: o que é, como funciona e quanto custa'
const description =
  'Informações oficiais do NEXUS, o app brasileiro de hábitos gamificado inspirado em Solo Leveling: o que é, para quem serve, como funciona, preço e site oficial.'

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: '/sobre' },
  openGraph: { url: '/sobre', title, description },
}

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        url: `${SITE_URL}/sobre`,
        name: title,
        inLanguage: 'pt-BR',
        about: { '@id': `${SITE_URL}/#org` },
      },
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#org`,
        name: SITE_NAME,
        alternateName: ['NEXUS Evolution System', 'NexusApp', 'zxnexus'],
        url: SITE_URL,
        logo: `${SITE_URL}/images/nexus-logo.png`,
        description: ABOUT.summary,
      },
      {
        '@type': 'FAQPage',
        mainEntity: ABOUT.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
    ],
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <LandingNav />
      <main id="main-content" className="mx-auto max-w-2xl px-5 pb-20 pt-28">
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-balance md:text-4xl">Sobre o NEXUS</h1>
        <p className="mt-5 text-lg font-medium leading-relaxed text-white/90">{ABOUT.oneLiner}</p>
        <p className="mt-4 leading-relaxed text-white/70">{ABOUT.summary}</p>

        <section className="mt-10">
          <h2 className="text-xl font-bold md:text-2xl">Resumo oficial</h2>
          <dl className="mt-4 divide-y divide-white/10 rounded-2xl border border-white/10">
            {ABOUT.facts.map(([k, v]) => (
              <div key={k} className="px-5 py-3.5 sm:flex sm:gap-4">
                <dt className="text-sm font-semibold text-primary sm:w-44 sm:flex-shrink-0">{k}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-white/75 sm:mt-0">{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-bold md:text-2xl">Perguntas frequentes</h2>
          <div className="mt-4 space-y-5">
            {ABOUT.faq.map((f) => (
              <div key={f.q}>
                <h3 className="font-semibold">{f.q}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/70">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <GuideCtaFinal slug="sobre" />
      </main>
      <LandingFooter />
    </div>
  )
}
