'use client'
import { FC } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { cn } from '@/app/lib/cn'

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
  return (
    <>
      <div className="flex justify-center gap-2">
        <button
          className={cn(
            'inline-block rounded bg-skin-button-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-skin-base',
            {
              'transition duration-150 ease-in hover:bg-skin-button-primary-hover hover:shadow hover:shadow-skin-primary':
                hasPrevPage,
              'bg-skin-neutral': !hasPrevPage,
            },
          )}
          disabled={!hasPrevPage}
          onClick={() => {
            router.push(`${path}?page=${Number(pageNumber) - 1}`)
          }}
        >
          prev page
        </button>

        <button
          className={cn(
            'inline-block rounded bg-skin-button-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-skin-base',
            {
              'transition duration-150 ease-in hover:bg-skin-button-primary-hover hover:text-skin-muted hover:shadow hover:shadow-skin-primary':
                hasNextPage,
              'bg-skin-neutral': !hasNextPage,
            },
          )}
          disabled={!hasNextPage}
          onClick={() => {
            router.push(`${path}?page=${Number(pageNumber) + 1}`)
          }}
        >
          next page
        </button>
      </div>
      {totalPages && (
        <div className="my-6 flex justify-center ">
          Page {pageNumber} of {totalPages}
        </div>
      )}
    </>
  )
}
export default Pagination
