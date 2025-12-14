import { FC } from 'react'
import { Content, isFilled } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import Section from '@/components/Section'
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Accordion as ShadAccordion,
} from '@/components/ui/accordion'
import { PrismicRichText } from '@/components/PrismicRichText'

/**
 * Props for `Accordion`.
 */
export type AccordionProps = SliceComponentProps<Content.AccordionSlice>

/**
 * Component for "Accordion" Slices.
 */
const Accordion: FC<AccordionProps> = ({ slice }) => {
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="max-w-(--breakpoint-lg) flex-col"
    >
      {isFilled.richText(slice.primary.heading) && (
        <div className="mx-auto py-4 lg:py-8">
          <PrismicRichText field={slice.primary.heading} />
        </div>
      )}
      {isFilled.richText(slice.primary.description) && (
        <div className="prose lg:prose-lg">
          <PrismicRichText field={slice.primary.description} />
        </div>
      )}
      <div className="w-full rounded-md p-4">
        {isFilled.group(slice.primary.items) && (
          <ShadAccordion
            type="single"
            collapsible
            className="w-full"
            defaultValue={`${slice.id}-item-0`}
          >
            {slice.primary.items.map((item, index) => {
              return (
                <AccordionItem
                  key={`${slice.id}-item-${index}`}
                  value={`${slice.id}-item-${index}`}
                >
                  <AccordionTrigger className="cursor-pointer lg:text-lg xl:text-xl 2xl:prose-2xl">
                    <PrismicRichText field={item.item_heading} />
                  </AccordionTrigger>
                  <AccordionContent className="mx-auto prose lg:prose-lg xl:prose-xl 2xl:prose-2xl">
                    <PrismicRichText field={item.item_text} />
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </ShadAccordion>
        )}
      </div>
    </Section>
  )
}

export default Accordion
