import Image from 'next/image'
import { BarChart3, Mic, Target, Zap } from 'lucide-react'
import { CoordinatorTerminal } from './coordinator-terminal'

const CAPABILITIES = [
  { icon: Target, label: 'Análise de Intenção', img: '/images/icons/intencao.png' },
  { icon: Zap, label: 'Cálculo de XP', img: '/images/icons/xp.png' },
  { icon: Mic, label: 'Comando de Voz', img: '/images/icons/voz.png' },
  { icon: BarChart3, label: 'Level Up', img: '/images/icons/levelup.png' },
]

const PATTERN = `
  linear-gradient(30deg, transparent 12%, rgba(34, 197, 94, 0.1) 12.5%, rgba(34, 197, 94, 0.1) 13%, transparent 13.5%),
  linear-gradient(150deg, transparent 12%, rgba(34, 197, 94, 0.1) 12.5%, rgba(34, 197, 94, 0.1) 13%, transparent 13.5%)
`

export function CoordinatorSection() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-black via-green-950/5 to-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute inset-0" style={{ backgroundImage: PATTERN, backgroundSize: '70px 120px' }} />
      </div>
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1 bg-green-500/10 border border-green-500/20 rounded-full mb-4">
            <p className="text-green-400 text-sm font-mono">EVOLUÇÃO OPERADA POR IA</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            O{' '}
            <span className="text-green-400" style={{ textShadow: '0 0 30px rgba(34, 197, 94, 0.6)' }}>
              Coordenador
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Fala o que você quer mudar. Ele transforma em missões do tamanho do seu dia.
          </p>
        </div>

        <CoordinatorTerminal />

        <div className="grid md:grid-cols-4 gap-4 mt-8 text-center">
          {CAPABILITIES.map((capability) => (
            <div key={capability.label} className="p-4 bg-green-950/10 border border-green-500/20 rounded">
              <div className="flex items-center justify-center mb-2">
                <Image src={capability.img} alt="" width={80} height={80} className="w-9 h-9" />
              </div>
              <div className="text-green-400 font-mono text-xs">{capability.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
