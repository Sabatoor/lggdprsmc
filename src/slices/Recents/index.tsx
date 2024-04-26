import Section from '@/components/Section'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { Suspense } from 'react'
import RecentList from './RecentList'
import { PrismicRichText } from '@/components/PrismicRichText'

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
      className="full-bleed-white bg-background flex-col"
    >
      <PrismicRichText field={slice.primary.heading} />
      <Suspense fallback={<div>Loading...</div>}>
        <RecentList type={slice.primary.type} />
      </Suspense>
    </Section>
  )
}

export default Recents
