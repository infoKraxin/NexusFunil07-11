'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

type MissionColor = 'red' | 'purple' | 'blue' | 'yellow'
type QuestColor = 'cyan' | 'orange' | 'blue'

type Quest = { name: string; attribute: string; value: number; color: QuestColor }

type TerminalMessage =
  | { id: number; type: 'user' | 'system' | 'ai'; content: string; delay: number }
  | {
      id: number
      type: 'mission'
      delay: number
      mission: { title: string; xp: number; color: MissionColor; quests: Quest[] }
    }
  | { id: number; type: 'insight'; content: string; delay: number }

const MESSAGES: TerminalMessage[] = [
  {
    id: 1,
    type: 'user',
    content:
      'Coordenador, preciso melhorar minha rotina. Quero treinar 5x na semana, meditar todos os dias, estudar programação 3h por dia e terminar meu projeto pessoal até domingo.',
    delay: 0,
  },
  { id: 2, type: 'system', content: '> SISTEMA ATUALIZADO:', delay: 2000 },
  { id: 3, type: 'ai', content: 'Entendido, Jogador. Estruturei sua evolução para os próximos 7 dias.', delay: 500 },
  {
    id: 4,
    type: 'mission',
    delay: 1200,
    mission: {
      title: 'Rotina de Treino Intensivo',
      xp: 250,
      color: 'red',
      quests: [
        { name: 'Hidratação Extrema', attribute: 'Vitalidade', value: 15, color: 'cyan' },
        { name: 'Alimentação Balanceada', attribute: 'Energia', value: 20, color: 'orange' },
      ],
    },
  },
  { id: 5, type: 'mission', delay: 800, mission: { title: 'Meditação Diária', xp: 100, color: 'purple', quests: [] } },
  {
    id: 6,
    type: 'mission',
    delay: 800,
    mission: {
      title: 'Imersão em Programação',
      xp: 300,
      color: 'blue',
      quests: [{ name: 'Documentação do Projeto', attribute: 'Intelecto', value: 50, color: 'blue' }],
    },
  },
  {
    id: 7,
    type: 'mission',
    delay: 800,
    mission: { title: 'Finalizar Projeto Pessoal', xp: 500, color: 'yellow', quests: [] },
  },
  {
    id: 8,
    type: 'insight',
    content:
      '"Detectei sobrecarga em dias úteis. Recomendo distribuir 2h de programação durante a semana e 4h no fim de semana para otimizar resultados."',
    delay: 1000,
  },
]

const MISSION_STYLES: Record<MissionColor, { text: string; border: string; bg: string }> = {
  red: { text: 'text-red-400', border: 'border-red-500', bg: 'bg-red-950/10' },
  purple: { text: 'text-purple-400', border: 'border-purple-500', bg: 'bg-purple-950/10' },
  blue: { text: 'text-blue-400', border: 'border-blue-500', bg: 'bg-blue-950/10' },
  yellow: { text: 'text-yellow-400', border: 'border-yellow-500', bg: 'bg-yellow-950/10' },
}

