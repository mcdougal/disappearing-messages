/* eslint-disable filenames/match-exported */
import forms from '@tailwindcss/forms';
import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [`./src/**/*.{js,ts,jsx,tsx,mdx}`],
  theme: {
    extend: {
      fontFamily: {
        sans: [`Inter var`, ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [forms],
};

export default config;
