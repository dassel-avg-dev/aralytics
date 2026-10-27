/**
 * Circular progress ring per DESIGN.md "Progress & Mastery Bars"
 * (rounded caps, tinted track, 0-100 value).
 */
export default function MasteryRing({ value, colorClass, trackClass = 'text-surface-container', size = 'w-20 h-20', strokeWidth = 3.5, children }) {
  return (
    <div className={`relative ${size} shrink-0 flex items-center justify-center`}>
      <svg className={`w-full h-full -rotate-90 ${colorClass}`} viewBox="0 0 36 36">
        <path
          className={trackClass}
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
        />
        <path
          className={colorClass}
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="currentColor"
          strokeDasharray={`${value}, 100`}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
        />
      </svg>
      <span className="absolute font-headline-sm text-headline-sm text-on-surface">
        {children ?? `${value}%`}
      </span>
    </div>
  )
}
