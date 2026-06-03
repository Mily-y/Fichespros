/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Optimisation images
  images: {
    domains: [],
    formats: ['image/webp', 'image/avif'],
  },

  // Headers sécurité et performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
      {
        // Cache long pour les assets statiques
        source: '/(.*)\\.(ico|png|jpg|jpeg|gif|svg|woff|woff2)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  },

  // Compression
  compress: true,

  // PWA — service worker (optionnel avec next-pwa)
  // Pour activer : npm install next-pwa et décommenter
  // ...withPWA({ dest: 'public', disable: process.env.NODE_ENV === 'development' })
}

module.exports = nextConfig
