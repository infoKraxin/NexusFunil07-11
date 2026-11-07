import { Crown, Flame, type LucideIcon, Zap } from 'lucide-react'
import type { PlanId } from '@/lib/checkout'

export type Plan = {
  id: PlanId
  name: string
  shortName: string
  basePrice: number
  communityPrice: number
  icon: LucideIcon
  popular?: boolean
  evolutionSpeed: number
  resultsSpeed: number
  supportLevel: number
  tagline: string
  highlight: string
  features: string[]
}

export const PLANS: Plan[] = [
  {
    id: 'primary',
    name: 'NEXUS Primary',
    shortName: 'Primary',
    basePrice: 19.9,
    communityPrice: 9.9,
    icon: Zap,
    evolutionSpeed: 1,
    resultsSpeed: 1,
    supportLevel: 1,
    tagline: 'Pra quem quer sair do zero',
    highlight: 'O primeiro passo',
    features: [
      '5 hábitos simultâneos',
      'Lembretes que não te deixam esquecer',
      'Dashboard com seu progresso real',
      'Histórico de 30 dias',
    ],
  },
  {
    id: 'focuz',
    name: 'NEXUS Focuz',
    shortName: 'Focuz',
    basePrice: 29.9,
    communityPrice: 9.9,
    icon: Flame,
    popular: true,
    evolutionSpeed: 2,
    resultsSpeed: 2,
    supportLevel: 2,
    tagline: 'O plano que transforma de verdade',
    highlight: 'Escolha de 94% dos usuários',
    features: [
      'Hábitos ILIMITADOS',
      'IA que monta sua rotina por você',
      'Relatórios semanais em PDF',
      'Histórico completo pra sempre',
      'Desafios que te forçam a evoluir',
    ],
  },
  {
    id: 'intensive',
    name: 'NEXUS Intensive',
    shortName: 'Intensive',
    basePrice: 39.9,
    communityPrice: 9.9,
    icon: Crown,
    evolutionSpeed: 3,
    resultsSpeed: 3,
    supportLevel: 3,
    tagline: 'Pra quem quer resultado MÁXIMO',
    highlight: 'Sem limites',
    features: [
      'Tudo do Focuz + extras exclusivos',
      'Coach IA 24h que te cobra resultado',
      'Análise comportamental avançada',
      'Metas que se adaptam ao seu ritmo',
      'Suporte humano prioritário',
      'Acesso antecipado a tudo',
    ],
  },
]

export const PLAN_STYLES: Record<PlanId, { border: string; text: string; bg: string; ring: string; gradient: string }> = {
  primary: {
    border: 'border-blue-500',
    text: 'text-blue-400',
    bg: 'bg-blue-500',
    ring: 'bg-blue-500',
    gradient: 'from-blue-500/20 via-blue-500/10 to-transparent',
  },
  focuz: {
    border: 'border-primary',
    text: 'text-primary',
    bg: 'bg-primary',
    ring: 'bg-primary',
    gradient: 'from-primary/20 via-primary/10 to-transparent',
  },
  intensive: {
    border: 'border-red-500',
    text: 'text-red-400',
    bg: 'bg-red-500',
    ring: 'bg-red-500',
    gradient: 'from-red-500/20 via-red-500/10 to-transparent',
  },
}

export const formatPrice = (value: number) => value.toFixed(2).replace('.', ',')

