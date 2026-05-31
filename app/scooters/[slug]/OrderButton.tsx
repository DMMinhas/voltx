'use client'

import { useState } from 'react'
import type { Scooter } from '@/types'
import OrderForm from '@/components/forms/OrderForm'

export default function OrderButton({ scooter }: { scooter: Scooter }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex-1 py-3.5 rounded-full bg-accent text-black text-sm font-bold hover:bg-accent/90 transition-colors"
      >
        Buy Now
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div
            className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl"
            style={{ background: '#0D0D14', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-space font-bold text-xl text-white">
                  Order — {scooter.brand} {scooter.name}
                </h2>
                <button
                  onClick={() => setOpen(false)}
                  className="text-muted hover:text-white text-xl leading-none"
                >
                  ×
                </button>
              </div>
              <OrderForm preselectedModel={`${scooter.brand} ${scooter.name}`} preselectedColors={scooter.colors} onSuccess={() => setOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
