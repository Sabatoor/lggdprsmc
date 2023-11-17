'use client'
import { PrismicNextLink } from '@prismicio/next'
import Link from 'next/link'
import Section from '@/app/components/Section'
import { SettingsDocumentDataNavigationItem } from '../../../prismicio-types'
import { isFilled } from '@prismicio/client'
// import Logo from '@/app/components/Logo'

type NavbarProps = {
  navigation: Array<SettingsDocumentDataNavigationItem>
}

export default function Navbar({ navigation }: NavbarProps) {
  return (
    <header className="sticky top-0 z-10 bg-skin-base pb-4 shadow-sm md:pb-6 lg:pb-8">
      <div className="mb-4 bg-skin-fill py-1 md:mb-6 lg:mb-8">
        <p className="text-center text-xl font-bold text-skin-neutral">
          <a href="tel:6042431505">604.243.1505</a>
        </p>
      </div>
      <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-4">
        <Link href="/">
          <h1>LOGO</h1>
          <span className="sr-only">Return to Homepage</span>
        </Link>
        {navigation.length > 0 && (
          <nav className="hidden text-xl lg:block">
            <ul className="flex gap-x-12">
              {navigation.map((item, i) => {
                if (item.label) {
                  return (
                    <li key={item.label + i}>
                      <PrismicNextLink field={item.link}>
                        {item.label}
                      </PrismicNextLink>
                    </li>
                  )
                }
              })}
            </ul>
          </nav>
        )}
      </div>
    </header>
  )
}
