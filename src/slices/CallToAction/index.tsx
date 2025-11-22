'use client'
import { ReactNode } from 'react'
import { cn } from '@/app/lib/cn'
import Heading from '@/components/Heading'
import { PrismicRichText } from '@/components/PrismicRichText'
import Section from '@/components/Section'
import { buttonVariants } from '@/components/ui/button'
import { asText, Content, isFilled } from '@prismicio/client'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
import { SliceComponentProps } from '@prismicio/react'
import Link from 'next/link'
import React from 'react'
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaToolbox,
  FaYelp,
} from 'react-icons/fa'
import { GiHomeGarage } from 'react-icons/gi'
import { RiQuestionnaireFill } from 'react-icons/ri'
import {
  BrandDocument,
  ProductDocument,
  ProductTypeDocument,
  ServiceDocument,
} from '../../../prismicio-types'
import WhileInView from '@/components/WhileInView'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

/**
 * Props for `CallToAction`.
 */
export type CallToActionProps = SliceComponentProps<Content.CallToActionSlice>

const icons = {
  GiHomeGarage,
  RiQuestionnaireFill,
  FaToolbox,
  Facebook: FaFacebook,
  Instagram: FaInstagram,
  LinkedIn: FaLinkedin,
  Yelp: FaYelp,
}

const isBrand = (brand: object): brand is BrandDocument => {
  return (brand as BrandDocument).data !== undefined
}
const isProduct = (product: object): product is ProductDocument => {
  return (product as ProductDocument).data !== undefined
}
const isProductType = (type: object): type is ProductTypeDocument => {
  return (type as ProductTypeDocument).data !== undefined
}
const isService = (service: object): service is ServiceDocument => {
  return (service as ServiceDocument).data !== undefined
}

/**
 * Component for "CallToAction" Slices.
 */
