import {nextui} from '@nextui-org/theme';
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#222831",
        secondary: "#31363F",
        accent: "#2EC4B6",
        light: "#EEEEEE",
        grey: "#555D6B",
        error: "#cc0000",
        love: "#E41B17",
        accept: "#00D100",
        cancel: "#ED5E68",
        verified: "#1DCAFF"
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
  plugins: [nextui()],
};
export default config;
