import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle, ArrowLeft, ExternalLink } from 'lucide-react'
import { getScooterBySlug, scooters } from '@/data/scooters'
import { formatPKR } from '@/lib/utils'
import SpecTable from '@/components/scooters/SpecTable'
import OrderButton from './OrderButton'

export function generateStaticParams() {
  return scooters.map((s) => ({ slug: s.slug }))
}

export default function ScooterDetailPage({ params }: { params: { slug: string } }) {
  const scooter = getScooterBySlug(params.slug)
  if (!scooter) notFound()

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Back */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8">
        <Link href="/scooters" className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to All Models
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-start">
        {/* Image gallery */}
        <div className="space-y-4">
          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden"
            style={{ background: '#0D0D14', border: '1px solid rgba(255,255,255,0.06)' }}>
            <Image
              src={scooter.images[0]}
              alt={`${scooter.brand} ${scooter.name}`}
              fill
              className="object-cover"
              unoptimized
              priority
            />
          </div>
          {scooter.images.length > 1 && (
            <div className="grid grid-cols-3 gap-3">
              {scooter.images.slice(1).map((img, i) => (
                <div key={i} className="relative aspect-video rounded-xl overflow-hidden"
                  style={{ background: '#0D0D14', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <Image src={img} alt={`${scooter.name} view ${i + 2}`} fill className="object-cover" unoptimized />
                </div>
              ))}
            </div>
          )}

          <a
            href={scooter.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-accent transition-colors mt-1"
          >
            <ExternalLink className="w-3 h-3" />
            Image source: {scooter.brand === 'Yadea' ? 'yadea.com.pk' : 'evee.pk'}
          </a>
        </div>

        {/* Details */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span
              className="text-xs font-semibold px-3 py-1 rounded-full"
              style={{
                background: scooter.brand === 'Yadea' ? 'rgba(0,255,204,0.15)' : 'rgba(187,255,0,0.15)',
                color:      scooter.brand === 'Yadea' ? '#00FFCC' : '#BBFF00',
              }}
            >
              {scooter.brand}
            </span>
            {scooter.isNew && (
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-danger/15 text-danger">New</span>
            )}
          </div>

          <h1 className="font-space font-extrabold text-4xl sm:text-5xl text-white mb-2">{scooter.name}</h1>
          <p className="text-muted text-lg mb-6">{scooter.tagline}</p>

          <div className="mb-8">
            <div className="text-xs text-muted mb-1">Starting from</div>
            <div className="text-4xl font-space font-bold text-accent">{formatPKR(scooter.price.min)}</div>
            {scooter.price.max && (
              <div className="text-sm text-muted">up to {formatPKR(scooter.price.max)}</div>
            )}
          </div>

          <p className="text-muted leading-relaxed mb-8">{scooter.description}</p>

          {/* Colour picker */}
          <div className="mb-8">
            <div className="text-sm font-medium text-white mb-3">Available Colours</div>
            <div className="flex gap-3">
              {scooter.colors.map((c) => (
                <div key={c.hex} className="flex flex-col items-center gap-1.5">
                  <div
                    className="w-8 h-8 rounded-full border-2 border-white/20 cursor-pointer hover:scale-110 transition-transform"
                    style={{ background: c.hex }}
                    title={c.name}
                  />
                  <span className="text-[10px] text-muted text-center max-w-[60px] leading-tight">{c.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex gap-3 mb-10">
            <OrderButton scooter={scooter} />
            <Link
              href="/book-test-ride"
              className="flex-1 py-3.5 rounded-full border border-accent/40 text-accent text-sm font-semibold text-center hover:bg-accent/10 transition-colors"
            >
              Book Test Ride
            </Link>
          </div>

          {/* Specs */}
          <div className="mb-8">
            <div className="text-sm font-semibold text-white mb-4">Specifications</div>
            <SpecTable scooter={scooter} />
          </div>

          {/* Features */}
          <div>
            <div className="text-sm font-semibold text-white mb-4">Key Features</div>
            <ul className="space-y-2">
              {scooter.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-muted">
                  <CheckCircle className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
