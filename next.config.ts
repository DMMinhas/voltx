import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'yadea.com.pk' },
      { protocol: 'https', hostname: 'www.yadea.com.pk' },
      { protocol: 'http',  hostname: 'yadea.com.pk' },
      { protocol: 'https', hostname: 'evee.pk' },
      { protocol: 'https', hostname: 'www.evee.pk' },
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
}

export default nextConfig
