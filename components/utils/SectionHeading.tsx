'use client'
import type { SectionHeadingProps } from '@/types'

const SectionHeading = ({ title, watermark, animated = true }: SectionHeadingProps) => {
  return (
    <div className='relative overflow-hidden text-center section-heading pb-14'>
      <h2 className='relative z-10 mb-2 uppercase'>{title}</h2>
      <span className='relative z-10 inline-block h-1.5 w-32 overflow-hidden rounded-full bg-primary bg-opacity-20'>
        <span className='absolute left-0 top-0 inline-block h-full w-1.5 animate-lefttoright rounded-full bg-primary'></span>
      </span>
      <span className='absolute z-0 font-bold uppercase transform -translate-x-1/2 pointer-events-none left-1/2 -top-2 text-9xl text-heading opacity-5'>
        {watermark}
      </span>
    </div>
  )
}

export default SectionHeading
