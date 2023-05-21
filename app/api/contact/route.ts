import { NextResponse } from 'next/server'
import SendEmail from '@/lib/email'
import type { ContactFormInputsProps } from '@/types'

export async function POST(request: Request) {
  const { name, email, subject, message, from, to }: ContactFormInputsProps =
    await request.json()

  if (name === '' || email === '' || subject === '' || message === '') {
    return NextResponse.json({ status: 400 })
  }

  try {
    const emailData = { name, email, subject, message, from, to }
    const { accepted, rejected } = await SendEmail(emailData)

    if (accepted.length > 0) {
      return NextResponse.json(
        {
          message:
            'Thank you for contacting us, we will reply to you as soon as possible',
          mailSent: 1
        },
        { status: 200 }
      )
    } else if (rejected.length > 0) {
      return NextResponse.json(
        {
          message: `Sorry, rejected! ==> ${String(rejected[0])}`,
          mailSent: 0
        },
        { status: 400 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: `Ooops!, something went wrong!: ${error as string}`,
        mailSent: 0
      },
      { status: 500 }
    )
  }
}
