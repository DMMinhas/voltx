import Hero          from '@/components/home/Hero'
import BrandSection  from '@/components/home/BrandSection'
import FleetScroll   from '@/components/home/FleetScroll'
import StatsSection  from '@/components/home/StatsSection'
import TechSection   from '@/components/home/TechSection'
import CTASection    from '@/components/home/CTASection'

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandSection />
      <FleetScroll />
      <StatsSection />
      <TechSection />
      <CTASection />
    </>
  )
}
