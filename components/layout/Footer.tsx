'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Facebook, Youtube, Mail, Phone } from 'lucide-react'
import { useI18n } from '@/lib/i18n'

export default function Footer() {
  const { t } = useI18n()

  const quickLinks = [
    { href: '/scooters',    label: t.nav.scooters },
    { href: '/compare',     label: t.nav.compare },
    { href: '/why-ev',      label: t.nav.whyEv },
    { href: '/find-dealer', label: t.nav.findDealer },
    { href: '/about',       label: t.nav.about },
  ]

  return (
    <footer className="bg-[#060608] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="mb-4 inline-block">
              <Image src="/images/logo1.png" alt="VOLTx" width={80} height={28} />
            </Link>
            <p className="text-sm text-muted leading-relaxed mb-5">{t.footer.tagline}</p>
            <div className="flex gap-3">
              {[Instagram, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-white/50 hover:text-accent hover:border-accent/40 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">{t.footer.quickLinks}</h4>
            <ul className="flex flex-col gap-2">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-muted hover:text-accent transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">{t.footer.support}</h4>
            <ul className="flex flex-col gap-2">
              <li>
                <Link href="/book-test-ride" className="text-sm text-muted hover:text-accent transition-colors">
                  {t.nav.bookRide}
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-muted hover:text-accent transition-colors">
                  {t.footer.privacy}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted hover:text-accent transition-colors">
                  {t.footer.terms}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">{t.footer.contact}</h4>
            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-2 text-sm text-muted">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                +92 300 0000000
              </li>
              <li className="flex items-center gap-2 text-sm text-muted">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                hello@voltx.pk
              </li>
            </ul>
          </div>
        </div>

        <div className="accent-line mt-12 mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted">
          <p>© {new Date().getFullYear()} VOLTx. {t.footer.rights}</p>
          <p className="text-center">{t.footer.attribution}</p>
        </div>
      </div>
    </footer>
  )
}
