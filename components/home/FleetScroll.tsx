'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Zap, Gauge, Battery } from 'lucide-react'
import { featuredScooters } from '@/data/scooters'
import { formatPKR } from '@/lib/utils'
import { useI18n } from '@/lib/i18n'
import { Badge } from '@/components/ui/Badge'

gsap.registerPlugin(ScrollTrigger)

export default function FleetScroll() {
  const { t } = useI18n()
  const ref   = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.from('.fleet-heading', {
      scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      opacity: 0, y: 40, duration: 0.8, ease: 'power2.out',
    })
    gsap.from('.fleet-card', {
      scrollTrigger: { trigger: '.fleet-track', start: 'top 80%' },
      opacity: 0, y: 60, stagger: 0.12, duration: 0.7, ease: 'power2.out',
    })
  }, { scope: ref })

  return (
    <section ref={ref} className="py-24 bg-[#080810] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="fleet-heading flex items-end justify-between mb-12">
          <div>
            <p className="text-xs font-semibold text-accent tracking-widest uppercase mb-2">Featured Models</p>
            <h2 className="font-space font-bold text-3xl sm:text-4xl text-white">{t.fleet.heading}</h2>
            <p className="text-muted mt-2">{t.fleet.sub}</p>
          </div>
          <Link
            href="/scooters"
            className="hidden sm:flex items-center gap-2 text-sm text-accent hover:gap-3 transition-all"
          >
            {t.fleet.viewAll} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Horizontal scroll track */}
      <div className="fleet-track overflow-x-auto pb-4 hide-scrollbar">
        <div className="flex gap-5 px-4 sm:px-6 max-w-7xl mx-auto w-max">
          {featuredScooters.map((scooter) => (
            <Link key={scooter.id} href={`/scooters/${scooter.slug}`} className="fleet-card group block">
              <div
                className="w-72 rounded-2xl overflow-hidden transition-all duration-300 group-hover:-translate-y-2"
                style={{
                  background: '#0D0D14',
                  border: '1px solid rgba(255,255,255,0.06)',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
                }}
              >
                {/* Image */}
                <div className="relative h-44 bg-[#0A0A12] overflow-hidden">
                  <Image
                    src={scooter.images[0]}
                    alt={`${scooter.brand} ${scooter.name}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <Badge variant={scooter.brand === 'Yadea' ? 'accent' : 'lime'}>
                      {scooter.brand}
                    </Badge>
                    {scooter.isNew && <Badge variant="red">New</Badge>}
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="font-space font-bold text-white text-lg">{scooter.name}</h3>
                  <p className="text-xs text-muted mt-0.5 mb-4 line-clamp-1">{scooter.tagline}</p>

                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <Stat icon={<Gauge className="w-3.5 h-3.5" />} val={`${scooter.specs.topSpeed}`} unit="km/h" />
                    <Stat icon={<Zap className="w-3.5 h-3.5" />} val={`${scooter.specs.range}`} unit="km" />
                    <Stat icon={<Battery className="w-3.5 h-3.5" />} val={scooter.specs.batteryType} unit="" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-muted">{t.scooters.from}</div>
                      <div className="text-base font-bold text-accent">{formatPKR(scooter.price.min)}</div>
                    </div>
                    <div className="text-xs text-muted group-hover:text-accent transition-colors flex items-center gap-1">
                      {t.scooters.learnMore} <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="sm:hidden mt-6 text-center">
        <Link href="/scooters" className="text-sm text-accent flex items-center justify-center gap-1">
          {t.fleet.viewAll} <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <style jsx global>{`
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  )
}

function Stat({ icon, val, unit }: { icon: React.ReactNode; val: string; unit: string }) {
  return (
    <div className="bg-white/[0.03] rounded-lg p-2 text-center">
      <div className="flex justify-center text-muted mb-1">{icon}</div>
      <div className="text-xs font-bold text-white">{val}</div>
      {unit && <div className="text-[10px] text-muted">{unit}</div>}
    </div>
  )
}
