import { Activity, Target, Trophy, Users } from 'lucide-react'
import { FeatureCard } from './feature-card'

const FEATURES = [
  {
    icon: Target,
    title: 'Missões do seu tamanho',
    description: 'Organize suas tarefas por categorias: estudos, fitness, higiene, nutrição e mais.',
  },
  {
    icon: Activity,
    title: 'Track de Corrida',
    description: 'Monitore distância, tempo, pace e calorias. Compartilhe suas conquistas.',
  },
  {
    icon: Users,
    title: 'Arena de Duelos',
    description: 'Desafie amigos em competições em tempo real. Quem faz mais pontos vence.',
  },
  {
    icon: Trophy,
    title: 'Ranking Global',
    description: 'Suba no ranking, desbloqueie conquistas e prove que você é o melhor.',
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Quando largar fica <span className="text-primary">mais chato que continuar</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Missões, XP, ranking e duelos com amigos: o jogo te puxa nos dias em que a força de vontade não aparece.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </FeatureCard>
          ))}
        </div>
      </div>
    </section>
  )
}
