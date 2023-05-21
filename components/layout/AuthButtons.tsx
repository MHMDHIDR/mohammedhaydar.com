import { signIn, signOut } from 'next-auth/react'
import { RiGoogleFill } from 'react-icons/ri'

const SignInBtn = () => {
  const handleSignIn = async () => {
    await signIn('google', {
      callbackUrl:
        process.env.NODE_ENV === 'development'
          ? `https://localhost:3000`
          : process.env.NEXT_PUBLIC_SITE_URL
    })
  }

  return (
    <button
      type='button'
      className='flex items-center gap-2 py-1.5 px-4 w-fit text-white hover:bg-white hover:bg-opacity-10
       text-sm uppercase rounded-full outline outline-1 focus:outline-2 outline-blue-500 hover:outline-blue-500 transition-all'
      onClick={() => {
        void handleSignIn()
      }}
    >
      Sign in <RiGoogleFill className='w-4 h-4' />
    </button>
  )
}

const SignOutBtn = () => {
  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <button
      className='w-full flex items-center justify-center gap-2 px-4 uppercase text-sm rounded-lg text-gray-100 outline outline-1 focus:outline-2 outline-blue-500 hover:outline-blue-500 hover:outline-2 transition-all'
      onClick={() => {
        void handleSignOut()
      }}
      type='button'
    >
      LogOut
      <RiGoogleFill className='w-4 h-4' />
    </button>
  )
}

export { SignInBtn, SignOutBtn }
