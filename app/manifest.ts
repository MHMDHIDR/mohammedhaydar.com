import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Mohammed Haydar | Full Stack Engineer',
    short_name: 'Mohammed Haydar',
    description:
      "I'm a full stack engineer based in Coventry, UK. I build web applications with React, Next.js, and Node.js.",
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#2563eb',
    icons: [
      {
        src: '/logo.svg',
        sizes: 'any',
        type: 'image/svg',
      },
      {
        src: '/icon-192x128.png',
        sizes: '192x128',
        type: 'image/png',
      },
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-256x171.png',
        sizes: '256x171',
        type: 'image/png',
      },
      {
        src: '/icon-256x256.png',
        sizes: '256x256',
        type: 'image/png',
      },
      {
        src: '/icon-383x256.png',
        sizes: '383x256',
        type: 'image/png',
      },
      {
        src: '/icon-512x342.png',
        sizes: '512x342',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
