'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import type { Dealer } from '@/types'

// Fix Leaflet default icon in Next.js
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
})

export default function DealerMap({ dealers }: { dealers: Dealer[] }) {
  return (
    <MapContainer
      center={[30.3753, 69.3451]}
      zoom={5}
      style={{ width: '100%', height: '100%' }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {dealers.map((d) => (
        <Marker key={d.id} position={[d.lat, d.lng]}>
          <Popup>
            <div style={{ minWidth: 180 }}>
              <strong>{d.name}</strong>
              <br />
              {d.address}
              <br />
              <a href={`tel:${d.phone}`} style={{ color: '#00FFCC' }}>{d.phone}</a>
              <br />
              <small>{d.brands.join(' · ')}</small>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
