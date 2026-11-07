// Fonte única do estado do funil novo: respostas 1–12, bloqueio, protocolo e pacto.
// Tudo que é derivado (dias no celular, mecanismo, textos personalizados) sai daqui.

import {
  Angry,
  Annoyed,
  BarChart3,
  BatteryLow,
  Bell,
  BookOpen,
  Brain,
  Briefcase,
  CalendarDays,
  CalendarX,
  CirclePlay,
  Clock,
  Clock2,
  Clock4,
  Clock6,
  DoorClosed,
  Dumbbell,
  Flame,
  Frown,
  Gift,
  GraduationCap,
  Heart,
  HeartCrack,
  Hourglass,
  Layers,
  Leaf,
  type LucideIcon,
  Megaphone,
  Meh,
  Mountain,
  Presentation,
  Rocket,
  RotateCcw,
  ShieldOff,
  Shuffle,
  Smartphone,
  Sprout,
  Target,
  Timer,
  TrendingDown,
  TrendingUp,
  Trophy,
  Wallet,
  Zap,
} from 'lucide-react'

export const FUNNEL_STORAGE_KEY = 'nexus_funnel_v2'

export type BlockCode = 'R' | 'D' | 'P' | 'A'

export type FunnelAnswers = {
  q1?: string // idade
  q2?: string // rotina
  q3?: string // horas no celular
  q4?: string
  q5?: string
  q6?: string
  q7?: string[] // o que já perdeu
  q8?: string // quem quer ver no espelho
  q9?: string // área
  q10?: string[] // o que já tentou
  q11?: string // motivador
  q12?: string // tempo por dia
}

export type FunnelState = {
  answers: FunnelAnswers
  pactAt?: string // ISO
}

/* ---------------- Perguntas ---------------- */

export type Option = { value: string; label: string; icon: LucideIcon; desc?: string; block?: BlockCode }

export type QuestionStep = {
  kind: 'question'
  key: keyof FunnelAnswers
  number: number
  title: string
  subtitle: string
  multiple?: boolean
  exclusive?: string // valor que limpa os outros (ex.: "Nada ainda")
  layout?: 'list' | 'grid'
  options: Option[]
}

export type InsertionStep = { kind: 'insertion'; id: 1 | 2 | 3 | 4 }
export type FunnelStep = QuestionStep | InsertionStep

