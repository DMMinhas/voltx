'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Gauge, Zap, Battery, ArrowRight } from 'lucide-react'
import type { Scooter } from '@/types'
import { formatPKR } from '@/lib/utils'
import { useI18n } from '@/lib/i18n'
import { Badge } from '@/components/ui/Badge'

export default function ScooterCard({ scooter }: { scooter: Scooter }) {
  const { t } = useI18n()

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <Link href={`/scooters/${scooter.slug}`} className="group block h-full">
        <div
          className="h-full flex flex-col rounded-2xl overflow-hidden transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl"
          style={{
            background: '#0D0D14',
            border: '1px solid rgba(255,255,255,0.06)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
          }}
        >
          {/* Image */}
          <div className="relative h-52 bg-[#0A0A12] overflow-hidden">
            <Image
              src={scooter.images[0]}
              alt={`${scooter.brand} ${scooter.name}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D14] via-transparent to-transparent opacity-60" />
            <div className="absolute top-3 left-3 flex gap-2">
              <Badge variant={scooter.brand === 'Yadea' ? 'accent' : 'lime'}>{scooter.brand}</Badge>
              {scooter.isNew     && <Badge variant="red">New</Badge>}
            </div>
            <div className="absolute top-3 right-3">
              <Badge variant="muted">{t.scooters.categories[scooter.category]}</Badge>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 flex flex-col p-5">
            <h3 className="font-space font-bold text-white text-xl">{scooter.name}</h3>
            <p className="text-xs text-muted mt-0.5 mb-4">{scooter.tagline}</p>

            <div className="grid grid-cols-3 gap-2 mb-5">
              <SpecCell
                icon={<Gauge className="w-3.5 h-3.5" />}
                val={scooter.specs.topSpeed}
                unit={t.spec.kmh}
              />
              <SpecCell
                icon={<Zap className="w-3.5 h-3.5" />}
                val={scooter.specs.range}
                unit={t.spec.km}
              />
              <SpecCell
                icon={<Battery className="w-3.5 h-3.5" />}
                val={`${scooter.specs.motorPower}`}
                unit={t.spec.w}
              />
            </div>

            {/* Color dots */}
            <div className="flex gap-1.5 mb-5">
              {scooter.colors.map((c) => (
                <div
                  key={c.hex}
                  title={c.name}
                  className="w-4 h-4 rounded-full border border-white/10"
                  style={{ background: c.hex }}
                />
              ))}
            </div>

            <div className="mt-auto flex items-center justify-between">
              <div>
                <div className="text-[10px] text-muted">{t.scooters.from}</div>
                <div className="text-lg font-bold text-accent">{formatPKR(scooter.price.min)}</div>
                {scooter.price.max && (
                  <div className="text-[10px] text-muted">– {formatPKR(scooter.price.max)}</div>
                )}
              </div>
              <div className="flex items-center gap-1 text-xs text-muted group-hover:text-accent transition-colors">
                {t.scooters.learnMore} <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

function SpecCell({ icon, val, unit }: { icon: React.ReactNode; val: number | string; unit: string }) {
  return (
    <div className="bg-white/[0.03] rounded-lg p-2 text-center">
      <div className="flex justify-center text-muted mb-1">{icon}</div>
      <div className="text-xs font-bold text-white">{val}</div>
      <div className="text-[10px] text-muted leading-tight">{unit}</div>
    </div>
  )
}
