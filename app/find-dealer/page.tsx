import { dealers } from '@/data/dealers'
import DealerMapWrapper from './DealerMapWrapper'

export const metadata = { title: 'Find a Dealer — VOLTx' }

export default function FindDealerPage() {
  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-10">
        <p className="text-xs font-semibold text-accent tracking-widest uppercase mb-2">Nationwide Network</p>
        <h1 className="font-space font-bold text-4xl sm:text-5xl text-white">Find a VOLTx Dealer</h1>
        <p className="text-muted mt-2">10 locations across Pakistan. Click a pin for details.</p>
      </div>

      {/* Map */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
        <div className="rounded-2xl overflow-hidden" style={{ height: 480, border: '1px solid rgba(255,255,255,0.06)' }}>
          <DealerMapWrapper dealers={dealers} />
        </div>
      </div>

      {/* Dealer list */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {dealers.map((d) => (
            <div
              key={d.id}
              className="p-6 rounded-2xl"
              style={{ background: '#0D0D14', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="font-space font-bold text-white mb-1">{d.name}</div>
              <div className="text-xs text-accent mb-3">{d.city}</div>
              <p className="text-sm text-muted mb-4">{d.address}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {d.brands.map((b) => (
                  <span
                    key={b}
                    className="text-xs px-2.5 py-1 rounded-full"
                    style={{
                      background: b === 'Yadea' ? 'rgba(0,255,204,0.12)' : 'rgba(187,255,0,0.12)',
                      color:      b === 'Yadea' ? '#00FFCC' : '#BBFF00',
                    }}
                  >
                    {b}
                  </span>
                ))}
              </div>
              <a
                href={`tel:${d.phone}`}
                className="text-sm text-accent hover:underline"
              >
                {d.phone}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
