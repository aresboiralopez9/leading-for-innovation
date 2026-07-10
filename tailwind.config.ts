import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        lfi: {
          yellow: '#F2C438',
          white: '#F2F2F2',
          blue: '#035AA6',
          mint: '#8DC4AA',
          green: '#1E5E3F',
        },

        brand: {
          50: '#eef7f3',
          100: '#d7eee4',
          200: '#b3ddcb',
          300: '#8DC4AA',
          400: '#5fa685',
          500: '#1E5E3F',
          600: '#174d33',
          700: '#123d29',
          800: '#0d2d1f',
          900: '#081f15',
        },

        accent: {
          yellow: '#F2C438',
          blue: '#035AA6',
          mint: '#8DC4AA',
        },

        ink: {
          DEFAULT: '#0f0f0f',
          muted: '#4a4a4a',
          subtle: '#8a8a8a',
        },

        canvas: {
          DEFAULT: '#F2F2F2',
          muted: '#ffffff',
        },
      },
      typography: (theme: (arg: string) => string) => ({
        DEFAULT: {
          css: {
            color: theme('colors.ink.DEFAULT'),
            a: {
              color: theme('colors.lfi.blue'),
              textDecoration: 'none',
              fontWeight: '600',
              '&:hover': {
                color: theme('colors.lfi.green'),
                textDecoration: 'underline',
              },
            },
            'h1,h2,h3,h4': {
              fontWeight: '700',
              letterSpacing: '-0.02em',
            },
            blockquote: {
              borderLeftColor: theme('colors.lfi.yellow'),
              fontStyle: 'normal',
              fontWeight: '500',
            },
            code: {
              backgroundColor: theme('colors.canvas.muted'),
              padding: '0.2em 0.4em',
              borderRadius: '4px',
              fontWeight: '400',
            },
          },
        },
        dark: {
          css: {
            color: '#e8e8e8',
            a: {
              color: theme('colors.lfi.yellow'),
              '&:hover': {
                color: theme('colors.lfi.mint'),
              },
            },
            'h1,h2,h3,h4': {
              color: '#ffffff',
            },
            blockquote: {
              borderLeftColor: theme('colors.lfi.yellow'),
              color: '#c0c0c0',
            },
            code: {
              backgroundColor: '#1e1e2e',
              color: '#cdd6f4',
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
