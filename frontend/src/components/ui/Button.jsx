import { Link } from 'react-router-dom'

const VARIANTS = {
  primary: 'bg-primary text-on-primary hover:bg-primary-container shadow-sm',
  secondary:
    'bg-surface-container-lowest text-on-surface border border-outline-variant/60 hover:bg-surface-container-low',
  accent: 'bg-accent-yellow text-on-tertiary-fixed hover:brightness-95 shadow-sm',
  ghost: 'bg-transparent text-on-surface-variant hover:bg-surface-container hover:text-on-surface',
  danger: 'bg-danger-tint text-error border border-error/20 hover:bg-error hover:text-on-error',
}

const SIZES = {
  sm: 'px-3 py-1.5 min-h-[36px] text-label-md rounded-xl',
  md: 'px-4 py-2.5 min-h-[44px] text-label-lg rounded-xl',
  lg: 'px-6 py-3 min-h-[48px] text-label-lg rounded-2xl',
}

const BASE =
  'inline-flex items-center justify-center gap-2 font-label-lg font-semibold transition-all cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:opacity-50 disabled:pointer-events-none'

export default function Button({
  variant = 'primary',
  size = 'md',
  to,
  className = '',
  children,
  ...rest
}) {
  const classes = `${BASE} ${VARIANTS[variant] || VARIANTS.primary} ${SIZES[size] || SIZES.md} ${className}`

  if (to) {
    return (
      <Link className={classes} to={to} {...rest}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} type={rest.type || 'button'} {...rest}>
      {children}
    </button>
  )
}
