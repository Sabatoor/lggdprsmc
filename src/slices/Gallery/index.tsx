import Section from '@/components/Section'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { Suspense } from 'react'
import { FaSpinner } from 'react-icons/fa6'
import GalleryList from './GalleryList'

/**
 * Props for `Gallery`.
 */
export type GalleryProps = SliceComponentProps<Content.GallerySlice>

type contextProps = {
  page?: number
}

/**
 * Component for "Gallery" Slices.
 */
const Gallery = async ({
  slice,
  context,
}: GalleryProps): Promise<JSX.Element> => {
  const { page } = context as contextProps

  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      width="2xl"
      className="flex flex-col"
    >
      <Suspense
        fallback={
          <div className="grid min-h-[calc(100vh-80px)] place-content-center">
            <FaSpinner className="animate-spin text-primary" />
          </div>
        }
      >
        <GalleryList page={page} />
      </Suspense>
    </Section>
  )
}

export default Gallery
