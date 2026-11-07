'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Crown, Shield, Swords, Trophy } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { FeatureCard } from './feature-card'

const PLAYERS = [
  { id: 1, name: 'Player_01', score: 450, position: '1º', label: 'Você', isWinner: true },
  { id: 2, name: 'Lucas_M', score: 380, position: '2º', label: '2º', isWinner: false },
  { id: 3, name: 'Ana_P', score: 320, position: '3º', label: '3º', isWinner: false },
]

const ARENA_FEATURES = [
  {
    icon: Swords,
    title: 'Duelos em Tempo Real',
    desc: 'Veja o placar atualizar enquanto você e seus amigos completam atividades',
  },
  { icon: Trophy, title: 'Rankings e Conquistas', desc: 'Desbloqueie badges especiais e suba no ranking global' },
  { icon: Shield, title: 'Módulos Personalizados', desc: 'Crie suas próprias atividades e defina os pontos' },
]

const HIGHLIGHT_ORDER = [2, 1, 0]
const BAR_WIDTHS = [80, 60, 40]

function positionBadgeClass(index: number) {
  return cn(
    index === 0 && 'bg-yellow-500 text-black',
    index === 1 && 'bg-slate-400 text-black',
    index === 2 && 'bg-orange-700 text-white',
  )
}

function useArenaCycle() {
  const [step, setStep] = useState(0)
  const [showWinner, setShowWinner] = useState(false)

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    const interval = setInterval(() => {
      setStep((current) => {
        if (current === 2) {
          setShowWinner(true)
          timers.push(setTimeout(() => setShowWinner(false), 2000))
          timers.push(setTimeout(() => setStep(0), 2500))
          return current
        }
        return current + 1
      })
    }, 2000)
    return () => {
      clearInterval(interval)
      timers.forEach(clearTimeout)
    }
  }, [])

  return { step, highlighted: HIGHLIGHT_ORDER[step], showWinner }
}

