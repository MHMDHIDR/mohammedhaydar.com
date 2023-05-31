import Image from 'next/image'
import { RiArrowDownLine } from 'react-icons/ri'
import { Link as ScrollLink } from 'react-scroll'
import { SocialIcons } from '@/components/elements'
import { imageLoader, shimmer, toBase64 } from '@/lib/utils'
import { motion } from 'framer-motion'
import { childrenAnimation } from '@/lib/motion'
import ReactTyped from 'react-typed'
import type { HeroSectionProps, informationProps } from '@/types'
import { limitWords } from '@/lib/abstractText'
import { useQuery } from '@tanstack/react-query'
import { getInformation } from '@/sanity/sanity-utils'

const HeroSection = ({ blurred, scroll = true, typed = true }: HeroSectionProps) => {
  const { data } = useQuery<informationProps>(['information'], getInformation)

  if (!data) return null

  return (
    <div className='herosection relative overflow-hidden bg-[url("/images/hero-bg.webp")] bg-cover bg-center bg-no-repeat'>
      {!blurred && (
        <div className='herosection-bg absolute left-0 top-0 h-full w-full'></div>
      )}
      <div
        className={`herosection-content relative z-20 bg-grey-darken ${
          blurred ? 'bg-opacity-20' : 'bg-opacity-90'
        }`}
      >
        <div className='container relative mx-auto'>
          <div className='flex min-h-screen w-full items-center justify-center'>
            <div className='herosection-content w-full py-20 text-center md:w-3/4'>
              <motion.div
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                variants={childrenAnimation}
                className='herosection-imagewrapper relative mb-5 inline-block overflow-hidden rounded-full align-middle'
              >
                <span className='herosection-imageanimation absolute left-0 top-0 z-10 h-full w-full animate-spin rounded-full bg-gradient-to-tr from-primary to-transparent'></span>
                <div className='herosection-image fiximage relative z-20 inline-block h-[150px] w-[150px] overflow-hidden rounded-full border-6 border-primary border-opacity-10 align-middle'>
                  <Image
                    loader={imageLoader}
                    unoptimized={true}
                    src={data.thumbImage}
                    alt={data.fullName}
                    height={150}
                    width={150}
                    className='w-full h-auto'
                    placeholder='blur'
                    draggable={false}
                    blurDataURL={`data:image/svg+xml;base64,${toBase64(
                      shimmer(150, 150)
                    )}`}
                  />
                </div>
              </motion.div>
              <motion.h1
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
                variants={childrenAnimation}
                className='mb-5 text-heading text-2xl sm:text-2xl md:text-4xl'
              >
                <span className='block sm:inline'>Hi, I am</span>{' '}
                {typed ? (
                  <ReactTyped
                    loop
                    typeSpeed={100}
                    backSpeed={20}
                    backDelay={2000}
                    strings={[
                      data.fullName,
                      'Full-stack Developer',
                      'Web Developer',
                      'Web Designer'
                    ]}
                    className='text-primary'
                  />
                ) : (
                  <span className='text-primary'>{data.fullName}</span>
                )}
              </motion.h1>
              <motion.p
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6 }}
                variants={childrenAnimation}
                className='lead mb-0'
              >
                {limitWords(data.bio, 15)}
              </motion.p>
              <motion.div
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.8 }}
                variants={childrenAnimation}
                className='herosection-socialicons mt-7 text-center'
              >
                <SocialIcons data={data.socialAddress} />
              </motion.div>
              <ScrollLink
                activeClass='active'
                to='section-contact'
                spy={true}
                smooth='easeInQuad'
                offset={-74}
                duration={1000}
                className='btn md:hidden mt-10 text-white hover:text-blue-900'
              >
                <span>Hire Me</span>
              </ScrollLink>
            </div>
          </div>
          {scroll ? (
            <motion.div
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 1 }}
              variants={childrenAnimation}
              className='herosection-bottom absolute bottom-20 sm:bottom-32 left-0 top-auto w-full justify-between text-center'
            >
              <ScrollLink
                activeClass='active'
                href='/'
                to='section-about'
                spy={true}
                smooth='easeInQuad'
                offset={-74}
                duration={1000}
                className='cursor-pointer text-xs font-medium uppercase tracking-widest transition-all hover:text-primary'
              >
                <RiArrowDownLine className='inline animate-bounce text-base' />
                <span className='pl-2' data-tooltip='Find Out More About ME!'>
                  Scroll Down
                </span>
              </ScrollLink>
            </motion.div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default HeroSection
