import { Radio_Canada } from 'next/font/google'
import 'normalize.css'
import 'nprogress/nprogress.css'
import 'swiper/css'
import 'swiper/css/navigation'
import './globals.scss'

const RadioCanada = Radio_Canada({
  subsets: ['latin'],
  style: ['italic', 'normal'],
  weight: ['300', '400', '500', '600', '700']
})

export const metadata = {
  title: 'Mohammed Haydar',
  description:
    'Mohammed Haydar Personal Portfolio Website Where I showcase My Porjects, Work Experiences, and More...'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1 maximum-scale=1'
      />
      <meta
        name='description'
        content='Mohammed Haydar Personal Portfolio Website Where I showcase My Porjects, Work Experiences, and More...'
      />
      <meta name='robots' content='noindex, nofollow' />
      <meta
        name='keywords'
        content='Mohammed, Haydar, Personal, Portfolio, Website, Where I showcase My Porjects, Work Experiences, Webapp'
      />
      <meta name='author' content='mr.hamood277@gmail.com' />
      <meta name='theme-color' content='#2376EB' />
      <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
      <link rel='manifest' href='/manifest.json' />
      <link rel='shortcut icon' href='/favicon.ico' type='image/x-icon' />
      <link rel='apple-touch-icon' href='/icon-192x128.png' />
      <meta property='og:type' content='website' />
      <meta property='og:site_name' content='Personal Mohammed Haydar Portfolio' />
      <meta property='og:title' content='MHMDHIDR - Personal Mohammed Haydar Portfolio' />
      <meta
        property='og:description'
        content='MHMDHIDR is the Personal Mohammed Haydar Portfolio Website that shows his projects/work that has been done over the last few years.'
      />
      <meta name='github:site' content='@MHMDHIDR' />
      <body className={RadioCanada.className}>{children}</body>
    </html>
  )
}
