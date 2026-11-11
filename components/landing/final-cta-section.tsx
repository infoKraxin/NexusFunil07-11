import { ArrowRight, Zap } from 'lucide-react'
import Link from 'next/link'
import { GUIDES } from '@/lib/guides'
import { nexusButtonVariants } from '@/components/nexus/nexus-button'
import { NexusLogo } from '@/components/nexus/nexus-logo'
import { cn } from '@/lib/utils'

export function FinalCtaSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="glass-card rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" aria-hidden="true" />
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-6">
              <Zap className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Seu bloqueio tem nome. Descubra o seu.</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              2 minutos e 12 perguntas. No final, você recebe o seu diagnóstico e um plano montado pra você.
            </p>
            <Link
              href="/onboarding/quiz"
              className={cn(
                nexusButtonVariants({ size: 'lg' }),
                'bg-primary text-primary-foreground hover:bg-primary/90 gap-2 text-base px-10',
              )}
            >
              Descobrir o que me trava
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export function LandingFooter() {
  return (
    <footer className="border-t border-border/50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/" aria-label="NEXUS - Início">
            <NexusLogo size="sm" />
          </Link>
          <nav aria-label="Guias" className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <Link href="/guias" className="hover:text-foreground">Guias</Link>
            {GUIDES.slice(0, 5).map((g) => (
              <Link key={g.slug} href={`/guias/${g.slug}`} className="hover:text-foreground">{g.short}</Link>
            ))}
          </nav>
          <p className="text-sm text-muted-foreground">© 2026 NEXUS. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
