'use client'

import { Gauge, Zap, Battery, Clock, Shield, Weight } from 'lucide-react'
import type { Scooter } from '@/types'
import { useI18n } from '@/lib/i18n'

export default function SpecTable({ scooter }: { scooter: Scooter }) {
  const { t } = useI18n()
  const s     = scooter.specs

  const rows = [
    { icon: <Gauge className="w-4 h-4" />,   label: t.spec.topSpeed,       val: `${s.topSpeed} ${t.spec.kmh}` },
    { icon: <Zap className="w-4 h-4" />,     label: t.spec.range,          val: `${s.range} ${t.spec.km}` },
    { icon: <Zap className="w-4 h-4" />,     label: t.spec.motorPower,     val: `${s.motorPower} ${t.spec.w}` },
    { icon: <Battery className="w-4 h-4" />, label: t.spec.batteryType,    val: s.batteryType },
    { icon: <Battery className="w-4 h-4" />, label: t.spec.batteryCapacity,val: s.batteryCapacity },
    { icon: <Clock className="w-4 h-4" />,   label: t.spec.chargeTime,     val: `${s.chargeTime} ${t.spec.hr}` },
    { icon: <Shield className="w-4 h-4" />,  label: t.spec.warranty,       val: `${s.warranty} ${t.spec.months}` },
    ...(s.weight ? [{ icon: <Weight className="w-4 h-4" />, label: t.spec.weight, val: `${s.weight} ${t.spec.kg}` }] : []),
  ]

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: '#0D0D14', border: '1px solid rgba(255,255,255,0.06)' }}
    >
      {rows.map((row, i) => (
        <div
          key={row.label}
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: i < rows.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}
        >
          <div className="flex items-center gap-3 text-muted text-sm">
            {row.icon}
            {row.label}
          </div>
          <div className="text-sm font-semibold text-white">{row.val}</div>
        </div>
      ))}
    </div>
  )
}
