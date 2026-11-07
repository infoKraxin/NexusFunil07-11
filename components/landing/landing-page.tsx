'use client'

import { useState } from 'react'
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

  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-b from-black via-black to-[#0a0f0a]">
      {bootVisible ? (
        <SystemBoot onComplete={() => setBootVisible(false)} />
      ) : (
        <div className="animate-fade-in" style={{ animationDuration: '1.5s' }}>
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
      )}
    </div>
  )
}
