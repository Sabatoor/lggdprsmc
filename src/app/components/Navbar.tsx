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
      <header className="sticky top-0 z-20 bg-skin-white pb-4 shadow-sm md:pb-6 lg:pb-8">
        <div className="mb-4 bg-skin-fill py-2 md:mb-6 lg:mb-8 lg:py-3">
          <p className="text-center text-xl font-bold text-skin-neutral">
            <a
              href="tel:6042431505"
              className="rounded-lg px-2 py-3 outline-none ring-skin-neutral focus:ring-2"
            >
              <HiOutlinePhone className="-mt-1 inline h-6 w-6" /> 604.243.1505
            </a>
          </p>
        </div>
        <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-4">
          <Link
            href="/"
            className="rounded-lg outline-none ring-skin-primary focus:ring-2"
          >
            {logo ? <PrismicNextImage field={logo} /> : <h1>{title}</h1>}
            <span className="sr-only">Return to Homepage</span>
          </Link>
          <div className="flex items-center">
            {navigation.length > 0 && (
              <nav className="hidden text-xl xl:block">
                <ul className="flex gap-x-2">
                  {navigation.map((item, i) => {
                    if (item.label) {
                      return (
                        <li key={item.label + i}>
                          <PrismicNextLink
                            field={item.link}
                            className="rounded-lg px-2 py-3 outline-none ring-skin-primary focus:ring-2"
                          >
                            {item.label}
                          </PrismicNextLink>
                        </li>
                      )
                    }
                  })}
                </ul>
              </nav>
            )}
            <button onClick={toggleNav}>
              <HiMenu className="mx-6 h-10 w-10 text-skin-neutral xl:hidden" />
              <span className="sr-only">Toggle Navigation</span>
            </button>
          </div>
        </div>
      </header>
    </>
  )
}
