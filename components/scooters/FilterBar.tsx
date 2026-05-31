'use client'

import { useI18n } from '@/lib/i18n'

export type SortKey = 'priceAsc' | 'priceDesc' | 'rangeDesc' | 'speedDesc'

interface FilterBarProps {
  brand:    string
  category: string
  sort:     SortKey
  onBrand:    (v: string) => void
  onCategory: (v: string) => void
  onSort:     (v: SortKey) => void
}

const SELECT_CLASS =
  'bg-[#0D0D14] border border-white/10 text-white text-sm rounded-xl px-3 py-2 focus:outline-none focus:border-accent/50 transition-colors'

export default function FilterBar({ brand, category, sort, onBrand, onCategory, onSort }: FilterBarProps) {
  const { t } = useI18n()

  return (
    <div className="flex flex-wrap gap-3 items-center">
      {/* Brand */}
      <select
        value={brand}
        onChange={(e) => onBrand(e.target.value)}
        className={SELECT_CLASS}
        aria-label={t.scooters.filter.brand}
      >
        <option value="">{t.scooters.filter.brand}: {t.scooters.filter.all}</option>
        <option value="Yadea">Yadea</option>
        <option value="Evee">Evee</option>
      </select>

      {/* Category */}
      <select
        value={category}
        onChange={(e) => onCategory(e.target.value)}
        className={SELECT_CLASS}
        aria-label={t.scooters.filter.category}
      >
        <option value="">{t.scooters.filter.category}: {t.scooters.filter.all}</option>
        {(['budget', 'commuter', 'premium', 'performance'] as const).map((c) => (
          <option key={c} value={c}>{t.scooters.categories[c]}</option>
        ))}
      </select>

      {/* Sort */}
      <select
        value={sort}
        onChange={(e) => onSort(e.target.value as SortKey)}
        className={SELECT_CLASS}
        aria-label={t.scooters.filter.sortBy}
      >
        <option value="priceAsc">{t.scooters.filter.priceAsc}</option>
        <option value="priceDesc">{t.scooters.filter.priceDesc}</option>
        <option value="rangeDesc">{t.scooters.filter.rangeDesc}</option>
        <option value="speedDesc">{t.scooters.filter.speedDesc}</option>
      </select>
    </div>
  )
}
