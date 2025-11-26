'use client'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
import Link from 'next/link'
import { SettingsDocumentDataNavigationItem } from '../../prismicio-types'
import { ImageField, isFilled, KeyTextField } from '@prismicio/client'
import { HiMenu, HiOutlinePhone, HiX } from 'react-icons/hi'
import { useState, useEffect, useRef, MouseEvent, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Image from 'next/image'

type NavbarProps = {
  navigation: Array<SettingsDocumentDataNavigationItem>
  logo?: ImageField
  title?: KeyTextField
  phoneNumber?: KeyTextField
  call_to_action?: KeyTextField
}

export default function Navbar({
  navigation,
  logo,
  phoneNumber,
  title,
  call_to_action,
}: NavbarProps) {
  const mobileNavRef = useRef<HTMLButtonElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const toggleNav = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen, setIsOpen])
  // Add an effect to handle body overflow when the mobile nav is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      if (mobileNavRef.current) mobileNavRef.current.focus()
    } else {
      document.body.style.overflow = 'visible'
    }

    // Cleanup the effect
    return () => {
      document.body.style.overflow = 'visible'
    }
  }, [isOpen])
  useEffect(() => {
    const handleKeyDown = (event: globalThis.KeyboardEvent): void => {
      if (isOpen && event.key === 'Escape') {
        toggleNav()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, toggleNav])

  return (
    <>
      {/* MOBILE NAV */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.5, type: 'tween' }}
            className="fixed inset-0 z-30 flex h-full w-full flex-col justify-center bg-neutral text-background"
          >
            <button
              type="button"
              onClick={toggleNav}
              className="absolute top-6 right-6 cursor-pointer ring-primary outline-none focus:ring-2"
              ref={mobileNavRef}
            >
              <HiX className="h-8 w-8" />
              <span className="sr-only">Toggle Navigation</span>
            </button>
            <ul className="grid place-items-center gap-4 text-2xl">
              {navigation.map((item, i) => {
                return (
                  <li key={`mobile-nav-${i}`}>
                    <PrismicNextLink
                      field={item.link}
                      className="rounded-lg px-2 py-3 ring-primary outline-hidden focus:ring-2"
                      onClick={toggleNav}
                    >
                      {item.label}
                    </PrismicNextLink>
                  </li>
                )
              })}
            </ul>
            <div className="mt-6 flex justify-center">
              <Link
                href={
                  'https://www.bbb.org/ca/bc/surrey/profile/garage-doors/lions-gate-garage-doors-ltd-0037-1377062'
                }
                onBlur={() => {
                  mobileNavRef.current?.focus()
                }}
                className="rounded-lg ring-primary outline-hidden focus:ring-2"
              >
                <Image
                  src={
                    'https://seal-mbc.bbb.org/seals/gray-seal-187-130-bbb-1377062.png'
                  }
                  alt="Better Business Bureau Accredited Business"
                  width={150}
                  height={104.27}
                  className="w-auto"
                />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* END MOBILE NAV */}
      <header className="sticky top-0 z-20 bg-background py-3 shadow-xs lg:py-6">
        <div className="mx-auto flex w-full max-w-(--breakpoint-2xl) items-center justify-between px-4">
          <Link
            href="/"
            className="hidden flex-1 rounded-lg ring-primary outline-hidden focus:ring-2 md:inline-block"
          >
            {logo ? <PrismicNextImage field={logo} /> : <h1>{title}</h1>}
            <span className="sr-only">Return to Homepage</span>
          </Link>
          <div className="flex-1 shrink-0">
            {isFilled.keyText(call_to_action) && (
              <p className="text-center text-xs lg:text-sm">{call_to_action}</p>
            )}
            {isFilled.keyText(phoneNumber) && (
              <p className="text-center font-bold text-base md:text-xl">
                <a
                  href={`tel:${phoneNumber || 6042431505}`}
                  className="rounded-lg px-2 py-3 ring-primary outline-hidden focus:ring-2"
                >
                  <HiOutlinePhone className="-mt-1 inline h-6 w-6" />
                  {phoneNumber}
                </a>
              </p>
            )}
            <p className="text-center text-xs md:hidden">
              Lions Gate Garage Doors
            </p>
          </div>
          <div className="flex flex-1 items-center justify-end">
            <button
              type="button"
              onClick={toggleNav}
              className="flex cursor-pointer flex-col items-center rounded-lg ring-primary outline-none focus:ring-2"
            >
              <HiMenu className="mx-6 h-10 w-10 text-neutral" />
              <span className="text-sm md:text-base">Menu</span>
            </button>
          </div>
        </div>
      </header>
    </>
  )
}