const QUEST_TEXT: Record<QuestColor, string> = {
  cyan: 'text-cyan-400',
  orange: 'text-orange-400',
  blue: 'text-blue-400',
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

function TypedText({ full, typed }: { full: string; typed?: string }) {
  const text = typed ?? full
  return (
    <>
      {text}
      {typed !== undefined && typed.length < full.length && <span className="animate-pulse">_</span>}
    </>
  )
}

export function CoordinatorTerminal() {
  const [visibleIds, setVisibleIds] = useState<number[]>([])
  const [typed, setTyped] = useState<Record<number, string>>({})
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const startedRef = useRef(false)

  useEffect(() => {
    let cancelled = false
    const intervals: ReturnType<typeof setInterval>[] = []

    const typeMessage = (id: number, content: string, speed = 30) => {
      let index = 0
      setTyped((prev) => ({ ...prev, [id]: '' }))
      const interval = setInterval(() => {
        if (index <= content.length) {
          setTyped((prev) => ({ ...prev, [id]: content.substring(0, index) }))
          index++
        } else {
          clearInterval(interval)
        }
      }, speed)
      intervals.push(interval)
    }

    const run = async () => {
      for (const message of MESSAGES) {
        if (message.delay) await wait(message.delay)
        if (cancelled) return
        if (message.type === 'user' || message.type === 'ai' || message.type === 'system') {
          typeMessage(message.id, message.content)
          setVisibleIds((prev) => [...prev, message.id])
          await wait(30 * message.content.length + 500)
        } else {
          setVisibleIds((prev) => [...prev, message.id])
          await wait(500)
        }
        if (cancelled) return
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !startedRef.current) {
          startedRef.current = true
          run()
        }
      },
      { threshold: 0.3 },
    )
    if (containerRef.current) observer.observe(containerRef.current)

    return () => {
      cancelled = true
      observer.disconnect()
      intervals.forEach(clearInterval)
    }
  }, [])

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [visibleIds, typed])

  return (
    <div ref={containerRef} className="max-w-4xl mx-auto">
      <div
        className="bg-black border-2 border-green-500/30 rounded-lg overflow-hidden"
        style={{ boxShadow: '0 0 40px rgba(34, 197, 94, 0.2)' }}
      >
        <div className="bg-green-950/20 border-b border-green-500/30 px-6 py-3 flex items-center gap-2">
          <div className="flex gap-2" aria-hidden="true">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <p className="text-green-400 text-sm font-mono ml-4">Coordenador - Sistema de Evolução</p>
        </div>

        <div
          ref={scrollRef}
          className="p-6 flex flex-col gap-4 font-mono text-sm min-h-[500px] max-h-[600px] overflow-y-auto custom-scrollbar"
          aria-live="polite"
        >
          {MESSAGES.filter((m) => visibleIds.includes(m.id)).map((message) => {
            if (message.type === 'user') {
              return (
                <div key={message.id} className="flex gap-3 animate-slide-up">
                  <div className="text-cyan-400">Você:</div>
                  <div className="flex-1 text-gray-300">
                    <TypedText full={message.content} typed={typed[message.id]} />
                  </div>
                </div>
              )
            }
            if (message.type === 'system') {
              return (
                <div key={message.id} className="flex gap-3 animate-slide-up">
                  <div className="text-green-400">Sistema:</div>
                  <div className="flex-1 text-green-400/70">
                    <TypedText full={message.content} typed={typed[message.id]} />
                  </div>
                </div>
              )
            }
            if (message.type === 'ai') {
              return (
                <div key={message.id} className="ml-16 animate-slide-up">
                  <div className="text-green-400/90">
                    <TypedText full={message.content} typed={typed[message.id]} />
                  </div>
                </div>
              )
            }
            if (message.type === 'mission') {
              const style = MISSION_STYLES[message.mission.color]
              return (
                <div
                  key={message.id}
                  className={cn('ml-16 border-l-2 pl-4 py-2 animate-slide-up', style.border, style.bg)}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={style.text}>⚔ Missão:</span>
                    <span className="text-white font-bold">{message.mission.title}</span>
                    <span className={cn(style.text, 'text-xs ml-auto')}>+{message.mission.xp} XP</span>
                  </div>
                  {message.mission.quests.length > 0 && (
                    <div className="text-gray-400 text-xs flex flex-col gap-1">
                      {message.mission.quests.map((quest) => (
                        <div key={quest.name}>
                          → Quest: {quest.name}{' '}
                          <span className={QUEST_TEXT[quest.color]}>
                            +{quest.value} {quest.attribute}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            }
            return (
              <div
                key={message.id}
                className="ml-16 text-green-400/60 text-xs italic border-t border-green-500/20 pt-3 animate-slide-up"
              >
                {message.content}
              </div>
            )
          })}
        </div>

        <div className="border-t border-green-500/30 bg-green-950/10 px-6 py-4 flex items-center gap-3">
          <span className="text-green-400">{'>'}</span>
          <div className="flex-1 text-green-400/40">Digite ou fale sua próxima missão...</div>
          <div className="flex gap-2" aria-hidden="true">
            <div className="w-8 h-8 rounded border border-green-500/30 flex items-center justify-center text-green-400 text-xs">
              🎤
            </div>
            <div className="w-8 h-8 rounded border border-green-500/30 flex items-center justify-center text-green-400 text-xs">
              →
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
