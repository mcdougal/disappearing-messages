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
        'grow-in-and-out': `grow-in-and-out 2s ease-in-out forwards`,
      },
      fontFamily: {
        sans: [`Inter var`, ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: `0` },
          '100%': { opacity: `1` },
        },
        'grow-in-and-out': {
          '0%': { transform: `scale(0)` },
          '10%': { transform: `scale(1.1)` },
          '20%': { transform: `scale(0.9)` },
          '30%': { transform: `scale(1)` },
          '80%': { transform: `scale(1)` },
          '90%': { transform: `scale(1.2)` },
          '100%': { transform: `scale(0)` },
        },
      },
    },
  },
  plugins: [forms],
};

export default config;
