'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { useI18n } from '@/lib/i18n'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { target: 18,      suffix: '',     label: 'models' as const, accent: '#00FFCC' },
  { target: 129,     suffix: '',     label: 'range' as const,  accent: '#BBFF00' },
  { target: 99000,   suffix: '',     label: 'starting' as const, accent: '#00FFCC', prefix: 'PKR ' },
  { target: 24,      suffix: '+',    label: 'warranty' as const, accent: '#BBFF00' },
]

export default function StatsSection() {
  const { t } = useI18n()
  const ref = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.from('.stat-item', {
      scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      opacity: 0, scale: 0.9, stagger: 0.12, duration: 0.6, ease: 'back.out(1.4)',
    })
  }, { scope: ref })

  return (
    <section ref={ref} className="py-24 relative overflow-hidden" style={{ background: '#060608' }}>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(0,255,204,0.05), transparent 70%)',
        }}
      />
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div
              key={s.label}
              className="stat-item text-center p-8 rounded-2xl"
              style={{
                background: '#0D0D14',
                border: `1px solid ${s.accent}22`,
              }}
            >
              <AnimatedCounter
                target={s.target}
                prefix={s.prefix}
                suffix={s.suffix}
                className="block text-4xl sm:text-5xl font-space font-extrabold"
                color={s.accent}
              />
              <p className="text-sm text-muted mt-2">{t.stats[s.label]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
