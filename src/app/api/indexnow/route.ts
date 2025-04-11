import { createClient } from '@/prismicio'
import { NextRequest, NextResponse } from 'next/server'

const INDEXNOW_API_KEY = process.env.INDEXNOW_API_KEY
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow'
const PRISMIC_WEBHOOK_SECRET = process.env.PRISMIC_WEBHOOK_SECRET
const YOUR_DOMAIN = 'lionsgategaragedoors.com' // Replace with your actual domain
const client = createClient()

export async function POST(req: NextRequest): Promise<NextResponse> {
  const requestBody = await req.json() // Read the body once

  const prismicWebhookSecret = req.headers.get('secret') || requestBody?.secret

  if (
    PRISMIC_WEBHOOK_SECRET &&
    prismicWebhookSecret !== PRISMIC_WEBHOOK_SECRET
  ) {
    return NextResponse.json(
      { message: 'Invalid Prismic Webhook Secret' },
      { status: 401 },
    )
  }

  const { documents } = requestBody

  if (!documents || !Array.isArray(documents) || documents.length === 0) {
    return NextResponse.json(
      { message: 'No documents to process' },
      { status: 200 },
    )
  }

  try {
    const urlsToSubmit: string[] = []
    for (const docId of documents) {
      const document = await client.getByID(docId)
      if (document?.url) {
        urlsToSubmit.push(`https://${YOUR_DOMAIN}${document.url}`)
      }
      // Handle different document types and URL structures as needed
    }

    if (urlsToSubmit.length > 0) {
      const indexNowPayload = {
        host: YOUR_DOMAIN,
        key: INDEXNOW_API_KEY,
        urlList: urlsToSubmit,
      }

      const response = await fetch(INDEXNOW_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(indexNowPayload),
      })

      if (response.ok) {
        const data = await response.json()
        console.log('IndexNow submission successful:', data)
        return NextResponse.json(
          { message: 'IndexNow URLs submitted successfully' },
          { status: 200 },
        )
      } else {
        console.error(
          'IndexNow submission failed:',
          response.status,
          response.statusText,
        )
        return NextResponse.json(
          { message: 'IndexNow submission failed' },
          { status: response.status },
        )
      }
    } else {
      return NextResponse.json(
        { message: 'No relevant URLs to submit to IndexNow' },
        { status: 200 },
      )
    }
  } catch (error) {
    console.error('Error processing Prismic webhook:', error)
    return NextResponse.json(
      { message: 'Error processing Prismic webhook' },
      { status: 500 },
    )
  }
}
