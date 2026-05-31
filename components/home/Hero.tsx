'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ChevronDown, Zap } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

export default function Hero() {
  const { t } = useI18n()
  const containerRef = useRef<HTMLDivElement>(null)
  const h1Ref        = useRef<HTMLHeadingElement>(null)
  const subRef       = useRef<HTMLParagraphElement>(null)
  const ctaRef       = useRef<HTMLDivElement>(null)
  const imgRef       = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from('.hero-badge',  { opacity: 0, y: 20, duration: 0.6 })
        .from(h1Ref.current!.children, {
          opacity: 0, y: 60, stagger: 0.12, duration: 0.9,
        }, '-=0.2')
        .from(subRef.current, { opacity: 0, y: 30, duration: 0.7 }, '-=0.5')
        .from(ctaRef.current, { opacity: 0, y: 20, duration: 0.6 }, '-=0.4')
        .from(imgRef.current, { opacity: 0, x: 80, duration: 1.0 }, '-=0.8')
        .from('.hero-scroll',  { opacity: 0, duration: 0.5 }, '-=0.2')
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-grid pt-20"
    >
      {/* Radial glow background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 70% 50%, rgba(0,255,204,0.08) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 20% 80%, rgba(187,255,0,0.05) 0%, transparent 60%)',
        }}
      />

      {/* Animated particles */}
      <Particles />

      {/* Announcement banner */}
      <div className="absolute top-20 inset-x-0 z-10 flex justify-center px-4 pt-4">
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium"
          style={{
            background: 'rgba(0,255,204,0.08)',
            border: '1px solid rgba(0,255,204,0.25)',
            color: '#00FFCC',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shrink-0" />
          Meet us at GreenTech Lahore&nbsp;&nbsp;|&nbsp;&nbsp;9–11 June&nbsp;&nbsp;|&nbsp;&nbsp;Stand 05.541
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full grid lg:grid-cols-2 gap-12 items-center py-20">
        {/* Text side */}
        <div>
          <div className="hero-badge mb-6">
            <Badge variant="accent">
              <Zap className="w-3 h-3" />
              {t.hero.badge}
            </Badge>
          </div>

          <h1
            ref={h1Ref}
            className="font-space font-extrabold leading-none tracking-tight"
          >
            <span className="block text-5xl sm:text-6xl lg:text-7xl text-white">
              {t.hero.headline1}
            </span>
            <span
              className="block text-5xl sm:text-6xl lg:text-7xl glow-text"
              style={{ color: '#00FFCC' }}
            >
              {t.hero.headline2}
            </span>
          </h1>

          <p ref={subRef} className="mt-6 text-base sm:text-lg text-muted max-w-md leading-relaxed">
            {t.hero.sub}
          </p>

          <div ref={ctaRef} className="mt-8 flex flex-wrap gap-3">
            <Link href="/scooters">
              <Button size="lg">{t.hero.cta1}</Button>
            </Link>
            <Link href="/book-test-ride">
              <Button size="lg" variant="outline">{t.hero.cta2}</Button>
            </Link>
          </div>

          {/* Stats strip */}
          <div className="mt-12 flex gap-8">
            {[
              { val: '18', label: 'Models' },
              { val: '120km', label: 'Max Range' },
              { val: '99K', label: 'Starting PKR' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-space font-bold text-accent">{s.val}</div>
                <div className="text-xs text-muted mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scooter image side */}
        <div ref={imgRef} className="relative flex items-center justify-center">
          <div
            className="animate-float relative w-full max-w-lg aspect-[16/10] rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #0D0D1A, #001A14)',
              border: '1px solid rgba(0,255,204,0.15)',
              boxShadow: '0 0 80px rgba(0,255,204,0.12)',
            }}
          >
            {/* Placeholder hero visual — replace src with actual scooter image */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Zap className="w-16 h-16 text-accent/40 mb-3" />
              <p className="text-xs text-muted/60">Hero scooter image</p>
              <p className="text-xs text-muted/40">Replace with /public/images/hero-scooter.png</p>
            </div>

            {/* Overlay gradient */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(0,255,204,0.05), transparent 60%)',
              }}
            />

            {/* Accent dots */}
            <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-accent animate-pulse" />
            <div className="absolute bottom-6 left-6 w-1.5 h-1.5 rounded-full bg-accent2 animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>

          {/* Floating spec card */}
          <div
            className="absolute -bottom-4 -left-4 glass rounded-xl px-4 py-3 flex items-center gap-3"
            style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}
          >
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
              <Zap className="w-4 h-4 text-accent" />
            </div>
            <div>
              <div className="text-xs text-muted">Top Range</div>
              <div className="text-sm font-bold text-white">129 km / charge</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted/50">
        <span className="text-xs tracking-widest uppercase">{t.hero.scrollHint}</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>
  )
}

function Particles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-accent"
          style={{
            width:  `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            top:    `${Math.random() * 100}%`,
            left:   `${Math.random() * 100}%`,
            opacity: Math.random() * 0.3 + 0.05,
            animation: `float ${Math.random() * 6 + 4}s ease-in-out ${Math.random() * 4}s infinite`,
          }}
        />
      ))}
    </div>
  )
}
