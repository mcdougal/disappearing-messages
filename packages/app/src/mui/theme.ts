import { createTheme, responsiveFontSizes } from '@mui/material';

// Palette - Common
const PALETTE_COMMON_BLACK = `#000`;
const PALETTE_COMMON_WHITE = `#fff`;

// Palette - Primary
const PALETTE_PRIMARY_LIGHT = `#42a5f5`;
const PALETTE_PRIMARY_MAIN = `#1976d2`;
const PALETTE_PRIMARY_DARK = `#1565c0`;

// Palette - Secondary
const PALETTE_SECONDARY_LIGHT = `#ba68c8`;
const PALETTE_SECONDARY_MAIN = `#9c27b0`;
const PALETTE_SECONDARY_DARK = `#7b1fa2`;

// Palette - Text
const PALETTE_TEXT_PRIMARY = `rgba(0, 0, 0, 0.87)`;
const PALETTE_TEXT_SECONDARY = `rgba(0, 0, 0, 0.6)`;

const theme = createTheme({
  palette: {
    mode: `light`,
    common: {
      black: PALETTE_COMMON_BLACK,
      white: PALETTE_COMMON_WHITE,
    },
    primary: {
      light: PALETTE_PRIMARY_LIGHT,
      main: PALETTE_PRIMARY_MAIN,
      dark: PALETTE_PRIMARY_DARK,
    },
    secondary: {
      light: PALETTE_SECONDARY_LIGHT,
      main: PALETTE_SECONDARY_MAIN,
      dark: PALETTE_SECONDARY_DARK,
    },
    text: {
      primary: PALETTE_TEXT_PRIMARY,
      secondary: PALETTE_TEXT_SECONDARY,
    },
  },
  typography: {
    fontFamily: `Inter, Arial`,
  },
});

export default responsiveFontSizes(theme);