export const QUESTIONS: QuestionStep[] = [
  {
    kind: 'question',
    key: 'q1',
    number: 1,
    title: 'Quantos anos você tem?',
    subtitle: 'Seu plano começa pelo seu momento de vida.',
    options: [
      { value: '16-20', label: '16 a 20 anos', icon: Sprout, desc: 'Construindo a base' },
      { value: '21-25', label: '21 a 25 anos', icon: Rocket, desc: 'Decidindo o rumo' },
      { value: '26-34', label: '26 a 34 anos', icon: Briefcase, desc: 'Hora de consolidar' },
      { value: '35+', label: '35 anos ou mais', icon: Mountain, desc: 'Hora de colher' },
    ],
  },
  {
    kind: 'question',
    key: 'q2',
    number: 2,
    title: 'Como é o seu dia hoje?',
    subtitle: 'É assim que o NEXUS encaixa o plano na sua rotina.',
    options: [
      { value: 'estudo', label: 'Estudo', icon: BookOpen, desc: 'Escola, faculdade ou concurso' },
      { value: 'trabalho', label: 'Trabalho', icon: Briefcase, desc: 'O trabalho ocupa o dia' },
      { value: 'estudo-trabalho', label: 'Estudo e trabalho', icon: Layers, desc: 'Correria dos dois lados' },
      { value: 'sem-rotina', label: 'Não tenho rotina definida', icon: Shuffle, desc: 'Cada dia é de um jeito' },
    ],
  },
  {
    kind: 'question',
    key: 'q3',
    number: 3,
    title: 'Fora do trabalho, quanto tempo você passa no celular por dia?',
    subtitle: 'Seja sincero. Ninguém vai ver.',
    options: [
      { value: 'lt2', label: 'Menos de 2h', icon: Clock2, desc: 'Uso no controle' },
      { value: '2-4', label: '2 a 4h', icon: Clock4, desc: 'Uso moderado' },
      { value: '4-6', label: '4 a 6h', icon: Clock6, desc: 'Já virou rotina' },
      { value: '6+', label: 'Mais de 6h', icon: Smartphone, desc: 'O celular manda no dia' },
    ],
  },
  {
    kind: 'question',
    key: 'q4',
    number: 4,
    title: 'Quantas vezes você já começou algo novo e largou no meio?',
    subtitle: 'Academia, dieta, estudo… Aqui ninguém julga, só o seu eu de ontem.',
    options: [
      { value: 'nunca', label: 'Nunca larguei', icon: Trophy, desc: 'O que começo, eu mantenho' },
      { value: '1-2', label: '1 ou 2 vezes', icon: Flame, desc: 'Já desisti, mas foi pouco' },
      { value: 'perdi-a-conta', label: 'Já perdi a conta', icon: RotateCcw, desc: 'Virou um ciclo sem fim', block: 'R' },
      { value: 'nem-comeco', label: 'Nem chego a começar', icon: CalendarX, desc: 'Fico esperando a hora certa', block: 'P' },
    ],
  },
  {
    kind: 'question',
    key: 'q5',
    number: 5,
    title: 'Quando você costuma desistir das suas metas?',
    subtitle: 'Tem um momento que se repete. Você já sabe qual é.',
    options: [
      { value: 'empolgacao', label: 'Quando a empolgação passa', icon: TrendingDown, desc: 'O começo é forte, depois some', block: 'R' },
      { value: 'distracao', label: 'Quando aparece algo mais legal', icon: Bell, desc: 'Qualquer coisa me tira do foco', block: 'D' },
      { value: 'antes', label: 'Antes de começar', icon: Hourglass, desc: 'Nunca parece o momento certo', block: 'P' },
      { value: 'cansaco', label: 'Quando o cansaço vence', icon: BatteryLow, desc: 'No fim do dia não sobra nada', block: 'A' },
    ],
  },
  {
    kind: 'question',
    key: 'q6',
    number: 6,
    title: 'Como você se sente quando deita pra dormir?',
    subtitle: 'A resposta mais honesta é a que mais te ajuda.',
    options: [
      { value: 'culpado', label: 'Culpado', icon: Frown, desc: 'O dia escorreu no celular', block: 'D' },
      { value: 'frustrado', label: 'Frustrado', icon: Angry, desc: 'Prometi e não cumpri de novo', block: 'R' },
      { value: 'travado', label: 'Travado', icon: Meh, desc: 'Muito plano e pouca ação', block: 'P' },
      { value: 'esgotado', label: 'Esgotado', icon: Annoyed, desc: 'O dia me consumiu e não fiz nada meu', block: 'A' },
    ],
  },
  {
    kind: 'question',
    key: 'q7',
    number: 7,
    title: 'O que você já perdeu por falta de disciplina?',
    subtitle: 'Pode marcar várias. Ver isso escrito dói, mas é o primeiro passo.',
    multiple: true,
    options: [
      { value: 'corpo', label: 'O corpo que eu queria ter', icon: Dumbbell },
      { value: 'dinheiro', label: 'Dinheiro', icon: Wallet },
      { value: 'oportunidades', label: 'Oportunidades de estudo ou trabalho', icon: DoorClosed },
      { value: 'confianca', label: 'A confiança em mim mesmo', icon: ShieldOff },
      { value: 'pessoas', label: 'Pessoas importantes', icon: HeartCrack },
    ],
  },
  {
    kind: 'question',
    key: 'q8',
    number: 8,
    title: 'Daqui a 90 dias, quem você quer ver no espelho?',
    subtitle: 'É essa pessoa que o seu plano vai construir.',
    options: [
      { value: 'corpo', label: 'Alguém com o corpo que sempre quis', icon: Dumbbell },
      { value: 'focado', label: 'Alguém focado, que termina o que começa', icon: Target },
      { value: 'organizado', label: 'Alguém com a vida e o dinheiro organizados', icon: TrendingUp },
      { value: 'paz', label: 'Alguém em paz com a própria rotina', icon: Leaf },
    ],
  },
  {
    kind: 'question',
    key: 'q9',
    number: 9,
    title: 'Se desse pra arrumar UMA área primeiro, qual seria?',
    subtitle: 'É por aqui que o NEXUS vai começar a virar o jogo.',
    options: [
      { value: 'corpo', label: 'Corpo e saúde', icon: Heart, desc: 'Voltar a cuidar de mim' },
      { value: 'estudos', label: 'Estudos e carreira', icon: GraduationCap, desc: 'Aprender pra valer' },
      { value: 'dinheiro', label: 'Dinheiro', icon: Wallet, desc: 'Parar de me afogar' },
      { value: 'mente', label: 'Mente e foco', icon: Brain, desc: 'Sair do caos' },
    ],
  },
  {
    kind: 'question',
    key: 'q10',
    number: 10,
    title: 'O que você já tentou pra mudar?',
    subtitle: 'Pode marcar várias.',
    multiple: true,
    exclusive: 'nada',
    options: [
      { value: 'planilha', label: 'Planilha ou agenda', icon: CalendarDays },
      { value: 'app', label: 'App de hábitos', icon: Smartphone },
      { value: 'video', label: 'Vídeo de motivação', icon: CirclePlay },
      { value: 'curso', label: 'Curso ou coach', icon: Presentation },
      { value: 'nada', label: 'Nada ainda', icon: Sprout },
    ],
  },
  {
    kind: 'question',
    key: 'q11',
    number: 11,
    title: 'O que te faz ir até o fim?',
    subtitle: 'Isso define como o NEXUS vai te cobrar todo dia.',
    options: [
      { value: 'superar', label: 'Ter alguém pra superar', icon: Trophy, desc: 'Eu ligo quando tem competição' },
      { value: 'progresso', label: 'Ver meu progresso crescer', icon: BarChart3, desc: 'Número subindo me motiva' },
      { value: 'recompensa', label: 'Uma recompensa no final', icon: Gift, desc: 'Preciso de algo pra conquistar' },
      { value: 'cobranca', label: 'Alguém me cobrando', icon: Megaphone, desc: 'Sozinho eu deixo pra depois' },
    ],
  },
  {
    kind: 'question',
    key: 'q12',
    number: 12,
    title: 'Quanto tempo por dia você consegue separar pra sua evolução?',
    subtitle: 'Sem exagero. Constância vale mais que intensidade.',
    options: [
      { value: '10', label: '10 minutos', icon: Zap, desc: 'Pra começar leve' },
      { value: '20', label: '20 minutos', icon: Timer, desc: 'O ponto ideal pra maioria' },
      { value: '30', label: '30 minutos', icon: Clock, desc: 'Ritmo de quem quer acelerar' },
      { value: '60', label: '1 hora ou mais', icon: Flame, desc: 'Modo intenso' },
    ],
  },
]

