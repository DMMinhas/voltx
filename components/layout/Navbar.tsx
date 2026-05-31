'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const { t, lang, setLang } = useI18n()
  const [open, setOpen]     = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '/',              label: t.nav.home },
    { href: '/scooters',      label: t.nav.scooters },
    { href: '/compare',       label: t.nav.compare },
    { href: '/why-ev',        label: t.nav.whyEv },
    { href: '/find-dealer',   label: t.nav.findDealer },
    { href: '/about',         label: t.nav.about },
  ]

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-[#060608]/90 backdrop-blur-xl border-b border-white/5 py-3'
          : 'bg-transparent py-5',
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/">
          <Image src="/images/logo1.png" alt="VOLTx" width={100} height={36} priority />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={cn(
                  'px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
                  pathname === l.href
                    ? 'text-accent'
                    : 'text-white/60 hover:text-white',
                )}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Language toggle */}
          <button
            onClick={() => setLang(lang === 'en' ? 'ur' : 'en')}
            className="text-xs font-medium px-3 py-1.5 rounded-full border border-white/10 text-white/60 hover:border-accent/50 hover:text-accent transition-colors"
          >
            {lang === 'en' ? 'اردو' : 'EN'}
          </button>

          <Link
            href="/book-test-ride"
            className="px-4 py-2 text-sm font-semibold rounded-full bg-accent text-black hover:bg-accent/90 transition-colors"
          >
            {t.nav.bookRide}
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          className="lg:hidden p-2 text-white/70 hover:text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-[#0D0D10]/95 backdrop-blur-xl border-t border-white/5 px-4 py-4 flex flex-col gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={cn(
                'px-3 py-2.5 rounded-lg text-sm font-medium',
                pathname === l.href ? 'text-accent bg-accent/10' : 'text-white/70 hover:text-white',
              )}
            >
              {l.label}
            </Link>
          ))}
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => { setLang(lang === 'en' ? 'ur' : 'en'); setOpen(false) }}
              className="flex-1 text-sm py-2 rounded-lg border border-white/10 text-white/60"
            >
              {lang === 'en' ? 'اردو' : 'English'}
            </button>
            <Link
              href="/book-test-ride"
              onClick={() => setOpen(false)}
              className="flex-1 text-sm py-2 rounded-lg bg-accent text-black font-semibold text-center"
            >
              {t.nav.bookRide}
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
