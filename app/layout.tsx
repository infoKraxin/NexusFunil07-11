import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Caveat, Inter, JetBrains_Mono } from 'next/font/google'
import { BackgroundMusicProvider } from '@/components/nexus/background-music-provider'
import { GlobalClickSound } from '@/components/nexus/global-click-sound'
import { UtmCapture } from '@/components/nexus/utm-capture'
import { UtmifyLeadScript, UtmifyPixel, UtmifyScripts } from '@/components/nexus/utmify-scripts'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono' })
const caveat = Caveat({ subsets: ['latin'], variable: '--font-caveat', weight: ['500', '700'] })

const description =
  'The futuristic habit tracking app that transforms your daily routine into a competitive journey of self-improvement.'

export const metadata: Metadata = {
  title: 'NEXUS | Evolve Your Routine',
  description,
  openGraph: {
    title: 'NEXUS | Evolve Your Routine',
    description,
    siteName: 'NEXUS',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'NEXUS | Evolve Your Routine',
    description,
  },
  icons: {
    icon: '/images/nexus-logo.png',
    apple: '/images/nexus-logo.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#00FF85',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`dark bg-background ${inter.variable} ${jetbrainsMono.variable} ${caveat.variable}`}>
      <head>
        <UtmifyPixel />
      </head>
      <body className="font-sans antialiased min-h-screen bg-background">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring"
        >
          Pular para o conteúdo principal
        </a>
        <UtmCapture />
        <GlobalClickSound />
        <BackgroundMusicProvider>{children}</BackgroundMusicProvider>
        <UtmifyScripts />
        {process.env.NODE_ENV === 'production' && <Analytics />}
        <UtmifyLeadScript />
      </body>
    </html>
  )
}