const q = (n: number) => QUESTIONS[n - 1]

export const STEPS: FunnelStep[] = [
  q(1),
  q(2),
  q(3),
  { kind: 'insertion', id: 1 },
  q(4),
  q(5),
  q(6),
  q(7),
  { kind: 'insertion', id: 2 },
  q(8),
  q(9),
  { kind: 'insertion', id: 3 },
  q(10),
  q(11),
  q(12),
  { kind: 'insertion', id: 4 },
]

export const labelOf = (key: keyof FunnelAnswers, value?: string) =>
  QUESTIONS.find((x) => x.key === key)?.options.find((o) => o.value === value)?.label ?? ''

/* ---------------- Bloqueios ---------------- */

export type Block = {
  code: BlockCode
  name: string
  withArticle: string // "o Ciclo do Recomeço"
  icon: LucideIcon
  protocol: string
  impact: string
  checks: [string, string, string] // o 3º tem {feeling}
  cause: string
  causeUnderline: string // trecho sublinhado à mão
  headline: string // solução, com {time}
  lines: [string, string] // solução, com ~marca-texto~
  timeline: [string, string]
  cta: string
  pactLine: string
}

export const BLOCKS: Record<BlockCode, Block> = {
  R: {
    code: 'R',
    name: 'Ciclo do Recomeço',
    withArticle: 'o Ciclo do Recomeço',
    icon: RotateCcw,
    protocol: 'Protocolo Sem Zerar',
    impact: 'Começar você sabe. O problema é o dia 8.',
    checks: [
      'Segunda-feira é sempre o seu "agora vai".',
      'A empolgação some e leva a meta junto.',
      'Você deita {feeling} prometendo que amanhã é diferente.',
    ],
    cause: 'Não é força de vontade. É faltar um sistema pro dia 8.',
    causeUnderline: 'um sistema pro dia 8',
    headline: 'Saia do ciclo de recomeçar em {time} por dia.',
    lines: ['Você ~não volta pro zero~ quando falha um dia.', 'Metas que ~cabem~ até no seu pior dia.'],
    timeline: ['Passou do dia 8 (pela 1ª vez)', 'Já não pensa em desistir'],
    cta: 'Quero quebrar o ciclo',
    pactLine: 'não voltar pro zero quando falhar um dia',
  },
  D: {
    code: 'D',
    name: 'Mente Dispersa',
    withArticle: 'a Mente Dispersa',
    icon: Smartphone,
    protocol: 'Protocolo Foco Blindado',
    impact: 'Você não é preguiçoso. Sua atenção foi sequestrada.',
    checks: [
      'Começa uma coisa e, 5 min depois, tá no celular.',
      'Qualquer notificação ganha da sua meta.',
      'Deita {feeling} pelo dia que escorreu.',
    ],
    cause: 'Não é falta de foco. É seu foco contra apps feitos pra vencer ele.',
    causeUnderline: 'apps feitos pra vencer ele',
    headline: 'Recupere sua atenção em {time} por dia.',
    lines: ['Você ~troca o feed~ por algo que te faz evoluir.', 'Missões curtas, do ~tamanho do seu foco~.'],
    timeline: ['Primeira semana com menos tela', '{hours}/dia de volta pra você'],
    cta: 'Quero meu foco de volta',
    pactLine: 'trocar o feed pelo que me faz evoluir',
  },
  P: {
    code: 'P',
    name: 'Paralisia do Perfeito',
    withArticle: 'a Paralisia do Perfeito',
    icon: Hourglass,
    protocol: 'Protocolo Primeiro Passo',
    impact: 'Seu plano é ótimo. Ele só nunca começa.',
    checks: [
      'Você espera a hora certa, e ela não vem.',
      'Se não dá pra fazer perfeito, nem faz.',
      'Deita {feeling}, cheio de planos no papel.',
    ],
    cause: 'Não é preguiça. É perfeccionismo disfarçado de cuidado.',
    causeUnderline: 'perfeccionismo disfarçado de cuidado',
    headline: 'Tire seus planos do papel em {time} por dia.',
    lines: ['Você ~não precisa decidir~ o que fazer: já tá pronto.', 'Um passo por dia. ~Sem esperar~ a hora certa.'],
    timeline: ['Começou (finalmente)', 'Agir virou costume'],
    cta: 'Quero começar de verdade',
    pactLine: 'agir antes de estar perfeito',
  },
  A: {
    code: 'A',
    name: 'Piloto Automático',
    withArticle: 'o Piloto Automático',
    icon: BatteryLow,
    protocol: 'Protocolo Rumo Certo',
    impact: 'Seu dia acontece. Você só assiste.',
    checks: [
      'O trabalho e o celular decidem sua rotina por você.',
      'Quando sobra tempo, não sobra energia.',
      'Deita {feeling} sem ter feito nada seu.',
    ],
    cause: 'Não é falta de motivação. É falta de direção.',
    causeUnderline: 'falta de direção',
    headline: 'Retome o controle do seu dia em {time} por dia.',
    lines: ['Você ~decide~ seu dia, em vez de só reagir.', 'Tarefas que ~cabem~ até no dia cansado.'],
    timeline: ['Um momento do dia só seu', 'Rotina com a sua cara'],
    cta: 'Quero assumir o controle',
    pactLine: 'decidir meu dia em vez de só reagir',
  },
}

