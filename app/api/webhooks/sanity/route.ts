import { NextResponse } from 'next/server'
import axios from 'axios'
/**
 *˝
 * This code does not work yet.
 *
 */

export async function POST(request: Request) {
  try {
    // Handle the incoming webhook from Sanity
    const data = await request.json()

    // Verify the webhook secret
    const webhookSecret = process.env.SANITY_WEBHOOK_SECRET
    const { secret } = data

    if (webhookSecret !== secret) {
      return NextResponse.json({ message: 'Unauthorized request.' }, { status: 401 })
    }

    // Log the incoming data for debugging
    return NextResponse.json(
      { message: 'Webhook received and action triggered.' },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Webhook received but action failed.' },
      { status: 500 }
    )
  }
}
