'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DollarSign, Wind, Wrench, ThumbsUp } from 'lucide-react'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { useI18n } from '@/lib/i18n'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

gsap.registerPlugin(ScrollTrigger)

export default function WhyEvPage() {
  const { t } = useI18n()
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.from('.why-card', {
      scrollTrigger: { trigger: '.why-cards', start: 'top 80%' },
      opacity: 0, y: 60, stagger: 0.15, duration: 0.7, ease: 'power2.out',
    })
  }, { scope: ref })

  const cards = [
    {
      icon: <DollarSign className="w-7 h-7" />,
      accent: '#00FFCC',
      heading: t.whyEv.saving.heading,
      desc:    t.whyEv.saving.desc,
      stat: { val: 80000, prefix: 'PKR ', suffix: '/yr', label: 'Avg. savings' },
    },
    {
      icon: <Wind className="w-7 h-7" />,
      accent: '#BBFF00',
      heading: t.whyEv.co2.heading,
      desc:    t.whyEv.co2.desc,
      stat: { val: 0, prefix: '', suffix: ' CO₂', label: 'Direct emissions' },
    },
    {
      icon: <Wrench className="w-7 h-7" />,
      accent: '#00FFCC',
      heading: t.whyEv.maintenance.heading,
      desc:    t.whyEv.maintenance.desc,
      stat: { val: 80, prefix: '', suffix: '% less', label: 'Maintenance cost' },
    },
    {
      icon: <ThumbsUp className="w-7 h-7" />,
      accent: '#BBFF00',
      heading: t.whyEv.reliability.heading,
      desc:    t.whyEv.reliability.desc,
      stat: { val: 45, prefix: '', suffix: '°C+ rated', label: 'Temperature rating' },
    },
  ]

  return (
    <div ref={ref} className="min-h-screen pt-28 pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <p className="text-xs font-semibold text-accent tracking-widest uppercase mb-2">The Numbers</p>
        <h1 className="font-space font-bold text-4xl sm:text-5xl text-white mb-4">{t.whyEv.title}</h1>
        <p className="text-muted max-w-xl mx-auto">{t.whyEv.sub}</p>
      </div>

      <div className="why-cards grid sm:grid-cols-2 gap-6 mb-20">
        {cards.map((c) => (
          <div
            key={c.heading}
            className="why-card p-8 rounded-2xl"
            style={{ background: '#0D0D14', border: `1px solid ${c.accent}18` }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
              style={{ background: `${c.accent}15`, color: c.accent }}
            >
              {c.icon}
            </div>
            <h3 className="font-space font-bold text-xl text-white mb-3">{c.heading}</h3>
            <p className="text-muted text-sm leading-relaxed mb-6">{c.desc}</p>
            <div>
              <AnimatedCounter
                target={c.stat.val}
                prefix={c.stat.prefix}
                suffix={c.stat.suffix}
                className="text-3xl font-space font-extrabold"
                color={c.accent}
              />
              <div className="text-xs text-muted mt-1">{c.stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Cost comparison table */}
      <div className="mb-20 rounded-2xl overflow-hidden" style={{ background: '#0D0D14', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="p-6 border-b border-white/5">
          <h2 className="font-space font-bold text-2xl text-white">Cost Per Kilometre</h2>
          <p className="text-muted text-sm mt-1">Based on average Pakistan fuel/electricity prices</p>
        </div>
        {[
          { label: 'Petrol Motorbike',   cost: '₨ 10–15 / km', color: '#FF4466', width: '90%' },
          { label: 'Electric Scooter',   cost: '₨ 1–2 / km',   color: '#00FFCC', width: '12%' },
        ].map((row) => (
          <div key={row.label} className="px-6 py-5 border-b border-white/5">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-white font-medium">{row.label}</span>
              <span style={{ color: row.color }} className="font-bold">{row.cost}</span>
            </div>
            <div className="h-2 rounded-full bg-white/5 overflow-hidden">
              <div className="h-full rounded-full transition-all duration-1000" style={{ width: row.width, background: row.color }} />
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Link href="/scooters">
          <Button size="lg">See All Models</Button>
        </Link>
      </div>
    </div>
  )
}
