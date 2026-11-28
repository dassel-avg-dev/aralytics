const VARIANTS = {
  elevated: 'bg-surface-container-lowest shadow-[0_4px_20px_rgba(66,46,194,0.06)]',
  tinted: 'bg-surface-container',
  subtle: 'bg-surface-container-low',
}

export default function Card({ variant = 'elevated', className = '', children, ...rest }) {
  return (
    <div
      className={`rounded-[20px] border border-outline-variant/60 ${VARIANTS[variant] || VARIANTS.elevated} ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
}
