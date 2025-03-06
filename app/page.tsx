import Container from '@/components/Container'
import HomeDescription from '@/components/HomeDescription'
import Photo from '@/components/Photo'
import SocialLinks from '@/components/SocialLinks'
import { Button } from '@/components/ui/button'
import { Package } from 'lucide-react'
import Link from 'next/link'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { ArrowUpRight, Github } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { projects } from './projects/projects'

export default function Home() {
  return (
    <div className='bg-bodyColor text-white/80'>
      <Container className='py-10 grid grid-cols-1 md:grid-cols-2 gap-10'>
        <div className='flex flex-col items-center md:items-start gap-5 md:gap-7 text-center md:text-start'>
          <div>
            <h3 className='font-semibold tracking-wider mb-1'>Full Stack Developer</h3>
            <h2 className='text-3xl md:text-5xl mb-2 text-white'>Hi, I&apos;m</h2>
            <h1 className='text-primary text-5xl md:text-7xl tracking-normal'>
              Mohammed <span className='text-white'>Ibrahim</span>
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

      <Container className='py-10'>
        <h2 className='md:text-2xl text-sm font-bold text-white mb-10 md:mb-6 border-primary/20 border-8 rounded-sm select-none p-3 border-double w-fit mx-auto'>
          Featured Projects
        </h2>
        <Carousel opts={{ align: 'start', loop: true }} className='w-full'>
          <CarouselNav className='top-0' />
          <CarouselContent className='my-10'>
            {projects?.map((project, index) => (
              <CarouselItem key={index}>
                <Card className='bg-bodyColor border-lightSky/20'>
                  <CardContent className='p-6'>
                    <div className='flex flex-col md:flex-row md:items-center md:space-x-8 group'>
                      <div className='w-full md:w-1/2 order-2 md:order-1 mb-8 md:mb-0'>
                        <div className='space-y-3 md:space-y-2 mt-4 md:mt-0'>
                          <h2 className='text-3xl md:text-6xl leading-none font-extrabold text-transparent text-outline select-none'>
                            {index + 1}
                          </h2>
                          <h3 className='text-xl md:text-3xl font-bold leading-none text-white group-hover:text-primary hoverEffect'>
                            <Link href={project.liveUrl} target='_blank'>
                              {project.title}
                            </Link>
                          </h3>
                          <Badge>{project.category}</Badge>
                          <p className='text-white/60 text-sm md:text-base leading-6 md:leading-normal'>
                            {project.description}
                          </p>
                          <ul className='flex flex-wrap gap-2 md:gap-4 items-center'>
                            {project.stack?.map((item, index) => (
                              <li
                                key={index}
                                className='text-xs md:text-base text-primary/80 bg-primary/10 px-1.5 py-0.5 rounded-sm select-none'
                              >
                                {item}
                                {index !== project.stack?.length - 1 && ''}
                              </li>
                            ))}
                          </ul>
                          <Separator className='bg-gray-700' />
                          <div className='flex items-center space-x-4'>
                            <TooltipProvider>
                              <Tooltip>
                                <Link href={project.liveUrl} target='_blank'>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant='outline'
                                      size='icon'
                                      className='bg-lightSky/5 text-white/80 border border-lightSky/20 hover:bg-lightSky/20 hover:border-lightSky hover:text-hoverColor hoverEffect'
                                    >
                                      <ArrowUpRight />
                                      <span className='sr-only'>View Live Project</span>
                                    </Button>
                                  </TooltipTrigger>
                                </Link>
                                <TooltipContent className='bg-white text-black font-semibold'>
                                  <p>View Live Project</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                              <Tooltip>
                                <Link href={project.githubUrl} target='_blank'>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant='outline'
                                      size='icon'
                                      className='bg-lightSky/5 text-white/80 border border-lightSky/20 hover:bg-lightSky/20 hover:border-lightSky hover:text-hoverColor hoverEffect'
                                    >
                                      <Github />
                                      <span className='sr-only'>
                                        View Github Repository
                                      </span>
                                    </Button>
                                  </TooltipTrigger>
                                </Link>
                                <TooltipContent className='bg-white text-black font-semibold'>
                                  <p>View Github Repository</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>
                      </div>
                      <div className='w-full md:w-1/2 order-1 md:order-2'>
                        <Link
                          href={project.liveUrl}
                          target='_blank'
                          className='relative h-72 sm:h-96 bg-gray-700 rounded-lg overflow-hidden flex'
                        >
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                            className='object-cover'
                          />
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNav className='bottom-10' />
        </Carousel>
      </Container>
    </div>
  )
}

function CarouselNav({ className }: { className: string }) {
  return (
    <div className={cn('absolute right-12', className)}>
      <CarouselPrevious className='rounded-md bg-transparent border border-lightSky/20 hover:bg-hoverColor/20 hover:text-white hover:border-hoverColor p-5 hoverEffect' />
      <CarouselNext className='rounded-md bg-transparent border border-lightSky/20 hover:bg-hoverColor/20 hover:text-white hover:border-hoverColor p-5 hoverEffect' />
    </div>
  )
}
