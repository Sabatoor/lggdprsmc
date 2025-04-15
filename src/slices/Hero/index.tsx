import { Content, isFilled } from '@prismicio/client'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
import { SliceComponentProps } from '@prismicio/react'

import { cn } from '@/app/lib/cn'
import Heading from '@/components/Heading'
import { PrismicRichText } from '@/components/PrismicRichText'
import { buttonVariants } from '@/components/ui/button'
import { ReactNode } from 'react'
import React from 'react'

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice, index }: HeroProps): React.JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={cn(
        'relative mx-auto flex flex-col overflow-hidden px-0 py-0 md:px-0 md:py-0 lg:py-0',
      )}
    >
      <div className="relative aspect-16/9">
        <PrismicNextImage
          field={slice.primary.background_image}
          className="absolute inset-0 object-cover"
          priority={index === 0}
          imgixParams={{ ar: '16:9', fit: 'crop' }}
          fill
          sizes="100vw"
        />
      </div>
      <div className="bg-neutral text-background flex items-center justify-center py-4 backdrop-blur-md lg:-mt-24 lg:min-h-[250px] lg:py-8">
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
            <span className="text-muted relative my-6 flex justify-center lg:mb-8">
              <PrismicRichText field={slice.primary.description} />
            </span>
          )}
          {slice.items.length > 0 && (
            <div className="mt-6 flex flex-col justify-center gap-8 px-8 lg:mt-8 lg:flex-row lg:px-0">
              {isFilled.link(slice.items[0].button_link) &&
                slice.items.map(item => (
                  <PrismicNextLink
                    key={item.button_label}
                    field={item.button_link}
                    className={cn(
                      buttonVariants({
                        variant: item.button_color || 'default',
                        size: 'lg',
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
