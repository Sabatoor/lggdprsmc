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
    <Section
      as="header"
      className="bg-skin-base sticky top-0 z-10 py-4 shadow-sm md:py-4 lg:py-6"
    >
      <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between">
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
    </Section>
  )
}
