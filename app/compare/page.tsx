import CompareTable from '@/components/compare/CompareTable'

export const metadata = { title: 'Compare Models — VOLTx' }

export default function ComparePage() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="mb-10">
        <p className="text-xs font-semibold text-accent tracking-widest uppercase mb-2">Side by Side</p>
        <h1 className="font-space font-bold text-4xl sm:text-5xl text-white">Compare Models</h1>
        <p className="text-muted mt-2">Select up to 3 scooters to find your perfect match.</p>
      </div>
      <CompareTable />
    </div>
  )
}
