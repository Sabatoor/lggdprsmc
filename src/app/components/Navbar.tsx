'use client'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
import Link from 'next/link'
import { SettingsDocumentDataNavigationItem } from '../../../prismicio-types'
import { ImageField, KeyTextField } from '@prismicio/client'
import { HiMenu, HiOutlinePhone, HiX } from 'react-icons/hi'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

type NavbarProps = {
  navigation: Array<SettingsDocumentDataNavigationItem>
  logo?: ImageField
  title?: KeyTextField
}

export default function Navbar({ navigation, logo, title }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const toggleNav = () => {
    setIsOpen(!isOpen)
  }
  // Add an effect to handle body overflow when the mobile nav is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'visible'
    }

    // Cleanup the effect
    return () => {
      document.body.style.overflow = 'visible'
    }
  }, [isOpen])
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
            className="fixed inset-0 z-30 flex h-full w-full flex-col justify-center bg-skin-neutral text-skin-white"
          >
            <button onClick={toggleNav} className="absolute right-6 top-6">
              <HiX className="h-8 w-8" />
              <span className="sr-only">Toggle Navigation</span>
            </button>
            <ul className="grid place-items-center gap-4 text-2xl">
              {navigation.map((item, i) => {
                return (
                  <li key={`mobile-nav-${i}`}>
                    <PrismicNextLink
                      field={item.link}
                      className="rounded-lg px-2 py-3 outline-none ring-skin-primary focus:ring-2"
                      onClick={toggleNav}
                    >
                      {item.label}
                    </PrismicNextLink>
                  </li>
                )
              })}
            </ul>
            <div className="mt-6 flex justify-center">
              <Image
                src={
                  'https://seal-mbc.bbb.org/seals/gray-seal-187-130-bbb-1377062.png'
                }
                alt="Better Business Bureau Accredited Business"
                width={150}
                height={104.27}
                className="w-auto"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* END MOBILE NAV */}
      <header className="sticky top-0 z-20 bg-skin-white py-3 shadow-sm lg:py-6">
        <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-4">
          <Link
            href="/"
            className="hidden flex-1 rounded-lg outline-none ring-skin-primary focus:ring-2 md:inline-block"
          >
            {logo ? <PrismicNextImage field={logo} /> : <h1>{title}</h1>}
            <span className="sr-only">Return to Homepage</span>
          </Link>
          <div className="flex-1 shrink-0">
            <p className="text-center text-base font-bold text-skin-neutral md:text-xl">
              <a
                href="tel:6042431505"
                className="rounded-lg px-2 py-3 outline-none ring-skin-neutral focus:ring-2"
              >
                <HiOutlinePhone className="-mt-1 inline h-6 w-6" /> 604.243.1505
              </a>
            </p>
            <p className="text-center text-xs md:hidden">
              Lions Gate Garage Doors
            </p>
          </div>
          <div className="flex flex-1 items-center justify-end">
            <button onClick={toggleNav} className="flex flex-col items-center">
              <HiMenu className="mx-6 h-10 w-10 text-skin-neutral" />
              <span className="text-xs md:text-base">Menu</span>
            </button>
          </div>
        </div>
      </header>
    </>
  )
}
