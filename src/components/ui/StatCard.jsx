import MasteryRing from './MasteryRing'

/**
 * KPI scorecard card: status dot + label, big Nunito metric,
 * trend line, and a MasteryRing visual on the right.
 */
export default function StatCard({ dotClass, label, count, unit, trendIcon, trendText, trendClass, ring, ringColorClass, ringChildren }) {
  return (
    <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex items-center justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
      <div className="flex flex-col gap-space-xs z-10">
        <div className="flex items-center gap-1.5">
          <span className={`inline-block w-2.5 h-2.5 rounded-full ${dotClass}`}></span>
          <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
            {label}
          </span>
        </div>
        <div className="flex items-baseline gap-space-xs mt-1">
          <span className="font-metric-number text-metric-number text-on-surface">{count}</span>
          <span className="font-label-md text-label-md text-on-surface-variant">{unit}</span>
        </div>
        <div className={`flex items-center gap-1 font-body-sm text-body-sm font-medium ${trendClass}`}>
          {trendIcon && (
            <span className="material-symbols-outlined text-[16px]">{trendIcon}</span>
          )}
          <span>{trendText}</span>
        </div>
      </div>
      <MasteryRing colorClass={ringColorClass} value={ring}>
        {ringChildren}
      </MasteryRing>
    </div>
  )
}
