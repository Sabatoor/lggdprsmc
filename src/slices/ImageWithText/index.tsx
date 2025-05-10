import { Content, isFilled } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { PrismicRichText } from '@/components/PrismicRichText'
import Section from '@/components/Section'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
import { cn } from '@/app/lib/cn'
import { GiHomeGarage } from 'react-icons/gi'
import { FaToolbox } from 'react-icons/fa'
import { RiQuestionnaireFill } from 'react-icons/ri'
import React, { ReactNode } from 'react'
import Heading from '@/components/Heading'
import { Button } from '@/components/ui/button'

/**
 * Props for `ImageWithText`.
 */
export type ImageWithTextProps = SliceComponentProps<Content.ImageWithTextSlice>

/**
 * Component for "ImageWithText" Slices.
 */
const ImageWithText = ({
  slice,
  index,
}: ImageWithTextProps): React.JSX.Element => {
  if (slice.variation === 'twoColumn') {
    return (
      <Section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        width="xl"
        className="flex-col"
      >
        {isFilled.richText(slice.primary.heading) && (
          <>
            <PrismicRichText field={slice.primary.heading} />
            <div className="bg-primary my-4 h-0.5 w-full rounded-full lg:my-6" />
          </>
        )}
        <div className="grid lg:grid-cols-2 lg:gap-x-8">
          <div
            className={cn('relative aspect-16/9 overflow-hidden rounded-lg', {
              'lg:order-2': slice.primary.image_location,
            })}
          >
            <PrismicNextImage
              field={slice.primary.image}
              fallbackAlt=""
              priority={index < 2}
              fill
              sizes="(min-width: 1360px) 600px, (min-width: 1040px) calc(40vw + 64px), (min-width: 740px) 656px, 92.38vw"
              className="absolute inset-0 rounded-lg object-cover transition duration-500 ease-in-out hover:scale-110"
              title={slice.primary.image.alt || ''}
            />
          </div>
          <div
            className={cn(
              'prose lg:prose-lg xl:prose-xl self-center px-0 py-4 lg:mr-6 lg:py-0',
              {
                'lg:order-1': slice.primary.image_location,
              },
            )}
          >
            {isFilled.richText(slice.primary.text) && (
              <PrismicRichText field={slice.primary.text} />
            )}
          </div>
        </div>
      </Section>
    )
  } else if (slice.variation === 'withIcon') {
    const icons = {
      Garage: GiHomeGarage,
      Question: RiQuestionnaireFill,
      Toolbox: FaToolbox,
    }
    let Icon: React.ElementType | null = null
    if (slice.primary.icon && icons[slice.primary.icon]) {
      Icon = icons[slice.primary.icon] as React.ElementType
    }
    return (
      <section className="group mx-auto grid max-w-(--breakpoint-xl) lg:grid-cols-2">
        <div
          className={cn('relative aspect-16/9 overflow-hidden', {
            'lg:order-2': slice.primary.image_location,
          })}
        >
          <PrismicNextImage
            field={slice.primary.image}
            fallbackAlt=""
            priority={index < 2}
            fill
            sizes="(min-width: 1380px) 640px, (min-width: 1040px) calc(37.19vw + 134px), 100vw"
            className="absolute inset-0 object-cover transition duration-500 ease-in-out group-hover:scale-110"
            title={slice.primary.image.alt || ''}
          />
        </div>
        <div
          className={cn('bg-neutral flex flex-col items-center p-4 lg:p-6', {
            'lg:order-1': slice.primary.image_location,
          })}
        >
          {isFilled.select(slice.primary.icon) && (
            <>
              {Icon && <Icon className="text-primary h-24 w-24" />}

              <div className="bg-primary my-4 h-0.5 w-full rounded-full lg:my-6" />
            </>
          )}
          {isFilled.richText(slice.primary.heading) ? (
            <PrismicRichText
              field={slice.primary.heading}
              components={{
                heading2: ({ children }: { children: ReactNode }) => (
                  <Heading
                    as="h2"
                    size="3xl"
                    className="text-primary pb-4 text-center"
                  >
                    {children}
                  </Heading>
                ),
              }}
            />
          ) : null}
          <PrismicRichText
            field={slice.primary.text}
            components={{
              paragraph: ({ children }: { children: ReactNode }) => (
                <p className="prose text-background lg:prose-lg xl:prose-xl self-start">
                  {children}
                </p>
              ),
            }}
          />
        </div>
      </section>
    )
  }
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      width="xl"
    >
      <div className="grid grid-cols-1 items-center lg:grid-cols-3 lg:gap-12">
        <div
          className={cn('col-span-1 flex justify-center', {
            'lg:order-3': slice.primary.image_location,
          })}
        >
          {isFilled.link(slice.primary.image_link) ? (
            <PrismicNextLink
              field={slice.primary.image_link}
              title={slice.primary.image_link.text}
            >
              <PrismicNextImage
                field={slice.primary.image}
                className={cn('my-6 w-1/2 rounded-lg shadow-md lg:w-full')}
                fallbackAlt=""
                priority={index < 2}
                imgixParams={{ ar: '4:5', fit: 'crop' }}
              />
            </PrismicNextLink>
          ) : (
            <PrismicNextImage
              field={slice.primary.image}
              className={cn('my-6 w-1/2 rounded-lg shadow-md lg:w-full')}
              fallbackAlt=""
              priority={index < 2}
              title={slice.primary.image.alt || ''}
              imgixParams={{ ar: '4:5', fit: 'crop' }}
            />
          )}
        </div>
        <div
          className={cn('prose lg:prose-lg xl:prose-xl col-span-2', {
            'order-1': slice.primary.image_location,
          })}
        >
          {isFilled.richText(slice.primary.heading) && (
            <PrismicRichText field={slice.primary.heading} />
          )}
          {isFilled.richText(slice.primary.text) && (
            <PrismicRichText field={slice.primary.text} />
          )}
          {slice.variation === 'default' && (
            <div className="not-prose flex flex-wrap justify-evenly gap-y-4 lg:gap-y-0">
              {slice.primary.call_to_action &&
                slice.primary.call_to_action.map(link => {
                  if (isFilled.link(link)) {
                    return (
                      <Button
                        key={link.key}
                        asChild
                        variant={link.variant || 'default'}
                        className={cn({
                          'text-foreground':
                            link.variant === 'destructive' ||
                            link.variant === 'link',
                          'text-foreground hover:bg-secondary hover:shadow-primary transition duration-300 ease-in-out':
                            link.variant === 'ghost',
                        })}
                        size={'lg'}
                      >
                        <PrismicNextLink field={link}>
                          {link.text}
                        </PrismicNextLink>
                      </Button>
                    )
                  } else {
                    return <></>
                  }
                })}
            </div>
          )}
        </div>
      </div>
    </Section>
  )
}

export default ImageWithText
