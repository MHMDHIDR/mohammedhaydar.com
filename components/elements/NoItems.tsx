import { NoItemsProps } from '@/types'
import Link from 'next/link'
import { RiGhostLine } from 'react-icons/ri'

const NoItems = ({ icon, msg, links, className }: NoItemsProps) => (
  <div
    className={`flex flex-col items-center justify-center gap-6${
      className ? ' ' + className : ''
    }`}
  >
    <div className='flex flex-col justify-center items-center gap-6 max-w-lg my-2 text-lg leading-10 tracking-wider text-blue-500'>
      {icon ? icon : <RiGhostLine />}
      <p className='text-center'>
        {msg ? msg : `Sorry, We Could't Find What You Are Looking For!`}
      </p>
    </div>
    <div className='flex gap-3'>
      {links?.map(({ to, label }: { to: string; label: string }, idx) => (
        <Link
          key={idx}
          href={to}
          className='px-3 py-1 text-gray-800 transition-colors bg-gray-100 border border-gray-700 rounded hover:bg-gray-200'
        >
          {label}
        </Link>
      ))}
    </div>
  </div>
)

export default NoItems
