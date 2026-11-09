import type { PlanId } from '@/lib/checkout'
import type { BlockCode } from '@/lib/funnel'

// Features dos planos montadas a partir das respostas do quiz.
// As 3 personalizadas (área da P9, motivador da P11, bloqueio) vêm primeiro e ganham o selo "pro seu objetivo".

export type PlanFeature = { key: string; text: string; personal?: boolean }

const AREA: Record<string, PlanFeature> = {
  corpo: { key: 'treino', text: 'Treino + Nutrição: foto da refeição e a IA calcula' },
  estudos: { key: 'study', text: 'Study AI: resumos e flashcards feitos por IA' },
  dinheiro: { key: 'financas', text: 'Finanças: escreve o gasto e a IA organiza' },
  mente: { key: 'habitos', text: 'Planner de hábitos com sequência de cada dia' },
}

const MOTIVATOR: Record<string, PlanFeature> = {
  superar: { key: 'amigos', text: 'Amigos, ranking e torneios mata-mata' },
  progresso: { key: 'personagem', text: 'Personagem com nível, rank e atributos que sobem' },
  recompensa: { key: 'desafios', text: 'Conquistas e um desafio novo toda semana' },
  cobranca: { key: 'coordenador', text: 'Coordenador IA: o coach que te cobra todo dia' },
}

const BLOCK: Record<BlockCode, PlanFeature> = {
  R: { key: 'metas', text: 'Metas em passos pequenos, pra não largar no dia 8' },
  D: { key: 'missoes', text: 'Missões com prova por foto: o celular vira aliado' },
  P: { key: 'metas', text: 'Metas quebradas em passos: só o de hoje importa' },
  A: { key: 'dashboard', text: 'Missões de hoje já prontas quando você abre o app' },
}

const GENERIC: Record<PlanId, PlanFeature[]> = {
  primary: [
    { key: 'habitos', text: 'Hábitos com a sequência de cada dia' },
    { key: 'dashboard', text: 'Painel com as missões de hoje' },
    { key: 'personagem', text: 'Personagem que sobe de nível' },
  ],
  focuz: [
    { key: 'ilimitado', text: 'Tudo ilimitado: hábitos, tarefas e metas' },
    { key: 'desafios', text: 'Um desafio novo toda semana' },
    { key: 'estatisticas', text: 'Estatísticas das suas sequências' },
    { key: 'conquistas', text: 'Conquistas pra desbloquear' },
  ],
  intensive: [
    { key: 'modulos', text: 'Todos os módulos: Treino, Nutrição, Finanças, Aparência e Estudos' },
    { key: 'guildas', text: 'Guildas e Arena: enfrente chefes em grupo' },
    { key: 'suporte', text: 'Suporte humano com prioridade' },
    { key: 'coordenador', text: 'Coordenador IA 24h que conhece sua rotina' },
    { key: 'corrida', text: 'Corrida por GPS que vira pontos de Agilidade' },
  ],
}

const SIZE: Record<PlanId, number> = { primary: 4, focuz: 5, intensive: 6 }

export function buildPlanFeatures(
  planId: PlanId,
  ctx: { area: string; motivator: string; block: BlockCode } | null,
): PlanFeature[] {
  const personal: PlanFeature[] = []
  if (ctx) {
    const picks =
      planId === 'primary'
        ? [AREA[ctx.area], BLOCK[ctx.block]]
        : [AREA[ctx.area], MOTIVATOR[ctx.motivator], BLOCK[ctx.block]]
    for (const p of picks) if (p && !personal.some((x) => x.key === p.key)) personal.push({ ...p, personal: true })
  }
  const out = [...personal]
  for (const g of GENERIC[planId]) {
    if (out.length >= SIZE[planId]) break
    if (!out.some((x) => x.key === g.key)) out.push(g)
  }
  return out
}
