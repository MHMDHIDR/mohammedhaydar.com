'use client'
import { Link as ScrollLink } from 'react-scroll'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { RiCloseLine } from 'react-icons/ri'
import { useSession } from 'next-auth/react'
import NavMenu from './NavMenu'
import { SignInBtn, SignOutBtn } from './AuthButtons'
import { limitWords } from '@/lib/abstractText'
import { ADMIN_EMAIL } from '@/constants'

type MobileNavStateProps = {
  changeState: (isFull: boolean) => void
}

const MobileNavigation = ({ changeState }: MobileNavStateProps) => {
  const { data: session } = useSession()

  const pathname = usePathname()
  const checkroute = pathname !== '/' && pathname !== '/blogs/1'

  const handleClick = () => {
    changeState(false)
  }

  return (
    <>
      <button
        className='absolute left-auto z-10 w-10 h-10 p-0 text-3xl text-center rounded-full btn btn-small btn-transparent right-4 top-4'
        onClick={() => changeState(false)}
      >
        <RiCloseLine className='inline' />
      </button>
      <nav className='relative w-full max-h-full overflow-y-auto'>
        <ul className='pl-0 mb-0 list-none'>
          <li className='block'>
            {checkroute ? (
              <Link
                href='/'
                className='relative inline-block py-2 text-lg tracking-wider uppercase cursor-pointer group text-heading before:text-primary'
                onClick={() => handleClick()}
              >
                Home
                <span className='absolute left-0 top-auto inline-block w-full h-px align-middle transition-transform duration-500 origin-top-right scale-0 bottom-5 bg-primary group-hover:origin-top-left group-hover:scale-100'></span>
              </Link>
            ) : (
              <ScrollLink
                activeClass='text-primary'
                to='section-home'
                spy={true}
                smooth='easeInQuad'
                offset={-74}
                duration={1000}
                className='relative inline-block py-2 text-lg tracking-wider uppercase cursor-pointer group text-heading before:text-primary'
                onClick={() => handleClick()}
              >
                Home
                <span className='absolute left-0 top-auto inline-block w-full h-px align-middle transition-transform duration-500 origin-top-right scale-0 bottom-5 bg-primary group-hover:origin-top-left group-hover:scale-100'></span>
              </ScrollLink>
            )}
          </li>
          <li className='block'>
            {checkroute ? (
              <Link
                href='/'
                className='relative inline-block py-2 text-lg tracking-wider uppercase cursor-pointer group text-heading before:text-primary'
                onClick={() => handleClick()}
              >
                About
                <span className='absolute left-0 top-auto inline-block w-full h-px align-middle transition-transform duration-500 origin-top-right scale-0 bottom-5 bg-primary group-hover:origin-top-left group-hover:scale-100'></span>
              </Link>
            ) : (
              <ScrollLink
                activeClass='text-primary'
                to='section-about'
                spy={true}
                smooth='easeInQuad'
                offset={-74}
                duration={1000}
                className='relative inline-block py-2 text-lg tracking-wider uppercase cursor-pointer group text-heading before:text-primary'
                onClick={() => handleClick()}
              >
                About
                <span className='absolute left-0 top-auto inline-block w-full h-px align-middle transition-transform duration-500 origin-top-right scale-0 bottom-5 bg-primary group-hover:origin-top-left group-hover:scale-100'></span>
              </ScrollLink>
            )}
          </li>
          <li className='block'>
            {checkroute ? (
              <Link
                href='/'
                className='relative inline-block py-2 text-lg tracking-wider uppercase cursor-pointer group text-heading before:text-primary'
                onClick={() => handleClick()}
              >
                Resume
                <span className='absolute left-0 top-auto inline-block w-full h-px align-middle transition-transform duration-500 origin-top-right scale-0 bottom-5 bg-primary group-hover:origin-top-left group-hover:scale-100'></span>
              </Link>
            ) : (
              <ScrollLink
                activeClass='text-primary'
                to='section-resume'
                spy={true}
                smooth='easeInQuad'
                offset={-74}
                duration={1000}
                className='relative inline-block py-2 text-lg tracking-wider uppercase cursor-pointer group text-heading before:text-primary'
                onClick={() => handleClick()}
              >
                Resume
                <span className='absolute left-0 top-auto inline-block w-full h-px align-middle transition-transform duration-500 origin-top-right scale-0 bottom-5 bg-primary group-hover:origin-top-left group-hover:scale-100'></span>
              </ScrollLink>
            )}
          </li>
          <li className='block'>
            {checkroute ? (
              <Link
                href='/'
                className='relative inline-block py-2 text-lg tracking-wider uppercase cursor-pointer group text-heading before:text-primary'
                onClick={() => handleClick()}
              >
                Projects
                <span className='absolute left-0 top-auto inline-block w-full h-px align-middle transition-transform duration-500 origin-top-right scale-0 bottom-5 bg-primary group-hover:origin-top-left group-hover:scale-100'></span>
              </Link>
            ) : (
              <ScrollLink
                activeClass='text-primary'
                to='section-portfolios'
                spy={true}
                smooth='easeInQuad'
                offset={-74}
                duration={1000}
                className='relative inline-block py-2 text-lg tracking-wider uppercase cursor-pointer group text-heading before:text-primary'
                onClick={() => handleClick()}
              >
                Projects
                <span className='absolute left-0 top-auto inline-block w-full h-px align-middle transition-transform duration-500 origin-top-right scale-0 bottom-5 bg-primary group-hover:origin-top-left group-hover:scale-100'></span>
              </ScrollLink>
            )}
          </li>
          <li className='block'>
            <Link
              href='/blogs/1'
              className='relative inline-block py-2 text-lg tracking-wider uppercase cursor-pointer group text-heading before:text-primary'
              onClick={() => handleClick()}
            >
              Blog
              <span className='absolute left-0 top-auto inline-block w-full h-px align-middle transition-transform duration-500 origin-top-right scale-0 bottom-5 bg-primary group-hover:origin-top-left group-hover:scale-100'></span>
            </Link>
          </li>
          <li className='block'>
            {checkroute ? (
              <Link
                href='/'
                className='relative inline-block py-2 text-lg tracking-wider uppercase cursor-pointer group text-heading before:text-primary'
                onClick={() => handleClick()}
              >
                Contact
                <span className='absolute left-0 top-auto inline-block w-full h-px align-middle transition-transform duration-500 origin-top-right scale-0 bottom-5 bg-primary group-hover:origin-top-left group-hover:scale-100'></span>
              </Link>
            ) : (
              <ScrollLink
                activeClass='text-primary'
                to='section-contact'
                spy={true}
                smooth='easeInQuad'
                offset={-74}
                duration={1000}
                className='relative inline-block py-2 text-lg tracking-wider uppercase cursor-pointer group text-heading before:text-primary'
                onClick={() => handleClick()}
              >
                Contact
                <span className='absolute left-0 top-auto inline-block w-full h-px align-middle transition-transform duration-500 origin-top-right scale-0 bottom-5 bg-primary group-hover:origin-top-left group-hover:scale-100'></span>
              </ScrollLink>
            )}
          </li>
        </ul>
        <div className='pt-8'>
          {checkroute ? (
            <Link
              href='/'
              className='btn inline-block py-1.5 text-white hover:text-blue-900 rounded-full'
            >
              <span>Hire Me</span>
            </Link>
          ) : (
            <ScrollLink
              activeClass='active'
              to='section-contact'
              spy={true}
              smooth='easeInQuad'
              offset={-74}
              duration={1000}
              className='btn btn-small py-1.5 px-7 text-white hover:text-blue-900 rounded-full'
              onClick={() => handleClick()}
            >
              <span>Hire Me</span>
            </ScrollLink>
          )}
          {session && session.user ? (
            <NavMenu label={`Account`} className='text-black dark:text-white'>
              <span>
                Welcome <strong>{limitWords(session.user.name, 2)}</strong>
              </span>
              {session.user.email == ADMIN_EMAIL && (
                <Link
                  href={`/dashboard`}
                  className='btn hidden sm:block py-1.5 text-white hover:text-blue-900'
                >
                  <span>Dashboard</span>
                </Link>
              )}
              <SignOutBtn />
            </NavMenu>
          ) : (
            <div className='mx-auto my-3 w-fit'>
              <SignInBtn />
            </div>
          )}
        </div>
      </nav>
    </>
  )
}

export default MobileNavigation
