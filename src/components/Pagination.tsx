'use client'
import { FC } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { cn } from '@/app/lib/cn'
import { Button } from './ui/button'

interface PaginationProps {
  hasNextPage: boolean
  hasPrevPage: boolean
  totalPages: number
}

const Pagination: FC<PaginationProps> = ({
  hasNextPage,
  hasPrevPage,
  totalPages,
}) => {
  const router = useRouter()
  const path = usePathname()
  const searchParams = useSearchParams()
  const pageNumber = searchParams.get('page') || '1'
  const pageType = searchParams.get('type')

  return (
    <>
      <div className="flex justify-center gap-2">
        <Button
          variant={hasPrevPage ? 'default' : 'ghost'}
          className={cn(
            'text-xs leading-normal font-medium text-neutral uppercase outline-none focus-visible:ring-4 focus-visible:ring-destructive/60',
          )}
          disabled={!hasPrevPage}
          onClick={() => {
            router.push(
              !pageType
                ? `${path}?page=${Number(pageNumber) - 1}`
                : `${path}?page=${Number(pageNumber) - 1}&type=${pageType}`,
            )
            const mainContent = document.getElementById('content')
            if (mainContent) {
              mainContent.focus()
              window.scrollTo(0, 0)
            }
          }}
        >
          prev page
        </Button>

        <Button
          variant={hasNextPage ? 'default' : 'ghost'}
          className={cn(
            'text-xs leading-normal font-medium text-neutral uppercase outline-none focus-visible:ring-4 focus-visible:ring-destructive/60',
          )}
          disabled={!hasNextPage}
          onClick={() => {
            router.push(
              !pageType
                ? `${path}?page=${Number(pageNumber) + 1}`
                : `${path}?page=${Number(pageNumber) + 1}&type=${pageType}`,
            )
            const mainContent = document.getElementById('content')
            if (mainContent) {
              mainContent.focus()
              window.scrollTo(0, 0)
            }
          }}
        >
          next page
        </Button>
      </div>
      {totalPages && (
        <div className="my-6 flex justify-center">
          Page {pageNumber} of {totalPages}
        </div>
      )}
    </>
  )
}
export default Pagination
