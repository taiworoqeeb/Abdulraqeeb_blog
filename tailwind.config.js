const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  experimental: {
    optimizeUniversalDefaults: false,
  },
  mode: 'jit',
  content: [
      './src/**/*.{js,jsx,ts,tsx,vue}',
      './public/**/*.html',
    ],
  darkMode: 'class',
  theme: {
    extend: {
      spacing: {
        '9/16': '56.25%',
      },
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      fontFamily: {
        sans: ['InterVariable', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'primary-light': '#F7F8FC',
				'secondary-light': '#FFFFFF',
				'ternary-light': '#f6f7f8',

				'primary-dark': '#0D2438',
				'secondary-dark': '#102D44',
				'ternary-dark': '#1E3851',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            // color: theme('colors.gray.700'),
            // a: {
            //   color: theme('colors.primary.500'),
            //   '&:hover': {
            //     color: `${theme('colors.primary.600')} !important`,
            //   },
            //   code: { color: theme('colors.primary.400') },
            // },
            // h1: {
            //   fontWeight: '700',
            //   letterSpacing: theme('letterSpacing.tight'),
            //   color: theme('colors.gray.900'),
            // },
            // h2: {
            //   fontWeight: '700',
            //   letterSpacing: theme('letterSpacing.tight'),
            //   color: theme('colors.gray.900'),
            // },
            // h3: {
            //   fontWeight: '600',
            //   color: theme('colors.gray.900'),
            // },
            // 'h4,h5,h6': {
            //   color: theme('colors.gray.900'),
            // },
            pre: {
              backgroundColor: theme('colors.gray.800'),
            },
            code: {
              color: theme('colors.pink.500'),
              backgroundColor: theme('colors.gray.100'),
              paddingLeft: '4px',
              paddingRight: '4px',
              paddingTop: '2px',
              paddingBottom: '2px',
              borderRadius: '0.25rem',
            },
            'code::before': {
              content: 'none',
            },
            'code::after': {
              content: 'none',
            },
            details: {
              backgroundColor: theme('colors.gray.100'),
              paddingLeft: '4px',
              paddingRight: '4px',
              paddingTop: '2px',
              paddingBottom: '2px',
              borderRadius: '0.25rem',
            },
            // hr: { borderColor: theme('colors.gray.200') },
            // 'ol li::marker': {
            //   fontWeight: '600',
            //   color: theme('colors.gray.500'),
            // },
            // 'ul li::marker': {
            //   backgroundColor: theme('colors.gray.500'),
            // },
            strong: { color: theme('colors.gray.600') },
            blockquote: {
              color: theme('colors.gray.900'),
              borderLeftColor: theme('colors.gray.200'),
            },
          },
        },
        dark: {
          css: {
            // color: theme('colors.gray.300'),
            // a: {
            //   color: theme('colors.primary.500'),
            //   '&:hover': {
            //     color: `${theme('colors.primary.400')} !important`,
            //   },
            //   code: { color: theme('colors.primary.400') },
            // },
            // h1: {
            //   fontWeight: '700',
            //   letterSpacing: theme('letterSpacing.tight'),
            //   color: theme('colors.gray.100'),
            // },
            // h2: {
            //   fontWeight: '700',
            //   letterSpacing: theme('letterSpacing.tight'),
            //   color: theme('colors.gray.100'),
            // },
            // h3: {
            //   fontWeight: '600',
            //   color: theme('colors.gray.100'),
            // },
            // 'h4,h5,h6': {
            //   color: theme('colors.gray.100'),
            // },
            pre: {
              backgroundColor: theme('colors.gray.800'),
            },
            code: {
              backgroundColor: theme('colors.gray.800'),
            },
            details: {
              backgroundColor: theme('colors.gray.800'),
            },
            // hr: { borderColor: theme('colors.gray.700') },
            // 'ol li::marker': {
            //   fontWeight: '600',
            //   color: theme('colors.gray.400'),
            // },
            // 'ul li::marker': {
            //   backgroundColor: theme('colors.gray.400'),
            // },
            strong: { color: theme('colors.gray.100') },
            thead: {
              th: {
                color: theme('colors.gray.100'),
              },
            },
            tbody: {
              tr: {
                borderBottomColor: theme('colors.gray.700'),
              },
            },
            blockquote: {
              color: theme('colors.gray.100'),
              borderLeftColor: theme('colors.gray.700'),
            },
          },
        },
      }),
      variants: {
        extend: {
          borderRadius: ['first', 'last'],
          borderWidth: ['last', 'hovered-sibling'],
          typography: ['dark'],
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
