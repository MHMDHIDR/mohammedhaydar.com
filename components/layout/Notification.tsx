'use client'
import { useRef } from 'react'
import { notificationProps } from '@/types'

const Notification: React.FC<notificationProps> = ({ children, isOk = false }) => {
  const notificationRef = useRef<HTMLButtonElement>(null)

  const removeNotification = () => {
    notificationRef.current?.parentElement?.remove()
  }

  return (
    <div
      className={`relative flex justify-center items-center border border-solid my-4 rounded-lg text-center transition-all duration-500 ${
        isOk
          ? 'bg-green-100 text-green-800 border-green-700'
          : 'bg-red-100 text-red-800 border-red-700'
      }`}
    >
      <button
        type='button'
        className={`absolute text-xl font-normal cursor-pointer right-4 hover:font-bold ${
          isOk ? 'bg-green-300 text-green-800' : 'bg-red-300 text-red-800'
        }`}
        aria-label='close noification'
        title='close noification'
        onClick={removeNotification}
        ref={notificationRef}
      >
        &times;
      </button>
      <p
        className={`py-4 px-6 font-bold text-sm sm:text-base ${
          isOk ? 'text-green-800' : 'text-red-800'
        }`}
      >
        {children}
      </p>
    </div>
  )
}

export default Notification
