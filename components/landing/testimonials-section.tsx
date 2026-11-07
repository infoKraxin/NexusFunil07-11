import { Flame } from 'lucide-react'
import Image from 'next/image'
import { FeatureCard } from './feature-card'

const TESTIMONIALS = [
  {
    name: 'Lucas M.',
    role: 'Desenvolvedor',
    image: '/images/avatars/homem1.jpeg',
    text: 'A Arena mudou completamente como vejo produtividade. Agora tenho amigos me cobrando todos os dias!',
    streak: 127,
  },
  {
    name: 'Ana P.',
    role: 'Estudante de Medicina',
    image: '/images/avatars/mulher1.jpeg',
    text: 'Finalmente encontrei um app que entende que disciplina precisa ser divertida. Meus estudos nunca foram tão consistentes.',
    streak: 89,
  },
  {
    name: 'Rafael S.',
    role: 'Empreendedor',
    image: '/images/avatars/homem2.jpeg',
    text: 'O sistema de ranking me mantém motivado. Não quero perder minha posição para ninguém!',
    streak: 156,
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            O que nossos <span className="text-primary">usuários</span> dizem
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial) => (
            <FeatureCard key={testimonial.name}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/30 flex-shrink-0">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">{`“${testimonial.text}”`}</p>
              <div className="flex items-center gap-2 text-sm">
                <Flame className="w-4 h-4 text-orange-400" />
                <span className="font-medium">{testimonial.streak} dias de streak</span>
              </div>
            </FeatureCard>
          ))}
        </div>
      </div>
    </section>
  )
}
