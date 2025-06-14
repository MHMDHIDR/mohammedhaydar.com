import Container from '@/components/Container'
import HomeDescription from '@/components/HomeDescription'
import Photo from '@/components/Photo'
import ProjectsCarousel from '@/components/ProjectsCarousel'
import SocialLinks from '@/components/SocialLinks'
import { Button } from '@/components/ui/button'
import { Package } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-static'
export const revalidate = 86400

export default function Home() {
  return (
    <div className='bg-bodyColor text-white/80'>
      <Container className='py-10 grid grid-cols-1 md:grid-cols-2 gap-10'>
        <div className='flex flex-col items-center md:items-start gap-5 md:gap-7 text-center md:text-start'>
          <div>
            <h3 className='font-semibold tracking-wider mb-1'>Full Stack Engineer</h3>
            <h2 className='text-3xl md:text-5xl mb-2 text-white'>Hi, I&apos;m</h2>
            <h1 className='text-primary text-5xl md:text-7xl tracking-normal'>
              Mohammed <span className='text-white'>Haydar</span>
            </h1>
          </div>
          <div className='w-full h-[170px] md:h-[140px] relative'>
            <div className='absolute top-0 left-0 w-full h-full'>
              <HomeDescription />
            </div>
          </div>
          <Link href='/projects' className='my-3'>
            <Button className='bg-transparent rounded-full border border-primary/50 hover:bg-primary hover:text-white hoverEffect h-11'>
              <Package /> My Projects
            </Button>
          </Link>
          <SocialLinks />
        </div>

        <Photo />
      </Container>

      <Container>
        <ProjectsCarousel
          title='Featured Projects'
          orientation='horizontal'
          className='pt-0'
        />
      </Container>
    </div>
  )
}
