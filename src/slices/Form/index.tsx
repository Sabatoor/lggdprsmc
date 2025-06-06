import ContactForm from '@/components/ContactForm'
import JotFormEmbed from '@/components/JotFormEmbed'
import Section from '@/components/Section'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import React from 'react'

/**
 * Props for `Form`.
 */
export type FormProps = SliceComponentProps<Content.FormSlice>

/**
 * Component for "Form" Slices.
 */
const Form = ({ slice }: FormProps): React.JSX.Element => {
  if (slice.variation === 'estimate') {
    return (
      <Section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        width="xl"
      >
        <div className="">
          <JotFormEmbed
            url="https://form.jotform.com/91645667621262"
            id={91645667621262}
          />
        </div>
      </Section>
    )
  }
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      width="xl"
    >
      <div className="">
        <JotFormEmbed
          url="https://form.jotform.com/91615600019247"
          id={91615600019247}
        />
        {/* <ContactForm {...slice} /> */}
      </div>
    </Section>
  )
}

export default Form
