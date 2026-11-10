import Link from 'next/link'
import { nexusButtonVariants } from '@/components/nexus/nexus-button'
import { NexusLogo } from '@/components/nexus/nexus-logo'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { href: '/#features', label: 'Recursos' },
  { href: '/#arena', label: 'Arena' },
  { href: '/#scientific-pillars', label: 'Pilares Científicos' },
  { href: '/#testimonials', label: 'Depoimentos' },
]

export function LandingNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 border-b border-border/50" aria-label="Principal">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" aria-label="NEXUS - Início">
          <NexusLogo size="sm" />
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition"
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link href="/onboarding/quiz" className={cn(nexusButtonVariants({ variant: 'ghost' }), 'text-sm')}>
            Entrar
          </Link>
          <Link
            href="/onboarding/quiz"
            className={cn(
              nexusButtonVariants({ size: 'sm' }),
              'bg-primary text-primary-foreground hover:bg-primary/90',
            )}
          >
            Fazer o diagnóstico
          </Link>
        </div>
      </div>
    </nav>
  )
}
