'use client'
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Scroll from 'react-scroll'
import Footer from './Footer'
import Header from './Header'
import { RiArrowUpSLine } from 'react-icons/ri'
import useEventListener from '@/hooks/useEventListener'
import { SessionProvider } from 'next-auth/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ParallaxProvider } from 'react-scroll-parallax'
import { AppProvider } from '@/context/appContext'
import { ToastContainer } from 'react-toastify'

const Layout = ({
  children,
  blurred
}: {
  children: React.ReactNode
  blurred?: boolean
}): JSX.Element => {
  const [backToTop, setBackToTop] = useState(false)

  const scroll = Scroll.animateScroll

  const isVisible = () => {
    const scrollTop = window.scrollY
    scrollTop > 500 ? setBackToTop(true) : setBackToTop(false)
  }

  useEventListener('scroll', isVisible)

  const queryClientRef = useRef<QueryClient | undefined>()

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient()
  }

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClientRef.current}>
        <ParallaxProvider>
          <AppProvider>
            <div
              className={`wrapper relative min-h-screen w-full bg-grey ${
                blurred ? 'blurredBg' : ''
              }`}
            >
              <Header />
              <main
                className={`page-content relative bg-grey bg-opacity-95 ${
                  blurred ? 'backdrop-blur-lg backdrop-filter' : ''
                }`}
              >
                <div className='fixed top-0 left-0 z-20 flex justify-around w-full h-screen bglines'>
                  <span className='border-r border-white border-opacity-5'></span>
                  <span className='border-r border-white border-opacity-5'></span>
                  <span className='border-r border-white border-opacity-5'></span>
                  <span className='border-r border-white border-opacity-5'></span>
                  <span className='border-r border-white border-opacity-5'></span>
                </div>
                <div className='relative z-30 min-h-screen sitedata'>{children}</div>
              </main>
              <Footer />
              <motion.button
                initial={{
                  opacity: 0,
                  x: 1000
                }}
                animate={{
                  opacity: backToTop ? 1 : 0,
                  x: backToTop ? 0 : 1000
                }}
                className='btn fixed bottom-12 left-auto top-auto right-7 z-30 rounded-full p-2.5 text-xl'
                aria-label='Scroll To The Top'
                onClick={() => scroll.scrollToTop()}
              >
                <RiArrowUpSLine />
              </motion.button>
            </div>
          </AppProvider>
          <ToastContainer />
          <ReactQueryDevtools initialIsOpen={false} />
        </ParallaxProvider>
      </QueryClientProvider>
    </SessionProvider>
  )
}

export default Layout
