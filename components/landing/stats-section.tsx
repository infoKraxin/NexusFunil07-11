const STATS = [
  { value: '20.000+', label: 'Usuários Ativos' },
  { value: '5M+', label: 'Tasks Completadas' },
  { value: '1M+', label: 'Duelos Realizados' },
  { value: '4.9', label: 'Avaliação Média' },
]

export function StatsSection() {
  return (
    <section className="py-16 px-6 border-y border-border/50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
