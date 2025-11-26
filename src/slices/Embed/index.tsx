import { FC } from 'react'
import { Content, isFilled } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import Section from '@/components/Section'
import Heading from '@/components/Heading'
import { PrismicRichText } from '@/components/PrismicRichText'

/**
 * Props for `Embed`.
 */
export type EmbedProps = SliceComponentProps<Content.EmbedSlice>

/**
 * Component for "Embed" Slices.
 */
const Embed: FC<EmbedProps> = ({ slice }) => {
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="lg:my8 my-4 flex-col gap-4 bg-background"
    >
      {isFilled.richText(slice.primary.heading) && (
        <div className="flex items-center justify-center">
          <PrismicRichText field={slice.primary.heading} />
        </div>
      )}
      {slice?.primary?.url && (
        <iframe src={slice?.primary?.url} className="min-h-screen w-full" />
      )}
    </Section>
  )
}

export default Embed
