import type { PlanId } from '@/lib/checkout'

export type Plan = {
  id: PlanId
  name: string
  price: number
  phrase: string // {block} = bloqueio com artigo
  benefits: string[]
  badge?: string
}

export const PLANS: Plan[] = [
  {
    id: 'primary',
    name: 'Primary',
    price: 19.9,
    phrase: 'Pra dar o primeiro passo.',
    benefits: ['Seus hábitos principais, todo dia', 'Lembrete pra não esquecer', 'Seu progresso na tela'],
  },
  {
    id: 'focuz',
    name: 'Focuz',
    price: 29.9,
    phrase: 'Pra quebrar {block} de vez.',
    benefits: ['Tudo ilimitado, sem travar sua evolução', 'Uma rotina montada pra você', 'Desafios que te puxam pra frente'],
    badge: 'Feito pro seu bloqueio',
  },
  {
    id: 'intensive',
    name: 'Intensive',
    price: 39.9,
    phrase: 'Pra quem não aceita falhar o pacto.',
    benefits: ['Tudo do Focuz', 'Uma IA que te cobra todo dia', 'Um plano que se ajusta ao seu ritmo'],
    badge: 'Máximo resultado',
  },
]

export const formatPrice = (value: number) => value.toFixed(2).replace('.', ',')

export const FAQ = [
  {
    question: 'E se eu não gostar?',
    answer:
      'Você tem 7 dias pra testar tudo. Se não for pra você, é só pedir no WhatsApp do suporte e devolvemos cada centavo. Sem formulário e sem precisar explicar o motivo.',
  },
  {
    question: 'É mensalidade?',
    answer:
      'Não. Você paga uma vez e o acesso é seu pra sempre, com as atualizações incluídas. Não tem renovação nem cobrança surpresa.',
  },
  {
    question: 'E se eu falhar um dia?',
    answer:
      'O plano foi feito pra isso: você não volta pro zero. O NEXUS ajusta a rotina e te puxa de volta no dia seguinte.',
  },
  {
    question: 'Posso trocar de plano depois?',
    answer:
      'Pode. Você paga só a diferença, uma vez, e todo o seu progresso (XP, sequência e hábitos) continua de onde parou.',
  },
]

// TODO(Jorge): trocar por depoimentos reais com o bloqueio da pessoa (ex.: "Eu era Ciclo do Recomeço…").
// Por enquanto: trechos literais dos depoimentos atuais que NÃO falam de renda.
export const TESTIMONIALS = [
  {
    name: 'Lucas Mendes',
    image: '/images/avatars/homem1.jpeg',
    text: 'Eu reprovava em 2 matérias. Não foi motivação, foi o SISTEMA que me obrigou a mudar.',
    streak: 127,
  },
  {
    name: 'Juliana Ferreira',
    image: '/images/avatars/mulher3.jpeg',
    text: 'Passei na OAB de primeira. Só usava o NEXUS.',
    streak: 134,
  },
]
