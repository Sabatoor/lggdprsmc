import Section from '@/components/Section'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import Slider from './Slider'
import { Suspense } from 'react'

/**
 * Props for `Reviews`.
 */
export type ReviewsProps = SliceComponentProps<Content.ReviewsSlice>

/**
 * Component for "Reviews" Slices.
 */
const Reviews = async ({ slice }: ReviewsProps): Promise<React.JSX.Element> => {
  const data =
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
      ? await fetch(
          `https://places.googleapis.com/v1/places/ChIJEx9psH3RhVQRRLQ3z5jvCAI?fields=rating,userRatingCount,reviews&languageCode=en&key=${process.env.GOOGLE_PLACES_API_KEY}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Referer: `https://lionsgategaragedoors.com`,
            },
            next: {
              revalidate: 60 * 60 * 24 * 7,
            },
          },
        ).then(res => res.json())
      : { reviews: [] }

  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-secondary"
    >
      <Suspense fallback={<div>Loading reviews...</div>}>
        <Slider reviews={data.reviews} />
      </Suspense>
    </Section>
  )
}

export default Reviews
