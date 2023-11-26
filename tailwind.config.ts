import type { Config } from 'tailwindcss'

function withOpacity(variableName: string): any {
  return ({ opacityValue }: { opacityValue: string | undefined }): string => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`
    }
    return `rgb(var(${variableName}))`
  }
}
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/slices/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['var(--font-heading)'],
        body: ['var(--font-body)'],
      },
      textColor: {
        skin: {
          base: withOpacity('--color-base'),
          white: withOpacity('--color-white'),
          primary: withOpacity('--color-primary'),
          muted: withOpacity('--color-muted'),
          secondary: withOpacity('--color-secondary'),
          neutral: withOpacity('--color-neutral'),
          inverted: withOpacity('--color-base'),
        },
      },
      backgroundColor: {
        skin: {
          base: withOpacity('--color-base'),
          white: withOpacity('--color-white'),
          fill: withOpacity('--color-primary'),
          neutral: withOpacity('--color-neutral'),
          secondary: withOpacity('--color-secondary'),
          muted: withOpacity('--color-muted'),
          'button-base': withOpacity('--color-base'),
          'button-base-hover': withOpacity('--color-muted'),
          'button-primary': withOpacity('--color-primary'),
          'button-primary-hover': withOpacity('--color-primary-hover'),
          'button-secondary': withOpacity('--color-secondary'),
          'button-secondary-hover': withOpacity('--color-secondary-hover'),
        },
      },
      boxShadowColor: {
        skin: {
          base: withOpacity('--color-base'),
          white: withOpacity('--color-white'),
          primary: withOpacity('--color-primary'),
          secondary: withOpacity('--color-secondary'),
          neutral: withOpacity('--color-neutral'),
          muted: withOpacity('--color-muted'),
        },
      },
      borderColor: {
        skin: {
          base: withOpacity('--color-base'),
          white: withOpacity('--color-white'),
          primary: withOpacity('--color-primary'),
          secondary: withOpacity('--color-secondary'),
          neutral: withOpacity('--color-neutral'),
          muted: withOpacity('--color-muted'),
        },
      },
      ringColor: {
        skin: {
          base: withOpacity('--color-base'),
          white: withOpacity('--color-white'),
          primary: withOpacity('--color-primary'),
          secondary: withOpacity('--color-secondary'),
          neutral: withOpacity('--color-neutral'),
          muted: withOpacity('--color-muted'),
        },
      },
      gradientColorStops: {
        skin: {
          'hue-primary': withOpacity('--color-primary'),
          'hue-base': withOpacity('--color-base'),
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
export default config
