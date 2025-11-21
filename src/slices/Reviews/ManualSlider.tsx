'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardDescription,
  CardTitle,
} from '@/components/ui/card'
import { FaStar } from 'react-icons/fa6'
import Link from 'next/link'
import {
  BooleanField,
  DateField,
  KeyTextField,
  NumberField,
} from '@prismicio/client'

type ManualReviewProps = {
  reviewer_name: KeyTextField
  rating: NumberField | number
  review_text: KeyTextField
  review_date: DateField
  show_date: BooleanField
}
interface ManualReviewsProps {
  reviews: ManualReviewProps[]
}

const ManualSlider = ({ reviews }: ManualReviewsProps) => {
  return (
    <Carousel
      opts={{ loop: true }}
      plugins={[
        Autoplay({
          delay: 6000,
        }),
      ]}
      className="w-full max-w-[300px] md:max-w-(--breakpoint-sm) lg:max-w-(--breakpoint-lg)"
    >
      {reviews && (
        <CarouselContent className="h-full">
          {reviews.length > 0 && (
            <>
              {reviews.map(item => {
                const rawReviewDate = item.review_date as unknown as string
                const formattedDate = new Date(
                  rawReviewDate,
                ).toLocaleDateString('en-CA', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })
                return (
                  <CarouselItem
                    key={String(item.review_date)}
                    className="h-full md:basis-1/2 lg:basis-1/3"
                  >
                    <Card>
                      <Link
                        href={
                          'https://www.bbb.org/ca/bc/surrey/profile/garage-doors/lions-gate-garage-doors-ltd-0037-1377062/customer-reviews'
                        }
                      >
                        <CardHeader>
                          <CardTitle className="my-4 flex justify-center">
                            <p className="text-xs">{item.reviewer_name}</p>
                          </CardTitle>
                          <div className="flex justify-center">
                            {Array.from(
                              { length: Number(item.rating) },
                              (_, i) => (
                                <FaStar
                                  key={
                                    `star-${item.reviewer_name}-${i}` ||
                                    'noname' + i
                                  }
                                  className="text-yellow-400"
                                />
                              ),
                            )}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="line-clamp-10 min-h-[200px]">
                            {item.review_text}
                          </CardDescription>
                        </CardContent>
                        {item.show_date === true && (
                          <CardFooter className="flex flex-col items-center justify-center gap-3 pt-4 text-xs font-light text-neutral-600">
                            {formattedDate}
                          </CardFooter>
                        )}
                      </Link>
                    </Card>
                  </CarouselItem>
                )
              })}
            </>
          )}
        </CarouselContent>
      )}
      <CarouselPrevious className="hidden lg:inline-flex" />
      <CarouselNext className="hidden lg:inline-flex" />
    </Carousel>
  )
}
export default ManualSlider
