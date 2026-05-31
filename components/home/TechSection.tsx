'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Battery, Zap, Cpu } from 'lucide-react'
import { useI18n } from '@/lib/i18n'

gsap.registerPlugin(ScrollTrigger)

export default function TechSection() {
  const { t } = useI18n()
  const ref   = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.from('.tech-text', {
      scrollTrigger: { trigger: ref.current, start: 'top 75%' },
      opacity: 0, x: -60, duration: 0.9, ease: 'power2.out',
    })
    gsap.from('.tech-card', {
      scrollTrigger: { trigger: '.tech-cards', start: 'top 80%' },
      opacity: 0, y: 50, stagger: 0.15, duration: 0.7, ease: 'power2.out',
    })
  }, { scope: ref })

  const cards = [
    {
      icon: <Battery className="w-6 h-6" />,
      accent: '#00FFCC',
      title: t.tech.ttfar.title,
      desc:  t.tech.ttfar.desc,
    },
    {
      icon: <Zap className="w-6 h-6" />,
      accent: '#BBFF00',
      title: t.tech.graphene.title,
      desc:  t.tech.graphene.desc,
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      accent: '#00FFCC',
      title: t.tech.motors.title,
      desc:  t.tech.motors.desc,
    },
  ]

  return (
    <section ref={ref} className="py-24" style={{ background: '#08080E' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="tech-text mb-14">
          <p className="text-xs font-semibold text-accent tracking-widest uppercase mb-2">Technology</p>
          <h2 className="font-space font-bold text-3xl sm:text-4xl text-white max-w-xl">
            {t.tech.heading}
          </h2>
          <p className="text-muted mt-3 max-w-lg">{t.tech.sub}</p>
        </div>

        <div className="tech-cards grid sm:grid-cols-3 gap-6">
          {cards.map((c) => (
            <div
              key={c.title}
              className="tech-card p-7 rounded-2xl group hover:-translate-y-1 transition-transform duration-300"
              style={{
                background: '#0D0D14',
                border: `1px solid ${c.accent}20`,
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: `${c.accent}15`, color: c.accent }}
              >
                {c.icon}
              </div>
              <h3 className="font-space font-bold text-white text-lg mb-3">{c.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