/* ---------------- Regra de pontuação ---------------- */

const blockOf = (key: keyof FunnelAnswers, value?: string) =>
  QUESTIONS.find((x) => x.key === key)?.options.find((o) => o.value === value)?.block

export function computeBlock(a: FunnelAnswers): BlockCode {
  const score: Record<BlockCode, number> = { R: 0, D: 0, P: 0, A: 0 }
  const b4 = blockOf('q4', a.q4)
  const b5 = blockOf('q5', a.q5)
  const b6 = blockOf('q6', a.q6)
  if (b4) score[b4] += 1
  if (b5) score[b5] += 2
  if (b6) score[b6] += 2
  if (a.q3 === '4-6' || a.q3 === '6+') score.D += 1

  const max = Math.max(...Object.values(score))
  if (max === 0) return b5 ?? 'R'
  const leaders = (Object.keys(score) as BlockCode[]).filter((k) => score[k] === max)
  if (leaders.length === 1) return leaders[0]
  if (b6 && leaders.includes(b6)) return b6
  if (b5 && leaders.includes(b5)) return b5
  return leaders[0]
}

/* ---------------- Derivados ---------------- */

const HOURS: Record<string, number> = { lt2: 1.5, '2-4': 3, '4-6': 5, '6+': 7 }

export const MECHANISMS: Record<string, { short: string; card: string; chip: string }> = {
  superar: {
    short: 'competição com quem tá no mesmo caminho',
    card: 'Você ~compete~ com quem tá no mesmo caminho.',
    chip: 'Competição',
  },
  progresso: {
    short: 'progresso visível todo dia',
    card: 'Cada dia vira ponto, nível e ~evolução visível~.',
    chip: 'Progresso visível',
  },
  recompensa: {
    short: 'recompensa a cada conquista',
    card: 'Cada conquista ~destrava uma recompensa~.',
    chip: 'Recompensas',
  },
  cobranca: {
    short: 'cobrança diária',
    card: 'Todo dia alguém ~te cobra~, e você não quer decepcionar.',
    chip: 'Cobrança diária',
  },
}

