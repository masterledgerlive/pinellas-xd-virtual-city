import { cn } from '@/lib/cn'
import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'ghost' | 'outline' | 'solid'

export function Button({
  className,
  variant = 'primary',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] disabled:opacity-50',
        variant === 'primary' &&
          'bg-[var(--accent)] text-[var(--accent-ink)] shadow-sm hover:brightness-110',
        variant === 'ghost' &&
          'bg-transparent text-[var(--ink)] hover:bg-[var(--panel-2)]',
        variant === 'outline' &&
          'border border-[var(--stroke)] bg-[var(--panel)] text-[var(--ink)] hover:bg-[var(--panel-2)]',
        variant === 'solid' && 'bg-[var(--ink)] text-[var(--bg)] hover:opacity-90',
        className,
      )}
      {...props}
    />
  )
}
