'use client'

import Link from 'next/link'
import { Zap, Target, Eye, Users } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import { Button } from '@/components/ui/Button'
import { scooters } from '@/data/scooters'

export default function AboutPage() {
  const { t } = useI18n()
  const yadeaCount = scooters.filter((s) => s.brand === 'Yadea').length
  const eveeCount  = scooters.filter((s) => s.brand === 'Evee').length

  return (
    <div className="min-h-screen pt-28 pb-20">
      {/* Hero */}
      <div
        className="relative py-24 px-4 sm:px-6 text-center overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, rgba(0,255,204,0.05) 0%, transparent 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-2xl bg-accent/15 border border-accent/20 flex items-center justify-center">
            <Zap className="w-10 h-10 text-accent" />
          </div>
        </div>
        <h1 className="font-space font-extrabold text-5xl sm:text-6xl text-white mb-4">
          VOLT<span className="text-accent">x</span>
        </h1>
        <p className="text-xl text-muted max-w-xl mx-auto">
          Pakistan's Electric Future Starts Here.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20">
        {/* Mission & Vision */}
        <div className="grid sm:grid-cols-2 gap-8 mb-20">
          <div className="p-8 rounded-2xl" style={{ background: '#0D0D14', border: '1px solid rgba(0,255,204,0.12)' }}>
            <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center mb-5">
              <Target className="w-6 h-6 text-accent" />
            </div>
            <h2 className="font-space font-bold text-xl text-white mb-3">{t.about.mission}</h2>
            <p className="text-muted leading-relaxed">{t.about.missionText}</p>
          </div>
          <div className="p-8 rounded-2xl" style={{ background: '#0D0D14', border: '1px solid rgba(187,255,0,0.12)' }}>
            <div className="w-12 h-12 rounded-xl bg-accent2/15 flex items-center justify-center mb-5">
              <Eye className="w-6 h-6 text-accent2" />
            </div>
            <h2 className="font-space font-bold text-xl text-white mb-3">{t.about.vision}</h2>
            <p className="text-muted leading-relaxed">{t.about.visionText}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-20">
          {[
            { val: `${yadeaCount + eveeCount}`, label: 'Models Available' },
            { val: '10+', label: 'Cities Covered' },
            { val: '24mo', label: 'Warranty Standard' },
          ].map((s) => (
            <div key={s.label} className="text-center p-6 rounded-2xl" style={{ background: '#0D0D14', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="text-4xl font-space font-extrabold text-accent mb-1">{s.val}</div>
              <div className="text-sm text-muted">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Our Partners */}
        <div className="mb-20">
          <h2 className="font-space font-bold text-2xl text-white mb-8">Our Brand Partners</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                name: 'Yadea', accent: '#00FFCC', models: yadeaCount,
                desc: `World's #1 electric two-wheeler brand. ${yadeaCount} models available exclusively through VOLTx.`,
                url: 'https://www.yadea.com.pk',
              },
              {
                name: 'Evee', accent: '#BBFF00', models: eveeCount,
                desc: `Pakistan's own EV brand. ${eveeCount} models built for local roads, priced for local pockets.`,
                url: 'https://evee.pk',
              },
            ].map((p) => (
              <div key={p.name} className="p-6 rounded-2xl flex gap-5" style={{ background: '#0D0D14', border: `1px solid ${p.accent}20` }}>
                <div className="w-12 h-12 rounded-xl shrink-0 flex items-center justify-center" style={{ background: `${p.accent}15` }}>
                  <span className="font-space font-bold text-sm" style={{ color: p.accent }}>{p.name[0]}</span>
                </div>
                <div>
                  <div className="font-space font-bold text-white mb-1">{p.name}</div>
                  <p className="text-sm text-muted mb-3">{p.desc}</p>
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-xs" style={{ color: p.accent }}>
                    Visit {p.name} →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team placeholder */}
        <div className="text-center mb-16">
          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
            <Users className="w-6 h-6 text-accent" />
          </div>
          <h2 className="font-space font-bold text-2xl text-white mb-3">Built for Pakistan</h2>
          <p className="text-muted max-w-lg mx-auto">
            VOLTx is a team of engineers, riders, and EV enthusiasts who believe Pakistan deserves world-class electric mobility.
          </p>
        </div>

        <div className="text-center">
          <Link href="/scooters">
            <Button size="lg">Explore the Fleet</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
