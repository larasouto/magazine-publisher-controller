import { nextui } from '@nextui-org/react'
import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
      }
    },
    screens: {
      'base': '100%',
      'xss': { min: '360px' },
      'xs': { min: '430px' },
      ...defaultTheme.screens
    },
    extend: {}
  },
  darkMode: "class",
  plugins: [
    nextui({
      layout: {
        radius: {
          small: '6px',
          medium: '8px',
          large: '12px'
        },
      }
    })
  ]
}
