import { createClient } from '@/prismicio'
import { cn } from '@/app/lib/cn'
import Section from './Section'
import Link from 'next/link'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
import { isFilled } from '@prismicio/client'
import { FaFacebook, FaInstagram, FaLinkedin, FaYelp } from 'react-icons/fa'
import { PrismicRichText } from './PrismicRichText'
import React, { ReactNode } from 'react'
import CopyrightYear from './CopyrightYear'
import FooterBrag from './FooterBrag'
import { buttonVariants } from './ui/button'

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
        'bg-neutral text-background flex-col px-0 py-0 md:px-0 md:py-0 lg:px-0 lg:py-0 lg:text-lg',
      )}
    >
      <FooterBrag />
      <div className="text-background grid place-items-center gap-8 p-8 lg:grid-cols-2">
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
                          <Logo className="text-background ring-muted h-12 w-12 rounded p-1 group-focus:ring-2 lg:h-16 lg:w-16" />
                        )}
                        <span className="sr-only">{`View us on ${logo}`}</span>
                      </PrismicNextLink>
                    </li>
                  )
                })}
            </ul>
          ) : null}
        </div>
        <div className="prose lg:prose-lg prose-p:text-background prose-a:text-background prose-a:no-underline prose-ul:list-none prose-ul:pl-0 prose-li:pl-0 prose-a:hover:underline">
          <p className="font-heading text-background text-xl font-bold">
            Lions Gate Garage Doors LTD.
          </p>
          <PrismicRichText
            field={settings.data.company_information}
            components={{
              list: ({ children }: { children: ReactNode }) => (
                <ul>{children}</ul>
              ),
              listItem: ({ children }: { children: ReactNode }) => (
                <li className="text-background">{children}</li>
              ),
            }}
          />
          <p className="font-heading text-background text-xl font-bold">
            Terms of Service
          </p>
          {isFilled.richText(settings.data.terms_of_service) && (
            <PrismicRichText field={settings.data.terms_of_service} />
          )}
          <p className="font-heading text-background flex flex-wrap gap-8 text-xl font-bold">
            <Link
              href="/locations"
              className={cn(buttonVariants({ variant: 'link' }))}
            >
              Areas Served
            </Link>
            <Link
              href={'/sitemap.xml'}
              className={cn(buttonVariants({ variant: 'link' }))}
            >
              Sitemap
            </Link>
          </p>
        </div>
      </div>
      <div className="bg-primary text-neutral flex h-16 items-center justify-center place-self-stretch text-center">
        <CopyrightYear />
        <Link href="/">{`${settings.data.site_title}, LTD`}</Link>
      </div>
    </Section>
  )
}
