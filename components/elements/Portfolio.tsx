'use client'
import { useState } from 'react'
import FsLightbox from 'fslightbox-react'
import Image from 'next/image'
import Link from 'next/link'
import {
  RiExternalLinkLine,
  RiGithubLine,
  RiImageLine,
  RiVideoLine
} from 'react-icons/ri'
import { Portal } from 'react-portal'
import { imageLoader, shimmer, toBase64 } from '@/lib/utils'
import type { Project } from '@/types'

const Portfolio = ({
  portfolio: { title, subtitle, coverimage, imagegallery, videogallery, url, github }
}: {
  portfolio: Project
}) => {
  const [videoGalleryOpen, setVideoGalleryOpen] = useState(false)
  const [imageGalleryOpen, setImageGalleryOpen] = useState(false)

  return (
    <div className='p-4 portfolio card hovercard group md:p-5'>
      <div className='relative overflow-hidden portfolio-top'>
        <div className='transition-all duration-500 portfolio-image fiximage blur-0 filter group-hover:blur'>
          <Image
            loader={imageLoader}
            unoptimized={true}
            src={`/images/portfolios/${coverimage}`}
            height={384}
            width={550}
            alt={title}
            className='w-full h-auto'
            placeholder='blur'
            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(550, 384))}`}
          />
        </div>
        <div className='absolute top-0 left-0 z-20 flex items-center justify-center w-full h-full gap-4 overflow-hidden transition-all duration-500 transform -translate-x-full portfolio-hovercontent bg-grey bg-opacity-80 group-hover:translate-x-0'>
          {imagegallery && imagegallery.length > 0 && (
            <button
              className='inline-flex items-center justify-center w-10 h-10 min-h-0 p-0 text-lg text-center rounded-full bg-primary text-grey'
              aria-label='Image Link'
              onClick={() => setImageGalleryOpen(true)}
            >
              <RiImageLine />
            </button>
          )}
          {videogallery && videogallery.length > 0 && (
            <button
              className='inline-flex items-center justify-center w-10 h-10 min-h-0 p-0 text-lg text-center rounded-full bg-primary text-grey'
              aria-label='Video Link'
              onClick={() => setVideoGalleryOpen(true)}
            >
              <RiVideoLine />
            </button>
          )}
          {url?.length && url.length > 0 && (
            <Link
              href={url}
              target='_blank'
              className='inline-flex items-center justify-center w-10 h-10 min-h-0 p-0 text-lg text-center rounded-full bg-primary text-grey'
              aria-label='External Link'
            >
              <RiExternalLinkLine />
            </Link>
          )}
          {github?.length && github.length > 0 && (
            <Link
              href={github}
              target='_blank'
              className='inline-flex items-center justify-center w-10 h-10 min-h-0 p-0 text-lg text-center rounded-full bg-primary text-grey'
              aria-label='Github Link'
            >
              <RiGithubLine />
            </Link>
          )}
        </div>
      </div>
      <div className='mt-4 portfolio-content'>
        <h5 className='mb-0'>{title}</h5>
        <p>{subtitle}</p>
      </div>
      {imagegallery && (
        <Portal>
          <FsLightbox
            toggler={imageGalleryOpen}
            sources={imagegallery.map(image => `/images/portfolios/${image}`)}
          />
        </Portal>
      )}
      {videogallery && (
        <Portal>
          <FsLightbox toggler={videoGalleryOpen} sources={videogallery} />
        </Portal>
      )}
    </div>
  )
}

export default Portfolio
