import { SOCIALS } from '@/constants'
import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='mt-10 w-full'>
      <hr className='border-t my-3' />
      <div className='flex items-center p-4 mx-auto'>
        <div className='inline-flex flex-1 gap-x-2'>
          {SOCIALS.filter(social => social.active).map(social => (
            <Link
              key={social.href}
              href={social.href}
              className='opacity-90 hover:opacity-100 rotate-6 hover:rotate-0 transition-transform'
              title={social.linkTitle}
              target='_blank'
              rel='noopener noreferrer'
            >
              <social.icon className='w-6 h-6' />
              <span className='sr-only'>{social.linkTitle}</span>
            </Link>
          ))}
        </div>
        <div className='flex items-center gap-x-2'>
          <span>Copyright © {currentYear}</span>
          <span className='hidden sm:inline'>|</span>
          <span className='hidden sm:inline'>All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}
