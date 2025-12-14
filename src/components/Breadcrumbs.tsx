'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Fragment } from 'react'

// Optional: Map URL segments to nicer labels
const LABEL_MAP: Record<string, string> = {
  products: 'All Products',
  liftmaster: 'LiftMaster',
  about: 'About Us',
}

interface BreadcrumbsProps {
  /**
   * If provided, replaces the label of the very last segment (the current page).
   * Useful for showing "LiftMaster 6690L" instead of "liftmaster-6690l".
   */
  currentPageTitle?: string
}

export function Breadcrumbs({ currentPageTitle }: BreadcrumbsProps) {
  const pathname = usePathname()

  // 1. Split path into segments, filtering out empty strings
  const segments = pathname.split('/').filter(segment => segment !== '')

  // 2. Build the breadcrumb items
  const breadcrumbItems = segments.map((segment, index) => {
    // Construct the href for this specific segment (e.g., /products/liftmaster)
    const href = `/${segments.slice(0, index + 1).join('/')}`

    // Determine the label: Use the map, or fallback to capitalizing the segment
    const label =
      LABEL_MAP[segment] ||
      segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ')

    return { href, label, isLast: index === segments.length - 1 }
  })

  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList className="list-none">
        {/* Always start with Home */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        {breadcrumbItems.map(item => (
          <Fragment key={item.href}>
            <BreadcrumbItem>
              {item.isLast ? (
                <BreadcrumbPage className="line-clamp-1 max-w-50 md:max-w-none">
                  {/* Use the manual override title if provided, otherwise use the URL segment */}
                  {currentPageTitle || item.label}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={item.href}>{item.label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {!item.isLast && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
