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
        brand: {
          50:  '#f0f4ff',
          100: '#e0e9ff',
          200: '#c0d1ff',
          300: '#93afff',
          400: '#6080ff',
          500: '#3d5afe',
          600: '#2a3eb1',
          700: '#1e2c85',
          800: '#151f5c',
          900: '#0d1338',
        },
        ink: {
          DEFAULT: '#0f0f0f',
          muted: '#4a4a4a',
          subtle: '#8a8a8a',
        },
        canvas: {
          DEFAULT: '#fafaf9',
          muted: '#f4f4f2',
        },
      },
      typography: (theme: (arg: string) => string) => ({
        DEFAULT: {
          css: {
            color: theme('colors.ink.DEFAULT'),
            a: { color: theme('colors.brand.600'), textDecoration: 'none', '&:hover': { textDecoration: 'underline' } },
            'h1,h2,h3,h4': { fontWeight: '700', letterSpacing: '-0.02em' },
            blockquote: { borderLeftColor: theme('colors.brand.500'), fontStyle: 'normal', fontWeight: '500' },
            code: { backgroundColor: theme('colors.canvas.muted'), padding: '0.2em 0.4em', borderRadius: '4px', fontWeight: '400' },
          },
        },
        dark: {
          css: {
            color: '#e8e8e8',
            a: { color: theme('colors.brand.300') },
            'h1,h2,h3,h4': { color: '#ffffff' },
            blockquote: { borderLeftColor: theme('colors.brand.400'), color: '#c0c0c0' },
            code: { backgroundColor: '#1e1e2e', color: '#cdd6f4' },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
