import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import Section from '@/app/components/Section'
import { PrismicRichText } from '@/app/components/PrismicRichText'
/**
 * Props for `Content`.
 */
export type ContentProps = SliceComponentProps<Content.ContentSlice>

/**
 * Component for "Content" Slices.
 */
const Content = ({ slice }: ContentProps): JSX.Element => {
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      width="lg"
    >
      <div className="prose mx-auto lg:prose-lg">
        <PrismicRichText field={slice.primary.content} />
      </div>
    </Section>
  )
}

export default Content
