import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { SocialIcons } from '@/components/elements'
import { informationProps } from '@/types'
import { getInformation } from '@/sanity/sanity-utils'

const Footer = () => {
  const { data } = useQuery<informationProps>({
    queryKey: ['information'],
    queryFn: async () => await getInformation()
  })

  if (!data) return null

  return (
    <footer className='relative z-20 border-t border-white footer border-opacity-10 bg-grey bg-opacity-95 backdrop-blur backdrop-filter'>
      <div className='container mx-auto'>
        <div className='flex flex-wrap items-center justify-between py-5 text-center footer-content gap-x-7 gap-y-5 md:flex-nowrap'>
          <div className='w-full md:w-auto'>
            <SocialIcons data={data.socialAddress} />
          </div>
          <p className='w-full mb-0 md:w-auto text-gray-500'>
            &copy; {new Date().getFullYear()}
            <Link
              href='/'
              className='px-2 inline-block font-medium text-heading no-underline hover:text-primary'
            >
              Mohammed Haydar.
            </Link>
            All right reserved
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
