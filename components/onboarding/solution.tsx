'use client'

import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { NexusLogo } from '@/components/nexus/nexus-logo'

export function Solution() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      <header className="p-4 flex items-center justify-center">
        <NexusLogo size="sm" />
      </header>

      <main id="main-content" className="flex-1 overflow-y-auto pb-32">
        <div className="max-w-md mx-auto px-5 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="font-bold tracking-tight leading-[1] text-[clamp(2.25rem,10vw,2.75rem)]">A verdade?</h1>
            <p className="mt-3 font-semibold tracking-tight whitespace-nowrap text-[clamp(1.05rem,5.5vw,1.6rem)]">
              Você é viciado em <span className="text-primary">dopamina</span>.
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="mt-5 text-[15px] leading-relaxed text-muted-foreground text-pretty"
          >
            O mesmo <span className="text-primary font-medium">mecanismo</span> que as redes sociais usam para te{' '}
            <span className="text-primary font-medium">prender</span>, nós colocamos dentro do{' '}
            <span className="text-primary font-medium">NEXUS</span> para te dar{' '}
            <span className="text-primary font-medium">liberdade</span>. Você vai ficar{' '}
            <span className="text-foreground font-medium">viciado em melhorar</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="mt-7"
          >
            <Image
              src="/images/dopamine-solution.png"
              alt="Ícones de redes sociais e jogos riscados ao redor de uma pessoa focada, ao lado de um painel com disciplina, foco, evolução e resultados"
              width={960}
              height={1056}
              priority
              className="w-full h-auto"
            />
          </motion.div>

          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.34 }}
            className="mt-7 rounded-xl border border-border/50 bg-secondary/45 p-5 flex flex-col gap-3"
          >
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Como fazemos isso</h2>
            <p className="text-[15px] leading-relaxed">
              Cada missão concluída te dá o que o feed acostumou você a buscar:{' '}
              <span className="font-medium">recompensa rápida</span>. XP, streak, ranking e evolução visível.
            </p>
            <p className="text-[15px] leading-relaxed">
              Isso usa um princípio conhecido como{' '}
              <span className="text-primary font-medium">aprendizado por reforço</span>: quando uma ação recebe
              feedback claro logo depois, fica mais fácil associar aquela ação à recompensa.
            </p>
            <p className="text-[15px] leading-relaxed">
              Só que aqui a recompensa vem <span className="text-primary font-medium">depois do esforço</span> — e te
              puxa para a próxima missão, não para o próximo vídeo.
            </p>
          </motion.section>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-background via-background to-transparent">
        <div className="max-w-md mx-auto">
          <motion.button
            type="button"
            onClick={() => router.push('/onboarding/plans')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full h-14 bg-primary text-primary-foreground text-lg font-semibold rounded-xl shadow-xl shadow-primary/30 flex items-center justify-center gap-2"
          >
            Quero trocar de vício
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  )
}
