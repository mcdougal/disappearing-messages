/* eslint-disable filenames/match-exported */
import forms from '@tailwindcss/forms';
import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [`./src/**/*.{js,ts,jsx,tsx,mdx}`],
  theme: {
    extend: {
      animation: {
        'fade-in': `fade-in 0.3s ease-in-out`,
      },
      fontFamily: {
        sans: [`Inter var`, ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: `0` },
          '100%': { opacity: `1` },
        },
      },
    },
  },
  plugins: [forms],
};

export default config;
