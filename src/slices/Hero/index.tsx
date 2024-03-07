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
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={cn(
        'relative mx-auto flex flex-col overflow-hidden px-0 py-0 md:px-0 md:py-0 lg:py-0',
        { 'theme-alternate': slice.primary.theme === 'Alternate' },
      )}
    >
      <div className="aspect-h-9 aspect-w-16 relative">
        <PrismicNextImage
          field={slice.primary.background_image}
          className="w-full"
          priority={index === 0}
        />
      </div>
      {/* <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-skin-hue-primary via-skin-hue-primary to-transparent opacity-90" /> */}
      <div className="-mt-12 flex items-center justify-center rounded-t-lg bg-skin-neutral bg-opacity-45 py-4 text-skin-base backdrop-blur-md lg:-mt-24 lg:min-h-[250px] lg:py-8">
        <div>
          <PrismicRichText
            field={slice.primary.heading}
            components={{
              heading1: ({ children }) => (
                <Heading
                  as="h1"
                  size="7xl"
                  className="text-skin-base lg:text-center"
                >
                  {children}
                </Heading>
              ),
            }}
          />
          {isFilled.richText(slice.primary.description) && (
            <span className="relative my-6 flex justify-center text-skin-muted lg:mb-8">
              <PrismicRichText field={slice.primary.description} />
            </span>
          )}
          {slice.items.length > 0 && (
            <div className="mt-6 flex flex-col justify-center gap-8 lg:mt-8 lg:flex-row">
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
      </div>
    </section>
  )
}

export default Hero