export const FAQ = [
  {
    question: 'E se eu não gostar?',
    answer:
      'Você tem 7 dias pra usar o sistema inteiro, sem restrição nenhuma. Se nesse período você sentir que o NEXUS não é pra você, basta pedir o reembolso e devolvemos cada centavo. Sem formulário quilométrico, sem precisar justificar o motivo, sem ninguém tentando te convencer do contrário. Você entra, testa de verdade, e só continua se fizer sentido. O risco é todo nosso — o seu é zero.',
  },
  {
    question: 'Isso funciona mesmo ou é mais um app?',
    answer:
      'A diferença é que a maioria dos apps depende de você acordar motivado — e motivação acaba na primeira semana ruim. O NEXUS foi montado pra funcionar justamente nos dias em que você não quer: as missões já vêm decididas pelo seu diagnóstico, o XP e as streaks te dão retorno imediato, o ranking e os duelos colocam outras pessoas te puxando, e a IA reorganiza sua rotina quando você falha em vez de te deixar recomeçar do zero. Você não precisa ter força de vontade — precisa seguir o sistema. Ele carrega a parte que sempre te derrubou.',
  },
  {
    question: 'R$29,90 não é caro?',
    answer:
      'É pagamento Único: você paga uma vez e o acesso é vitalício. Não existe mensalidade, não existe renovação, não existe cobrança surpresa no ano que vem. Na prática é menos que uma pizza ou duas caronas de app — gastos que somem no fim do mês sem deixar nada. Aqui você paga uma vez e leva o sistema pra sempre, com as atualizações incluídas. A conta que importa é outra: quanto já te custou começar e largar tantas vezes, em tempo, oportunidade e frustração? Esse é o valor real em jogo aqui.',
  },
  {
    question: 'Posso fazer upgrade depois?',
    answer:
      'Sim. Se você começar num plano menor e quiser subir, paga apenas a diferença entre os planos — uma única vez, sem multa e sem burocracia. Todo o seu histórico vem junto: XP acumulado, streaks, hábitos e progresso continuam exatamente onde estavam, sem recomeçar nada. E como não existe assinatura, não há nada pra cancelar depois: o acesso que você comprou é seu pra sempre.',
  },
]

export const PLAN_TESTIMONIALS = [
  {
    name: 'Lucas Mendes',
    role: 'Estudante de Medicina',
    image: '/images/avatars/homem1.jpeg',
    text: 'Eu reprovava em 2 matérias. Em 3 meses no NEXUS, tô entre os melhores da turma. Não foi motivação, foi o SISTEMA que me obrigou a mudar.',
    streak: 127,
    improvement: '+340% foco',
  },
  {
    name: 'Mariana Costa',
    role: 'Empreendedora',
    image: '/images/avatars/mulher2.jpeg',
    text: 'Achava que era impossível conciliar negócio, família e saúde. No primeiro mês já economizei R$2000 só com o módulo de finanças. Paguei o app 60x.',
    streak: 156,
    improvement: 'R$2000 economizados',
  },
  {
    name: 'Thiago Oliveira',
    role: 'Designer Freelancer',
    image: '/images/avatars/homem5.jpeg',
    text: 'Tava no caminho do burnout. Sem rotina, sem estrutura, ganhando mal. O NEXUS me deu um sistema. Minha renda TRIPLICOU em 6 meses. Não é exagero.',
    streak: 178,
    improvement: '3x renda',
  },
  {
    name: 'Juliana Ferreira',
    role: 'Estudante de Direito',
    image: '/images/avatars/mulher3.jpeg',
    text: 'Passei na OAB de primeira. Só usava o NEXUS. A IA gera flashcards, resumos, simulados... melhor investimento que já fiz na vida.',
    streak: 134,
    improvement: 'Aprovada OAB',
  },
]

export const PURCHASE_NAMES = [
  'Lucas M****',
  'Maria S****',
  'Pedro A****',
  'Ana C****',
  'Thiago R****',
  'Julia F****',
  'Rafael O****',
  'Camila B****',
  'Gabriel L****',
  'Fernanda T****',
  'Bruno N****',
  'Larissa P****',
]

export const PURCHASE_PLANS = [
  'Primary + Comunidade',
  'Focuz + Comunidade',
  'Focuz + Comunidade',
  'Focuz + Comunidade',
  'Intensive + Comunidade',
  'Focuz + Comunidade',
]

export const PURCHASE_TIMES = ['agora', 'ha 1 min', 'ha 2 min', 'ha 3 min', 'ha 5 min']
