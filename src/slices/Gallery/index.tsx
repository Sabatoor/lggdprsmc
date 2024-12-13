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
      <div className="-mt-6 mb-4 flex w-full flex-wrap justify-center gap-x-4 gap-y-8 rounded-lg bg-muted/90 py-4 backdrop-blur-sm lg:sticky lg:top-28 lg:z-10 lg:-mt-0 lg:mb-0 lg:gap-x-8 lg:gap-y-0 lg:py-8">
        {type?.type ? (
          <Button asChild variant={'outline'}>
            <Link href={`/our-gallery/?page=${page}`}>
              All Lions Gate Garage Door Jobs
            </Link>
          </Button>
        ) : (
          <Button disabled variant={'outline'}>
            All Lions Gate Garage Door Jobs
          </Button>
        )}
        {type?.type !== 'Installation' ? (
          <Button asChild>
            <Link href={`/our-gallery/?page=${page}&type=Installation`}>
              Garage Door Installation Gallery
            </Link>
          </Button>
        ) : (
          <Button disabled>Garage Door Installation Gallery </Button>
        )}
        {type?.type !== 'Repair' ? (
          <Button asChild>
            <Link href={`/our-gallery/?page=${page}&type=Repair`}>
              Garage Door Repair Gallery
            </Link>
          </Button>
        ) : (
          <Button disabled>Garage Door Repair Gallery</Button>
        )}
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
