export const QUIZ_STORAGE_KEY = 'nexus_quiz_temp'
export const BODY_METRICS_STORAGE_KEY = 'nexus_body_metrics'

export type QuizAnswer = { questionId: number; answer: string }

export type BmiCategory = 'abaixo' | 'ideal' | 'sobrepeso' | 'obesidade'

export type QuizData = {
  attempts: string
  challenge: string
  goals: string[]
  discipline: number
  drive: string
  focus: string
  bmi: number | null
  bmiCategory: BmiCategory | null
  height: number | null
  weight: number | null
}

export type RadarPoint = { key: string; label: string; value: number }

export const focusLabels: Record<string, string> = {
  health: 'saúde',
  study: 'estudos',
  finance: 'dinheiro',
  appearance: 'aparência',
  productivity: 'produtividade',
  balance: 'equilíbrio geral',
}

export const challengeLabels: Record<string, string> = {
  discipline: 'falta de disciplina',
  motivation: 'falta de motivação',
  time: 'falta de tempo',
  focus: 'falta de foco',
  optimize: 'vontade de otimizar',
}

export const DEFAULT_QUIZ_DATA: QuizData = {
  attempts: 'several',
  challenge: 'discipline',
  goals: ['fitness', 'mental'],
  discipline: 3,
  drive: 'self',
  focus: 'health',
  bmi: null,
  bmiCategory: null,
  height: null,
  weight: null,
}

const clamp = (value: number, min = 1.2, max = 9.2) => Math.max(min, Math.min(max, value))
const round1 = (value: number) => Math.round(10 * value) / 10

const DISCIPLINE_BASE: Record<number, number> = { 1: 2, 2: 3.2, 3: 4.4, 4: 6, 5: 7.4 }
const PERIOD_TARGET: Record<number, number> = { 30: 5.1, 60: 6.8, 90: 8.7 }

function normalizeToAverage(points: RadarPoint[], target: number): RadarPoint[] {
  const count = points.length
  if (count === 0) return points
  const mean = points.reduce((sum, p) => sum + p.value, 0) / count
  const deltas = points.map((p) => p.value - mean)
  const maxDelta = Math.max(...deltas.map((d) => Math.abs(d)))
  const allowed = Math.min(target - 1, 9.8 - target)
  const scale = maxDelta > allowed ? allowed / maxDelta : 1
  const result = points.map((p, i) => ({ ...p, value: round1(target + deltas[i] * scale) }))

  const targetSum = Math.round(target * count * 10)
  let currentSum = result.reduce((sum, p) => sum + Math.round(10 * p.value), 0)
  for (let i = 0; currentSum !== targetSum && i < 100 * count; i++) {
    const item = result[i % count]
    const step = currentSum < targetSum ? 0.1 : -0.1
    const next = round1(item.value + step)
    if (next < 1 || next > 9.8) continue
    item.value = next
    currentSum += step > 0 ? 1 : -1
  }
  return result
}

function getArchetype(data: QuizData) {
  const lowDiscipline = data.discipline <= 2
  switch (data.challenge) {
    case 'discipline':
      return {
        name: 'O Recomeçador',
        tagline: lowDiscipline
          ? 'Você começa forte toda segunda-feira. E para na quarta.'
          : 'Você começa forte. O problema sempre aparece por volta do dia 4.',
      }
    case 'motivation':
      return { name: 'O Intermitente', tagline: 'Você anda em ondas: 3 dias ligado, 2 semanas desligado.' }
    case 'time':
      return {
        name: 'O Sobrecarregado',
        tagline: 'Você vive apagando incêndio e nunca chega no que importa de verdade.',
      }
    case 'focus':
      return { name: 'O Multitarefa', tagline: 'Mil coisas começadas. Nenhuma terminada.' }
    case 'optimize':
      return { name: 'O Inconformado', tagline: "Bom não te basta — e 'bom' virou exatamente o seu teto." }
    default:
      return { name: 'O Recomeçador', tagline: 'Você sabe o que fazer. Só nunca conseguiu manter.' }
  }
}

