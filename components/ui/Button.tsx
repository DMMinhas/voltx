import { cn } from '@/lib/utils'
import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({ variant = 'primary', size = 'md', className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
        variant === 'primary'  && 'bg-accent text-black hover:bg-accent/90 hover:scale-105 active:scale-95',
        variant === 'outline'  && 'border border-accent/50 text-accent hover:bg-accent/10 hover:border-accent',
        variant === 'ghost'    && 'text-white/70 hover:text-white hover:bg-white/5',
        size === 'sm'  && 'text-sm px-4 py-2 gap-1.5',
        size === 'md'  && 'text-sm px-5 py-2.5 gap-2',
        size === 'lg'  && 'text-base px-7 py-3.5 gap-2',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
