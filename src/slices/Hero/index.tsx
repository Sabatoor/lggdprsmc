import { Content, isFilled } from '@prismicio/client'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
import { SliceComponentProps } from '@prismicio/react'

import { cn } from '@/app/lib/cn'
import Heading from '@/components/Heading'
import { PrismicRichText } from '@/components/PrismicRichText'
import { buttonVariants } from '@/components/ui/button'
import { ReactNode } from 'react'

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
      )}
    >
      <div className="aspect-h-9 aspect-w-16 relative">
        <PrismicNextImage
          field={slice.primary.background_image}
          className="absolute inset-0 object-cover"
          priority={index === 0}
          imgixParams={{ ar: '16:9', fit: 'crop' }}
          fill
          sizes="100vw"
        />
      </div>
      <div className="flex items-center justify-center bg-neutral py-4 text-background backdrop-blur-md lg:-mt-24 lg:min-h-[250px] lg:py-8">
        <div>
          <PrismicRichText
            field={slice.primary.heading}
            components={{
              heading1: ({ children }: { children: ReactNode }) => (
                <Heading
                  as="h1"
                  size="7xl"
                  className="text-primary lg:text-center"
                >
                  {children}
                </Heading>
              ),
            }}
          />
          {isFilled.richText(slice.primary.description) && (
            <span className="relative my-6 flex justify-center text-muted lg:mb-8">
              <PrismicRichText field={slice.primary.description} />
            </span>
          )}
          {slice.items.length > 0 && (
            <div className="mt-6 flex flex-col justify-center gap-8 lg:mt-8 lg:flex-row">
              {isFilled.link(slice.items[0].button_link) &&
                slice.items.map(item => (
                  <PrismicNextLink
                    key={item.button_label}
                    field={item.button_link}
                    className={cn(
                      buttonVariants({
                        variant: item.button_color || 'default',
                      }),
                      {
                        'bg-neutral': item.button_color === 'outline',
                        'text-neutral': item.button_color === 'default',
                      },
                    )}
                  >
                    {item.button_label}
                  </PrismicNextLink>
                ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Hero
