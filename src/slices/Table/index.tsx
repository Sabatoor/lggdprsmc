import { FC } from 'react'
import { Content, isFilled } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import Section from '@/components/Section'
import { PrismicTable } from '@prismicio/react'
import {
  Table as ShadTable,
  TableBody,
  TableHeader,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from '@/components/ui/table'
import { PrismicRichText } from '@/components/PrismicRichText'
import { cn } from '@/lib/utils'

/**
 * Props for `Table`.
 */
export type TableProps = SliceComponentProps<Content.TableSlice>

/**
 * Component for "Table" Slices.
 */
const Table: FC<TableProps> = ({ slice }) => {
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="flex-col"
    >
      {isFilled.richText(slice.primary.heading) && (
        <div className="p-4 2xl:p-8">
          <PrismicRichText field={slice.primary.heading} />
        </div>
      )}
      <PrismicTable
        field={slice.primary.table}
        components={{
          table: ({ children }: { children: React.ReactNode }) => (
            <ShadTable
              className={cn('mx-auto w-full', {
                'max-w-(--breakpoint-sm)':
                  slice.primary.table_width === 'Small',
                'max-w-(--breakpoint-md)':
                  slice.primary.table_width === 'Medium',
                'max-w-(--breakpoint-lg)':
                  slice.primary.table_width === 'Large',
                'max-w-(--breakpoint-xl)':
                  slice.primary.table_width === 'Extra Large',
                'max-w-(--breakpoint-2xl)':
                  slice.primary.table_width === 'Double Extra Large',
              })}
            >
              {isFilled.richText(slice.primary.table_caption) && (
                <TableCaption className="font-semibold text-neutral-900">
                  <PrismicRichText field={slice.primary.table_caption} />
                </TableCaption>
              )}
              {children}
            </ShadTable>
          ),
          tbody: ({ children }: { children: React.ReactNode }) => (
            <TableBody>{children}</TableBody>
          ),
          thead: ({ children }: { children: React.ReactNode }) => (
            <TableHeader>{children}</TableHeader>
          ),
          tr: ({ children }: { children: React.ReactNode }) => (
            <TableRow className="hover:bg-primary/20">{children}</TableRow>
          ),
          th: ({ children }: { children: React.ReactNode }) => (
            <TableHead className="font-bold text-black">{children}</TableHead>
          ),
          td: ({ children }: { children: React.ReactNode }) => (
            <TableCell>{children}</TableCell>
          ),
        }}
      />
    </Section>
  )
}

export default Table
