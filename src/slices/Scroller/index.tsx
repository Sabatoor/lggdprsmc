'use client'
import { Content, isFilled } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { PrismicNextImage } from '@prismicio/next'
import * as React from 'react'
import { PrismicRichText } from '@/app/components/PrismicRichText'
import { AnimatePresence, motion } from 'framer-motion'
import useMeasure from 'react-use-measure'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'

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
  let [ref, { width }] = useMeasure()
  let [count, setCount] = React.useState(1)
  let prev = usePrevious(count) as number
  let direction = count > prev ? 1 : -1

  if (slice.variation === 'carousel') {
    return (
      <section className="flex justify-center">
        <div className="w-full max-w-screen-xl text-skin-white">
          <div className="flex justify-center">
            <div className="aspect-hd w-full">
              <div
                ref={ref}
                className="relative my-6 flex h-full items-center justify-center overflow-hidden bg-skin-neutral lg:my-8 lg:rounded-lg"
              >
                <button
                  onClick={() => {
                    if (count === 1) {
                      setCount(slice.items.length)
                    } else {
                      setCount(count - 1)
                    }
                  }}
                  className="absolute left-0 z-10 h-full px-1 transition duration-300 ease-in-out hover:bg-skin-neutral hover:bg-opacity-50"
                >
                  <HiChevronLeft className="h-10 w-10" />
                </button>
                <button
                  onClick={() => {
                    if (count === slice.items.length) {
                      setCount(1)
                    } else {
                      setCount(count + 1)
                    }
                  }}
                  className="absolute right-0 z-10 h-full px-1 transition duration-300 ease-in-out hover:bg-skin-neutral hover:bg-opacity-50"
                >
                  <HiChevronRight className="h-10 w-10" />
                </button>
                <AnimatePresence>
                  <motion.div key={count}>
                    <PrismicNextImage
                      field={slice.items[count - 1].image}
                      fill
                      sizes="100vw"
                      className="object-cover opacity-30"
                      imgixParams={{ blur: 200 }}
                    />
                  </motion.div>
                </AnimatePresence>
                <AnimatePresence custom={{ direction, width }}>
                  <motion.div
                    key={count}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    custom={{ direction, width }}
                    className={`absolute flex h-2/3 w-2/3 items-center justify-center`}
                  >
                    <PrismicNextImage
                      field={slice.items[count - 1].image}
                      className="rounded-lg"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
  return (
    <section className="my-4 grid place-content-center">
      {isFilled.richText(slice.primary.heading) && (
        <PrismicRichText
          field={slice.primary.heading}
          components={{
            heading2: ({ children }) => (
              <h2 className="mb-4 mt-6 text-center font-heading text-3xl font-bold text-skin-neutral md:text-4xl lg:text-5xl">
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

let variants = {
  enter: ({ direction, width }: { direction: number; width: number }) => ({
    x: direction * width,
  }),
  center: { x: 0 },
  exit: ({ direction, width }: { direction: number; width: number }) => ({
    x: direction * -width,
  }),
}

function usePrevious(state: number) {
  let [tuple, setTuple] = React.useState([null, state])

  if (tuple[1] !== state) {
    setTuple([tuple[1], state])
  }

  return tuple[0]
}

export default Scroller
