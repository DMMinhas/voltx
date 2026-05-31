import TestRideForm from '@/components/forms/TestRideForm'

export const metadata = { title: 'Book Test Ride — VOLTx' }

export default function BookTestRidePage() {
  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold text-accent tracking-widest uppercase mb-2">Free of Charge</p>
          <h1 className="font-space font-bold text-4xl sm:text-5xl text-white mb-3">Book a Test Ride</h1>
          <p className="text-muted">Experience the electric difference before you decide. No commitment required.</p>
        </div>

        <div
          className="rounded-2xl p-8"
          style={{ background: '#0D0D14', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <TestRideForm />
        </div>
      </div>
    </div>
  )
}
