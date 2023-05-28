'use client'
import { useState } from 'react'
import { handleAddComment } from '@/app/actions/handleAddComment'
import Notification from '@/components/layout/Notification'

const BlogForm = ({ id: blogId }: { id: string }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [comment, setComment] = useState('')
  const [resulIsOk, setResultIsOk] = useState<boolean>()
  const [resultMsg, setResultMsg] = useState('')

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const newComment = { _id: blogId, name, email, comment }

    const { isOk, msg } = await handleAddComment(newComment)
    setResultIsOk(isOk)
    setResultMsg(msg)
    if (isOk) {
      // Reset form input values
      setName('')
      setEmail('')
      setComment('')
    }
  }

  return (
    <section>
      <h3 className='text-2xl font-bold'>Share Your thoughts!</h3>
      <form className='mt-7 flex flex-col' onSubmit={handleSubmit}>
        <label htmlFor='name' className='flex flex-col gap-y-3'>
          <span>Name</span>
          <input
            type='text'
            name='name'
            value={name}
            onChange={event => setName(event.target.value)}
            className='bg-gray-800 focus-within:bg-gray-700 transition-colors duration-300 text-xl'
            dir='auto'
            required
          />
        </label>
        <label htmlFor='email' className='flex flex-col gap-y-3'>
          <span>
            Email
            <small className='text-sm mx-2'>
              Your Email <em>(kept private)</em>
            </small>
          </span>
          <input
            type='email'
            name='email'
            value={email}
            onChange={event => setEmail(event.target.value)}
            className='bg-gray-800 focus-within:bg-gray-700 transition-colors duration-300 text-xl'
            required
          />
        </label>
        <label htmlFor='comment' className='flex flex-col gap-y-3'>
          <span>Comment</span>
          <textarea
            name='comment'
            value={comment}
            onChange={event => setComment(event.target.value)}
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
        {resultMsg.length > 0 && (
          <Notification isOk={resulIsOk}>{resultMsg}</Notification>
        )}
      </form>
    </section>
  )
}

export default BlogForm
