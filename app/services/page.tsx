'use client'

import React, { useState } from 'react'
import { ArrowUp } from 'lucide-react'
import Link from 'next/link'
import { services } from './services'
import PageLayout from '@/components/PageLayout'
import Title from '@/components/Title'

export const dynamic = 'force-static'

export default function ServicesPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: { clientX: number; clientY: number }) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }

  return (
    <section
      className='min-h-screen w-full py-10 relative bg-black overflow-hidden'
      onMouseMove={handleMouseMove}
    >
      <PageLayout>
        <div
          className='pointer-events-none fixed inset-0'
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(190, 255, 255, 0.1), transparent 40%)`,
          }}
        />

        <div className='max-w-6xl mx-auto px-4'>
          <Title className='text-4xl mb-6'>Services I Provide</Title>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {services.map((service, index) => (
              <Link
                key={index}
                href={`/contact?service=${service.title.replace(' ', '-')}`}
                className='p-6 bg-black/20 border border-white/10 hover:border-white/20 rounded-lg transition-all duration-300 group'
              >
                <div className='flex items-center justify-between mb-4'>
                  <div className='flex items-center gap-4'>
                    <span className='text-5xl font-extrabold text-white/20 group-hover:text-white/10'>
                      {index + 1}
                    </span>
                    <h2 className='text-lg text-white'>{service.title}</h2>
                  </div>
                  <ArrowUp className='rotate-45 text-lightSky/70' />
                </div>
                <p className='text-white/70'>{service.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </PageLayout>
    </section>
  )
}
