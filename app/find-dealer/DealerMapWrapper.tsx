'use client'

import dynamic from 'next/dynamic'
import type { Dealer } from '@/types'

const DealerMap = dynamic(() => import('./DealerMap'), { ssr: false })

export default function DealerMapWrapper({ dealers }: { dealers: Dealer[] }) {
  return <DealerMap dealers={dealers} />
}
