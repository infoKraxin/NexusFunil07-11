import { Activity, ArrowRight, Brain, Check, Flame, Home, Sparkles, Star, Swords, Timer, TrendingUp, Trophy, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { nexusButtonVariants } from '@/components/nexus/nexus-button'
import { cn } from '@/lib/utils'

const AVATARS = [
  { name: 'Lucas', src: '/images/avatars/homem1.jpeg' },
  { name: 'Pedro', src: '/images/avatars/homem2.jpeg' },
  { name: 'Ana Paula', src: '/images/avatars/mulher1.jpeg' },
  { name: 'Thiago', src: '/images/avatars/homem3.jpeg' },
  { name: 'Rafael', src: '/images/avatars/rafael.jpeg' },
]

const MISSIONS = [
  { icon: Activity, label: 'Treino de 20 min', xp: 60, done: true },
  { icon: Brain, label: 'Estudar 1 bloco', xp: 50, done: true },
  { icon: Timer, label: 'Meditar 5 min', xp: 30, done: false },
]

export function HeroSection() {
  return (
    <section id="main-content" tabIndex={-1} className="relative pt-32 pb-20 px-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-10 -left-20 md:top-10 md:left-10 w-[150px] h-[150px] md:w-[250px] md:h-[250px] bg-primary/20 rounded-full blur-[40px] md:blur-[50px] opacity-60" />
        <div className="absolute top-1/2 -right-20 md:top-40 md:right-10 w-[150px] h-[150px] md:w-[200px] md:h-[200px] bg-primary/15 rounded-full blur-[30px] md:blur-[40px] opacity-60" />
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 md:bottom-20 md:left-auto md:right-1/3 md:translate-x-0 w-[120px] h-[120px] md:w-[180px] md:h-[180px] bg-primary/10 rounded-full blur-[25px] md:blur-[35px] opacity-60" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Inspirado em Solo Leveling</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
              Você não tem falta de disciplina. <span className="text-primary">Tem um bloqueio.</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 text-pretty">
              Descubra em 2 minutos o que te faz largar tudo no meio. Depois, suba de nível todo dia com um sistema
              montado pra você, no estilo Solo Leveling.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/onboarding/quiz"
                className={cn(
                  nexusButtonVariants({ size: 'lg' }),
                  'w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 gap-2 text-base px-8',
                )}
              >
                Descobrir o que me trava <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <p className="mt-3 text-xs text-muted-foreground text-center lg:text-left">Grátis · 2 minutos · 12 perguntas</p>
            <div className="flex items-center gap-4 mt-8 justify-center lg:justify-start">
              <div className="flex -space-x-3">
                {AVATARS.map((avatar) => (
                  <div key={avatar.name} className="w-10 h-10 rounded-full overflow-hidden border-2 border-background">
                    <Image
                      src={avatar.src}
                      alt={avatar.name}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1" aria-label="Avaliação 5 de 5 estrelas">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" aria-hidden="true" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">+20.000 usuários ativos</p>
              </div>
            </div>
          </div>

          <div className="flex-1 relative w-full">
            <PhoneMockup />
          </div>
        </div>
      </div>
    </section>
  )
}

function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[270px] md:w-[300px]">
      <div className="absolute inset-x-6 top-16 bottom-10 rounded-full bg-primary/25 blur-[60px]" aria-hidden="true" />

      {/* aparelho */}
      <div className="relative rounded-[46px] p-[10px] bg-gradient-to-b from-zinc-600 via-zinc-800 to-zinc-900 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9),inset_0_0_0_1px_rgba(255,255,255,0.08)]">
        <div className="relative rounded-[37px] overflow-hidden bg-[#050607] ring-1 ring-black">
          {/* status bar + dynamic island */}
          <div className="relative h-11 flex items-center justify-between px-6 text-[11px] font-semibold">
            <span>9:41</span>
            <div className="absolute left-1/2 top-2 -translate-x-1/2 w-[88px] h-[26px] rounded-full bg-black" />
            <span className="flex items-center gap-1">
              <span className="flex items-end gap-[2px]">
                {[4, 6, 8, 10].map((h) => (
                  <span key={h} className="w-[3px] rounded-sm bg-foreground" style={{ height: h }} />
                ))}
              </span>
              <span className="ml-1 w-[22px] h-[11px] rounded-[3px] border border-foreground/70 p-[1.5px]">
                <span className="block h-full w-[80%] rounded-[1px] bg-foreground" />
              </span>
            </span>
          </div>

          <div className="px-4 pb-3 flex flex-col gap-3">
            {/* perfil */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-zinc-900 ring-2 ring-primary/60">
                <Image src="/images/personagem-forte-busto.webp" alt="" width={80} height={80} className="w-full h-full object-cover object-top scale-125 origin-top" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-muted-foreground leading-none">Nível 12 · Caçador</p>
                <p className="text-sm font-bold leading-tight mt-0.5">Player_One</p>
              </div>
              <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-orange-500/10 border border-orange-500/25">
                <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
                <span className="text-xs font-bold text-orange-300">127</span>
              </div>
            </div>

            {/* XP */}
            <div className="rounded-2xl p-3 bg-gradient-to-br from-primary/15 to-primary/[0.03] border border-primary/25">
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-primary">Experiência</span>
                <span className="text-[11px] font-semibold tabular-nums">
                  2.340 <span className="text-muted-foreground font-normal">/ 3.000 XP</span>
                </span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-black/50 overflow-hidden">
                <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-primary/70 to-primary shadow-[0_0_10px_var(--primary)]" />
              </div>
              <p className="mt-1.5 text-[10px] text-muted-foreground">Faltam 660 XP para o nível 13</p>
            </div>

            {/* missões */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold">Missões de hoje</span>
                <span className="text-[10px] text-primary font-semibold">2/3</span>
              </div>
              <div className="flex flex-col gap-1.5">
                {MISSIONS.map((m) => (
                  <div key={m.label} className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                    <span
                      className={cn(
                        'w-[18px] h-[18px] rounded-md flex items-center justify-center shrink-0',
                        m.done ? 'bg-primary' : 'border border-muted-foreground/50',
                      )}
                    >
                      {m.done && <Check className="w-3 h-3 text-primary-foreground" strokeWidth={3} />}
                    </span>
                    <m.icon className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    <span className={cn('flex-1 text-[12px]', m.done && 'text-muted-foreground line-through')}>{m.label}</span>
                    <span className={cn('text-[10px] font-bold tabular-nums', m.done ? 'text-primary' : 'text-muted-foreground')}>
                      +{m.xp} XP
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* arena */}
            <div className="rounded-2xl p-3 bg-white/[0.04] border border-white/[0.06]">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-semibold">
                  <Swords className="w-3.5 h-3.5 text-primary" /> Duelo da semana
                </span>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-primary/15 text-primary">VENCENDO</span>
              </div>
              <div className="mt-2 flex items-center gap-2 text-[11px]">
                <span className="font-bold tabular-nums">450</span>
                <div className="flex-1 h-1.5 rounded-full bg-zinc-700 overflow-hidden">
                  <div className="h-full w-[54%] bg-primary rounded-full" />
                </div>
                <span className="font-bold tabular-nums text-muted-foreground">380</span>
              </div>
              <div className="mt-1 flex justify-between text-[9px] text-muted-foreground">
                <span>Você</span>
                <span>Lucas M.</span>
              </div>
            </div>
          </div>

          {/* tab bar */}
          <div className="mt-1 border-t border-white/[0.06] px-6 pt-2.5 pb-3 flex items-center justify-between">
            {[Home, Swords, Trophy, Users].map((I, i) => (
              <I key={i} className={cn('w-[18px] h-[18px]', i === 0 ? 'text-primary' : 'text-muted-foreground/60')} />
            ))}
          </div>
          <div className="mx-auto mb-2 h-1 w-24 rounded-full bg-foreground/60" />
        </div>
      </div>

      {/* selos flutuantes — fora da tela do app */}
      <div className="absolute -left-3 -top-4 glass-card rounded-xl px-3 py-2 shadow-lg animate-float-cards" style={{ animationDelay: '0s' }}>
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-primary" />
          <span className="text-xs font-semibold">#3 no ranking</span>
        </div>
      </div>
      <div className="absolute -right-3 -bottom-4 glass-card rounded-xl px-3 py-2 shadow-lg animate-float-cards" style={{ animationDelay: '1.3s' }}>
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-primary" />
          <span className="text-xs font-semibold">+120 XP hoje</span>
        </div>
      </div>
    </div>
  )
}
