import { Activity, ArrowRight, Brain, Flame, Sparkles, Star, Timer, TrendingUp, Trophy, Users } from 'lucide-react'
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

const TASKS = [
  { icon: Brain, label: 'Estudar 2h', done: true },
  { icon: Activity, label: 'Treino manhã', done: true },
  { icon: Timer, label: 'Meditação', done: false },
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
              <span className="text-sm text-primary font-medium">Versão 2.0 disponível</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
              nexus <span className="text-primary">evolution system</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 text-pretty">
              O app que gamifica seus hábitos com base no anime Solo Leveling. Crie seu sistema personalizado com base
              nas suas prioridades e se torne a melhor versão de si em 30 dias.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/onboarding/quiz"
                className={cn(
                  nexusButtonVariants({ size: 'lg' }),
                  'w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 gap-2 text-base px-8',
                )}
              >
                Descobrir Meu Potencial <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="flex items-center gap-4 mt-10 justify-center lg:justify-start">
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
                <p className="text-sm text-muted-foreground">+20.000 usuarios ativos</p>
              </div>
            </div>
          </div>

          <div className="flex-1 relative">
            <div className="relative mx-auto w-72 md:w-80">
              <div className="relative rounded-[3rem] bg-gradient-to-b from-secondary to-card p-3 shadow-2xl">
                <div className="rounded-[2.5rem] bg-background overflow-hidden">
                  <div className="h-12 bg-card flex items-center justify-center">
                    <div className="w-24 h-6 rounded-full bg-background" />
                  </div>
                  <div className="p-4 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">Bem-vindo de volta</p>
                        <p className="font-semibold">Player_One</p>
                      </div>
                      <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                        <Flame className="w-4 h-4 text-primary" />
                        <span className="text-sm font-bold text-primary">127</span>
                      </div>
                    </div>

                    <div className="glass-card rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-muted-foreground">Progresso Diário</span>
                        <span className="text-sm font-bold text-primary">78%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full w-[78%] bg-gradient-to-r from-primary to-accent rounded-full" />
                      </div>
                      <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                        <span>7/9 tasks</span>
                        <span>+450 pts</span>
                      </div>
                    </div>

                    <div className="glass-card rounded-xl p-4 border border-primary/30">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                          <Users className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Arena Ativa</p>
                          <p className="text-xs text-muted-foreground">vs Lucas M.</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-center">
                          <p className="text-lg font-bold">450</p>
                          <p className="text-xs text-muted-foreground">Você</p>
                        </div>
                        <div className="text-xs text-primary font-medium">VENCENDO</div>
                        <div className="text-center">
                          <p className="text-lg font-bold text-muted-foreground">380</p>
                          <p className="text-xs text-muted-foreground">Lucas</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      {TASKS.map((task) => (
                        <div key={task.label} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                          <div
                            className={cn(
                              'w-5 h-5 rounded-full border-2 flex items-center justify-center',
                              task.done ? 'bg-primary border-primary' : 'border-muted-foreground',
                            )}
                          >
                            {task.done && <span className="text-xs text-primary-foreground">✓</span>}
                          </div>
                          <task.icon className="w-4 h-4 text-muted-foreground" />
                          <span className={cn('text-sm', task.done && 'line-through text-muted-foreground')}>
                            {task.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="absolute -left-16 top-20 glass-card rounded-xl p-3 shadow-lg mb-60 mt-[-40px] ml-11 animate-float-cards"
                style={{ animationDelay: '0s' }}
              >
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">#3 no Ranking</span>
                </div>
              </div>
              <div
                className="absolute -right-12 top-1/2 glass-card rounded-xl p-3 shadow-lg my-1 mb-0 mt-[-24px] mr-4 animate-float-cards"
                style={{ animationDelay: '1.3s' }}
              >
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  <span className="text-sm font-medium">+15% esta semana</span>
                </div>
              </div>
              <div
                className="absolute -left-8 bottom-32 glass-card rounded-xl p-3 shadow-lg mb-6 animate-float-cards"
                style={{ animationDelay: '0.7s' }}
              >
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-orange-400" />
                  <span className="text-sm font-medium">127 dias streak!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
