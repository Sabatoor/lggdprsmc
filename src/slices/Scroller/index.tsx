'use client'
import { Content, isFilled } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { PrismicNextImage } from '@prismicio/next'
import * as React from 'react'
import { PrismicRichText } from '@/app/components/PrismicRichText'

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
  return (
    <section className="my-4 grid place-content-center">
      {isFilled.richText(slice.primary.heading) && (
        <PrismicRichText
          field={slice.primary.heading}
          components={{
            heading2: ({ children }) => (
              <h2 className="mb-4 mt-6 text-center font-outfit text-3xl font-bold text-skin-primary md:text-4xl lg:text-5xl">
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
