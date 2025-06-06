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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'

type ReviewProps = {
  name: string
  relativePublishTimeDescription: string
  rating: number
  text: {
    text: string
    languageCode: string
  }
  originalText?: {
    text: string
    languageCode: string
  }
  authorAttribution: {
    displayName: string
    uri: string
    photoUri: string
  }
  publishTime: string
}
interface ReviewsProps {
  reviews: ReviewProps[]
}

const Slider = ({ reviews }: ReviewsProps) => {
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
                return (
                  <CarouselItem
                    key={item.name}
                    className="h-full md:basis-1/2 lg:basis-1/3"
                  >
                    <Card>
                      <Link href={'https://g.co/kgs/6Dps4s1'}>
                        <CardHeader>
                          <CardTitle className="my-4 flex justify-center">
                            {Array.from({ length: item.rating }, (_, i) => (
                              <FaStar
                                key={item.name + i}
                                className="text-yellow-400"
                              />
                            ))}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="line-clamp-10 min-h-[200px]">
                            {item.text.text}
                          </CardDescription>
                        </CardContent>
                        <CardFooter className="flex flex-col items-center justify-center gap-3 pt-4">
                          <Avatar>
                            <AvatarImage
                              src={item.authorAttribution.photoUri}
                              alt={item.authorAttribution.displayName}
                            />
                            <AvatarFallback>
                              {item.authorAttribution.displayName}
                            </AvatarFallback>
                          </Avatar>
                          <p className="text-xs font-light">
                            {item.authorAttribution.displayName}
                          </p>
                        </CardFooter>
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
export default Slider
