import { Content, isFilled } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { PrismicRichText } from '@/app/components/PrismicRichText'
import Heading from '@/app/components/Heading'
import Section from '@/app/components/Section'
import ButtonLink from '@/app/components/ButtonLink'
import { GiHomeGarage } from 'react-icons/gi'
import { RiQuestionnaireFill } from 'react-icons/ri'
import { FaToolbox } from 'react-icons/fa'
import React from 'react'

/**
 * Props for `CallToAction`.
 */
export type CallToActionProps = SliceComponentProps<Content.CallToActionSlice>

const icons = {
  GiHomeGarage,
  RiQuestionnaireFill,
  FaToolbox,
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
      >
        {slice.items.length > 0
          ? slice.items.map((item, i) => {
              let Icon
              if (item.icon) {
                Icon = icons[item.icon]
              }
              return (
                <React.Fragment key={`${slice.id}-${i}`}>
                  <div>
                    {Icon ? <Icon className="h-12 w-12" /> : null}
                    <h2>Request Quote</h2>
                    <p>A new Garage Door instantly improves your home</p>
                  </div>
                  <div>
                    <p>
                      <ButtonLink
                        field={item.button_link}
                        color={item.button_color || 'Inverted'}
                      >
                        Button
                      </ButtonLink>
                    </p>
                  </div>
                </React.Fragment>
              )
            })
          : null}
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
