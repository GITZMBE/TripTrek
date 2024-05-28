import plugin from 'tailwindcss/plugin';

import {nextui} from '@nextui-org/theme';
import type { Config } from "tailwindcss";


const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      screens: {
        xs: '475px'
      },
      colors: {
        primary: "#222831",
        secondary: "#31363F",
        accent: "#2EC4B6",
        light: "#EEEEEE",
        grey: "#555D6B",
        error: "#CC0000",
        delete: "#D11A2A",
        love: "#E41B17",
        accept: "#00D100",
        cancel: "#ED5E68",
        verified: "#1DCAFF"
      },
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
      },
      keyframes: {
        fadeIn: {
          from: {
            opacity: '0',
            transform: 'translateY(100%)'
          }, 
          '20%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
          '80%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
          '90%': {
            opacity: '0',
            transform: 'translateY(100%)'
          }, 
          to: {
            opacity: '0',
            transform: 'translateY(100%)'
          }
        }
      },
      animation: {
        fadeIn: 'fadeIn 5000ms ease-in-out'
      }
    },
  },
  darkMode: "class",
  plugins: [
    nextui(),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    }),
  ],
};
export default config;
