import { cn } from '@/lib/utils'

export function FeatureCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'rounded-xl p-6 bg-secondary/30 border border-white/10 hover:border-primary/30 transition-colors duration-200',
        className,
      )}
    >
      {children}
    </div>
  )
}
