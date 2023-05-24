import Layout from '@/components/layout/Layout'
import Link from 'next/link'
import type { BreadcrumbProps } from '@/types'

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
  const props: BreadcrumbProps = {
    title: 'Blogs',
    paths: [
      { name: 'Home', link: '/' },
      { name: 'Blogs', link: '' }
    ]
  }

  return (
    <Layout>
      <div className='breadcrumb-wrap relative'>
        <div className='breadcrumb-bg absolute left-0 top-0 h-full w-full'></div>
        <div className={`relative z-20 bg-grey-darken pt-[73px] bg-opacity-90`}>
          <div className='container mx-auto'>
            <div className='breadcrumb py-16 text-center lg:py-20'>
              <h2 className='capitalize text-primary'>{props.title}</h2>
              {Array.isArray(props.paths) && props.paths.length && (
                <ul className='mb-0 inline-flex list-none flex-wrap justify-center gap-x-2 pl-0'>
                  {props.paths.map(path => (
                    <li className='inline-block capitalize' key={path.name}>
                      {path.link ? (
                        <Link
                          href={path.link}
                          className='text-heading hover:text-primary'
                        >
                          {path.name}
                        </Link>
                      ) : (
                        path.name
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='blogs py-24 lg:py-28 xl:py-32'>
        <div className='container mx-auto'>
          <div className='grid grid-cols-1 gap-7 lg:grid-cols-12'>
            <div className='col-span-1 lg:col-span-12'>{children}</div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
