'use client'

import { useState, useMemo } from 'react'
import { scooters } from '@/data/scooters'
import ScooterCard from '@/components/scooters/ScooterCard'
import FilterBar, { type SortKey } from '@/components/scooters/FilterBar'
import { useI18n } from '@/lib/i18n'

export default function ScootersPage() {
  const { t } = useI18n()
  const [brand,    setBrand]    = useState('')
  const [category, setCategory] = useState('')
  const [sort,     setSort]     = useState<SortKey>('priceAsc')

  const filtered = useMemo(() => {
    let list = [...scooters]
    if (brand)    list = list.filter((s) => s.brand    === brand)
    if (category) list = list.filter((s) => s.category === category)

    switch (sort) {
      case 'priceAsc':  list.sort((a, b) => a.price.min - b.price.min);   break
      case 'priceDesc': list.sort((a, b) => b.price.min - a.price.min);   break
      case 'rangeDesc': list.sort((a, b) => b.specs.range - a.specs.range); break
      case 'speedDesc': list.sort((a, b) => b.specs.topSpeed - a.specs.topSpeed); break
    }
    return list
  }, [brand, category, sort])

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-semibold text-accent tracking-widest uppercase mb-2">VOLTx Fleet</p>
        <h1 className="font-space font-bold text-4xl sm:text-5xl text-white">{t.scooters.title}</h1>
        <p className="text-muted mt-2">{t.scooters.sub}</p>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <FilterBar
          brand={brand} category={category} sort={sort}
          onBrand={setBrand} onCategory={setCategory} onSort={setSort}
        />
        <p className="text-xs text-muted mt-3">{filtered.length} models</p>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((s) => (
          <ScooterCard key={s.id} scooter={s} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-24 text-muted">
          No models match your filters.
        </div>
      )}
    </div>
  )
}
