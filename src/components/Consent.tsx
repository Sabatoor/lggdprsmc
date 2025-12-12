'use client'

import { cn } from '@/app/lib/cn'
import * as React from 'react'
import { HiX } from 'react-icons/hi'
import { AnimatePresence, motion } from 'motion/react'
import { Button } from './ui/button'

export default function Consent() {
  const [hideBanner, setHideBanner] = React.useState<boolean>(true)

  React.useEffect(() => {
    // Check if user has already made a choice
    const stored = localStorage.getItem('consentMode')

    // UI: Only show banner if no choice exists
    // (We wait 3s as per your original design)
    if (stored === null) {
      setTimeout(() => setHideBanner(false), 3000)
    }
    // Logic: If they previously granted, we must re-grant on new page load
    // because GTM defaults to 'denied' in your Analytics.tsx
    else {
      const prefs = JSON.parse(stored)
      if (prefs.analytics_storage === 'granted') {
        updateGTMConsent('granted')
      }
    }
  }, [])
  // Helper to update GTM
  const updateGTMConsent = (status: 'granted' | 'denied') => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      // 1. Google Consent Mode Update
      // Note: we use the 'gtag' arguments pushed to dataLayer
      window.dataLayer.push(function () {
        // @ts-ignore
        this.reset() // clear previous state if needed
      })

      window.dataLayer.push({
        event: 'consent_update', // Optional: Trigger for GTM
        'gtm.uniqueEventId': new Date().getTime(), // unique ID to force update
      })

      // The standard way to update consent in GTM
      window.dataLayer.push([
        'consent',
        'update',
        {
          ad_storage: status,
          analytics_storage: status,
          personalization_storage: status,
          functionality_storage: status,
          security_storage: status,
        },
      ])

      // 2. Custom Event for Triggers
      // This tells GTM "The user just said YES, fire the pixels now!"
      if (status === 'granted') {
        window.dataLayer.push({ event: 'user_consent_granted' })
      }
    }
  }
  const handleAccept = () => {
    const prefs = { ad_storage: 'granted', analytics_storage: 'granted' } // etc...
    localStorage.setItem('consentMode', JSON.stringify(prefs))
    setHideBanner(true)
    updateGTMConsent('granted')
  }

  const handleDeny = () => {
    const prefs = {
      ad_storage: 'denied',
      analytics_storage: 'denied',
      date_denied: new Date().toISOString(),
    }
    localStorage.setItem('consentMode', JSON.stringify(prefs))
    setHideBanner(true)
    updateGTMConsent('denied')
  }

  return (
    <AnimatePresence>
      {!hideBanner && (
        <motion.div
          initial={{
            y: '100%',
          }}
          animate={{
            y: 0,
          }}
          exit={{
            y: '100%',
          }}
          id="consent-banner"
          className={cn(
            'fixed bottom-0 z-10 grid w-full bg-background p-3 md:grid-cols-5',
          )}
        >
          <p className="mx-auto my-4 prose prose-sm px-6 text-left md:col-span-3">
            Your have a right to privacy. Period. If you wish to allow it,
            certain events will be logged. These data are collected with the
            intention of improving the visitor experience. Please choose your
            preference below. Data are only collected if you provide consent
            (which is how it should be).
          </p>
          <div className="my-4 flex items-center justify-evenly md:col-span-2">
            <Button
              variant="outline"
              className="absolute top-2 right-2"
              onClick={e => {
                setHideBanner(true)
              }}
            >
              <HiX className="h-5 w-5 text-neutral" />
              <span className="sr-only">Close</span>
            </Button>
            <Button
              variant="ghost"
              onClick={handleDeny}
              className="text-foreground hover:bg-accent hover:shadow"
            >
              Deny All
            </Button>
            <Button
              variant="default"
              size="lg"
              onClick={handleAccept}
              className="px-6 py-4 font-medium text-neutral lg:text-lg"
            >
              Accept All
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
