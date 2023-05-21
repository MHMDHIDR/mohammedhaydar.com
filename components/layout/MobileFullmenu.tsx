import Link from 'next/link'
import { RiCloseLine } from 'react-icons/ri'
import { Logo } from '@/components/utils'

type FullMenuProps = {
  fullMenuHandler: (isFull: boolean) => void
}

const MobileFullmenu = ({ fullMenuHandler }: FullMenuProps) => {
  return (
    <>
      <button
        className='btn btn-small btn-transparent absolute left-auto right-4 top-4 z-10 h-10 w-10 rounded-full p-0 text-center text-3xl'
        onClick={() => fullMenuHandler(false)}
      >
        <RiCloseLine className='inline' />
      </button>
      <div className='sidenavmobile flex h-full flex-col justify-between p-7 text-center'>
        <Logo url='/homepage1' />
        <nav className='sidenav-mobilmenu relative max-h-full w-full overflow-y-auto'>
          <ul className='mb-0 list-none pl-0'>
            <li className='block'>
              <Link
                href='/homepage1'
                className='group relative inline-block cursor-pointer overflow-hidden py-2 text-lg uppercase tracking-wider text-heading before:text-primary'
                onClick={() => fullMenuHandler(false)}
              >
                Home
                <span className='absolute bottom-5 left-0 top-auto inline-block h-px w-full origin-top-right scale-0 bg-primary align-middle transition-transform duration-500 group-hover:origin-top-left group-hover:scale-100'></span>
              </Link>
            </li>
            <li className='block'>
              <Link
                href='/about'
                className='group relative inline-block cursor-pointer overflow-hidden py-2 text-lg uppercase tracking-wider text-heading before:text-primary'
                onClick={() => fullMenuHandler(false)}
              >
                About
                <span className='absolute bottom-5 left-0 top-auto inline-block h-px w-full origin-top-right scale-0 bg-primary align-middle transition-transform duration-500 group-hover:origin-top-left group-hover:scale-100'></span>
              </Link>
            </li>
            <li className='block'>
              <Link
                href='/resume'
                className='group relative inline-block cursor-pointer overflow-hidden py-2 text-lg uppercase tracking-wider text-heading before:text-primary'
                onClick={() => fullMenuHandler(false)}
              >
                Resume
                <span className='absolute bottom-5 left-0 top-auto inline-block h-px w-full origin-top-right scale-0 bg-primary align-middle transition-transform duration-500 group-hover:origin-top-left group-hover:scale-100'></span>
              </Link>
            </li>
            <li className='block'>
              <Link
                href='/works'
                className='group relative inline-block cursor-pointer overflow-hidden py-2 text-lg uppercase tracking-wider text-heading before:text-primary'
                onClick={() => fullMenuHandler(false)}
              >
                Works
                <span className='absolute bottom-5 left-0 top-auto inline-block h-px w-full origin-top-right scale-0 bg-primary align-middle transition-transform duration-500 group-hover:origin-top-left group-hover:scale-100'></span>
              </Link>
            </li>
            <li className='block'>
              <Link
                href='/posts/1'
                className='group relative inline-block cursor-pointer overflow-hidden py-2 text-lg uppercase tracking-wider text-heading before:text-primary'
                onClick={() => fullMenuHandler(false)}
              >
                Blogs
                <span className='absolute bottom-5 left-0 top-auto inline-block h-px w-full origin-top-right scale-0 bg-primary align-middle transition-transform duration-500 group-hover:origin-top-left group-hover:scale-100'></span>
              </Link>
            </li>
            <li className='block'>
              <Link
                href='/contact'
                className='group relative inline-block cursor-pointer overflow-hidden py-2 text-lg uppercase tracking-wider text-heading before:text-primary'
                onClick={() => fullMenuHandler(false)}
              >
                Contact
                <span className='absolute bottom-5 left-0 top-auto inline-block h-px w-full origin-top-right scale-0 bg-primary align-middle transition-transform duration-500 group-hover:origin-top-left group-hover:scale-100'></span>
              </Link>
            </li>
          </ul>
        </nav>
        <p className=''>
          <span className='whitespace-nowrap'>&copy; {new Date().getFullYear()} </span>
          <Link
            href='/'
            className='font-medium text-heading no-underline hover:text-primary'
          >
            Mohammed Haydar
          </Link>
        </p>
      </div>
    </>
  )
}

export default MobileFullmenu
