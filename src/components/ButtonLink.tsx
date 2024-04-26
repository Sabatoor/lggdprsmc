import { PrismicNextLink, PrismicNextLinkProps } from '@prismicio/next'
import { cn } from '@/app/lib/cn'

export default function ButtonLink({
  className,
  color,
  ...restProps
}: PrismicNextLinkProps) {
  return (
    <PrismicNextLink
      className={cn(
        'ring-primary rounded-xl px-6 py-4 text-center font-bold outline-none transition duration-300 ease-in-out focus:ring-2 lg:text-lg',
        {
          'text-neutral bg-skin-button-primary ring-skin-neutral hover:bg-skin-button-primary-hover':
            color === 'Primary',
          'bg-skin-button-secondary text-skin-base hover:bg-skin-button-secondary-hover':
            color === 'Secondary',
          'text-neutral bg-skin-button-base hover:shadow': color === 'Inverted',
          'hover:bg-skin-button-primary hover:bg-opacity-80': color === 'Ghost',
        },
        className,
      )}
      {...restProps}
    />
  )
}
