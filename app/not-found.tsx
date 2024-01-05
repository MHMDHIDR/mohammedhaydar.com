'use client'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { toBase64, shimmer, imageLoader } from '@/lib/utils'
import { Breadcrumb } from '@/components/elements'
import { Layout } from '@/components/layout'

const NotFound = () => {
  return (
    <Layout blurred>
      <Head>
        <title>Opps!, You Seem To Be Lost | Mohammed Haydar</title>
      </Head>

      {/* Start NotFound Section */}
      <section className='section-notfound'>
        <Breadcrumb title='Page not found' />
        <div className='pt-10 pb-24 not-found-wrapper lg:pt-14 lg:pb-28 xl:pt-16 xl:pb-32'>
          <div className='container mx-auto'>
            <div className='text-center not-found'>
              <Image
                loader={imageLoader}
                unoptimized={true}
                src='/images/notfound.svg'
                height={500}
                width={500}
                alt='not found'
                placeholder='blur'
                className='mx-auto mb-10'
                blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(500, 500))}`}
              />

              <Link href='/' className='btn btn-large'>
                <span>Back to Home</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* End NotFound Section */}
    </Layout>
  )
}

export default NotFound
