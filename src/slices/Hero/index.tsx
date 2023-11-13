import { Content, isFilled } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { PrismicNextImage } from '@prismicio/next'
import Section from '@/app/components/Section'
import Heading from '@/app/components/Heading'
import { PrismicRichText } from '@/app/components/PrismicRichText'
import ButtonLink from '@/app/components/ButtonLink'
import { cn } from '@/app/lib/cn'

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice, index }: HeroProps): JSX.Element => {
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={cn(
        'relative mx-auto flex h-screen items-center justify-center overflow-hidden bg-skin-fill lg:h-[calc(100vh-72px)]',
        { 'theme-alternate': slice.primary.theme === 'Alternate' },
      )}
    >
      <PrismicNextImage
        field={slice.primary.background_image}
        className="absolute inset-0 h-full w-full object-cover opacity-30"
        fill
        sizes="100vw"
        priority={index === 0}
      />
      <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-skin-hue-primary via-skin-hue-primary to-transparent opacity-90" />
      <div className="relative mx-auto max-w-screen-xl text-skin-base">
        <PrismicRichText
          field={slice.primary.heading}
          components={{
            heading1: ({ children }) => (
              <Heading as="h1" size="7xl" className="text-skin-base">
                {children}
              </Heading>
            ),
          }}
        />
        <span className="relative text-skin-muted">
          <PrismicRichText field={slice.primary.description} />
        </span>
        {slice.items.length > 0 && (
          <div className="flex flex-col justify-center gap-8 lg:flex-row">
            {isFilled.link(slice.items[0].button_link) &&
              slice.items.map((item, index) => (
                <ButtonLink
                  field={item.button_link}
                  color={index === 0 ? item.button_color : 'Ghost'}
                  key={item.button_label}
                  className="border border-skin-base"
                >
                  {item.button_label}
                </ButtonLink>
              ))}
          </div>
        )}
      </div>
    </Section>
  )
}

export default Hero
