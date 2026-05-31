'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useI18n } from '@/lib/i18n'

gsap.registerPlugin(ScrollTrigger)

export default function BrandSection() {
  const { t } = useI18n()
  const ref   = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.from('.brand-card', {
      scrollTrigger: { trigger: ref.current, start: 'top 75%' },
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 0.8,
      ease: 'power2.out',
    })
  }, { scope: ref })

  return (
    <section ref={ref} className="py-24 bg-[#060608]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-center font-space font-bold text-3xl sm:text-4xl text-white mb-14">
          {t.brands.heading}
        </h2>

        <div className="grid sm:grid-cols-2 gap-6">
          {/* Yadea */}
          <div
            className="brand-card relative p-8 rounded-2xl overflow-hidden group cursor-default"
            style={{
              background: 'linear-gradient(135deg, #0D0D14, #081418)',
              border: '1px solid rgba(0,255,204,0.12)',
            }}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at top left, rgba(0,255,204,0.06), transparent 70%)' }}
            />
            <div className="relative z-10">
              <div className="text-xs text-accent font-semibold tracking-widest uppercase mb-3">Yadea</div>
              <h3 className="text-2xl font-space font-bold text-white mb-4">TTFAR Technology</h3>
              <p className="text-muted leading-relaxed text-sm">{t.brands.yadea}</p>
              <div className="mt-6 flex gap-4">
                {['LFP Battery', 'TTFAR 3.0', '3× Lifespan'].map((tag) => (
                  <span key={tag} className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/15">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Evee */}
          <div
            className="brand-card relative p-8 rounded-2xl overflow-hidden group cursor-default"
            style={{
              background: 'linear-gradient(135deg, #0D1400, #080D10)',
              border: '1px solid rgba(187,255,0,0.12)',
            }}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at top left, rgba(187,255,0,0.06), transparent 70%)' }}
            />
            <div className="relative z-10">
              <div className="text-xs text-accent2 font-semibold tracking-widest uppercase mb-3">Evee</div>
              <h3 className="text-2xl font-space font-bold text-white mb-4">Graphene Battery</h3>
              <p className="text-muted leading-relaxed text-sm">{t.brands.evee}</p>
              <div className="mt-6 flex gap-4">
                {['Graphene', 'Made in Pakistan', '24-Mo Warranty'].map((tag) => (
                  <span key={tag} className="text-xs px-3 py-1 rounded-full bg-accent2/10 text-accent2 border border-accent2/15">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
