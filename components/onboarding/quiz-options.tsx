'use client'

import { Check, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { QuizOption } from './quiz-questions'

const SELECTED = 'border-primary bg-primary/10 ring-1 ring-primary/40 shadow-[0_6px_24px_-12px_var(--primary)]'
const IDLE = 'border-border hover:border-primary/50'

type OptionsProps = {
  options: QuizOption[]
  selected: string[]
  onSelect: (value: string) => void
}

export function SingleOptions({ options, selected, onSelect }: OptionsProps) {
  return (
    <div className="flex-1 min-h-0 flex flex-col justify-center gap-2.5" role="radiogroup">
      {options.map((option) => {
        const isSelected = selected.includes(option.value)
        const Icon = option.icon
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onSelect(option.value)}
            className={cn(
              'w-full p-3 rounded-2xl border transition-all text-left flex items-center gap-3',
              isSelected ? SELECTED : IDLE,
            )}
          >
            {Icon && (
              <div
                className={cn(
                  'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors',
                  isSelected ? 'bg-primary text-primary-foreground' : 'bg-secondary',
                )}
              >
                <Icon className="w-5 h-5" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm leading-tight">{option.label}</p>
              {option.description && (
                <p className="text-xs text-muted-foreground leading-tight truncate">{option.description}</p>
              )}
            </div>
            <ChevronRight
              className={cn(
                'w-4 h-4 flex-shrink-0 transition-colors',
                isSelected ? 'text-primary' : 'text-muted-foreground/40',
              )}
            />
          </button>
        )
      })}
    </div>
  )
}

export function MultipleOptions({ options, selected, onSelect }: OptionsProps) {
  return (
    <div className="flex-1 min-h-0 flex flex-col justify-center">
      <div className="grid grid-cols-2 gap-2.5">
        {options.map((option) => {
          const isSelected = selected.includes(option.value)
          const Icon = option.icon
          return (
            <button
              key={option.value}
              type="button"
              role="checkbox"
              aria-checked={isSelected}
              onClick={() => onSelect(option.value)}
              className={cn(
                'relative p-3 rounded-2xl border transition-all text-left flex flex-col gap-2',
                isSelected ? SELECTED : IDLE,
              )}
            >
              <div className="flex items-center justify-between">
                {Icon && (
                  <div
                    className={cn(
                      'w-9 h-9 rounded-lg flex items-center justify-center transition-colors',
                      isSelected ? 'bg-primary text-primary-foreground' : 'bg-secondary',
                    )}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={cn(
                    'w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 transition-colors',
                    isSelected ? 'bg-primary border-primary' : 'border-muted-foreground/40',
                  )}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 text-primary-foreground" />}
                </div>
              </div>
              <p className="font-semibold text-sm leading-tight">{option.label}</p>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function FocusOptions({ options, selected, onSelect }: OptionsProps) {
  return (
    <div className="flex-1 min-h-0 flex flex-col justify-center">
      <div className="grid grid-cols-2 gap-2.5" role="radiogroup">
        {options.map((option) => {
          const isSelected = selected.includes(option.value)
          const Icon = option.icon
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelect(option.value)}
              className={cn(
                'p-3 rounded-2xl border transition-all text-left flex flex-col gap-1.5',
                isSelected ? SELECTED : IDLE,
              )}
            >
              {Icon && (
                <div
                  className={cn(
                    'w-9 h-9 rounded-lg flex items-center justify-center transition-colors',
                    isSelected ? 'bg-primary text-primary-foreground' : 'bg-secondary',
                  )}
                >
                  <Icon className="w-4 h-4" />
                </div>
              )}
              <p className="font-semibold text-sm leading-tight">{option.label}</p>
              {option.description && (
                <p className="text-[11px] text-muted-foreground leading-tight line-clamp-2">{option.description}</p>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function ScaleOptions({ options, selected, onSelect }: OptionsProps) {
  return (
    <div className="flex-1 min-h-0 flex flex-col justify-center">
      <div className="flex gap-2 justify-center" role="radiogroup">
        {options.map((option) => {
          const isSelected = selected.includes(option.value)
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelect(option.value)}
              className={cn(
                'flex-1 py-5 rounded-2xl border transition-all',
                isSelected
                  ? 'border-primary bg-primary text-primary-foreground ring-1 ring-primary/40 shadow-[0_6px_24px_-12px_var(--primary)]'
                  : IDLE,
              )}
            >
              <p className="text-2xl font-bold">{option.label}</p>
              <p className={cn('text-[10px] mt-1', isSelected ? 'text-primary-foreground/80' : 'text-muted-foreground')}>
                {option.description}
              </p>
            </button>
          )
        })}
      </div>
    </div>
  )
}
