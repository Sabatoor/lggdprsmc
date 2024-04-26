'use client'

import { cn } from '@/app/lib/cn'
import * as React from 'react'
import { HiX } from 'react-icons/hi'
import { AnimatePresence, motion } from 'framer-motion'
import Script from 'next/script'
import { Button } from './ui/button'

export default function Consent() {
  const [consent, setConsent] = React.useState<boolean>(false)
  const [hideBanner, setHideBanner] = React.useState<boolean>(true)

  type Preferences = {
    ad_storage: 'granted' | 'denied'
    analytics_storage: 'granted' | 'denied'
    date_denied?: string
  }
  React.useEffect(() => {
    setTimeout(() => {
      if (localStorage.getItem('consentMode') === null) {
        setHideBanner(false)
        setConsent(false)
      } else {
        let consentMode: Preferences = JSON.parse(
          `${localStorage.getItem('consentMode')}`,
        )
        setConsent(consentMode.analytics_storage === 'granted')
        if (consentMode.date_denied) {
          const currentDate = new Date()
          const timeDifference =
            currentDate.getTime() - new Date(consentMode.date_denied).getTime()
          const daysSinceDenied = Math.floor(
            timeDifference / (1000 * 60 * 60 * 24),
          )
          daysSinceDenied > 14 && localStorage.removeItem('consentMode')
        }
      }
    }, 3000)
  }, [])
  return (
    <>
      {consent === true && (
        <Script
          id="consupd"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              gtag('consent', 'update', {
                'ad_storage': 'granted',
                'analytics_storage': 'granted'
              });
              localStorage.setItem('consentMode', JSON.stringify({ad_storage: 'granted', analytics_storage: 'granted'}));
            `,
          }}
        />
      )}
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
              'bg-background fixed bottom-0 z-10 grid w-full p-3 md:grid-cols-5',
            )}
          >
            <p className="prose prose-sm mx-auto my-4 px-6 text-left md:col-span-3">
              Your have a right to privacy. Period. If you wish to allow it,
              certain events will be logged. These data are collected with the
              intention of improving the visitor experience. Please choose your
              preference below. Data are only collected if you provide consent
              (which is how it should be).
            </p>
            <div className="my-4 flex items-center justify-evenly md:col-span-2">
              <Button
                variant="outline"
                className="absolute right-2 top-2"
                onClick={e => {
                  setHideBanner(true)
                }}
              >
                <HiX className="text-neutral h-5 w-5" />
                <span className="sr-only">Close</span>
              </Button>
              <Button
                variant="ghost"
                onClick={e => {
                  setHideBanner(true)
                  localStorage.setItem(
                    'consentMode',
                    JSON.stringify({
                      ad_storage: 'denied',
                      analytics_storage: 'denied',
                      date_denied: new Date(),
                    }),
                  )
                }}
                // className="rounded-xl px-6 py-4 lg:text-lg"
              >
                Deny All
              </Button>
              <Button
                variant="default"
                size="lg"
                onClick={() => {
                  setConsent(true)
                  setHideBanner(true)
                }}
                className="text-neutral px-6 py-4 font-medium lg:text-lg"
              >
                Accept All
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
