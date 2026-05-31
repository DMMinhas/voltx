'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, ChevronDown } from 'lucide-react'
import { scooters } from '@/data/scooters'
import { formatPKR } from '@/lib/utils'
import type { Scooter } from '@/types'
import { useI18n } from '@/lib/i18n'

const MAX = 3

export default function CompareTable() {
  const { t } = useI18n()
  const [selected, setSelected] = useState<(Scooter | null)[]>([null, null, null])

  function pick(idx: number, slug: string) {
    const s = scooters.find((x) => x.slug === slug) ?? null
    setSelected((prev) => prev.map((v, i) => (i === idx ? s : v)))
  }

  function clear(idx: number) {
    setSelected((prev) => prev.map((v, i) => (i === idx ? null : v)))
  }

  const filled = selected.filter(Boolean) as Scooter[]

  const specRows: { key: keyof Scooter['specs']; label: string; unit: string; higher: boolean }[] = [
    { key: 'topSpeed',    label: t.spec.topSpeed,     unit: t.spec.kmh,    higher: true  },
    { key: 'range',       label: t.spec.range,        unit: t.spec.km,     higher: true  },
    { key: 'motorPower',  label: t.spec.motorPower,   unit: t.spec.w,      higher: true  },
    { key: 'chargeTime',  label: t.spec.chargeTime,   unit: t.spec.hr,     higher: false },
    { key: 'warranty',    label: t.spec.warranty,     unit: t.spec.months, higher: true  },
  ]

  return (
    <div>
      {/* Selectors */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {selected.map((s, i) => (
          <div key={i}>
            {s ? (
              <div className="relative rounded-2xl overflow-hidden" style={{ background: '#0D0D14', border: '1px solid rgba(255,255,255,0.08)' }}>
                <button
                  onClick={() => clear(i)}
                  className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-black/60 flex items-center justify-center text-white/70 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
                <div className="relative h-32">
                  <Image src={s.images[0]} alt={s.name} fill className="object-cover" unoptimized />
                </div>
                <div className="p-3">
                  <div className="text-xs text-muted">{s.brand}</div>
                  <div className="font-space font-bold text-white">{s.name}</div>
                  <div className="text-accent text-sm font-semibold mt-1">{formatPKR(s.price.min)}</div>
                </div>
              </div>
            ) : (
              <div className="relative rounded-2xl p-4" style={{ background: '#0D0D14', border: '1px dashed rgba(255,255,255,0.12)' }}>
                <select
                  onChange={(e) => pick(i, e.target.value)}
                  className="w-full bg-transparent text-sm text-muted focus:outline-none appearance-none cursor-pointer"
                  value=""
                >
                  <option value="">{t.compare.select}</option>
                  {scooters
                    .filter((x) => !selected.some((sel) => sel?.id === x.id))
                    .map((x) => (
                      <option key={x.id} value={x.slug}>{x.brand} {x.name}</option>
                    ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Comparison table */}
      {filled.length >= 2 && (
        <div className="rounded-2xl overflow-hidden" style={{ background: '#0D0D14', border: '1px solid rgba(255,255,255,0.06)' }}>
          {/* Price row */}
          <CompareRow label="Price" cols={selected.map((s) =>
            s ? <span className="text-accent font-bold">{formatPKR(s.price.min)}</span> : null
          )} />

          {specRows.map(({ key, label, unit, higher }) => {
            const vals = selected.map((s) => s?.specs[key] as number | undefined)
            const numVals = vals.filter((v): v is number => typeof v === 'number')
            const best = higher ? Math.max(...numVals) : Math.min(...numVals)

            return (
              <CompareRow
                key={key}
                label={label}
                cols={selected.map((s, i) => {
                  if (!s) return null
                  const v = s.specs[key]
                  const isBest = filled.length >= 2 && v === best
                  return (
                    <span className={isBest ? 'text-accent font-bold' : 'text-white'}>
                      {String(v)} {unit}
                      {isBest && <span className="ml-1 text-[10px] text-accent/70">↑</span>}
                    </span>
                  )
                })}
              />
            )
          })}

          <CompareRow label="Battery" cols={selected.map((s) =>
            s ? <span className="text-white">{s.specs.batteryType}</span> : null
          )} />

          <CompareRow label="Category" cols={selected.map((s) =>
            s ? <span className="text-muted capitalize">{s.category}</span> : null
          )} />
        </div>
      )}

      {filled.length < 2 && (
        <p className="text-center text-muted py-16">Select at least 2 models to compare.</p>
      )}
    </div>
  )
}

function CompareRow({ label, cols }: { label: string; cols: (React.ReactNode | null)[] }) {
  return (
    <div className="grid grid-cols-4 items-center" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
      <div className="px-5 py-4 text-sm text-muted">{label}</div>
      {cols.map((col, i) => (
        <div key={i} className="px-5 py-4 text-sm text-center">
          {col ?? <span className="text-white/10">—</span>}
        </div>
      ))}
    </div>
  )
}