export function computeDiagnosis(data: QuizData) {
  const base = DISCIPLINE_BASE[data.discipline] ?? 4.4
  const attemptsPenalty = data.attempts === 'countless' ? 1 : data.attempts === 'several' ? 0.5 : 0

  let discipline = base
  if (data.challenge === 'discipline') discipline -= 0.6
  discipline -= attemptsPenalty

  let focus = base + 0.3
  if (data.challenge === 'focus') focus -= 2.2
  if (data.challenge === 'time') focus -= 1
  if (data.focus === 'productivity') focus -= 0.8

  let health = base + 0.4
  if (data.goals.includes('fitness')) health -= 1.2
  if (data.goals.includes('nutrition')) health -= 0.8
  if (data.goals.includes('sleep')) health -= 0.5
  if (data.focus === 'health' || data.focus === 'appearance') health -= 0.7
  if (data.bmiCategory === 'ideal') health += 0.6
  else if (data.bmiCategory === 'sobrepeso') health -= 0.9
  else if (data.bmiCategory === 'obesidade') health -= 1.7
  else if (data.bmiCategory === 'abaixo') health -= 0.6

  let energy = base + 0.5
  if (data.goals.includes('sleep')) energy -= 1.6
  if (data.challenge === 'motivation') energy -= 1.3
  if (data.challenge === 'time') energy -= 0.8
  if (data.bmiCategory === 'obesidade') energy -= 0.7

  let productivity = base + 0.2
  if (data.challenge === 'time') productivity -= 1.7
  if (data.challenge === 'focus') productivity -= 1.2
  if (data.focus === 'productivity') productivity -= 1
  productivity -= 0.5 * attemptsPenalty

  let wellbeing = base + 0.4
  if (data.goals.includes('mental')) wellbeing -= 1.7
  if (data.challenge === 'motivation') wellbeing -= 1
  if (data.focus === 'balance') wellbeing -= 0.6

  const radar = normalizeToAverage(
    [
      { key: 'disciplina', label: 'Disciplina', value: round1(clamp(discipline)) },
      { key: 'saude', label: 'Saúde', value: round1(clamp(health)) },
      { key: 'foco', label: 'Foco', value: round1(clamp(focus)) },
      { key: 'energia', label: 'Energia', value: round1(clamp(energy)) },
      { key: 'produtividade', label: 'Produtividade', value: round1(clamp(productivity)) },
      { key: 'bemestar', label: 'Bem-estar', value: round1(clamp(wellbeing)) },
    ],
    3.4,
  )

  const weakest = radar.reduce((min, p) => (p.value < min.value ? p : min), radar[0])
  const strongest = radar.reduce((max, p) => (p.value > max.value ? p : max), radar[0])
  const archetype = getArchetype(data)

  return {
    radar,
    archetype,
    bottleneck: { ...weakest, insight: bottleneckInsight(weakest.key) },
    strength: { key: strongest.key, label: strongest.label, value: strongest.value },
    avgCurrent: 3.4,
    mirrorLines: buildMirrorLines(data),
    headline: archetype.tagline,
  }
}

function bottleneckInsight(key: string) {
  switch (key) {
    case 'disciplina':
      return 'É aqui que tudo trava. Sem disciplina, todo o resto vira só intenção.'
    case 'foco':
      return 'Sua atenção está estilhaçada. Você produz metade do que poderia.'
    case 'saude':
      return 'Seu corpo está pedindo socorro e isso derruba todas as outras áreas.'
    case 'energia':
      return 'Sem energia, nenhuma meta sobrevive ao fim da tarde.'
    case 'produtividade':
      return 'Você se ocupa o dia inteiro e termina sem ter avançado no que importa.'
    case 'bemestar':
      return 'Por dentro está pesado — e isso sabota tudo o que você tenta construir.'
    default:
      return 'É o ponto que mais te puxa pra trás hoje.'
  }
}

