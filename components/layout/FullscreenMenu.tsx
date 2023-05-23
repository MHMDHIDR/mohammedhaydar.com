import Link from 'next/link'

type FullMenuProps = {
  fullMenuHandler: (isFull: boolean) => void
}

const FullscreenMenu = ({ fullMenuHandler }: FullMenuProps) => {
  return (
    <ul className='fullscreen-menulist mb-0 flex h-screen items-center justify-between pl-0'>
      <li className='section group flex basis-1/5 items-center justify-center self-stretch border-l border-white border-opacity-10 text-center transition-all duration-500 first:border-l-0 hover:basis-2/5'>
        <Link
          href='/'
          className='flex w-full items-center justify-center self-stretch p-5 text-5xl font-bold uppercase text-heading group-hover:text-primary xl:text-6xl'
          onClick={() => fullMenuHandler(false)}
        >
          <span className='fullmenuitem rotate-180'>Home</span>
        </Link>
      </li>
      <li className='section group flex basis-1/5 items-center justify-center self-stretch border-l border-white border-opacity-10 text-center transition-all duration-500 first:border-l-0 hover:basis-2/5'>
        <Link
          href='/about'
          className='flex w-full items-center justify-center self-stretch p-5 text-5xl font-bold uppercase text-heading group-hover:text-primary xl:text-6xl'
          onClick={() => fullMenuHandler(false)}
        >
          <span className='fullmenuitem rotate-180'>About</span>
        </Link>
      </li>
      <li className='section group flex basis-1/5 items-center justify-center self-stretch border-l border-white border-opacity-10 text-center transition-all duration-500 first:border-l-0 hover:basis-2/5'>
        <Link
          href='/resume'
          className='flex w-full items-center justify-center self-stretch p-5 text-5xl font-bold uppercase text-heading group-hover:text-primary xl:text-6xl'
          onClick={() => fullMenuHandler(false)}
        >
          <span className='fullmenuitem rotate-180'>Resume</span>
        </Link>
      </li>
      <li className='section group flex basis-1/5 items-center justify-center self-stretch border-l border-white border-opacity-10 text-center transition-all duration-500 first:border-l-0 hover:basis-2/5'>
        <Link
          href='/works'
          className='flex w-full items-center justify-center self-stretch p-5 text-5xl font-bold uppercase text-heading group-hover:text-primary xl:text-6xl'
          onClick={() => fullMenuHandler(false)}
        >
          <span className='fullmenuitem rotate-180'>Works</span>
        </Link>
      </li>
      <li className='section group flex basis-1/5 items-center justify-center self-stretch border-l border-white border-opacity-10 text-center transition-all duration-500 first:border-l-0 hover:basis-2/5'>
        <Link
          href='/posts/1'
          className='flex w-full items-center justify-center self-stretch p-5 text-5xl font-bold uppercase text-heading group-hover:text-primary xl:text-6xl'
          onClick={() => fullMenuHandler(false)}
        >
          <span className='fullmenuitem rotate-180'>Blogs</span>
        </Link>
      </li>
      <li className='section group flex basis-1/5 items-center justify-center self-stretch border-l border-white border-opacity-10 text-center transition-all duration-500 first:border-l-0 hover:basis-2/5'>
        <Link
          href='/contact'
          className='flex w-full items-center justify-center self-stretch p-5 text-5xl font-bold uppercase text-heading group-hover:text-primary xl:text-6xl'
          onClick={() => fullMenuHandler(false)}
        >
          <span className='fullmenuitem rotate-180'>Contact</span>
        </Link>
      </li>
    </ul>
  )
}

export default FullscreenMenu
