import { Content, isFilled } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { PrismicRichText } from '@/app/components/PrismicRichText'
import Section from '@/app/components/Section'
import { PrismicNextImage } from '@prismicio/next'
import { cn } from '@/app/lib/cn'

/**
 * Props for `ImageWithText`.
 */
export type ImageWithTextProps = SliceComponentProps<Content.ImageWithTextSlice>

/**
 * Component for "ImageWithText" Slices.
 */
const ImageWithText = ({ slice, index }: ImageWithTextProps): JSX.Element => {
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      width="lg"
    >
      <div className="grid grid-cols-1 items-center lg:grid-cols-3 lg:gap-12">
        <div
          className={cn('col-span-1 flex justify-center', {
            'lg:order-3': slice.primary.image_location,
          })}
        >
          <PrismicNextImage
            field={slice.primary.image}
            className={cn('my-6 rounded-lg')}
            fallbackAlt=""
            priority={index < 2}
            title={slice.primary.image.alt || ''}
          />
        </div>
        <div
          className={cn('col-span-2', {
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
