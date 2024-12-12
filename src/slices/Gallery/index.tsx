import Section from '@/components/Section'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { Suspense } from 'react'
import { FaSpinner } from 'react-icons/fa6'
import GalleryList from './GalleryList'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

/**
 * Props for `Gallery`.
 */
export type GalleryProps = SliceComponentProps<Content.GallerySlice>

interface PageNumber {
  page: number | undefined | null
}

interface Type {
  type: 'Installation' | 'Repair' | undefined | null
}

type contextProps = {
  pageNumber?: PageNumber
  type?: Type
}

/**
 * Component for "Gallery" Slices.
 */
const Gallery = async ({
  slice,
  context,
}: GalleryProps): Promise<JSX.Element> => {
  const { pageNumber, type } = context as contextProps
  const page = pageNumber?.page || 1

  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      width="2xl"
      className="flex flex-col"
    >
      <div className="flex justify-center gap-x-4 py-4 lg:gap-x-8 lg:py-8">
        <Button asChild>
          <Link href={`/our-gallery/?page=${page}&type=Installation`}>
            Installation Gallery
          </Link>
        </Button>
        <Button asChild>
          <Link href={`/our-gallery/?page=${page}&type=Repair`}>
            Repair Gallery
          </Link>
        </Button>
      </div>
      <Suspense
        fallback={
          <div className="grid min-h-[calc(100vh-80px)] place-content-center">
            <FaSpinner className="animate-spin text-primary" />
          </div>
        }
      >
        <GalleryList page={page} type={type?.type} />
      </Suspense>
    </Section>
  )
}

export default Gallery
