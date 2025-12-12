'use client'
import { useEffect } from 'react'

declare global {
  interface Window {
    fbq: (
      action: string,
      eventName: string,
      params?: Record<string, string | number>,
    ) => void
  }
}

// Configuration: Map your specific IDs to Event Types
// This keeps your component logic clean and puts tracking logic in one place.
const FORM_CONFIG: Record<string, { eventName: string; contentName: string }> =
  {
    // Estimate Form -> High Value 'Lead'
    '91645667621262': {
      eventName: 'Lead',
      contentName: 'Garage Door Estimate Request',
    },
    // General Contact Form -> Lower Value 'Contact'
    '91615600019247': {
      eventName: 'Contact',
      contentName: 'General Inquiry',
    },
  }

export const useJotFormTracker = (formId: number | string) => {
  useEffect(() => {
    const handleJotFormMessage = (event: MessageEvent) => {
      // 1. Security & Origin Check
      if (!event.origin.includes('jotform.com')) return

      let data = event.data

      // 2. Data Parsing
      // JotForm sends some messages as strings (e.g., "setHeight:500")
      // and others as Objects (e.g., submission events).
      // We safely try to parse strings to JSON, or use the object directly.
      if (typeof data === 'string') {
        try {
          data = JSON.parse(data)
        } catch (e) {
          // If it's not JSON (like the "setHeight" commands), ignore it
          return
        }
      }

      // 3. Check for Submission Success
      // We check if the action is 'submission-completed' and matches our specific Form ID
      if (
        data?.action === 'submission-completed' &&
        data?.formID?.toString() === formId.toString()
      ) {
        console.log(`✅ JotForm ${formId} Submitted. Firing Lead Pixel.`)

        // 4. Fire the Facebook Lead Event
        if (typeof window.fbq === 'function') {
          window.fbq('track', 'Lead', {
            content_name: 'Garage Door Estimate Request',
            content_category: 'Lead',
            value: 0.0,
            currency: 'CAD',
            form_id: formId,
          })
        } else {
          console.warn('Facebook Pixel (fbq) not found on window.')
        }
      }
    }

    // Attach the listener
    window.addEventListener('message', handleJotFormMessage)

    // Cleanup on unmount
    return () => {
      window.removeEventListener('message', handleJotFormMessage)
    }
  }, [formId])
}