function WinnerBadge({ size }: { size: 'sm' | 'lg' }) {
  return (
    <div
      className={cn(
        'bg-gradient-to-r from-yellow-500 to-amber-500 text-black rounded-full font-bold flex items-center gap-2 shadow-lg',
        size === 'lg' ? 'px-5 py-2.5 text-base shadow-yellow-500/40' : 'px-4 py-2 text-sm shadow-yellow-500/30',
      )}
    >
      <Crown className={size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />
      VOCÊ VENCEU!
    </div>
  )
}

export function ArenaSection() {
  const { step, highlighted, showWinner } = useArenaCycle()
  const current = PLAYERS[highlighted]

  return (
    <section
      id="arena"
      className="py-24 px-6 bg-gradient-to-b from-background via-primary/5 to-background relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
      </div>
      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Swords className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Competição em Tempo Real</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Entre na <span className="text-primary">Arena</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Desafie seus amigos, complete atividades e veja quem consegue mais pontos. A Arena transforma sua rotina em
            uma competição épica.
          </p>
        </div>

        <div className="md:hidden relative flex justify-center items-center mb-12 min-h-[380px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={highlighted}
              initial={{ x: 100, opacity: 0, rotateY: 45, scale: 0.8 }}
              animate={{ x: 0, opacity: 1, rotateY: 0, scale: 1, y: [0, -10, 0] }}
              exit={{ x: -100, opacity: 0, rotateY: -45, scale: 0.8 }}
              transition={{
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1],
                y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
              }}
              className="relative"
            >
              <div
                className={cn(
                  'absolute -top-3 -left-3 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-lg z-30',
                  positionBadgeClass(highlighted),
                )}
              >
                {current.position}
              </div>
              <div
                className={cn(
                  'w-48 rounded-[2rem] p-2 transition-all duration-300',
                  highlighted === 0
                    ? 'bg-gradient-to-b from-primary/40 to-primary/20 shadow-xl shadow-primary/30'
                    : 'bg-gradient-to-b from-secondary to-card shadow-lg',
                )}
              >
                <div className="rounded-[1.5rem] bg-background overflow-hidden">
                  <div className="h-8 bg-card flex items-center justify-center">
                    <div className="w-16 h-4 rounded-full bg-background" />
                  </div>
                  <div className="p-4 flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          'w-10 h-10 rounded-full flex items-center justify-center font-bold text-base',
                          current.isWinner ? 'bg-primary/20 text-primary' : 'bg-secondary text-muted-foreground',
                        )}
                      >
                        {current.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{current.name}</p>
                        <p className="text-xs text-muted-foreground">{current.label}</p>
                      </div>
                    </div>
                    <div
                      className={cn(
                        'rounded-xl p-4 text-center',
                        current.isWinner ? 'bg-primary/10 border border-primary/30' : 'bg-secondary',
                      )}
                    >
                      <p className="text-4xl font-bold font-mono">
                        <span className={current.isWinner ? 'text-primary' : 'text-muted-foreground'}>
                          {current.score}
                        </span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">pontos</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      {BAR_WIDTHS.map((width, i) => (
                        <div key={width} className="h-2 bg-secondary rounded-full overflow-hidden">
                          <motion.div
                            className={cn(
                              'h-full rounded-full',
                              current.isWinner ? 'bg-primary' : 'bg-muted-foreground/50',
                            )}
                            initial={{ width: 0 }}
                            animate={{ width: `${width - 15 * highlighted}%` }}
                            transition={{ duration: 0.8, delay: 0.1 * i }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <AnimatePresence>
                {showWinner && highlighted === 0 && (
                  <motion.div
                    initial={{ scale: 0, y: 20 }}
                    animate={{ scale: 1, y: -50 }}
                    exit={{ scale: 0, y: 20 }}
                    className="absolute -top-6 left-1/2 -translate-x-1/2 z-30"
                  >
                    <WinnerBadge size="lg" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={cn(
                  'w-2 h-2 rounded-full transition-all duration-300',
                  step === i ? 'bg-primary w-6' : 'bg-muted-foreground/30',
                )}
              />
            ))}
          </div>
        </div>

        <div className="hidden md:flex relative justify-center items-end gap-8 mb-12 min-h-[400px]">
          {PLAYERS.map((player, index) => (
            <motion.div
              key={player.id}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: highlighted !== index ? 20 : 0, opacity: 1, scale: highlighted === index ? 1.05 : 0.95 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className={cn('relative', index === 0 ? 'z-20' : 'z-10')}
            >
              <div
                className={cn(
                  'w-52 rounded-[2rem] p-2 transition-all duration-300',
                  highlighted === index
                    ? 'bg-gradient-to-b from-primary/40 to-primary/20 shadow-lg shadow-primary/20'
                    : 'bg-gradient-to-b from-secondary to-card',
                )}
              >
                <div className="rounded-[1.5rem] bg-background overflow-hidden">
                  <div className="h-8 bg-card flex items-center justify-center">
                    <div className="w-16 h-4 rounded-full bg-background" />
                  </div>
                  <div className="p-3 flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          'w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm',
                          player.isWinner ? 'bg-primary/20 text-primary' : 'bg-secondary text-muted-foreground',
                        )}
                      >
                        {player.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate">{player.name}</p>
                        <p className="text-[10px] text-muted-foreground">{player.label}</p>
                      </div>
                    </div>
                    <div
                      className={cn(
                        'rounded-xl p-3 text-center',
                        player.isWinner ? 'bg-primary/10 border border-primary/30' : 'bg-secondary',
                      )}
                    >
                      <p className="text-3xl font-bold font-mono">
                        <span className={player.isWinner ? 'text-primary' : 'text-muted-foreground'}>
                          {player.score}
                        </span>
                      </p>
                      <p className="text-[10px] text-muted-foreground">pontos</p>
                    </div>
                    <div className="flex flex-col gap-1">
                      {BAR_WIDTHS.map((width, i) => (
                        <div key={width} className="h-1.5 bg-secondary rounded-full overflow-hidden">
                          <motion.div
                            className={cn(
                              'h-full rounded-full',
                              player.isWinner ? 'bg-primary' : 'bg-muted-foreground/50',
                            )}
                            initial={{ width: 0 }}
                            animate={{ width: `${width - 15 * index}%` }}
                            transition={{ duration: 0.8, delay: 0.1 * i }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <AnimatePresence>
                {showWinner && player.isWinner && (
                  <motion.div
                    initial={{ scale: 0, y: -20 }}
                    animate={{ scale: 1, y: -40 }}
                    exit={{ scale: 0, y: -20 }}
                    className="absolute -top-2 left-1/2 -translate-x-1/2 z-30"
                  >
                    <WinnerBadge size="sm" />
                  </motion.div>
                )}
              </AnimatePresence>
              <div
                className={cn(
                  'absolute -top-3 -left-3 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-lg',
                  positionBadgeClass(index),
                )}
              >
                {player.position}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {ARENA_FEATURES.map((feature) => (
            <FeatureCard key={feature.title}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.desc}</p>
                </div>
              </div>
            </FeatureCard>
          ))}
        </div>
      </div>
    </section>
  )
}
