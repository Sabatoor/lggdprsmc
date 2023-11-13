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
        'rounded-xl px-6 py-4 text-center font-bold transition duration-300 ease-in-out lg:text-lg',
        {
          'bg-skin-button-primary hover:bg-skin-button-primary-hover shadow-skin-neutral text-skin-base shadow-md':
            color === 'Primary',
          'bg-skin-button-secondary text-skin-neutral hover:bg-skin-button-secondary-hover':
            color === 'Secondary',
          'bg-skin-button-base text-skin-primary hover:shadow-skin-neutral hover:shadow-md':
            color === 'Inverted',
          'hover:bg-skin-button-primary hover:bg-opacity-80': color === 'Ghost',
        },
        className,
      )}
      {...restProps}
    />
  )
}
