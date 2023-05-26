import { createClient } from 'next-sanity'
import clientConfig from '@/sanity/config/client-config'
import Notification from '@/components/layout/Notification'
import type { CommentProps } from '@/types'

const BlogForm = ({ slug, id: blogId }: { slug: string; id: string }) => {
  async function handleAddComment(formData: FormData) {
    'use server'

    const newComment: CommentProps = {
      _id: blogId,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      comment: formData.get('comment') as string
    }

    try {
      await createClient(clientConfig).create({
        _type: 'comment',
        blog: {
          _type: 'reference',
          _ref: blogId
        },
        name: newComment.name,
        email: newComment.email,
        comment: newComment.comment
      })

      console.log('Comment Added!')
      // Clear the input values in the form UI
      const nameInput = document.getElementById('name') as HTMLInputElement
      const emailInput = document.getElementById('email') as HTMLInputElement
      const commentInput = document.getElementById('comment') as HTMLInputElement
      nameInput.value = ''
      emailInput.value = ''
      commentInput.value = ''
    } catch (error) {
      console.log('OOPS! Comment Was NOT added!')
    }
  }

  return (
    <section>
      <h3 className='text-2xl font-bold'>Share Your thoughts!</h3>
      <form className='mt-7 flex flex-col' action={handleAddComment}>
        <label htmlFor='name' className='flex flex-col gap-y-3'>
          <span>Name</span>
          <input
            type='text'
            id='name'
            name='name'
            className='bg-gray-800 focus-within:bg-gray-700 transition-colors duration-300 text-xl'
            dir='auto'
            required
          />
        </label>
        <label htmlFor='email' className='flex flex-col gap-y-3'>
          <span>Email</span>
          <input
            type='email'
            id='email'
            name='email'
            className='bg-gray-800 focus-within:bg-gray-700 transition-colors duration-300 text-xl'
            // defaultValue={(session && session.user.email) ?? ''}
            required
          />
        </label>
        <label htmlFor='comment' className='flex flex-col gap-y-3'>
          <span>Comment</span>
          <textarea
            id='comment'
            name='comment'
            className='bg-gray-800 focus-within:bg-gray-700 transition-colors duration-300 text-xl'
            dir='auto'
            required
          />
        </label>
        <button
          type='submit'
          className='btn inline-block py-2 mt-2 text-white hover:text-blue-900'
        >
          <span>Add</span>
        </button>
        {/* <Notification>hi</Notification> */}
      </form>
    </section>
  )
}

export default BlogForm
