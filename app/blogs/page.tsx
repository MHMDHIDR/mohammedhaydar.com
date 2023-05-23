import { Metadata } from 'next'
import { getAllBlogs } from '@/sanity/sanity-utils'
import Image from 'next/image'
import Link from 'next/link'
import type { BlogProps } from '@/types'
import { RiArticleLine } from 'react-icons/ri'

export const metadata: Metadata = {
  title: 'Blogs | Mohammed Haydar'
}

const Blogs = async () => {
  const blogs = await getAllBlogs()

  return blogs.map(({ _id, _createdAt, title, slug, category, thumb }: BlogProps) => {
    return (
      <div key={_id} className='col-span-2 sm:col-span-1'>
        <article className='blog card p-2 md:p-3'>
          <header className='flex items-center justify-between blog-top relative mb-2'>
            <Link
              href={`blog/${slug}`}
              className='fiximage hover-scale block'
              rel='noopener noreferrer'
              title={title}
            >
              <Image
                src={thumb}
                width={400}
                height={270}
                alt={`Image of ${title} Blog`}
                className='object-cover h-auto w-auto rounded-lg'
              />
            </Link>
            <div className='blog-date absolute left-auto right-3 top-3 inline-block min-h-[60px] min-w-[60px] rounded bg-primary p-2 text-center text-grey'>
              <span className='month block text-sm uppercase leading-none'>
                {new Date(_createdAt).toLocaleDateString('en-us', { month: 'short' })}
              </span>
              <span className='date block text-2xl leading-none'>
                {new Date(_createdAt).toLocaleDateString('en-us', { day: '2-digit' })}
              </span>
              <span className='year block text-sm leading-none'>
                {new Date(_createdAt).getFullYear()}
              </span>
            </div>
          </header>
          <h5 className='mb-0'>
            <Link
              href={`/blog/${slug}`}
              className='block overflow-hidden overflow-ellipsis whitespace-nowrap bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent text-2xl drop-shadow font-extrabold hover:bg-gradient-to-r hover:from-orange-500 hover:via-red-600 hover:to-purple-700'
              title={title}
            >
              {title}
            </Link>
          </h5>
          <menu className='flex flex-wrap overflow-x-scroll gap-1.5 text-xs'>
            {category.map((cat: string, i: number) => (
              <li
                key={i}
                className='flex items-center justify-center py-1 mb-2 tracking-widest text-white transition-colors bg-sky-700 rounded select-none hover:bg-sky-800 group hover:cursor-pointer'
              >
                <span className='flex items-center gap-2 mx-2 whitespace-nowrap'>
                  <RiArticleLine className='w-4 h-4' />
                  {cat}
                </span>
              </li>
            ))}
          </menu>
        </article>
      </div>
    )
  })
}

export default Blogs
