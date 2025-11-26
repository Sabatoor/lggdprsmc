import Heading from '@/components/Heading'
import Section from '@/components/Section'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <Section width="md" className="flex-col">
      <Heading as="h1" size="4xl">
        Not Found
      </Heading>
      <p className="py-4 lg:py-10">
        We're sorry, but we could not find requested resource. Please click the
        button below to return home or click our menu button to explore other
        options.
      </p>
      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </Section>
  )
}
