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
        'ring-skin-primary rounded-xl px-6 py-4 text-center font-bold outline-none transition duration-300 ease-in-out focus:ring-2 lg:text-lg',
        {
          'bg-skin-button-primary text-skin-neutral shadow-md shadow-skin-neutral hover:bg-skin-button-primary-hover':
            color === 'Primary',
          'bg-skin-button-secondary text-skin-base hover:bg-skin-button-secondary-hover':
            color === 'Secondary',
          'bg-skin-button-base text-skin-neutral hover:shadow-md hover:shadow-skin-neutral':
            color === 'Inverted',
          'hover:bg-skin-button-primary hover:bg-opacity-80': color === 'Ghost',
        },
        className,
      )}
      {...restProps}
    />
  )
}
