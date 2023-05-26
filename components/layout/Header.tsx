'use client'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { RiMenuLine } from 'react-icons/ri'
import { Link as ScrollLink } from 'react-scroll'
import Link from 'next/link'
import useEventListener from '@/hooks/useEventListener'
import MobileNavigation from './MobileNavigation'
import Navigation from './Navigation'
import { useSession } from 'next-auth/react'
import { Logo } from '@/components/utils'
import NavMenu from './NavMenu'
import { SignInBtn, SignOutBtn } from './AuthButtons'
import { limitWords } from '@/lib/abstractText'
import { ADMIN_EMAIL } from '@/constants'

const Header = () => {
  const { data: session } = useSession()

  const [sticky, setSticky] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)

  const isSticky = () => {
    const scrollTop = window.scrollY
    scrollTop > 200 ? setSticky(true) : setSticky(false)
  }

  const pathname = usePathname()

  const checkroute = pathname !== '/' && pathname !== '/blogs/1'

  useEventListener('scroll', isSticky)

  return (
    <header
      className={`header top-0 left-0 z-50 h-auto w-full ${
        sticky
          ? 'fixed animate-slidedown border-b border-white border-opacity-20 bg-grey bg-opacity-80 backdrop-blur backdrop-filter'
          : 'absolute'
      }`}
    >
      <div className='container mx-auto py-2.5'>
        <div className='flex items-center justify-between header-inner'>
          <Logo url='/' />
          <div className='block header-mobilenav lg:hidden'>
            <button
              className='px-3 text-3xl btn btn-small btn-transparent'
              onClick={() => setMobileMenu(prev => !prev)}
            >
              <RiMenuLine />
            </button>

            <div
              className={`fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen p-4 text-center bg-grey transition-all duration-500 ${
                mobileMenu ? 'translate-y-0' : 'translate-y-full'
              }`}
            >
              <MobileNavigation changeState={setMobileMenu} />
            </div>
          </div>
          <div className='hidden header-nav lg:block'>
            <Navigation />
          </div>
          <div className='flex md:flex gap-x-3 md:justify-center md:items-center'>
            {checkroute ? (
              <Link
                href='/'
                className='btn hidden sm:block py-1.5 text-white hover:text-blue-900 rounded-full'
              >
                <span>Hire Me</span>
              </Link>
            ) : (
              <ScrollLink
                activeClass='active'
                to={checkroute ? '/' : 'section-contact'}
                spy={true}
                smooth='easeInQuad'
                offset={-74}
                duration={1000}
                className='btn hidden sm:block py-1.5 text-white hover:text-blue-900 rounded-full'
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
              <SignInBtn />
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
