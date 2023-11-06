import { Metadata } from 'next'
import { getAllBlogs } from '@/sanity/sanity-utils'
import Image from 'next/image'
import Link from 'next/link'
import type { BlogProps } from '@/types'
import { RiArticleLine, RiGhostLine } from 'react-icons/ri'
import { shimmer, toBase64 } from '@/lib/utils'
import NoItems from '@/components/elements/NoItems'
import { ITEMS_PER_RENDER } from '@/constants'

export const metadata: Metadata = {
  title: 'Blogs | Mohammed Haydar'
}

const Blogs = async ({ params }: { params: { page: string } }) => {
  const pageNumber = parseInt(params.page)
  const { blogs, total } = await getAllBlogs(pageNumber)

  const totalPages = Math.ceil(total / (ITEMS_PER_RENDER * 3))
  const hasMore = pageNumber < totalPages

  return !blogs || blogs.length === 0 ? (
    <NoItems
      icon={<RiGhostLine className='md:w-52 md:h-52' />}
      msg={`Sorry, We Could't Find Any Blog Posts!`}
      links={[{ to: '/', label: 'Home' }]}
    />
  ) : (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7'>
        {/* Render the blogs */}
        {blogs.map(({ _id, _createdAt, title, slug, category, thumb }: BlogProps) => {
          return (
            <div key={_id} className='col-span-2 sm:col-span-1'>
              <article className='blog card p-2 md:p-3'>
                <header className='flex items-center justify-center blog-top relative mb-2'>
                  <Link
                    href={`/blog/${slug}`}
                    className='fiximage hover-scale block w-full'
                    rel='noopener noreferrer'
                    title={title}
                  >
                    <Image
                      src={thumb}
                      width={400}
                      height={270}
                      alt={`Image of ${title} Blog`}
                      className='object-cover w-full min-h-[10rem] max-h-40 sm:w-full rounded-lg'
                      placeholder='blur'
                      blurDataURL={`data:image/svg+xml;base64,${toBase64(
                        shimmer(400, 240)
                      )}`}
                    />
                  </Link>
                  <div className='blog-date absolute left-auto right-3 top-3 inline-block min-h-[60px] min-w-[60px] rounded bg-primary p-2 text-center text-grey'>
                    <span className='month block text-sm uppercase leading-none'>
                      {new Date(_createdAt).toLocaleDateString('en-us', {
                        month: 'short'
                      })}
                    </span>
                    <span className='date block text-2xl leading-none'>
                      {new Date(_createdAt).toLocaleDateString('en-us', {
                        day: '2-digit'
                      })}
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
                <menu className='flex flex-wrap overflow-x-hidden gap-1.5 text-xs'>
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
        })}
      </div>
      {/* Pagination links */}
      <div className='flex gap-3 pt-10 text-center'>
        {pageNumber && pageNumber !== 1 && (
          <Link href={`/blogs/${pageNumber - 1}`} className='btn btn-small'>
            <span>Prev</span>
          </Link>
        )}
        {/* Assuming you have the `hasMore` information, you can replace it with your own logic */}
        {hasMore && (
          <Link href={`/blogs/${pageNumber + 1}`} className='btn btn-small'>
            <span>Next</span>
          </Link>
        )}
      </div>
    </>
  )
}

export const revalidate = 10

export default Blogs
