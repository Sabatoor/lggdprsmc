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
  // Priority: Meta Title -> Page Title -> Fallback
  const title =
    product.data.meta_title ||
    asText(product.data.title) ||
    'Lions Gate Product'

  // Priority: Meta Desc -> First 160 chars of Desc -> Empty
  const description =
    product.data.meta_description ||
    asText(product.data.description).substring(0, 160) ||
    ''

  // Priority: Meta Image -> Main Product Image
  const image =
    asImageSrc(product.data.meta_image) ||
    asImageSrc(product.data.featured_image)

  // We cast to 'any' because standard types don't always know if 'data' was fetched.
  // We fallback to the UID (e.g., 'liftmaster') if the full title isn't found.
  const brandRelation = product.data.brand as any
  const brandName =
    asText(brandRelation?.data?.title) ||
    brandRelation?.uid ||
    'Lions Gate Garage Doors'

  // 2. Extract FAQs from Accordion Slices
  // We strictly check for slice_type 'accordion' to match your component
  const faqSlices = product.data.slices.filter(
    (slice): slice is Content.AccordionSlice =>
      slice.slice_type === 'accordion',
  )

  const faqQuestions = faqSlices.flatMap(slice => {
    // Check if the items exist in 'primary' (Group Field) or root 'items' (Repeatable Zone)
    // We cast to 'any' purely to check existence safely without TS complaining
    const items = (slice.primary as any).items || (slice as any).items || []

    // We explicitly type 'item' here to fix the "implicitly has any type" error
    return items.map((item: any) => ({
      '@type': 'Question',
      name: asText(item.item_heading),
      acceptedAnswer: {
        '@type': 'Answer',
        text: asText(item.item_text),
      },
    }))
  })
  const faqSchema =
    faqQuestions.length > 0
      ? {
          '@type': 'FAQPage',
          mainEntity: faqQuestions,
        }
      : null

  // 3. Construct the Product Schema
  const productSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      // Breadcrumbs
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
          {
            '@type': 'ListItem',
            position: 3,
            name: title,
            item: `https://lionsgategaragedoors.com/products/${product.uid}`,
          },
        ],
      },
      // The Product
      {
        '@type': 'Product',
        name: title,
        image: image ? [image] : [],
        description: description,
        // Use 'schema_sku' from your Static Zone, fallback to UID
        sku: product.data.schema_sku || product.uid,
        brand: {
          '@type': 'Brand',
          name: brandName,
        },
        offers: {
          '@type': 'Offer',
          url: `https://lionsgategaragedoors.com/products/${product.uid}`,
          priceCurrency: 'CAD',
          // Use 'schema_price' from your Static Zone
          price: product.data.schema_price || '0',
          // Map the 'status' dropdown to Schema URL
          availability: getAvailabilityUrl(product.data.status),
          itemCondition: 'https://schema.org/NewCondition',
          seller: {
            '@type': 'LocalBusiness',
            name: 'Lions Gate Garage Doors',
          },
        },
      },
      // Inject FAQ Schema if questions exist
      ...(faqSchema ? [faqSchema] : []),
    ],
  }

  return productSchema
}
