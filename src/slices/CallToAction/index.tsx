import { Content, isFilled } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { PrismicRichText } from '@/app/components/PrismicRichText'
import Heading from '@/app/components/Heading'
import Section from '@/app/components/Section'
import ButtonLink from '@/app/components/ButtonLink'
import { GiHomeGarage } from 'react-icons/gi'
import { RiQuestionnaireFill } from 'react-icons/ri'
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYelp,
  FaToolbox,
} from 'react-icons/fa'
import React from 'react'
import { PrismicNextLink } from '@prismicio/next'

/**
 * Props for `CallToAction`.
 */
export type CallToActionProps = SliceComponentProps<Content.CallToActionSlice>

const icons = {
  GiHomeGarage,
  RiQuestionnaireFill,
  FaToolbox,
  Facebook: FaFacebook,
  Instagram: FaInstagram,
  LinkedIn: FaLinkedin,
  Yelp: FaYelp,
}

/**
 * Component for "CallToAction" Slices.
 */
const CallToAction = ({ slice }: CallToActionProps): JSX.Element => {
  if (slice.variation === 'featuredGrid') {
    return (
      <Section
        width="2xl"
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="flex-wrap place-items-center justify-center gap-4 py-6 lg:gap-8"
      >
        {slice.items.length > 0
          ? slice.items.map((item, i) => {
              let Icon
              if (item.icon) {
                Icon = icons[item.icon]
              }
              return (
                <div
                  key={`${slice.id}-${i}`}
                  className="max-w-sm overflow-hidden rounded-lg bg-skin-white p-4 shadow lg:p-6"
                >
                  <div className="flex flex-col items-center">
                    {Icon ? (
                      <Icon className="h-16 w-16 text-skin-primary" />
                    ) : null}
                    <PrismicRichText
                      field={item.heading}
                      components={{
                        heading2: ({ children }) => (
                          <Heading
                            as="h2"
                            size="3xl"
                            className="my-2 text-skin-neutral lg:my-3"
                          >
                            {children}
                          </Heading>
                        ),
                      }}
                    />
                    <PrismicRichText field={item.description} />
                  </div>
                  {isFilled.link(item.button_link) ? (
                    <div className="mb-4 mt-6 flex justify-center">
                      <ButtonLink
                        field={item.button_link}
                        color={item.button_color || 'Inverted'}
                      >
                        {item.button_label || 'Click Here'}
                      </ButtonLink>
                    </div>
                  ) : null}
                </div>
              )
            })
          : null}
      </Section>
    )
  } else if (slice.variation === 'social') {
    return (
      <Section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="bg-skin-fill"
      >
        <div className="mx-auto flex max-w-screen-sm flex-col items-center">
          <PrismicRichText
            field={slice.primary.heading}
            components={{
              heading2: ({ children }) => (
                <Heading as="h2" size="5xl" className="text-skin-neutral">
                  {children}
                </Heading>
              ),
            }}
          />
          <ul className="mt-4 grid grid-flow-col gap-4 lg:mt-6 lg:gap-8">
            {slice.items.length > 0 && isFilled.select(slice.items[0].logo)
              ? slice.items.map((item, i) => {
                  let Icon
                  if (item.logo) {
                    Icon = icons[item.logo]
                  }
                  return (
                    <li key={slice.id + i}>
                      <PrismicNextLink
                        field={item.social_url}
                        className="group outline-none"
                      >
                        {isFilled.link(item.social_url) && (
                          <>
                            <Icon className="h-16 w-16 rounded p-1 text-skin-white ring-skin-muted group-focus:ring-2" />
                            <span className="sr-only">
                              {`View us on ${item.logo}`}
                            </span>
                          </>
                        )}
                      </PrismicNextLink>
                    </li>
                  )
                })
              : null}
          </ul>
        </div>
      </Section>
    )
  }
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-skin-neutral"
    >
      <Section as="div" width="xl" className="grid lg:grid-cols-3">
        <div className="flex flex-col items-center gap-6 lg:col-span-2 lg:flex-row">
          <GiHomeGarage className="-mt-3 h-24 w-24 text-skin-primary" />
          <PrismicRichText
            field={slice.primary.heading}
            components={{
              heading2: ({ children }) => (
                <Heading
                  as="h2"
                  size="4xl"
                  className="text-3xl uppercase text-skin-muted md:text-4xl"
                >
                  {children}
                </Heading>
              ),
            }}
          />
        </div>
        <div className="my-8 justify-self-center lg:justify-self-end">
          <ButtonLink
            field={slice.primary.button_link}
            className="border border-skin-base"
            color={slice.primary.button_color || 'Inverted'}
          >
            {slice.primary.button_label}
          </ButtonLink>
        </div>
      </Section>
    </Section>
  )
}

export default CallToAction
