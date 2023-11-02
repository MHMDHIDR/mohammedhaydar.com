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

    // You can add logic to handle different types of events here
    // For example, check the event type and update your website accordingly.

    // Example: Trigger a redeployment in Vercel
    // Replace this with the actual logic to redeploy your site
    // You may need to use Vercel's API to trigger deployments
    // Make sure to set up Vercel authentication as needed

    // const response = await axios.post('https://api.vercel.com/v12/now/deployments', {/* deployment options */}, {
    //   headers: {
    //     Authorization: `Bearer ${VERCEL_API_KEY}`, // Replace with your Vercel API key
    //   },
    // });

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
