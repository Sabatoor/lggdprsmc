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
        'relative mx-auto flex flex-col overflow-hidden px-0 py-0 md:px-0 md:py-0 lg:py-0',
      )}
    >
      <div className="relative aspect-video">
        <PrismicNextImage
          field={slice.primary.background_image}
          className="absolute inset-0 object-cover"
          preload={index === 0}
          imgixParams={{ ar: '16:9', fit: 'crop' }}
          fill
          sizes="100vw"
          fetchPriority="high"
        />
      </div>
      <div className="flex items-center justify-center bg-neutral py-4 text-background backdrop-blur-md lg:-mt-24 lg:min-h-[250px] lg:py-8">
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
            <div className="flex flex-col justify-center gap-8 px-8 lg:flex-row lg:px-0">
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
