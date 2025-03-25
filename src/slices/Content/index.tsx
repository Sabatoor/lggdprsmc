import { Content as PrismicContent } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import Section from '@/components/Section'
import { PrismicRichText } from '@/components/PrismicRichText'
import React from 'react'
/**
 * Props for `Content`.
 */
export type ContentProps = SliceComponentProps<PrismicContent.ContentSlice>

/**
 * Component for "Content" Slices.
 */
const Content = ({ slice }: ContentProps): React.JSX.Element => {
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      width="lg"
      className="prose lg:prose-lg xl:prose-xl 2xl:prose-2xl mx-auto block w-full"
    >
      <PrismicRichText field={slice.primary.content} />
    </Section>
  )
}

export default Content
