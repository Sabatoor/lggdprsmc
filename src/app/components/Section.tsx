import React from 'react'
import { cn } from '@/app/lib/cn'

type SectionProps = {
  as?: React.ElementType
  className?: string
  children: React.ReactNode
  width?: 'full' | '2xl' | 'xl' | 'lg' | 'md' | 'sm'
}

export default function Section({
  as: Comp = 'section',
  width = 'full',
  className,
  children,
  ...restProps
}: SectionProps) {
  return (
    <Comp
      className={cn(
        'mx-auto flex items-center px-4 py-2 md:px-6 md:py-8 lg:py-10',
        {
          'w-full': width === 'full',
          'max-w-screen-2xl': width === '2xl',
          'max-w-screen-xl': width === 'xl',
          'max-w-screen-lg': width === 'lg',
          'max-w-screen-md': width === 'md',
          'max-w-screen-sm': width === 'sm',
        },
        className,
      )}
      {...restProps}
    >
      {children}
    </Comp>
  )
}
