import Section from '@/app/components/Section'
import { Content, isFilled } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { LocationDocument } from '../../../prismicio-types'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText } from '@/app/components/PrismicRichText'
import Link from 'next/link'

/**
 * Props for `Locations`.
 */
export type LocationsProps = SliceComponentProps<Content.LocationsSlice>

/**
 * Component for "Locations" Slices.
 */
const Locations = ({ slice }: LocationsProps): JSX.Element => {
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      width="xl"
    >
      {slice.items.length > 0 && (
        <ul className="grid gap-6 lg:gap-12">
          {slice.items.map(item => {
            const location = item.location as unknown as LocationDocument
            return (
              <li key={location.id}>
                <Link
                  href={location.url || '#'}
                  className="grid gap-4 overflow-hidden rounded-lg border border-skin-neutral lg:grid-cols-3 lg:gap-8"
                >
                  <div className="relative min-h-28 lg:col-span-1">
                    <PrismicNextImage
                      field={location.data.featured_image}
                      className="object-cover"
                      imgixParams={{ ar: '1:1', fit: 'crop' }}
                      fill
                    />
                  </div>
                  <div className="p-4 lg:col-span-2 lg:p-8">
                    <PrismicRichText field={location.data.title} />
                    {isFilled.keyText(location.data.meta_description) && (
                      <p className="my-4">{location.data.meta_description}</p>
                    )}
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </Section>
  )
}

export default Locations