const lowerFirst = (s: string) => (s ? s[0].toLowerCase() + s.slice(1) : s)

function joinPt(items: string[]) {
  if (items.length <= 1) return items[0] ?? ''
  return `${items.slice(0, -1).join(', ')} e ${items[items.length - 1]}`
}

export const DEFAULT_ANSWERS: Required<FunnelAnswers> = {
  q1: '21-25',
  q2: 'trabalho',
  q3: '4-6',
  q4: 'perdi-a-conta',
  q5: 'empolgacao',
  q6: 'frustrado',
  q7: ['corpo', 'confianca'],
  q8: 'focado',
  q9: 'corpo',
  q10: ['app', 'video'],
  q11: 'progresso',
  q12: '20',
}

export function derive(state: FunnelState) {
  const a = { ...DEFAULT_ANSWERS, ...state.answers }
  const code = computeBlock(a)
  const block = BLOCKS[code]
  const hours = HOURS[a.q3] ?? 3
  const daysPerYear = Math.round((hours * 365) / 24)
  const hoursLabel = `${String(hours).replace('.', ',')}h`
  const time = labelOf('q12', a.q12).replace(' ou mais', '') || '20 minutos'
  const mirror = labelOf('q8', a.q8) || 'Alguém focado, que termina o que começa'
  const area = labelOf('q9', a.q9) || 'Corpo e saúde'
  const feeling = (labelOf('q6', a.q6) || 'Frustrado').toLowerCase()
  const mechanism = MECHANISMS[a.q11] ?? MECHANISMS.progresso
  const lost = a.q7.map((v) => labelOf('q7', v)).filter(Boolean)
  const tried = a.q10.filter((v) => v !== 'nada').map((v) => labelOf('q10', v))
  const triedNothing = a.q10.includes('nada') || tried.length === 0
  const triedText = triedNothing ? '' : joinPt(tried.map((t, i) => (i === 0 ? t : lowerFirst(t))))

  return {
    answers: a,
    code,
    block,
    hours,
    hoursLabel,
    daysPerYear,
    time,
    mirror,
    mirrorLower: lowerFirst(mirror),
    area,
    areaLower: lowerFirst(area),
    areaKey: a.q9,
    feeling,
    mechanism,
    lost,
    triedText,
    triedPlural: tried.length > 1,
    triedNothing,
    pactAt: state.pactAt ? new Date(state.pactAt) : null,
    fill: (s: string) => s.replace('{time}', time).replace('{hours}', hoursLabel).replace('{feeling}', feeling),
  }
}

export type Derived = ReturnType<typeof derive>

/* ---------------- Storage ---------------- */

const listeners = new Set<() => void>()
let cacheRaw: string | null = null
let cacheState: FunnelState = { answers: {} }

export function readFunnel(): FunnelState {
  if (typeof window === 'undefined') return cacheState
  let raw: string | null = null
  try {
    raw = localStorage.getItem(FUNNEL_STORAGE_KEY)
  } catch {}
  if (raw !== cacheRaw) {
    cacheRaw = raw
    try {
      cacheState = raw ? (JSON.parse(raw) as FunnelState) : { answers: {} }
    } catch {
      cacheState = { answers: {} }
    }
  }
  return cacheState
}

export function writeFunnel(update: (s: FunnelState) => FunnelState) {
  const next = update(readFunnel())
  try {
    localStorage.setItem(FUNNEL_STORAGE_KEY, JSON.stringify(next))
  } catch {}
  listeners.forEach((l) => l())
  return next
}

export function subscribeFunnel(cb: () => void) {
  listeners.add(cb)
  window.addEventListener('storage', cb)
  return () => {
    listeners.delete(cb)
    window.removeEventListener('storage', cb)
  }
}

export function formatPactDate(d: Date) {
  const date = d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
  const time = d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  return { date, time, short: d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }) }
}
