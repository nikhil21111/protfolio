import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        win95: {
          gray: '#c0c0c0',
          darkGray: '#808080',
          lightGray: '#dfdfdf',
          blue: '#000080',
          cyan: '#008080',
          desktop: '#008080',
        },
      },
      fontFamily: {
        dos: ['"Press Start 2P"', 'cursive'],
        win95: ['MS Sans Serif', 'sans-serif'],
      },
      boxShadow: {
        win95: 'inset -1px -1px #0a0a0a, inset 1px 1px #dfdfdf, inset -2px -2px grey, inset 2px 2px #fff',
        win95Pressed: 'inset -1px -1px #fff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px grey',
      },
    },
  },
  plugins: [],
};
export default config;
