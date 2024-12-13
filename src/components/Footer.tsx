import { createClient } from '@/prismicio'
import { cn } from '@/app/lib/cn'
import Section from './Section'
import Link from 'next/link'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
import { isFilled } from '@prismicio/client'
import { FaFacebook, FaInstagram, FaLinkedin, FaYelp } from 'react-icons/fa'
import { PrismicRichText } from './PrismicRichText'
import React from 'react'
import CopyrightYear from './CopyrightYear'

export default async function Footer() {
  const client = createClient()
  const settings = await client.getSingle('settings')
  const icons = {
    Facebook: FaFacebook,
    Instagram: FaInstagram,
    LinkedIn: FaLinkedin,
    Yelp: FaYelp,
  }
  return (
    <Section
      as="footer"
      className={cn(
        'flex-col bg-neutral px-0 py-0 text-background md:px-0 md:py-0 lg:px-0 lg:py-0 lg:text-lg',
      )}
    >
      <div className="grid place-items-center gap-8 p-8 text-background lg:grid-cols-2">
        <div className="flex flex-col place-content-center">
          <PrismicNextImage field={settings.data.footer_logo} />

          {settings.data.footer_socials.length > 0 ? (
            <ul className="flex w-full justify-between">
              {isFilled.select(settings.data.footer_socials[0]?.logo) &&
                settings.data.footer_socials.map(({ logo, social_url }, i) => {
                  let Logo: React.ElementType | null = null
                  if (logo && icons[logo]) {
                    Logo = icons[logo] as React.ElementType
                  }
                  return (
                    <li key={settings.id + `footer-social` + i}>
                      <PrismicNextLink field={social_url}>
                        {Logo && (
                          <Logo className="h-12 w-12 rounded p-1 text-background ring-muted group-focus:ring-2 lg:h-16 lg:w-16" />
                        )}
                        <span className="sr-only">{`View us on ${logo}`}</span>
                      </PrismicNextLink>
                    </li>
                  )
                })}
            </ul>
          ) : null}
        </div>
        <div className="prose lg:prose-lg prose-p:text-background prose-a:text-background prose-a:no-underline prose-ul:list-none prose-ul:pl-0 prose-li:pl-0">
          <p className="font-heading text-xl font-bold text-background">
            Lions Gate Garage Doors LTD.
          </p>
          <PrismicRichText
            field={settings.data.company_information}
            components={{
              list: ({ children }) => <ul>{children}</ul>,
              listItem: ({ children }) => (
                <li className="text-background">{children}</li>
              ),
            }}
          />
          <p className="font-heading text-xl font-bold text-background">
            Terms of Service
          </p>
          {isFilled.richText(settings.data.terms_of_service) && (
            <PrismicRichText field={settings.data.terms_of_service} />
          )}
          <p className="flex flex-wrap gap-8 font-heading text-xl font-bold text-background">
            <Link href="/locations">Areas Served</Link>
            <Link href={'/sitemap.xml'}>Sitemap</Link>
          </p>
        </div>
      </div>
      <div className="flex h-16 items-center justify-center place-self-stretch bg-primary text-center text-neutral">
        <CopyrightYear />
        <Link href="/">{`${settings.data.site_title}, LTD`}</Link>
      </div>
    </Section>
  )
}
