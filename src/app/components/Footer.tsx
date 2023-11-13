import { createClient } from '@/prismicio'
import { cn } from '@/app/lib/cn'
import Section from './Section'
import Link from 'next/link'
import { FaFacebook } from 'react-icons/fa'
import { PrismicNextLink } from '@prismicio/next'
import { isFilled } from '@prismicio/client'
export default async function Footer() {
  const client = createClient()
  const settings = await client.getSingle('settings')
  return (
    <Section
      as="footer"
      className={cn(
        'flex-col gap-y-8 bg-skin-neutral py-8 text-skin-base lg:text-lg',
      )}
    >
      <div>
        <FaFacebook className="h-8 w-8 text-skin-base" />
      </div>
      <div className="text-center">
        <Link href="/">{settings.data.site_title}</Link>
        <p>&copy; {new Date().getFullYear()}</p>
      </div>
      <div className="text-center text-xs">
        <Link href={'/privacy'}>Privacy</Link>
        <p className=" my-3">Disclaimer message...</p>
      </div>
    </Section>
  )
}
