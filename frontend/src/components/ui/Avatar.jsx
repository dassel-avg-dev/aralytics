const PALETTE = [
  'bg-primary-fixed text-primary',
  'bg-status-ok-tint text-secondary',
  'bg-warn-tint text-warn',
  'bg-surface-container-high text-on-surface',
  'bg-danger-tint text-error',
]

const SIZES = {
  sm: 'w-8 h-8 text-label-sm',
  md: 'w-9 h-9 text-label-md',
  lg: 'w-12 h-12 text-headline-sm',
}

function getInitials(name) {
  const parts = String(name || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
  if (parts.length === 0) return 'A'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

function pickTone(name) {
  let hash = 0
  for (let i = 0; i < name.length; i += 1) {
    hash = (hash * 31 + name.charCodeAt(i)) | 0
  }
  return PALETTE[Math.abs(hash) % PALETTE.length]
}

export default function Avatar({ name = '', size = 'md', className = '' }) {
  const initials = getInitials(name)
  const tone = pickTone(String(name || 'A'))

  return (
    <span
      aria-label={name ? `${name} avatar` : 'User avatar'}
      className={`inline-flex items-center justify-center rounded-full font-headline-sm font-bold shrink-0 select-none ${SIZES[size] || SIZES.md} ${tone} ${className}`}
      role="img"
    >
      {initials}
    </span>
  )
}
