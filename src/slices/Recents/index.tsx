import Section from '@/components/Section'
import { Content, isFilled } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { Suspense } from 'react'
import RecentsWrapper from './RecentsWrapper'
import { PrismicRichText } from '@/components/PrismicRichText'
import Heading from '@/components/Heading'

/**
 * Props for `Recents`.
 */
export type RecentsProps = SliceComponentProps<Content.RecentsSlice>

/**
 * Component for "Recents" Slices.
 */
const Recents = ({ slice }: RecentsProps): JSX.Element => {
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      width="xl"
      className="full-bleed-white flex-col bg-background"
    >
      {isFilled.richText(slice.primary.heading) && (
        <PrismicRichText field={slice.primary.heading} />
      )}
      {slice.variation === 'location' &&
        !isFilled.richText(slice.primary.heading) && (
          <Heading as="h2" size="4xl">
            Recent Garage Door Installations or Repairs in{' '}
            {slice.primary.location}
          </Heading>
        )}
      <Suspense fallback={<div>Loading...</div>}>
        <RecentsWrapper
          type={slice.primary.type}
          location={
            slice.variation === 'location' ? slice.primary.location : null
          }
          service={
            slice.variation === 'location' ? slice.primary.service : null
          }
        />
      </Suspense>
    </Section>
  )
}

export default Recents