const CallToAction = ({ slice }: CallToActionProps): React.JSX.Element => {
  if (slice.variation === 'brandGrid') {
    return (
      <Section
        width="2xl"
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="flex-col"
      >
        {isFilled.richText(slice.primary.heading) && (
          <PrismicRichText
            field={slice.primary.heading}
            components={{
              heading2: ({ children }: { children: ReactNode }) => (
                <Heading
                  as="h2"
                  size="5xl"
                  className="text-neutral text-3xl md:text-4xl"
                >
                  {children}
                </Heading>
              ),
            }}
          />
        )}
        <div
          className={cn(
            'flex flex-wrap justify-center gap-4 py-6 lg:gap-8 lg:py-0 lg:pt-6',
          )}
        >
          {slice.items.length > 0
            ? slice.items.map((item, i) => {
                return (
                  <PrismicNextLink
                    field={item.button_link}
                    aria-labelledby={`${slice.id}-heading-${i}`}
                    key={`${slice.id}-${i}`}
                    className="ring-primary rounded-lg outline-hidden focus:ring-2"
                  >
                    <div className="bg-background flex h-full max-w-sm flex-col justify-between overflow-hidden rounded-lg p-4 shadow-sm lg:p-6">
                      <div className="flex flex-col items-center">
                        {isBrand(item.brand) && (
                          <PrismicNextImage
                            field={item.brand.data.logo}
                            className="rounded-lg"
                          />
                        )}
                        {isFilled.richText(item.heading) ? (
                          <PrismicRichText
                            field={item.heading}
                            components={{
                              heading2: ({
                                children,
                              }: {
                                children: ReactNode
                              }) => (
                                <Heading
                                  as="h2"
                                  size="3xl"
                                  className="text-neutral my-2 lg:my-3"
                                >
                                  {children}
                                </Heading>
                              ),
                            }}
                          />
                        ) : isBrand(item.brand) ? (
                          <PrismicRichText
                            field={item.brand.data.title}
                            components={{
                              heading1: ({
                                children,
                              }: {
                                children: ReactNode
                              }) => (
                                <Heading
                                  as="h2"
                                  size="3xl"
                                  className="text-neutral my-2 lg:my-3"
                                  id={`${slice.id}-heading-${i}`}
                                >
                                  {children}
                                </Heading>
                              ),
                            }}
                          />
                        ) : null}
                        {isFilled.richText(item.description) ? (
                          <PrismicRichText field={item.description} />
                        ) : (
                          isBrand(item.brand) && (
                            <PrismicRichText
                              field={item.brand.data.description}
                            />
                          )
                        )}
                      </div>
                      {isFilled.link(item.button_link) ? (
                        <div className="mt-6 mb-4 flex justify-center">
                          <span
                            className={cn(
                              buttonVariants({
                                variant: item.button_color || 'default',
                                size: 'lg',
                              }),
                              {
                                'text-neutral':
                                  item.button_color === 'default' ||
                                  item.button_color === 'link',
                              },
                              'font-bold',
                            )}
                          >
                            {item.button_label || 'Click Here'}
                          </span>
                        </div>
                      ) : null}
                    </div>
                  </PrismicNextLink>
                )
              })
            : null}
        </div>
      </Section>
    )
  } else if (slice.variation === 'expo') {
    return (
      <Section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="bg-[#ec0c8b] lg:py-0"
      >
        <Section as="div" width="xl" className="text-muted text-center">
          <div className="flex flex-col items-center gap-2">
            <PrismicRichText
              field={slice.primary.booth_info}
              components={{
                paragraph: ({ children }: { children: ReactNode }) => (
                  <p className="text-neutral text-xl font-semibold uppercase">
                    {children}
                  </p>
                ),
              }}
            />
            <PrismicRichText
              field={slice.primary.expo_title}
              components={{
                heading2: ({ children }: { children: ReactNode }) => (
                  <Heading
                    as="h2"
                    size="5xl"
                    className="text-muted font-light uppercase"
                  >
                    {children}
                  </Heading>
                ),
              }}
            />
            <PrismicRichText
              field={slice.primary.expo_details}
              components={{
                heading3: ({ children }: { children: ReactNode }) => (
                  <Heading as="h3" size="4xl" className="font-thin uppercase">
                    {children}
                  </Heading>
                ),
              }}
            />
          </div>
        </Section>
      </Section>
    )
  } else if (slice.variation === 'productTypeGrid') {
    return (
      <Section
        width="2xl"
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="flex-col"
      >
        {isFilled.richText(slice.primary.heading) && (
          <PrismicRichText
            field={slice.primary.heading}
            components={{
              heading2: ({ children }: { children: ReactNode }) => (
                <Heading
                  as="h2"
                  size="5xl"
                  className="text-neutral text-3xl md:text-4xl"
                >
                  {children}
                </Heading>
              ),
            }}
          />
        )}
        <div
          className={cn('grid gap-4 py-6 lg:gap-8', {
            'lg:grid-cols-3': slice.items.length === 3,
            'lg:grid-cols-2': slice.items.length === 2,
          })}
        >
          {slice.items.length > 0
            ? slice.items.map((item, i) => {
                return (
                  <PrismicNextLink
                    field={item.button_link}
                    aria-labelledby={`${slice.id}-heading-${i}`}
                    key={`${slice.id}-${i}`}
                    className="ring-primary rounded-lg outline-hidden focus:ring-2"
                  >
                    <div className="bg-background flex h-full max-w-sm flex-col justify-between overflow-hidden rounded-lg p-4 shadow-sm lg:p-6">
                      <div className="flex flex-col items-center">
                        {isProductType(item.product_type) && (
                          <PrismicNextImage
                            field={item.product_type.data.featured_image}
                            className="h-[250px] w-[250px] rounded-lg"
                          />
                        )}
                        {isFilled.richText(item.heading) ? (
                          <PrismicRichText
                            field={item.heading}
                            components={{
                              heading2: ({
                                children,
                              }: {
                                children: ReactNode
                              }) => (
                                <Heading
                                  id={`${slice.id}-heading-${i}`}
                                  as="h2"
                                  size="3xl"
                                  className="text-neutral my-2 lg:my-3"
                                >
                                  {children}
                                </Heading>
                              ),
                            }}
                          />
                        ) : isProductType(item.product_type) ? (
                          <PrismicRichText
                            field={item.product_type.data.title}
                            components={{
                              heading1: ({
                                children,
                              }: {
                                children: ReactNode
                              }) => (
                                <Heading
                                  id={`${slice.id}-heading-${i}`}
                                  as="h2"
                                  size="3xl"
                                  className="text-neutral my-2 lg:my-3"
                                >
                                  {children}
                                </Heading>
                              ),
                            }}
                          />
                        ) : null}
                        {isFilled.richText(item.description) ? (
                          <PrismicRichText field={item.description} />
                        ) : (
                          isProductType(item.product_type) && (
                            <PrismicRichText
                              field={item.product_type.data.description}
                            />
                          )
                        )}
                      </div>
                      {isFilled.link(item.button_link) ? (
                        <div className="mt-6 mb-4 flex justify-center">
                          <span
                            className={cn(
                              buttonVariants({
                                variant: item.button_color || 'default',
                                size: 'lg',
                              }),
                              'font-bold',
                            )}
                          >
                            {item.button_label || 'Click Here'}
                          </span>
                        </div>
                      ) : null}
                    </div>
                  </PrismicNextLink>
                )
              })
            : null}
        </div>
      </Section>
    )
  } else if (slice.variation === 'featuredGrid') {
    return (
      <Section
        width="full"
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="flex flex-col"
      >
        <div>
          {isFilled.richText(slice.primary.heading) && (
            <PrismicRichText field={slice.primary.heading} />
          )}
        </div>
        <div className="flex flex-wrap justify-center gap-4 py-6 lg:gap-8">
          {slice.items.length > 0
            ? slice.items.map((item, i) => {
                let Icon
                if (item.icon) {
                  Icon = icons[item.icon]
                }
                return (
                  <Card
                    key={`${slice.id}-${i}`}
                    className="flex w-full flex-col sm:w-md lg:w-sm"
                  >
                    <PrismicNextLink
                      field={item.button_link}
                      aria-labelledby={slice.id + '-' + 'heading-' + i}
                      className="ring-primary flex grow flex-col justify-between rounded-lg outline-hidden focus:ring-2"
                    >
                      <CardHeader>
                        <div className="flex flex-col items-center">
                          {Icon ? (
                            <Icon className="text-primary h-16 w-16" />
                          ) : null}
                          <PrismicRichText
                            field={item.heading}
                            components={{
                              heading2: ({
                                children,
                              }: {
                                children: ReactNode
                              }) => (
                                <Heading
                                  id={slice.id + '-' + 'heading-' + i}
                                  as="h2"
                                  size="2xl"
                                  className="text-neutral my-2 text-2xl lg:my-3"
                                >
                                  {children}
                                </Heading>
                              ),
                            }}
                          />
                        </div>
                      </CardHeader>
                      <CardContent className="grow">
                        {isFilled.richText(item.description) && (
                          <PrismicRichText field={item.description} />
                        )}
                      </CardContent>
                      {isFilled.link(item.button_link) ? (
                        <CardFooter className="mt-6 mb-4 flex justify-center">
                          <span
                            className={cn(
                              buttonVariants({
                                variant: item.button_color || 'default',
                                size: 'lg',
                              }),
                              'font-bold',
                            )}
                          >
                            {item.button_label || 'Click Here'}
                          </span>
                        </CardFooter>
                      ) : null}
                    </PrismicNextLink>
                  </Card>
                )
              })
            : null}
        </div>
      </Section>
    )
  } else if (slice.variation === 'servicesGrid') {
    return (
      <Section
        width="2xl"
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="flex-col"
      >
        {isFilled.richText(slice.primary.heading) && (
          <PrismicRichText
            field={slice.primary.heading}
            components={{
              heading2: ({ children }: { children: ReactNode }) => (
                <Heading
                  as="h2"
                  size="5xl"
                  className="text-neutral text-3xl md:text-4xl"
                >
                  {children}
                </Heading>
              ),
            }}
          />
        )}
        <div className="grid gap-4 py-6 lg:grid-cols-3 lg:gap-8">
          {slice.items.length > 0
            ? slice.items.map((item, i) => {
                return (
                  <Link
                    key={`${slice.id}-${i}`}
                    href={
                      'url' in item.service && item.service.url
                        ? item.service.url
                        : '/services'
                    }
                    aria-labelledby={`${slice.id}-heading-${i}`}
                    className="ring-primary rounded-lg outline-hidden focus:ring-2"
                  >
                    <div className="bg-background flex max-w-sm flex-col justify-between overflow-hidden rounded-lg p-4 shadow-sm lg:p-6">
                      <div className="flex flex-col items-center">
                        {isService(item.service) ? (
                          <PrismicRichText
                            field={item.service.data.title}
                            components={{
                              heading1: ({
                                children,
                              }: {
                                children: ReactNode
                              }) => (
                                <Heading
                                  id={`${slice.id}-heading-${i}`}
                                  as="h2"
                                  size="3xl"
                                  className="text-neutral my-2 lg:my-3"
                                >
                                  {children}
                                </Heading>
                              ),
                            }}
                          />
                        ) : null}
                        {isFilled.richText(item.description) ? (
                          <PrismicRichText field={item.description} />
                        ) : (
                          isService(item.service) && (
                            <PrismicRichText
                              field={item.service.data.excerpt}
                            />
                          )
                        )}
                      </div>
                      {isService(item.service) ? (
                        <div className="mt-6 mb-4 flex justify-center">
                          <span
                            className={cn(
                              buttonVariants({ variant: 'default' }),
                              'text-neutral text-center outline-hidden focus:ring-2',
                            )}
                          >
                            {item.button_label || 'Click Here'}
                          </span>
                        </div>
                      ) : null}
                    </div>
                  </Link>
                )
              })
            : null}
        </div>
      </Section>
    )
  } else if (slice.variation === 'social') {
    return (
      <Section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="bg-primary py-6"
      >
        <div className="mx-auto flex max-w-(--breakpoint-sm) flex-col items-center">
          <PrismicRichText
            field={slice.primary.heading}
            components={{
              heading2: ({ children }: { children: ReactNode }) => (
                <Heading as="h2" size="5xl" className="text-neutral">
                  {children}
                </Heading>
              ),
            }}
          />
          <ul className="mt-4 grid grid-flow-col gap-4 lg:mt-6 lg:gap-8">
            {slice.items.length > 0 && isFilled.select(slice.items[0].logo)
              ? slice.items.map((item, i) => {
                  let Icon: React.ElementType | null = null
                  if (item.logo && icons[item.logo]) {
                    Icon = icons[item.logo] as React.ElementType
                  }
                  return (
                    <li key={slice.id + i}>
                      <PrismicNextLink
                        field={item.social_url}
                        className="group outline-hidden"
                      >
                        {isFilled.link(item.social_url) && (
                          <>
                            {Icon && (
                              <Icon className="text-background ring-muted h-16 w-16 rounded p-1 group-focus:ring-2" />
                            )}
                            <span className="sr-only">
                              {`View us on ${item.logo}`}
                            </span>
                          </>
                        )}
                      </PrismicNextLink>
                    </li>
                  )
                })
              : null}
          </ul>
        </div>
      </Section>
    )
  } else if (slice.variation === 'logos') {
    return (
      <Section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="bg-white py-6"
      >
        <div className="mx-auto flex max-w-(--breakpoint-xl) flex-col items-center">
          <PrismicRichText
            field={slice.primary.heading}
            components={{
              heading2: ({ children }: { children: ReactNode }) => (
                <Heading as="h2" size="5xl" className="text-neutral">
                  {children}
                </Heading>
              ),
            }}
          />
          <ul className="mt-4 flex flex-wrap items-center justify-center gap-4 lg:gap-8">
            {slice.items.length > 0 &&
              slice.items.map(item => {
                return (
                  <li
                    key={item.logo.id}
                    className="flex flex-col justify-center"
                  >
                    <WhileInView>
                      <PrismicNextImage
                        field={item.logo}
                        width={250}
                        className=""
                      />
                    </WhileInView>
                  </li>
                )
              })}
          </ul>
        </div>
      </Section>
    )
  } else if (slice.variation === 'promotion') {
    return (
      <Section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="bg-primary"
      >
        <Section as="div" width="2xl" className="grid lg:grid-cols-5">
          <div className="flex flex-col items-center gap-6 lg:col-span-3 lg:pr-6">
            {isFilled.richText(slice.primary.benefit) && (
              <PrismicRichText
                field={slice.primary.benefit}
                components={{
                  heading2: ({ children }: { children: ReactNode }) => (
                    <Heading
                      as="h2"
                      size="4xl"
                      className="text-neutral text-3xl uppercase md:text-4xl"
                    >
                      {children}
                    </Heading>
                  ),
                }}
              />
            )}
            {isFilled.keyText(slice.primary.promo_code) && (
              <p className="text-lg uppercase lg:text-2xl">
                {slice.primary.promo_code}
              </p>
            )}
            {isFilled.richText(slice.primary.details) && (
              <PrismicRichText
                field={slice.primary.details}
                components={{
                  paragraph: ({ children }: { children: ReactNode }) => (
                    <p className="max-w-prose self-start lg:text-xl">
                      {children}
                    </p>
                  ),
                }}
              />
            )}
          </div>
          {isFilled.link(slice.primary.button_link) &&
            isFilled.keyText(slice.primary.button_label) && (
              <div className="my-8 justify-self-center lg:col-span-2 lg:justify-self-end">
                {isFilled.image(slice.primary.image) && (
                  <PrismicNextLink field={slice.primary.button_link}>
                    <PrismicNextImage
                      field={slice.primary.image}
                      className={cn('mb-4 rounded-lg md:mb-6 lg:mb-8', {
                        'shadow-md': slice.primary.image_shadow,
                      })}
                    />
                  </PrismicNextLink>
                )}
                <div className="flex justify-center">
                  <PrismicNextLink
                    field={slice.primary.button_link}
                    className={cn(
                      buttonVariants({
                        variant: slice.primary.button_color || 'outline',
                        size: 'lg',
                      }),
                    )}
                  >
                    {slice.primary.button_label}
                    <span className="sr-only">
                      {`about ${asText(slice.primary.benefit)}`}
                    </span>
                  </PrismicNextLink>
                </div>
              </div>
            )}
        </Section>
      </Section>
    )
  } else if (slice.variation === 'productRecommendation') {
    return (
      <Section
        width="2xl"
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="flex-col"
      >
        {isFilled.richText(slice.primary.heading) && (
          <PrismicRichText
            field={slice.primary.heading}
            components={{
              heading2: ({ children }: { children: ReactNode }) => (
                <Heading
                  as="h2"
                  size="5xl"
                  className="text-neutral text-3xl md:text-4xl"
                >
                  {children}
                </Heading>
              ),
            }}
          />
        )}
        <div className="flex flex-wrap gap-4 py-6 justify-evenly lg:gap-8">
          {isFilled.group(slice.primary.products)
            ? slice.primary.products.map((item, i) => {
                const product = item.product as unknown as ProductDocument
                return (
                  <Link
                    key={`recommendation-${slice.id}-${i}`}
                    href={product.url || '#'}
                    aria-labelledby={`recommendation-${slice.id}-heading-${i}`}
                    className="ring-primary rounded-lg outline-hidden focus:ring-2 hover:shadow-md transition duration-300 ease-in-out shadow-primary group"
                  >
                    <div className="bg-background flex max-w-sm flex-col justify-between overflow-hidden rounded-lg p-4 shadow-sm lg:p-6 relative">
                      {isFilled.select(product.data.status) && (
                        <Badge variant={product.data.status === 'in stock'? 'default' : 'destructive'} className="absolute text-foreground top-4 right-4 text-sm capitalize group-hover:shadow-md shadow-primary transition duration-300 ease-in-out">
                          {product.data.status}
                        </Badge>
                      )}
                      <div className="flex flex-col items-center">
                        <PrismicNextImage
                          field={product.data.featured_image}
                          className="lg:blur-[1px] group-hover:blur-none transition duration-300 ease-in-out"
                        />
                        <PrismicRichText
                          field={product.data.title}
                          components={{
                            heading1: ({
                              children,
                            }: {
                              children: ReactNode
                            }) => (
                              <Heading
                                id={`recommendation-${slice.id}-heading-${i}`}
                                as="h2"
                                size="3xl"
                                className="text-neutral my-2 lg:my-3"
                              >
                                {children}
                              </Heading>
                            ),
                          }}
                        />

                        {isFilled.richText(product.data.description) ? (
                          <PrismicRichText field={product.data.description} />
                        ) : (
                          <PrismicRichText field={product.data.excerpt} />
                        )}
                      </div>
                    </div>
                  </Link>
                )
              })
            : null}
        </div>
      </Section>
    )
  }
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-neutral"
    >
      <Section as="div" width="xl" className="grid lg:grid-cols-3">
        <div className="flex flex-col items-center gap-6 lg:col-span-2 lg:flex-row">
          <WhileInView direction="down">
            <GiHomeGarage className="text-primary -mt-3 h-24 w-24" />
          </WhileInView>
          <WhileInView direction="up">
            <PrismicRichText
              field={slice.primary.heading}
              components={{
                heading2: ({ children }: { children: ReactNode }) => (
                  <Heading
                    as="h2"
                    size="4xl"
                    className="text-muted text-3xl uppercase md:text-4xl"
                  >
                    {children}
                  </Heading>
                ),
              }}
            />
          </WhileInView>
        </div>
        <div className="my-8 justify-self-center lg:justify-self-end">
          <PrismicNextLink
            field={slice.primary.button_link}
            className={cn(
              buttonVariants({
                variant: slice.primary.button_color || 'default',
                size: 'lg',
              }),
              {
                'text-background/95 hover:text-background hover:bg-input/10':
                  slice.primary.button_color === 'outline',
              },
            )}
          >
            {slice.primary.button_label}
          </PrismicNextLink>
        </div>
      </Section>
    </Section>
  )
}

export default CallToAction
