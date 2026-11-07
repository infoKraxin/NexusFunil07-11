import Image from 'next/image'
import { cn } from '@/lib/utils'

const sizes = {
  sm: { size: 32, text: 'text-lg' },
  md: { size: 40, text: 'text-xl' },
  lg: { size: 48, text: 'text-2xl' },
  xl: { size: 64, text: 'text-3xl' },
}

type NexusLogoProps = {
  size?: keyof typeof sizes
  showText?: boolean
  className?: string
}

export function NexusLogo({ size = 'md', showText = true, className }: NexusLogoProps) {
  const config = sizes[size]
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="rounded-xl overflow-hidden">
        <Image
          src="/images/nexus-logo.png"
          alt="NEXUS Logo"
          width={config.size}
          height={config.size}
          className="object-cover"
          priority
        />
      </div>
      {showText && <span className={cn('font-bold', config.text)}>NEXUS</span>}
    </div>
  )
}