function buildMirrorLines(data: QuizData) {
  const lines: string[] = []
  const attemptsLines: Record<string, string> = {
    countless:
      'Você já perdeu a conta de quantas vezes recomeçou e largou na primeira semana. O problema nunca foi você — foi tentar segurar tudo na base da força de vontade, sozinho.',
    several:
      'Você já começou várias rotinas e largou todas na primeira semana. Não é falta de vontade: é que toda vez bate o dia ruim, não existe nada te puxando de volta pro trilho.',
    few: 'Você já desistiu de uma rotina logo na primeira semana — e sabe exatamente como é aquela sensação de recomeçar do zero de novo.',
    none: 'Você mantém o que começa — isso já te coloca à frente de 9 em cada 10 pessoas. O que falta é um sistema que transforme essa consistência em resultado de verdade.',
  }
  if (attemptsLines[data.attempts]) lines.push(attemptsLines[data.attempts])

  const challengeLines: Record<string, string> = {
    discipline:
      'Você sabe exatamente o que fazer — falta o ambiente que te obriga a executar mesmo nos dias em que não dá vontade.',
    motivation:
      'Você depende de estar motivado pra agir. Mas motivação é química: ela vai embora, e aí você trava. Quem vence não espera estar motivado.',
    time: 'Você repete “não tenho tempo” há meses. A verdade incômoda é que tempo existe — falta um sistema que decida por você onde ele vai.',
    focus:
      'Mil abas abertas na cabeça, zero tarefas concluídas. Sua mente é rápida demais pra parar sozinha — e sem foco, o potencial vira ansiedade.',
    optimize:
      'Você já é melhor que a média, e foi isso que te acomodou. Sem um adversário à altura, você está só mantendo — e sabe que poderia muito mais.',
  }
  if (challengeLines[data.challenge]) lines.push(challengeLines[data.challenge])

  if (data.discipline <= 2) {
    lines.push(
      `Você mesmo se deu nota ${data.discipline}/5 em disciplina. Não é preguiça — é que toda vez que a vontade some, não existe nada te segurando no trilho.`,
    )
  } else if (data.discipline === 3) {
    lines.push(
      'Nota 3/5 em disciplina: você até começa bem, mas a primeira semana corrida derruba tudo o que você tinha construído.',
    )
  } else {
    lines.push(
      `Você se deu nota ${data.discipline}/5 — já tem base sólida. O gargalo não é começar, é direção: sem um sistema, você desperdiça esse potencial.`,
    )
  }

  if (data.goals.length >= 4) {
    lines.push(
      `E veja o tamanho do plano: você marcou ${data.goals.length} áreas pra mudar de uma vez. É exatamente por isso que você se espalha e não fecha nenhuma.`,
    )
  } else if (data.goals.length > 0 && data.focus) {
    lines.push(
      `Sua prioridade número 1 é ${focusLabels[data.focus] || data.focus} — é por aí que o NEXUS vai te fazer atacar primeiro, antes de tudo o resto.`,
    )
  }

  if (data.bmi && data.bmiCategory && data.bmiCategory !== 'ideal') {
    const bmi = data.bmi.toFixed(1)
    lines.push(
      data.bmiCategory === 'sobrepeso'
        ? `Seu IMC está em ${bmi} — a faixa onde o corpo começa a cobrar caro em energia e disposição.`
        : data.bmiCategory === 'obesidade'
          ? `Com IMC ${bmi}, seu corpo está sabotando sua energia diária sem você perceber.`
          : `Seu IMC está em ${bmi} — abaixo do ideal, o que drena a energia que você precisa pra executar.`,
    )
  }

  return lines
}

function toBmiCategory(bmi: number | null): BmiCategory | null {
  if (!bmi) return null
  if (bmi < 18.5) return 'abaixo'
  if (bmi < 25) return 'ideal'
  if (bmi < 30) return 'sobrepeso'
  return 'obesidade'
}

export function getQuizData(): QuizData | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(QUIZ_STORAGE_KEY)
    if (!raw) return null
    const answers = JSON.parse(raw) as QuizAnswer[]
    const find = (id: number) => answers.find((a) => a.questionId === id)?.answer || ''

    let bmi: number | null = null
    let height: number | null = null
    let weight: number | null = null
    try {
      const metricsRaw = localStorage.getItem(BODY_METRICS_STORAGE_KEY)
      if (metricsRaw) {
        const metrics = JSON.parse(metricsRaw)
        if (!metrics.skipped) {
          bmi = typeof metrics.bmi === 'number' ? metrics.bmi : null
          height = typeof metrics.height === 'number' ? metrics.height : null
          weight = typeof metrics.weight === 'number' ? metrics.weight : null
        }
      }
    } catch {}

    return {
      attempts: find(5),
      challenge: find(1),
      goals: find(2).split(',').filter(Boolean),
      discipline: Number.parseInt(find(3) || '3') || 3,
      drive: find(4),
      focus: find(7),
      bmi,
      bmiCategory: toBmiCategory(bmi),
      height,
      weight,
    }
  } catch {
    return null
  }
}

export function improvementPercent(current: RadarPoint[], projected: RadarPoint[]) {
  const currentAvg = current.reduce((sum, p) => sum + p.value, 0) / current.length
  const projectedAvg = projected.reduce((sum, p) => sum + p.value, 0) / projected.length
  return currentAvg <= 0 ? 0 : Math.round(((projectedAvg - currentAvg) / currentAvg) * 100)
}

export function projectRadar(radar: RadarPoint[], period: number) {
  return normalizeToAverage(radar, PERIOD_TARGET[period])
}

export function averageOf(points: RadarPoint[]) {
  return Math.round((points.reduce((sum, p) => sum + p.value, 0) / points.length) * 10) / 10
}
