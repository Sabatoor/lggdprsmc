import { cn } from '@/app/lib/cn'
import React, { HTMLAttributes } from 'react'

interface HeadingProps extends HTMLAttributes<HTMLHeadElement> {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  size: 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl'
  className?: string
  children: React.ReactNode
}

export default function Heading({
  as: Comp,
  size,
  children,
  className,
  ...restProps
}: HeadingProps) {
  return (
    <Comp
      className={cn(
        'text-center font-outfit font-bold text-skin-primary lg:text-left',
        {
          'text-3xl leading-[4rem] md:text-5xl lg:text-6xl lg:leading-[6rem] xl:text-7xl':
            size === '7xl',
          'text-2xl leading-[3rem] md:text-4xl lg:text-5xl lg:leading-[5rem] xl:text-6xl':
            size === '6xl',
          'text-2xl leading-[2rem] lg:text-5xl lg:leading-[4rem]':
            size === '5xl',
          'text-xl lg:text-4xl lg:leading-[3rem]': size === '4xl',
          'text-lg lg:text-3xl': size === '3xl',
          'text-lg': size === '2xl',
          'text-base': size === 'xl',
        },
        className,
      )}
      {...restProps}
    >
      {children}
    </Comp>
  )
}
