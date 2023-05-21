'use client'
import { useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import notify from '@/lib/notify'
import { LoadingSpinner } from '../layout/Loading'
import type { SubmitHandler } from 'react-hook-form'
import type { ContactFormInputsProps, ContactResponseProps } from '@/types'

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormInputsProps>()

  //Msg returned from server
  const [loading, setLoading] = useState(false)
  const [sendStatus, setSendStatus] = useState<number>()
  const [sendStatusMsg, setSendStatusMsg] = useState('')

  const onSubmit: SubmitHandler<ContactFormInputsProps> = async formData => {
    setLoading(true)

    try {
      const {
        data: { mailSent, message }
      }: ContactResponseProps = await axios.post(
        `${window.location.origin}/api/contact`,
        formData
      )

      setSendStatus(mailSent)
      setSendStatusMsg(message)

      if (mailSent === 1) {
        reset() // Reset the form inputs using the reset function from react-hook-form
      }
    } catch (error: unknown) {
      setSendStatus(0)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className='hidden'>
        {sendStatus === 1
          ? notify({ type: 'success', msg: sendStatusMsg, position: 'bottom-center' })
          : sendStatus === 0
          ? notify({ type: 'error', msg: sendStatusMsg, position: 'bottom-center' })
          : null}
      </div>

      <form
        className='card -mt-1.5  space-y-4 p-4 md:p-5'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='inputbox'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            placeholder='Enter your name...'
            id='name'
            dir='auto'
            {...register('name', { required: true })}
          />
          {errors.name && (
            <>
              {errors.name.type === 'required' && (
                <p className='text-sm text-center text-red-500 bg-red-500 bg-opacity-5'>
                  What Can I Call You?!
                </p>
              )}
            </>
          )}
        </div>
        <div className='inputbox'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            placeholder='Enter your email...'
            id='email'
            dir='auto'
            {...register('email', {
              required: true,
              pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            })}
          />
          {errors.email && (
            <>
              {errors.email.type === 'required' && (
                <p className='text-sm text-center text-red-500 bg-red-500 bg-opacity-5'>
                  Email is required!
                </p>
              )}
              {errors.email.type === 'pattern' && (
                <p className='text-sm text-center text-red-500 bg-red-500 bg-opacity-5'>
                  This Email doesn&apos;t seem right!
                </p>
              )}
            </>
          )}
        </div>
        <div className='inputbox'>
          <label htmlFor='subject'>Subject</label>
          <input
            type='text'
            placeholder='Enter subject...'
            id='subject'
            dir='auto'
            {...register('subject', { required: true })}
          />
          {errors.subject && (
            <>
              {errors.subject.type === 'required' && (
                <p className='text-sm text-center text-red-500 bg-red-500 bg-opacity-5'>
                  I Need a Subject to Understand Your Message!
                </p>
              )}
            </>
          )}
        </div>
        <div className='inputbox'>
          <label htmlFor='message'>Message</label>
          <textarea
            placeholder='Enter you message...'
            cols={1}
            rows={6}
            id='message'
            dir='auto'
            {...register('message', { required: true })}
          />
          {errors.message && (
            <>
              {errors.message.type === 'required' && (
                <p className='text-sm text-center text-red-500 bg-red-500 bg-opacity-5'>
                  What do you want to talk about?!
                </p>
              )}
            </>
          )}
        </div>
        <button
          type='submit'
          className={`btn text-white hover:text-blue-900${
            loading && loading ? ' scale-105 cursor-progress' : ''
          }${
            //add disbaled class if is true or false (that means user has clicked send button)
            loading || !loading ? ' disabled:opacity-30 disabled:hover:bg-blue-700' : ''
          }`}
        >
          <span>
            {loading && loading ? (
              <>
                <LoadingSpinner /> Sending...
              </>
            ) : (
              "Let's Talk"
            )}
          </span>
        </button>
      </form>
    </>
  )
}

export default ContactForm
