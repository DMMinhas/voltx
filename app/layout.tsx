import type { Metadata } from 'next'
import './globals.css'
import { I18nProvider } from '@/lib/i18n'
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'VOLTx — Pakistan Rides Electric',
  description:
    'Discover 18 electric scooters from Yadea and Evee. Buy, compare, and book a free test ride. Pakistan\'s premier EV destination.',
  keywords: ['electric scooter Pakistan', 'Yadea Pakistan', 'Evee Pakistan', 'EV Pakistan', 'VOLTx'],
  openGraph: {
    title: 'VOLTx — Pakistan Rides Electric',
    description: 'Pakistan\'s premier electric scooter destination. Yadea + Evee. 18 models. Starting from PKR 120,000.',
    type: 'website',
    locale: 'en_PK',
    siteName: 'VOLTx',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <I18nProvider>
          <SmoothScrollProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </SmoothScrollProvider>
        </I18nProvider>
      </body>
    </html>
  )
}
