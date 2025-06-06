'use client'
import { PrismicRichText } from '@/components/PrismicRichText'
import Section from '@/components/Section'
import { Content, isFilled } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { SliceComponentProps } from '@prismicio/react'
import * as React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
/**
 * Props for `Scroller`.
 */
export type ScrollerProps = SliceComponentProps<Content.ScrollerSlice>

/**
 * Component for "Scroller" Slices.
 */
const Scroller = ({ slice, index }: ScrollerProps): React.JSX.Element => {
  const dupedImages = [...slice.items, ...slice.items]
  React.useEffect(() => {
    const scrollers = document.querySelectorAll('.scroller')
    const scrollSkeletons = document.querySelectorAll('.scroll-skeleton')
    if (scrollers instanceof NodeList && scrollSkeletons instanceof NodeList) {
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        scrollers.forEach(scroller => {
          scroller.setAttribute('data-animated', 'true')

          const scrollerInner = scroller.querySelector('.scroller__inner')
          if (scrollerInner) {
            scrollerInner.classList.remove('hidden')
            scrollerInner.classList.add('flex')
          }
        })
        scrollSkeletons.forEach(skeleton => {
          skeleton.remove()
        })
      }
    }
    return () => {
      // Cleanup function to remove aria-hidden attributes
      scrollers.forEach(scroller => {
        scroller.removeAttribute('data-animated')

        const scrollerInner = scroller.querySelector('.scroller__inner')
        if (scrollerInner) {
          scrollerInner.classList.remove('flex')
          scrollerInner.classList.add('hidden')
        }
      })
    }
  }, [])

  /**
   * Carousel State
   */

  const carouselItems = isFilled.group(slice.primary.items)
    ? slice.primary.items
    : slice.items.length > 0
      ? slice.items
      : null

  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="flex-col lg:px-16 xl:px-0"
      width="lg"
    >
      {isFilled.richText(slice.primary.heading) && (
        <div className="flex justify-center pb-4 md:pb-6 lg:pb-10">
          <PrismicRichText field={slice.primary.heading} />
        </div>
      )}
      {carouselItems && (
        <Carousel
          opts={{ loop: true }}
          plugins={[Autoplay({ delay: 6000 })]}
          className="w-full max-w-(--breakpoint-sm) lg:max-w-(--breakpoint-lg)"
        >
          <CarouselContent className="h-full">
            {carouselItems &&
              carouselItems.map(item => {
                return (
                  <CarouselItem
                    key={item.image.id}
                    className={cn('relative h-full', {
                      'xl:basis-1/2': slice.primary.desktop_columns === '2',
                      'lg:basis-1/2 xl:basis-1/3':
                        slice.primary.desktop_columns === '3',
                      'lg:basis-1/2 xl:basis-1/4':
                        slice.primary.desktop_columns === '4',
                    })}
                  >
                    {/* <Card className="">
                        <CardContent className="p-0">
                          <Link href={item.image.url || '#'}>
                            <PrismicNextImage
                              field={item.image}
                              imgixParams={{
                                ar: '16:9',
                                fit: 'crop',
                              }}
                              fill
                              className="object-cover"
                            />
                          </Link>
                        </CardContent>
                      </Card> */}
                    <Card className="relative aspect-16/9">
                      <CardContent className="p-0">
                        <Link href={item.image.url || '#'}>
                          <PrismicNextImage
                            field={item.image}
                            fill
                            className="absolute inset-0 rounded-lg object-cover"
                          />
                        </Link>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                )
              })}
          </CarouselContent>

          <CarouselNext variant={'default'} className="hidden lg:inline-flex" />
          <CarouselPrevious
            variant={'default'}
            className="hidden lg:inline-flex"
          />
        </Carousel>
      )}
    </Section>
  )
}

export default Scroller
