import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import Header from '@/components/Header'
import PageTransition from '@/components/PageTransition'
import StairTransition from '@/components/StairTransition'
import { Toaster } from '@/components/ui/toaster'
import Footer from '@/components/Footer'
import { Suspense } from 'react'
import { SessionProvider } from 'next-auth/react'

export const metadata: Metadata = {
  title: 'Mohammed Ibrahim | A Full Stack Developer',
  description:
    "I'm a full stack developer based in Coventry, UK. I build web applications with React, Next.js, and Node.js.",
  icons: {
    icon: [{ url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' }],
    apple: [
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-256x256.png', sizes: '256x256', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
}

const raleway = localFont({
  src: './fonts/Raleway.woff2',
  variable: '--font-raleway',
  weight: '100 900',
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${raleway.variable} antialiased text-white/80`}>
        <SessionProvider>
          <Header />
        </SessionProvider>
        <StairTransition />
        <PageTransition>
          <Suspense>{children}</Suspense>
        </PageTransition>
        <Toaster />
        <Footer />
      </body>
    </html>
  )
}
