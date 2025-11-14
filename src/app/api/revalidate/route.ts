import { NextResponse } from 'next/server'
import { updateTag } from 'next/cache'

export async function POST() {
  updateTag('prismic')

  return NextResponse.json({ revalidated: true, now: Date.now() })
}
