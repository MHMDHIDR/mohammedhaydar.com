import Link from 'next/link'
import { BlogPostProps } from '@/types'

const PostPreview = ({ date, slug, title, category }: BlogPostProps) => {
  return (
    <div
      className='border border-slate-300 p-4 rounded-md shadow-sm
    bg-white'
    >
      <p className='text-sm text-slate-400'>{date}</p>

      <Link href={`/post/${slug}`}>
        <h2 className=' text-violet-600 hover:underline mb-4'>{title}</h2>
      </Link>
      <p className='text-slate-700'>{category}</p>
    </div>
  )
}

export default PostPreview
