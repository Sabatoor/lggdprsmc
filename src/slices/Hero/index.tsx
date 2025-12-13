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
    <div
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={cn(
        'relative mx-auto flex flex-col overflow-hidden px-0 py-0 md:px-0 md:py-0 2xl:h-dvh 2xl:max-h-270 2xl:py-0',
      )}
    >
      <div className="relative aspect-video w-full 2xl:aspect-auto 2xl:min-h-0 2xl:flex-1">
        <PrismicNextImage
          field={slice.primary.background_image}
          className="absolute inset-0 object-cover"
          preload={index === 0}
          imgixParams={{ fit: 'crop' }}
          fill
          sizes="100vw"
          fetchPriority="high"
        />
      </div>
      <div className="flex shrink-0 items-center justify-center bg-neutral p-4 text-background backdrop-blur-md 2xl:-mt-24 2xl:min-h-62.5 2xl:p-8 2xl:py-8">
        <div className="flex flex-col items-center">
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
            <span className="relative flex justify-center px-8 text-muted md:max-w-prose lg:mb-8 lg:pt-4 lg:text-xl">
              <PrismicRichText field={slice.primary.description} />
            </span>
          )}
          {isFilled.group(slice.primary.buttons) && (
            <div className="flex flex-col justify-center gap-8 p-4 px-8 lg:px-0 2xl:flex-row 2xl:p-8">
              {slice.primary.buttons.map((button, i) => (
                <PrismicNextLink
                  key={slice.id + i}
                  field={button.button_link}
                  className={cn(
                    buttonVariants({
                      variant: button.button_link.variant || 'default',
                      size: 'lg',
                    }),
                    {
                      'text-background hover:text-background':
                        button.button_link.variant === 'outline',
                      'text-neutral': button.button_link.variant === 'default',
                    },
                  )}
                >
                  {button.button_link.text}
                </PrismicNextLink>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Hero
