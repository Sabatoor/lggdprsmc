'use client'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
import Link from 'next/link'
import { SettingsDocumentDataNavigationItem } from '../../../prismicio-types'
import { ImageField, KeyTextField } from '@prismicio/client'
import { HiMenu } from 'react-icons/hi'

type NavbarProps = {
  navigation: Array<SettingsDocumentDataNavigationItem>
  logo?: ImageField
  title?: KeyTextField
}

export default function Navbar({ navigation, logo, title }: NavbarProps) {
  return (
    <header className="sticky top-0 z-20 bg-skin-base pb-4 shadow-sm md:pb-6 lg:pb-8">
      <div className="mb-4 bg-skin-fill py-1 md:mb-6 lg:mb-8">
        <p className="text-center text-xl font-bold text-skin-neutral">
          <a
            href="tel:6042431505"
            className="ring-skin-neutral rounded-lg px-2 py-3 outline-none focus:ring-2"
          >
            604.243.1505
          </a>
        </p>
      </div>
      <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-4">
        <Link
          href="/"
          className="ring-skin-primary rounded-lg outline-none focus:ring-2"
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
                          className="ring-skin-primary rounded-lg px-2 py-3 outline-none focus:ring-2"
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
          <HiMenu className="mx-6 h-10 w-10 text-skin-neutral xl:hidden" />
        </div>
      </div>
    </header>
  )
}
