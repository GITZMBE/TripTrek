import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#222831",
        secondary: "#31363F",
        accent: "#76ABAE",
        light: "#EEEEEE"
      },
    },
  },
  plugins: [],
};
export default config;
