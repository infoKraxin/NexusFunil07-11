import type { Metadata } from 'next'

// Quiz, análise, diagnóstico, pacto e planos são personalizados: fora do Google.
export const metadata: Metadata = {
  title: 'Seu diagnóstico',
  robots: { index: false, follow: false },
}

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return children
}
