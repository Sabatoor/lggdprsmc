import Section from '@/components/Section'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import Slider from './Slider'

/**
 * Props for `Reviews`.
 */
export type ReviewsProps = SliceComponentProps<Content.ReviewsSlice>

/**
 * Component for "Reviews" Slices.
 */
const Reviews = async ({ slice }: ReviewsProps): Promise<JSX.Element> => {
  const data = await fetch(process.env.URL + '/api/reviews', {
    method: 'GET',
    cache: 'force-cache',
    next: {
      revalidate: 60 * 60 * 24 * 7,
    },
  }).then(res => res.json())
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-secondary"
    >
      <Slider reviews={data.place.reviews} />
    </Section>
  )
}

export default Reviews
