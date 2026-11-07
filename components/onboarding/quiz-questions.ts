import {
  BookOpen,
  Brain,
  CalendarX,
  Dumbbell,
  Flame,
  Heart,
  type LucideIcon,
  Moon,
  RotateCcw,
  Sparkles,
  Target,
  Trophy,
  Users,
  Utensils,
  Wallet,
} from 'lucide-react'

export type QuizOption = {
  value: string
  label: string
  icon?: LucideIcon
  description?: string
}

export type QuizQuestion = {
  id: number
  type: 'single' | 'multiple' | 'scale' | 'focus' | 'body'
  question: string
  subtitle?: string
  options?: QuizOption[]
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 5,
    type: 'single',
    question: 'Quantas rotinas você já começou e largou na 1ª semana?',
    subtitle: 'Pode contar. Aqui ninguém julga — só o seu eu de ontem.',
    options: [
      { value: 'none', label: 'Nenhuma', icon: Trophy, description: 'O que começo, eu mantenho' },
      { value: 'few', label: '1 ou 2', icon: Flame, description: 'Já desisti, mas foi pouco' },
      { value: 'several', label: 'Várias', icon: RotateCcw, description: 'Começo animado e largo rápido' },
      { value: 'countless', label: 'Perdi a conta', icon: CalendarX, description: 'Virou um ciclo sem fim' },
    ],
  },
  {
    id: 1,
    type: 'single',
    question: 'Seja honesto: o que TE trava de verdade?',
    subtitle: 'Tem um motivo que se repete. Você já sabe qual é.',
    options: [
      { value: 'discipline', label: 'Disciplina', icon: Target, description: 'Sei o que fazer, mas largo na metade' },
      { value: 'motivation', label: 'Motivação', icon: Flame, description: 'Empolgo, mas a vontade some em dias' },
      { value: 'time', label: 'Tempo', icon: Moon, description: 'Vivo correndo e nunca sobra pra mim' },
      { value: 'focus', label: 'Foco', icon: Brain, description: 'Começo mil coisas, termino nenhuma' },
      { value: 'optimize', label: 'Já sou bom', icon: Sparkles, description: "Quero sair do 'bom' pro próximo nível" },
    ],
  },
  {
    id: 2,
    type: 'multiple',
    question: 'Onde sua vida pede socorro agora?',
    subtitle: 'Marque o que você sabe que está deixando de lado',
    options: [
      { value: 'fitness', label: 'Corpo e saude', icon: Dumbbell },
      { value: 'mental', label: 'Mente e emocional', icon: Brain },
      { value: 'finance', label: 'Dinheiro e financas', icon: Wallet },
      { value: 'study', label: 'Estudos e carreira', icon: BookOpen },
      { value: 'nutrition', label: 'Alimentacao', icon: Utensils },
      { value: 'sleep', label: 'Qualidade do sono', icon: Moon },
    ],
  },
  {
    id: 3,
    type: 'scale',
    question: 'Quanta disciplina você tem HOJE?',
    subtitle: 'Sem se enganar. A maioria marca 2 ou 3 — e sabe por quê.',
    options: [
      { value: '1', label: '1', description: 'Quase zero' },
      { value: '2', label: '2', description: 'Pouca' },
      { value: '3', label: '3', description: 'Oscila' },
      { value: '4', label: '4', description: 'Boa' },
      { value: '5', label: '5', description: 'Forte' },
    ],
  },
  {
    id: 4,
    type: 'single',
    question: 'O que faz você ir até o fim?',
    subtitle: 'Isso define como o NEXUS vai te cobrar todo dia',
    options: [
      { value: 'compete', label: 'Competicao', icon: Trophy, description: 'Eu ligo quando tem alguém pra superar' },
      { value: 'collaborate', label: 'Equipe', icon: Users, description: 'Rendo mais quando não estou sozinho' },
      { value: 'both', label: 'Os dois', icon: Sparkles, description: 'Depende do dia e do que está em jogo' },
      { value: 'self', label: 'Eu comigo', icon: Target, description: 'Meu único rival é o eu de ontem' },
    ],
  },
  {
    id: 7,
    type: 'focus',
    question: 'Se desse pra arrumar UMA coisa hoje?',
    subtitle: 'É por aqui que o NEXUS vai começar a virar o jogo',
    options: [
      { value: 'health', label: 'Saude', icon: Heart, description: 'Voltar a cuidar de mim' },
      { value: 'study', label: 'Estudos', icon: BookOpen, description: 'Aprender pra valer' },
      { value: 'finance', label: 'Dinheiro', icon: Wallet, description: 'Parar de me afogar' },
      { value: 'appearance', label: 'Aparencia', icon: Dumbbell, description: 'Me olhar no espelho de boa' },
      { value: 'productivity', label: 'Produtividade', icon: Target, description: 'Parar de perder meu tempo' },
      { value: 'balance', label: 'Equilibrio', icon: Sparkles, description: 'Sair do caos geral' },
    ],
  },
  {
    id: 8,
    type: 'body',
    question: 'Falta só o seu ponto de partida',
    subtitle: 'É com isso que o NEXUS calibra o plano no seu corpo',
  },
]
