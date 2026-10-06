import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-green': '#00665e',
        'racing-green': '#004d47',
        'luxury-gold': '#cca462',
      },
      fontFamily: {
        lexendpeta: ["'Sora'", 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
