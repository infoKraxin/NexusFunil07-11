import { LandingPage } from '@/components/landing/landing-page'
import { SEO_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site'

// Dados estruturados: o "cartão" do app e da marca pro Google.
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#org`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/images/nexus-logo.png`,
    },
    {
      '@type': 'WebApplication',
      name: SITE_NAME,
      url: SITE_URL,
      description: SEO_DESCRIPTION,
      applicationCategory: 'LifestyleApplication',
      operatingSystem: 'Android, iOS, Web',
      inLanguage: 'pt-BR',
      publisher: { '@id': `${SITE_URL}/#org` },
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'BRL',
        lowPrice: '19.90',
        highPrice: '39.90',
        offerCount: 3,
      },
    },
  ],
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <LandingPage />
    </>
  )
}
