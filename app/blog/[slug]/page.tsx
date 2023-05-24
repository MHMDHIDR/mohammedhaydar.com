import { getBlogBySlug } from '@/sanity/sanity-utils'
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import type { BlogProps } from '@/types'
import { capitalizeText, createSlug, removeSlug } from '@/lib'
import { RiArticleLine } from 'react-icons/ri'
import { marked } from 'marked'
import { shimmer, toBase64 } from '@/lib/utils'

export async function generateMetadata({
  params: { slug }
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const { thumb, cover }: { thumb: BlogProps['thumb']; cover: BlogProps['cover'] } =
    (await getBlogBySlug(slug)) ?? {
      thumb: '/images/logo.png',
      cover: '/images/logo.png'
    }

  return {
    title: capitalizeText(removeSlug(slug)),
    openGraph: { images: [thumb, cover] }
  }
}

const Blogs = async ({ params }: { params: { slug: string } }) => {
  const blog: BlogProps | null = await getBlogBySlug(params.slug)

  if (!blog) return null

  const { _createdAt, title, category, cover, content } = blog

  return (
    <div className='single-post py-24 lg:py-28 xl:py-32'>
      <div className='container mx-auto'>
        <div className='post-header mb-8'>
          <div className='fiximage mb-5 overflow-hidden rounded border border-white border-opacity-20'>
            <Image
              src={cover!}
              height={650}
              width={1350}
              alt={title}
              className='w-full h-auto object-cover'
              placeholder='blur'
              blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(1350, 650))}`}
            />
          </div>
          <div className='flex flex-wrap justify-between gap-x-4'>
            <div className='mb-0 flex gap-2 text-heading'>
              Category :{' '}
              <div className='inline-flex list-none gap-1.5'>
                {category.map((cat, i) => (
                  <span
                    key={i}
                    className="text-body underline-hover after:content-[','] last:after:hidden"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
            <p className='mb-0 text-heading'>
              Published on :
              <span className='ml-1.5 text-body'>
                {`${new Date(_createdAt).toLocaleDateString('en-us', {
                  month: 'short'
                })} ${new Date(_createdAt).toLocaleDateString('en-us', {
                  day: '2-digit'
                })}, ${new Date(_createdAt).getFullYear()}`}
              </span>
            </p>
          </div>
        </div>
        <div
          className='post-body mt-4'
          dangerouslySetInnerHTML={{ __html: marked(content) }}
        ></div>
      </div>
    </div>
  )
}

export default Blogs
