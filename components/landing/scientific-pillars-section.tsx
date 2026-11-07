'use client'

import { motion, type Variants } from 'framer-motion'
import { Activity, Brain, Cpu, Dna, ExternalLink, Network, Shield, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'

const PILLARS = [
  {
    icon: Brain,
    title: 'Neuroplasticidade Temporal',
    stat: '66 dias',
    statLabel: 'para automatização neural',
    description:
      'Estudo da University College London com 96 participantes comprovou: o cérebro leva em média 66 dias para transformar uma ação consciente em comportamento automático. O Nexus acelera esse processo com gamificação estruturada.',
    features: ['Repetição Espaçada', 'Feedback Instantâneo', 'Automatização'],
    studyLink: 'https://onlinelibrary.wiley.com/doi/10.1002/ejsp.674',
    studyLabel: 'Estudo UCL - Phillippa Lally (2009)',
    color: 'from-emerald-500/20 to-emerald-500/5',
    borderColor: 'hover:border-emerald-500/50',
    iconBg: 'bg-emerald-500/20',
  },
  {
    icon: Cpu,
    title: 'Loop de Dopamina Controlada',
    stat: '3x',
    statLabel: 'mais chance de sucesso',
    description:
      'Pesquisa da Wharton School demonstra que elementos de gamificação ativam o sistema de recompensas do cérebro, liberando dopamina de forma controlada. Isso aumenta motivação, engajamento e satisfaz necessidades psicológicas de autonomia e competência.',
    features: ['Recompensas Calibradas', 'Motivação Intrínseca', 'Engajamento'],
    studyLink: 'https://neuro.wharton.upenn.edu/community/gamification-at-work/',
    studyLabel: 'Wharton Neuroscience Initiative',
    color: 'from-cyan-500/20 to-cyan-500/5',
    borderColor: 'hover:border-cyan-500/50',
    iconBg: 'bg-cyan-500/20',
  },
  {
    icon: Network,
    title: 'Intenções de Implementação',
    stat: '64%',
    statLabel: 'maior adoção de hábitos',
    description:
      "Meta-análise de Peter Gollwitzer (NYU) com 94 estudos independentes comprovou: criar plans 'se-então' (If-Then) aumenta drasticamente a taxa de conclusão de metas. O Nexus automatiza esse processo com gatilhos inteligentes.",
    features: ['Habit Stacking', 'Gatilhos If-Then', 'Automação Neural'],
    studyLink: 'https://psycnet.apa.org/record/2007-19538-002',
    studyLabel: 'Meta-análise Gollwitzer & Sheeran (2006)',
    color: 'from-violet-500/20 to-violet-500/5',
    borderColor: 'hover:border-violet-500/50',
    iconBg: 'bg-violet-500/20',
  },
]

const TRUST_BADGES = [
  { icon: Activity, label: 'Resultados em 7 dias' },
  { icon: Shield, label: 'Metodologia Validada' },
  { icon: TrendingUp, label: '94% de Satisfação' },
]

const glowVariants: Variants = {
  initial: { opacity: 0.3, scale: 0.8 },
  animate: {
    opacity: [0.3, 0.6, 0.3],
    scale: [0.8, 1, 0.8],
    transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 * delay, ease: 'easeOut' } }),
}

export function ScientificPillarsSection() {
  return (
    <section id="scientific-pillars" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(74,222,128,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(74,222,128,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>
      <motion.div
        className="absolute top-20 left-[10%] w-32 h-32 bg-primary/20 rounded-full blur-[80px]"
        variants={glowVariants}
        initial="initial"
        animate="animate"
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-40 right-[15%] w-40 h-40 bg-primary/15 rounded-full blur-[100px]"
        variants={glowVariants}
        initial="initial"
        animate="animate"
        aria-hidden="true"
      />
      <motion.div
        className="absolute top-1/2 left-[5%] w-24 h-24 bg-primary/10 rounded-full blur-[60px]"
        variants={glowVariants}
        initial="initial"
        animate="animate"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <Dna className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Baseado em Neurociência</span>
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            O Protocolo Nexus é construído sobre
            <br />
            <span className="relative inline-block mt-2">
              <span className="text-primary">3 Pilares Científicos</span>
              <motion.span
                className="absolute -bottom-2 left-0 h-[3px] bg-gradient-to-r from-primary via-primary to-transparent rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
              />
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Tecnologia de reprogramação neural que transforma sua mente em uma máquina de alta performance
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {PILLARS.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="group relative"
            >
              <div
                className={cn(
                  'absolute -inset-[1px] rounded-2xl bg-gradient-to-b opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm',
                  pillar.color,
                )}
              />
              <div
                className={cn(
                  'relative h-full rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 p-6 lg:p-8 transition-all duration-500',
                  pillar.borderColor,
                )}
              >
                <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-primary/30 rounded-tl-2xl" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-primary/30 rounded-br-2xl" />
                <motion.div
                  className={cn('w-14 h-14 rounded-xl flex items-center justify-center mb-6', pillar.iconBg)}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <pillar.icon className="w-7 h-7 text-primary" />
                </motion.div>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-primary">{pillar.stat}</span>
                  <p className="text-sm text-muted-foreground mt-1">{pillar.statLabel}</p>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{pillar.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{pillar.description}</p>
                <a
                  href={pillar.studyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs text-primary/80 hover:text-primary transition-colors mb-6 group/link"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span className="underline underline-offset-2 decoration-primary/30 group-hover/link:decoration-primary">
                    {pillar.studyLabel}
                  </span>
                  <span className="text-muted-foreground">— Confira você mesmo</span>
                </a>
                <div className="flex flex-wrap gap-2">
                  {pillar.features.map((feature, i) => (
                    <motion.span
                      key={feature}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + 0.05 * i }}
                      className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-medium"
                    >
                      {feature}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <p className="text-muted-foreground mb-6">
            Mais de <span className="text-primary font-semibold">20.000 usuários</span> já reprogramaram seus cérebros
            com o Nexus
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {TRUST_BADGES.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50"
              >
                <badge.icon className="w-4 h-4 text-primary" />
                <span className="text-sm">{badge.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
