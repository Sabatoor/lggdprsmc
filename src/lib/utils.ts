import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Content, asText, asImageSrc } from '@prismicio/client'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getTypeValue = (
  array: String[],
  type: 'Installation' | 'Repair',
) => {
  return array.find(tag => tag === type)
}

export const locations = [
  'Burnaby',
  'Coquitlam',
  'Delta',
  'Langley',
  'Maple Ridge',
  'New Westminster',
  'North Vancouver',
  'Pitt Meadows',
  'Richmond',
  'Surrey',
  'Vancouver',
  'West Vancouver',
  'White Rock',
]

export const getLocationValue = (
  array: String[],
  type:
    | 'Burnaby'
    | 'Coquitlam'
    | 'Delta'
    | 'Langley'
    | 'Maple Ridge'
    | 'New Westminster'
    | 'North Vancouver'
    | 'Pitt Meadows'
    | 'Richmond'
    | 'Surrey'
    | 'Vancouver'
    | 'West Vancouver'
    | 'White Rock',
) => {
  return array.find(tag => tag === type)
}

export const getPostLocationTag = (
  tags: Array<string>,
  locations: Array<string>,
) => {
  let workLocation
  for (let tag of tags) {
    if (locations.includes(tag)) {
      workLocation = tag
      break
    }
  }
  return workLocation
}

/**
 * Maps the Prismic 'status' field options to official Schema.org URLs.
 */
function getAvailabilityUrl(status: string | null | undefined): string {
  switch (status) {
    case 'in stock':
    case 'low stock':
      return 'https://schema.org/InStock'
    case 'backordered':
      return 'https://schema.org/BackOrder'
    case 'out of stock':
      return 'https://schema.org/OutOfStock'
    case 'discontinued':
      return 'https://schema.org/Discontinued'
    case 'no status':
    default:
      // Default fallback: if the page is published, we assume it's sellable.
      return 'https://schema.org/InStock'
  }
}

/**
 * Generates specific Product JSON-LD for Lions Gate Garage Doors.
 * Handles "SEO & Metadata" tab fields, "Status" dropdown, and FAQ Accordion slices.
 */
export function generateProductSchema(product: Content.ProductDocument) {
  // 1. Base Data
  const title =
    product.data.meta_title ||
    asText(product.data.title) ||
    'Lions Gate Product'
  const description =
    product.data.meta_description ||
    asText(product.data.description).substring(0, 160) ||
    ''
  const image =
    asImageSrc(product.data.meta_image) ||
    asImageSrc(product.data.featured_image)

  // 2. Extract Brand Info
  // We need the UID for the URL (e.g. "liftmaster") and the Title for display (e.g. "LiftMaster")
  const brandRelation = product.data.brand as any
  const brandUid = brandRelation?.uid || 'liftmaster' // Fallback to 'liftmaster' if undefined
  const brandName = asText(brandRelation?.data?.title) || 'LiftMaster'

  // 3. Construct the Correct URL
  // Matches: https://lionsgategaragedoors.com/products/liftmaster/liftmaster-380ut...
  const productUrl = `https://lionsgategaragedoors.com/products/${brandUid}/${product.uid}`

  // 4. Extract FAQs (Same as before)
  const faqSlices = product.data.slices.filter(
    (slice): slice is Content.AccordionSlice =>
      slice.slice_type === 'accordion',
  )
  const faqQuestions = faqSlices.flatMap(slice =>
    (slice.primary as any).items.map((item: any) => ({
      '@type': 'Question',
      name: asText(item.item_heading),
      acceptedAnswer: { '@type': 'Answer', text: asText(item.item_text) },
    })),
  )
  const faqSchema =
    faqQuestions.length > 0
      ? { '@type': 'FAQPage', mainEntity: faqQuestions }
      : null

  // 5. Dynamic Dates
  const nextYear = new Date().getFullYear() + 1
  const priceValidUntil = `${nextYear}-12-31`

  // 6. Construct the Product Schema
  const productSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://lionsgategaragedoors.com/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Products',
            item: 'https://lionsgategaragedoors.com/products',
          },
          // NEW: Add the Brand Breadcrumb Step
          {
            '@type': 'ListItem',
            position: 3,
            name: brandName,
            item: `https://lionsgategaragedoors.com/products/${brandUid}`,
          },
          // Bumped position to 4
          {
            '@type': 'ListItem',
            position: 4,
            name: title,
            item: productUrl,
          },
        ],
      },
      {
        '@type': 'Product',
        name: title,
        image: image ? [image] : [],
        description: description,
        url: productUrl, // <--- UPDATED URL
        sku: product.data.schema_sku || product.uid,
        brand: { '@type': 'Brand', name: brandName },
        offers: {
          '@type': 'Offer',
          url: productUrl, // <--- UPDATED URL
          priceCurrency: 'CAD',
          price: product.data.schema_price || '0',
          availability: getAvailabilityUrl(product.data.status),
          itemCondition: 'https://schema.org/NewCondition',
          priceValidUntil: priceValidUntil,
          hasMerchantReturnPolicy: {
            '@type': 'MerchantReturnPolicy',
            applicableCountry: 'CA',
            returnPolicyCategory:
              'https://schema.org/MerchantReturnFiniteReturnWindow',
            merchantReturnDays: 30,
            returnMethod: 'https://schema.org/ReturnInStore',
            returnFees: 'https://schema.org/FreeReturn',
          },
          shippingDetails: {
            '@type': 'OfferShippingDetails',
            shippingRate: {
              '@type': 'MonetaryAmount',
              value: 0,
              currency: 'CAD',
            },
            shippingDestination: {
              '@type': 'DefinedRegion',
              addressCountry: 'CA',
            },
          },
          seller: {
            '@type': 'LocalBusiness',
            name: 'Lions Gate Garage Doors',
          },
        },
      },
      ...(faqSchema ? [faqSchema] : []),
    ],
  }

  return productSchema
}
