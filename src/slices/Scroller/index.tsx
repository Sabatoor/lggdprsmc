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
const Scroller = ({ slice, index }: ScrollerProps): JSX.Element => {
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

  if (slice.variation === 'carousel') {
    const carouselItems = isFilled.group(slice.primary.items)
      ? slice.primary.items
      : slice.items.length > 0
        ? slice.items
        : null

    return (
      <Section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="flex-col"
        width="xl"
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
            className="w-full max-w-screen-sm lg:max-w-screen-lg"
          >
            <CarouselContent>
              {carouselItems &&
                carouselItems.map(item => {
                  return (
                    <CarouselItem
                      key={item.image.id}
                      className={cn('h-full', {
                        'xl:basis-1/2': slice.primary.desktop_columns === '2',
                        'lg:basis-1/2 xl:basis-1/3':
                          slice.primary.desktop_columns === '3',
                        'lg:basis-1/2 xl:basis-1/4':
                          slice.primary.desktop_columns === '4',
                      })}
                    >
                      <Card className="aspect-h-9 aspect-w-16 overflow-hidden">
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
                      </Card>
                    </CarouselItem>
                  )
                })}
            </CarouselContent>

            <CarouselNext className="hidden md:inline-flex" />
            <CarouselPrevious className="hidden md:inline-flex" />
          </Carousel>
        )}
      </Section>
    )
  }
  return (
    <section className="my-4 grid place-content-center">
      {isFilled.richText(slice.primary.heading) && (
        <PrismicRichText
          field={slice.primary.heading}
          components={{
            heading2: ({ children }) => (
              <h2 className="mb-4 mt-6 text-center font-heading text-3xl font-bold text-neutral md:text-4xl lg:text-5xl">
                {children}
              </h2>
            ),
          }}
        />
      )}
      <div
        id={`scroller-${index}`}
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="scroller max-w-screen-lg"
        data-speed={`${slice.primary.speed?.toLowerCase()}`}
        data-direction={`${slice.primary.scroll_direction ? 'right' : 'left'}`}
      >
        <div className="scroll-skeleton h-[300px]" />
        <ul className="scroller__inner relative hidden flex-wrap gap-4 py-4">
          {dupedImages.length > 0 &&
            dupedImages.map((item, i) => (
              <li key={item.image.url + `${i}`}>
                <PrismicNextImage
                  field={item.image}
                  fallbackAlt=""
                  className="h-[300px] w-[400px]"
                  aria-hidden={i > slice.items.length - 1}
                  priority={index < 2}
                  title={item.image.alt || ''}
                />
              </li>
            ))}
        </ul>
      </div>
    </section>
  )
}

export default Scroller
