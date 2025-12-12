'use client'

import { useEffect } from 'react'

// Map IDs to specific GTM Event Names
const FORM_CONFIG: Record<string, { event: string; type: string }> = {
  // Estimate Form (High Value)
  '91645667621262': {
    event: 'generate_lead', // Standard GTM/GA4 event name for leads
    type: 'Estimate Request',
  },
  // Contact Form (Low Value)
  '91615600019247': {
    event: 'contact_submit', // Custom event name
    type: 'General Inquiry',
  },
}

export const useJotFormTracker = (formId: number | string) => {
  useEffect(() => {
    const handleJotFormMessage = (event: MessageEvent) => {
      // 1. Security Check
      if (!event.origin.includes('jotform.com')) return

      let data = event.data
      if (typeof data === 'string') {
        try {
          data = JSON.parse(data)
        } catch (e) {
          return
        }
      }

      // 2. Check for Submission
      if (
        data?.action === 'submission-completed' &&
        data?.formID?.toString() === formId.toString()
      ) {
        const config = FORM_CONFIG[formId.toString()] || {
          event: 'form_submit',
          type: 'Unknown Form',
        }

        console.log(`✅ JotForm Submitted. Pushing to GTM: ${config.event}`)

        // 3. Push to GTM Data Layer
        window.dataLayer = window.dataLayer || []
        window.dataLayer.push({
          event: config.event,
          form_id: formId,
          form_type: config.type,
          source: 'JotForm Embed',
        })
      }
    }

    window.addEventListener('message', handleJotFormMessage)
    return () => {
      window.removeEventListener('message', handleJotFormMessage)
    }
  }, [formId])
}
