import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { GuideCtaFinal, GuideCtaInline } from '@/components/guides/guide-cta'
import { LandingFooter } from '@/components/landing/final-cta-section'
import { LandingNav } from '@/components/landing/landing-nav'
import { getGuide, GUIDES } from '@/lib/guides'
import { SITE_NAME, SITE_URL } from '@/lib/site'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false
export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const guide = getGuide((await params).slug)
  if (!guide) return {}
  const path = `/guias/${guide.slug}`
  return {
    title: { absolute: guide.seoTitle },
    description: guide.description,
    alternates: { canonical: path },
    openGraph: { type: 'article', url: path, title: guide.seoTitle, description: guide.description },
    twitter: { title: guide.seoTitle, description: guide.description },
  }
}

export default async function GuidePage({ params }: Props) {
  const guide = getGuide((await params).slug)
  if (!guide) notFound()
  const url = `${SITE_URL}/guias/${guide.slug}`
  const mid = Math.ceil(guide.sections.length / 2)
  const related = guide.related.map(getGuide).filter((g) => g !== undefined)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: guide.h1,
        description: guide.description,
        url,
        inLanguage: 'pt-BR',
        image: `${SITE_URL}/og.png`,
        author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
        publisher: { '@type': 'Organization', name: SITE_NAME, logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/nexus-logo.png` } },
        mainEntityOfPage: url,
      },
      {
        '@type': 'FAQPage',
        mainEntity: guide.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Início', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Guias', item: `${SITE_URL}/guias` },
          { '@type': 'ListItem', position: 3, name: guide.h1, item: url },
        ],
      },
    ],
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <LandingNav />
      <main id="main-content" className="mx-auto max-w-2xl px-5 pb-20 pt-28">
        <nav aria-label="Trilha" className="mb-6 text-xs text-white/40">
          <Link href="/" className="hover:text-white/70">Início</Link>
          <span className="mx-1.5">/</span>
          <Link href="/guias" className="hover:text-white/70">Guias</Link>
        </nav>

        <article>
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-balance md:text-4xl">{guide.h1}</h1>
          <p className="mt-5 text-lg leading-relaxed text-white/70">{guide.lead}</p>

          {guide.sections.map((s, i) => (
            <div key={s.h2}>
              {i === mid && <GuideCtaInline slug={guide.slug} text={guide.midCta} />}
              <section className="mt-10">
                <h2 className="text-xl font-bold text-balance md:text-2xl">{s.h2}</h2>
                {s.p.map((p) => (
                  <p key={p} className="mt-4 leading-relaxed text-white/75">{p}</p>
                ))}
                {s.list && (
                  <ul className="mt-4 space-y-3">
                    {s.list.map((item) => (
                      <li key={item} className="flex gap-3 leading-relaxed text-white/75">
                        <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </div>
          ))}

          <section className="mt-12">
            <h2 className="text-xl font-bold md:text-2xl">Perguntas frequentes</h2>
            <div className="mt-4 divide-y divide-white/10 rounded-2xl border border-white/10">
              {guide.faq.map((f) => (
                <details key={f.q} className="group px-5 py-4">
                  <summary className="cursor-pointer list-none font-medium marker:hidden">
                    <span className="flex items-center justify-between gap-4">
                      {f.q}
                      <span className="text-primary transition group-open:rotate-45">+</span>
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          <GuideCtaFinal slug={guide.slug} />

          {related.length > 0 && (
            <section className="mt-14">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-white/50">Leia também</h2>
              <div className="mt-4 grid gap-3">
                {related.map((g) => (
                  <Link
                    key={g.slug}
                    href={`/guias/${g.slug}`}
                    className="rounded-xl border border-white/10 bg-white/[0.02] p-4 transition hover:border-primary/40"
                  >
                    <p className="font-semibold">{g.h1}</p>
                    <p className="mt-1 line-clamp-2 text-sm text-white/55">{g.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section className="mt-12 border-t border-white/10 pt-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-white/40">Fontes</h2>
            <ul className="mt-3 space-y-1.5">
              {guide.sources.map((s) => (
                <li key={s.url} className="text-xs text-white/45">
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:text-white/70 hover:underline">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </article>
      </main>
      <LandingFooter />
    </div>
  )
}
