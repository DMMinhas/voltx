import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'accent' | 'lime' | 'red' | 'muted'
  className?: string
}

export function Badge({ children, variant = 'accent', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full',
        variant === 'accent' && 'bg-accent/15 text-accent border border-accent/20',
        variant === 'lime'   && 'bg-accent2/15 text-accent2 border border-accent2/20',
        variant === 'red'    && 'bg-danger/15 text-danger border border-danger/20',
        variant === 'muted'  && 'bg-white/5 text-muted border border-white/10',
        className,
      )}
    >
      {children}
    </span>
  )
}
