import { Content, isFilled } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { PrismicRichText } from '@/components/PrismicRichText'
import Section from '@/components/Section'
import { PrismicNextImage } from '@prismicio/next'
import { cn } from '@/app/lib/cn'
import { GiHomeGarage } from 'react-icons/gi'
import { FaToolbox } from 'react-icons/fa'
import { RiQuestionnaireFill } from 'react-icons/ri'
import React from 'react'
import Heading from '@/components/Heading'

/**
 * Props for `ImageWithText`.
 */
export type ImageWithTextProps = SliceComponentProps<Content.ImageWithTextSlice>

/**
 * Component for "ImageWithText" Slices.
 */
const ImageWithText = ({ slice, index }: ImageWithTextProps): JSX.Element => {
  if (slice.variation === 'twoColumn') {
    return (
      <Section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        width="xl"
        className="flex-col"
      >
        {isFilled.richText(slice.primary.heading) && (
          <>
            <PrismicRichText field={slice.primary.heading} />
            <div className="my-4 h-0.5 w-full rounded-full bg-primary lg:my-6" />
          </>
        )}
        <div className="grid lg:grid-cols-2 lg:gap-x-8">
          <div
            className={cn('aspect-h-9 aspect-w-16 overflow-hidden rounded-lg', {
              'lg:order-2': slice.primary.image_location,
            })}
          >
            <PrismicNextImage
              field={slice.primary.image}
              fallbackAlt=""
              priority={index < 2}
              fill
              sizes="95vw"
              className="rounded-lg object-cover transition duration-500 ease-in-out hover:scale-110"
              title={slice.primary.image.alt || ''}
            />
          </div>
          <div
            className={cn(
              'prose self-center px-0 py-4 lg:prose-lg xl:prose-xl lg:mr-6 lg:py-0',
              {
                'lg:order-1': slice.primary.image_location,
              },
            )}
          >
            {isFilled.richText(slice.primary.text) && (
              <PrismicRichText field={slice.primary.text} />
            )}
          </div>
        </div>
      </Section>
    )
  } else if (slice.variation === 'withIcon') {
    const icons = {
      Garage: GiHomeGarage,
      Question: RiQuestionnaireFill,
      Toolbox: FaToolbox,
    }
    let Icon: React.ElementType | null = null
    if (slice.primary.icon && icons[slice.primary.icon]) {
      Icon = icons[slice.primary.icon] as React.ElementType
    }
    return (
      <section className="group mx-auto grid max-w-screen-xl lg:grid-cols-2">
        <div
          className={cn('aspect-h-9 aspect-w-16 overflow-hidden', {
            'lg:order-2': slice.primary.image_location,
          })}
        >
          <PrismicNextImage
            field={slice.primary.image}
            fallbackAlt=""
            priority={index < 2}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition duration-500 ease-in-out group-hover:scale-110"
            title={slice.primary.image.alt || ''}
          />
        </div>
        <div
          className={cn('flex flex-col items-center bg-neutral p-4 lg:p-6', {
            'lg:order-1': slice.primary.image_location,
          })}
        >
          {isFilled.select(slice.primary.icon) && (
            <>
              {Icon && <Icon className="h-24 w-24 text-primary" />}

              <div className="my-4 h-0.5 w-full rounded-full bg-primary lg:my-6" />
            </>
          )}
          {isFilled.richText(slice.primary.heading) ? (
            <PrismicRichText
              field={slice.primary.heading}
              components={{
                heading2: ({ children }) => (
                  <Heading
                    as="h2"
                    size="3xl"
                    className="pb-4 text-center text-primary"
                  >
                    {children}
                  </Heading>
                ),
              }}
            />
          ) : null}
          <PrismicRichText
            field={slice.primary.text}
            components={{
              paragraph: ({ children }) => (
                <p className="prose self-start text-background lg:prose-lg xl:prose-xl">
                  {children}
                </p>
              ),
            }}
          />
        </div>
      </section>
    )
  }
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      width="xl"
    >
      <div className="grid grid-cols-1 items-center lg:grid-cols-3 lg:gap-12">
        <div
          className={cn('col-span-1 flex justify-center', {
            'lg:order-3': slice.primary.image_location,
          })}
        >
          <PrismicNextImage
            field={slice.primary.image}
            className={cn('my-6 w-1/2 rounded-lg shadow-md lg:w-full')}
            fallbackAlt=""
            priority={index < 2}
            title={slice.primary.image.alt || ''}
            imgixParams={{ ar: '4:5', fit: 'crop' }}
          />
        </div>
        <div
          className={cn('prose col-span-2 lg:prose-lg xl:prose-xl', {
            'order-1': slice.primary.image_location,
          })}
        >
          {isFilled.richText(slice.primary.heading) && (
            <PrismicRichText field={slice.primary.heading} />
          )}
          {isFilled.richText(slice.primary.text) && (
            <PrismicRichText field={slice.primary.text} />
          )}
        </div>
      </div>
    </Section>
  )
}

export default ImageWithText
