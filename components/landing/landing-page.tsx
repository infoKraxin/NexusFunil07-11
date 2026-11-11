'use client'

import { useEffect, useState } from 'react'
import { ArenaSection } from './arena-section'
import { CoordinatorSection } from './coordinator-section'
import { EvolutionSection } from './evolution-section'
import { FeaturesSection } from './features-section'
import { FinalCtaSection, LandingFooter } from './final-cta-section'
import { HeroSection } from './hero-section'
import { LandingNav } from './landing-nav'
import { ScientificPillarsSection } from './scientific-pillars-section'
import { StatsSection } from './stats-section'
import { SystemBoot } from './system-boot'
import { TestimonialsSection } from './testimonials-section'

export function LandingPage() {
  const [bootVisible, setBootVisible] = useState(true)

  // Enquanto a abertura está na tela, a página fica parada por baixo (sem rolar).
  useEffect(() => {
    if (!bootVisible) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
      window.scrollTo(0, 0)
    }
  }, [bootVisible])

  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-b from-black via-black to-[#0a0f0a]">
      {bootVisible && <SystemBoot onComplete={() => setBootVisible(false)} />}
      {/*
        SEO: o conteúdo da página sai no HTML desde o início, por baixo da abertura.
        Antes ele só existia depois do clique em "Iniciar sistema", e o Google via uma página vazia.
        A troca de `key` remonta a página quando a abertura termina, pra as animações de entrada tocarem na hora certa.
      */}
      <div
        key={bootVisible ? 'sob-a-abertura' : 'visivel'}
        inert={bootVisible}
        className={bootVisible ? undefined : 'animate-fade-in'}
        style={bootVisible ? undefined : { animationDuration: '1.5s' }}
      >
        <LandingNav />
        <HeroSection />
        <StatsSection />
        <CoordinatorSection />
        <FeaturesSection />
        <EvolutionSection />
        <ArenaSection />
        <ScientificPillarsSection />
        <TestimonialsSection />
        <FinalCtaSection />
        <LandingFooter />
      </div>
    </div>
  )
}
