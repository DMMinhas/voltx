'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Zap } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import { Button } from '@/components/ui/Button'

gsap.registerPlugin(ScrollTrigger)

export default function CTASection() {
  const { t } = useI18n()
  const ref   = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.from('.cta-content', {
      scrollTrigger: { trigger: ref.current, start: 'top 75%' },
      opacity: 0, y: 50, duration: 0.9, ease: 'power2.out',
    })
  }, { scope: ref })

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(0,255,204,0.07), transparent 70%)',
        }}
      />
      <div className="bg-grid absolute inset-0 opacity-30" />

      <div className="relative z-10 cta-content max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-accent/15 border border-accent/20 flex items-center justify-center mx-auto mb-8">
          <Zap className="w-8 h-8 text-accent" />
        </div>
        <h2 className="font-space font-extrabold text-4xl sm:text-5xl text-white mb-5 leading-tight">
          {t.cta.heading}
        </h2>
        <p className="text-muted text-lg mb-10">{t.cta.sub}</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/book-test-ride">
            <Button size="lg">{t.cta.btn1}</Button>
          </Link>
          <Link href="/find-dealer">
            <Button size="lg" variant="outline">{t.cta.btn2}</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
