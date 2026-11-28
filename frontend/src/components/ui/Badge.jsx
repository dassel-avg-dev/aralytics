const TONES = {
  neutral: {
    pill: 'bg-surface-container-low text-on-surface-variant border border-outline-variant/60',
    dot: 'bg-outline',
  },
  mastered: {
    pill: 'bg-status-ok-tint text-secondary',
    dot: 'bg-status-ok',
  },
  'on-track': {
    pill: 'bg-primary-fixed text-primary',
    dot: 'bg-primary',
  },
  nudge: {
    pill: 'bg-warn-tint text-warn',
    dot: 'bg-warn',
  },
  help: {
    pill: 'bg-danger-tint text-error',
    dot: 'bg-error',
  },
  ai: {
    pill: 'bg-surface-container text-primary border border-primary/20',
    dot: 'bg-primary-container',
  },
}

export default function Badge({ tone = 'neutral', dot = true, className = '', children, ...rest }) {
  const style = TONES[tone] || TONES.neutral

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-label-md text-label-md font-semibold leading-none whitespace-nowrap ${style.pill} ${className}`}
      {...rest}
    >
      {dot && <span aria-hidden="true" className={`w-1.5 h-1.5 rounded-full shrink-0 ${style.dot}`} />}
      {children}
    </span>
  )
}
